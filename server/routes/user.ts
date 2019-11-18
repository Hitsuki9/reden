import { Context } from 'koa';

export function register (ctx: Context) {
  const { username, password } = ctx.data;
  console.log(username, password);
}
