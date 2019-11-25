import { Context } from 'koa';
import { Socket } from 'socket.io';

export function isContext (ctx: Context | Socket): ctx is Context {
  return !!ctx;
}

export function isSocket (ctx: Socket | Socket): ctx is Socket {
  return !!ctx;
}
