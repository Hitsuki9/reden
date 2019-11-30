import http from 'http';
import Koa from 'koa';
import io from 'socket.io';
import acknowledgement from './middlewares/acknowledgement';
import logger from './middlewares/logger';
import errorCatcher from './middlewares/errorCatcher';
import router from './middlewares/router';
import { enhancer, isEnhancedServer } from './utils';
import * as routes from './routes';

const app = new Koa();
const server = http.createServer(app.callback());
const socket = io(server);
enhancer(socket);

if (isEnhancedServer(socket)) {
  socket._use(acknowledgement());
  socket._use(logger());
  socket._use(errorCatcher());
  socket._use(router(routes));
}
socket.on('connection', (client) => {
  console.log(`connection info:\n\tid ${client.id}\n\tip ${client.request.connection.remoteAddress}`);
  client.on('disconnect', () => {
    console.log('socket disconnect!\n');
  });
});

export default server;
