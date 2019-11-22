import Koa from 'koa';
import log from './middlewares/log';

const app = new Koa();

app.use(log());

app.use(async (ctx, next) => {
  console.log(ctx.request.url);
  ctx.body = 'index';
});

export default app;
