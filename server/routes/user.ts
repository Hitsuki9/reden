import assert from 'assert';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { Packet, getRandomAvatar } from '../utils';
import config from '../../config/server';
import User from '../models/user';

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
function generateToken (userId: string, environment: string) {
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
  assert(!user, '用户名已存在');

  const salt = await bcrypt.genSalt(config.rounds);
  const hash = await bcrypt.hash(password, salt);

  console.log({
    username,
    password: hash,
    avatar: getRandomAvatar()
  });

  // try {
  //   await User.create({
  //     username,
  //     password: hash,
  //     avatar: getRandomAvatar()
  //   });
  // } catch (err) {

  // }
}

/**
 * 登录
 * @param packet
 */
export function login (packet: Packet<UserData>) {
  const { username, password } = packet.data;
  assert(username, '用户名不可为空');
  assert(password, '密码不可为空');
  const token = generateToken('123', '456');
  return {
    token
  };
}
