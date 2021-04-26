import type { Server } from 'http';
import WebSocket from 'ws';

export interface Middleware {}

export function createWebSocketServer(server: Server) {
  const wss = new WebSocket.Server({ server });
  const middlewares: Middleware[] = [];

  wss.on('connection', (client: WebSocket) => {
    console.log('websocket connected');
  });

  return {
    use(middleware: Middleware) {
      middlewares.push(middleware);
      return this;
    }
  };
}
