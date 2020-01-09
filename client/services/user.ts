import { fetch } from '@/utils';
import { SetUserPayload } from '@/store/action';
import { Group, Linkman } from '@/store/reducer';

/**
 * 注册
 * @param username 用户名
 * @param password 密码
 * @param os 操作系统
 * @param browser 浏览器
 * @param environment 环境信息
 */
export async function register(
  username: string,
  password: string,
  os: string,
  browser: string,
  environment: string
) {
  const [, res] = await fetch('register', {
    username,
    password,
    os,
    browser,
    environment
  });
  return res;
}

/**
 * 登陆
 * @param username 用户名
 * @param password 密码
 * @param os 操作系统
 * @param browser 浏览器
 * @param environment 环境信息
 */
export async function login(
  username: string,
  password: string,
  os: string,
  browser: string,
  environment: string
) {
  const [, res] = await fetch('login', {
    username,
    password,
    os,
    browser,
    environment
  });
  return res;
}

/**
 * 使用 token 登录
 * @param token
 * @param os 操作系统
 * @param browser 浏览器
 * @param environment 环境信息
 */
export async function loginByToken(
  token: string,
  os: string,
  browser: string,
  environment: string
) {
  const [, res] = await fetch<SetUserPayload>(
    'loginByToken',
    {
      token,
      os,
      browser,
      environment
    },
    false
  );
  return res;
}

/**
 * 游客
 * @param os 操作系统
 * @param browser 浏览器
 * @param environment 环境信息
 */
export async function guest(os: string, browser: string, environment: string) {
  const [, res] = await fetch<Group>('guest', {
    os,
    browser,
    environment
  });
  return res;
}

/**
 * 单向添加好友
 * @param userId 用户 id
 */
export async function addFriend(userId: string) {
  const [, res] = await fetch<Linkman>('addFriend', { userId });
  return res;
}

/**
 * 单向删除好友
 * @param userId 用户 id
 */
export async function deleteFriend(userId: string) {
  const [, res] = await fetch('deleteFriend', { userId });
  return res;
}
