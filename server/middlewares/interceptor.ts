import { Packet } from '../utils';

/**
 * 拦截器
 * 拦截未登录用户请求需要登录态的接口
 */
export default function interceptor() {
  const whitelist = [
    'connection',
    'guest',
    'login',
    'loginByToken',
    'register',
    'getHistoryMessages' // TODO: temp
  ];
  return async (packet: Packet, next: Function) => {
    if (!packet.socket.user && !whitelist.includes(packet.event)) {
      packet.res = 'validate failed';
      return;
    }
    await next();
  };
}
