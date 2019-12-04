import assert from 'assert';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { Schema } from 'mongoose';
import { Packet, getRandomAvatar, isUser } from '../utils';
import config from '../../config/server';
import User, { UserDocument } from '../models/user';
import Group from '../models/group';

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

  assert(username, '用户名不可为空');
  assert(password, '密码不可为空');
  const user = await User.findOne({ username });
  assert(!user, '用户已存在');

  let defaultGroup = await Group.findOne({ isDefault: true });
  if (!defaultGroup) {
    defaultGroup = await Group.create({
      name: '默认群组',
      avatar: getRandomAvatar(),
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
      avatar: getRandomAvatar()
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
  defaultGroup.save();

  const token = generateToken(newUser._id, environment);

  return {
    id: newUser._id,
    avatar: newUser.avatar,
    username: newUser.username,
    token,
    admin: false,
    friends: [],
    groups: [
      {
        id: defaultGroup._id,
        name: defaultGroup.name,
        avatar: defaultGroup.avatar,
        creator: defaultGroup.creator,
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
  if (isUser(user)) {
    const validateRes = await bcrypt.compare(password, user.password);
    assert(validateRes, '密码错误');

    user.lastLoginTime = new Date();
    user.save();

    const token = generateToken(user._id, environment);

    return {
      id: user._id,
      avatar: user.avatar,
      username: user.username,
      tag: user.tag,
      token
    };
  }
  return null;
}
