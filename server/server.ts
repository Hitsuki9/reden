import http from 'http';
import Koa from 'koa';
import io from 'socket.io';
import logger from './middlewares/logger';
import { enhancer, isEnhancedServer } from './utils';

const app = new Koa();
const server = http.createServer(app.callback());
const socket = io(server);
enhancer(socket);

if (isEnhancedServer(socket)) {
  socket._use(logger());
}
socket.on('connection', (client) => {
  console.log('socket connect!');
  client.on('disconnect', () => {
    console.log('socket disconnect!');
  });
});

export default server;
