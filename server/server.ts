import http from 'http';
import Koa from 'koa';
import io from 'socket.io';
import acknowledgement from './middlewares/acknowledgement';
import logger from './middlewares/logger';
import errorCatcher from './middlewares/errorCatcher';
import router from './middlewares/router';
import { enhancer, isEnhancedServer } from './utils';
import Socket from './models/socket';
import * as routes from './routes';

const app = new Koa();
const server = http.createServer(app.callback());
const socket = io(server);
enhancer(socket);

// 中间件
if (isEnhancedServer(socket)) {
  socket._use(acknowledgement());
  socket._use(logger());
  socket._use(errorCatcher());
  socket._use(router(routes));
}
socket.on('connection', async (client) => {
  console.log(
    `connection info:\n\tip ${client.request.connection.remoteAddress}`
  );
  await Socket.create({
    id: client.id,
    ip: client.request.connection.remoteAddress
  });
  client.on('disconnect', async () => {
    console.log(`disconnect ${client.id}\n`);
    await Socket.deleteOne({
      id: client.id
    });
  });
});

export default server;
