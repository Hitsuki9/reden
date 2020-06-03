import { Packet } from '../utils';

const whitelist = [
  'connection',
  'guest',
  'login',
  'loginByToken',
  'register',
  'getDefaultGroupMessages'
];

/**
 * 拦截器
 * 拦截未登录用户请求需要登录态的接口
 */
export default async function interceptor(packet: Packet, next: Function) {
  if (!packet.socket.user && !whitelist.includes(packet.event)) {
    packet.res = '请登录后重试';
    return;
  }
  await next();
}
