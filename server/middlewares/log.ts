import { Context } from 'koa';
import { Socket } from 'socket.io';

/**
 * 打印请求日志
 */
export default function log<T extends Context | Socket> () {
  return async (ctx: T, next: Function) => {
    console.log('<--');
    await next();
    console.log('-->\n');
  };
}
