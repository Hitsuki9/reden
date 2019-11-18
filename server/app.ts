import Koa from 'koa';

const app = new Koa();

app.use(async (ctx, next) => {
  console.log(ctx);
  ctx.body = 'index';
});

export default app;
