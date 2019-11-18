import { Context } from 'koa';

export function createGroup (ctx: Context) {
  const { name } = ctx.data;
  console.log(name);
}
