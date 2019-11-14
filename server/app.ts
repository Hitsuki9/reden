import Koa from 'koa';

const app = new Koa();

app.listen(9000, () => {
  console.log(` >>> server listen on http://localhost:9000`);
});
