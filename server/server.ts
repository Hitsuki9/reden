import Koa from 'koa';

const app = new Koa();

export async function startServer() {
  app.listen(9000);
}
