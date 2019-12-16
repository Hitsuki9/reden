import assert from 'assert';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { Schema } from 'mongoose';
import {
  Packet,
  getRandomAvatar,
  getDefaultAvatar
} from '../utils';
import config from '../../config/server';
import User, { UserDocument } from '../models/user';
import Group from '../models/group';
import Socket from '../models/socket';
import Friend from '../models/friend';

interface Environment {
  /** 客户端操作系统 */
  os: string;
  /** 客户端浏览器 */
  browser: string;
  /** 客户端环境信息 */
  environment: string;
}

interface UserData extends Environment {
  /** 用户名 */
  username: string;
  /** 密码 */
  password: string;
}

interface TokenData extends Environment {
  /** token */
  token: string;
}

/**
 * 生成 jwt
 * @param userId 用户 id
 * @param environment 客户端环境信息
 */
function generateToken (userId: Schema.Types.ObjectId, environment: string) {
  return jwt.sign(
    {
      userId,
      environment,
      exp: Math.floor(Date.now() / 1000) + config.expiration
    },
    config.secret
  );
}

/**
 * 注册
 * @param packet
 */
export async function register (packet: Packet<UserData>) {
  const {
    username,
    password,
    os,
    browser,
    environment
  } = packet.data;
  let isAdmin = false;

  assert(username, '用户名不可为空');
  assert(password, '密码不可为空');
  const user = await User.findOne({ username });
  assert(!user, '用户已存在');

  let defaultGroup = await Group.findOne({ isDefault: true });
  if (!defaultGroup) {
    isAdmin = true;
    defaultGroup = new Group({
      name: 'fiora',
      avatar: getDefaultAvatar(),
      isDefault: true
    });
  }

  const salt = await bcrypt.genSalt(config.rounds);
  const hash = await bcrypt.hash(password, salt);
  let newUser: UserDocument | null;
  try {
    newUser = await User.create({
      username,
      password: hash,
      avatar: getRandomAvatar(),
      admin: isAdmin
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      return '用户名包含特殊字符或长度超过限制';
    }
    throw err;
  }

  if (!defaultGroup.creator) {
    defaultGroup.creator = newUser._id;
  }
  defaultGroup.members.push(newUser._id);
  await defaultGroup.save();

  const token = generateToken(newUser._id, environment);

  packet.socket.user = newUser._id;
  await Socket.updateOne({
    id: packet.socket.id
  }, {
    user: newUser._id,
    os,
    browser,
    environment
  });

  return {
    id: newUser._id,
    avatar: newUser.avatar,
    username: newUser.username,
    tag: newUser.tag,
    admin: newUser.admin,
    token,
    friends: [],
    groups: [
      {
        id: defaultGroup._id,
        name: defaultGroup.name,
        avatar: defaultGroup.avatar,
        messages: []
      }
    ]
  };
}

/**
 * 登录
 * @param packet
 */
export async function login (packet: Packet<UserData>) {
  assert(!packet.socket.user, '请不要重复登录');
  const {
    username,
    password,
    os,
    browser,
    environment
  } = packet.data;

  assert(username, '用户名不可为空');
  assert(password, '密码不可为空');
  const user = await User.findOne({ username });
  assert(user, '用户不存在');
  if (user) {
    const validateRes = await bcrypt.compare(password, user.password);
    assert(validateRes, '密码错误');

    user.lastLoginTime = new Date();
    await user.save();

    const groups = await Group.find({
      members: user._id
    }, 'name avatar');
    // TODO: socket.join
    // TODO: Message

    const friends = await Friend.find({
      from: user._id
    }).populate('to', 'username avatar');

    const token = generateToken(user._id, environment);

    packet.socket.user = user._id;
    await Socket.updateOne({
      id: packet.socket.id
    }, {
      user: user._id,
      os,
      browser,
      environment
    });

    return {
      id: user._id,
      avatar: user.avatar,
      username: user.username,
      tag: user.tag,
      admin: user.admin,
      token,
      groups: groups.map((group) => ({
        id: group._id,
        name: group.name,
        avatar: group.avatar
      })),
      friends
    };
  }
  return null;
}

/**
 * 通过 token 登录
 * @param packet
 */
export async function loginByToken (packet: Packet<TokenData>) {
  assert(!packet.socket.user, '请不要重复登录');
  const {
    token,
    os,
    browser,
    environment
  } = packet.data;

  assert(token, 'token 不可为空');
  const payload = jwt.decode(token);
  assert(payload, '无效 token');
  if (payload && typeof payload !== 'string') {
    assert(Math.floor(Date.now() / 1000) < payload.exp, 'token 已过期');
    assert.equal(environment, payload.environment, '非法登录');

    const user = await User.findOne({ _id: payload.userId });
    assert(user, '用户不存在');
    if (user) {
      user.lastLoginTime = new Date();
      await user.save();

      const groups = await Group.find({
        members: user._id
      }, 'name avatar');

      packet.socket.user = user._id;
      await Socket.updateOne({
        id: packet.socket.id
      }, {
        user: user._id,
        os,
        browser,
        environment
      });

      return {
        id: user._id,
        avatar: user.avatar,
        username: user.username,
        tag: user.tag,
        admin: user.admin,
        groups: groups.map((group) => ({
          id: group._id,
          name: group.name,
          avatar: group.avatar
        }))
      };
    }
    return null;
  }
  return null;
}

/**
 * 游客
 * @param packet
 */
export async function guest (packet: Packet<Environment>) {
  const {
    os,
    browser,
    environment
  } = packet.data;

  await Socket.updateOne({
    id: packet.socket.id
  }, {
    os,
    browser,
    environment
  });

  const group = await Group.findOne({
    isDefault: true
  }, 'name avatar');
  if (group) {
    return {
      ...{
        id: group._id,
        name: group.name,
        avatar: group.avatar
      }
    };
  }
  return null;
}
