import { createServer } from 'http';
import Koa from 'koa';
import { createWebSocketServer } from './ws';

const app = new Koa();
const server = createServer(app.callback());
const ws = createWebSocketServer(server);

export default server;
