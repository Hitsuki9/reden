import http from 'http';
import Koa from 'koa';
import io from 'socket.io';
import log from './middlewares/log';

const app = new Koa();
const server = http.createServer(app.callback());
const socket = io(server);

app.use(log());

app.use(async (ctx, next) => {
  console.log(ctx.request.url);
  ctx.body = ctx.request.url;
});

socket.use(log());

socket.on('connection', (client) => {
  console.log('socket connect!');
  client.on('disconnect', () => {
    console.log('socket disconnect!');
  });
});

export default server;
