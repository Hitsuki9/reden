import { Context } from 'koa';

/**
 * 打印请求日志
 */
export default function log () {
  return async (ctx: Context, next: Function) => {
    console.log(ctx, '->');
    await next();
    console.log(ctx, '<-');
  }
}
