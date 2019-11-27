import { Server, Socket } from "socket.io";
import { compose } from "./compose";

const middlewares: Function[] = [];

export interface EnhancedServer extends Server {
  _use: (fn: Function) => void;
}

interface EnhancedSocket extends Socket {
  _on: (event: string, handler: Function) => Socket;
}

/**
 * connection 事件回调
 * @param client 客户端连接实例
 */
function onConnection (client: Socket) {
  compose(
    {
      event: 'connection',
      data: {},
      socket: client
    },
    ...middlewares
  )
  ;(client as EnhancedSocket)._on = (event) => client.on(event, (data) => {
    const packet = {
      event,
      data,
      socket: client
    };
    compose(packet, ...middlewares);
  });
}

/**
 * 增强 socket.io 功能
 * @param socket 
 */
export function enhancer (socket: Server) {
  socket.on('connection', onConnection);
  (socket as EnhancedServer)._use = (fn) => {
    middlewares.push(fn);
  };
}
