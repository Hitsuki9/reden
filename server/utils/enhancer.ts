import { Server, Socket } from 'socket.io';
import { Schema } from 'mongoose';
import { compose } from './compose';

const middlewares: Function[] = [];

export interface EnhancedServer extends Server {
  apply: (fn: Function) => void;
}

export interface EnhancedSocket extends Socket {
  subscribe: (event: string) => Socket;
  /** socket 关联用户 id */
  user?: Schema.Types.ObjectId;
}

export interface Packet<T = string> {
  /** 事件名 */
  event: string;
  /** socket */
  socket: EnhancedSocket;
  /** 负载数据 */
  data: T;
  /** 事件响应函数 */
  acknowledge?: Function;
  /** 响应内容 */
  res?: any;
}

/**
 * connection 事件回调
 * @param client 客户端连接实例
 */
function onConnection(client: Socket) {
  (client as EnhancedSocket).subscribe = (event) =>
    client.on(event, (data, ack) => {
      const packet: Packet = {
        event,
        socket: client as EnhancedSocket,
        data,
        acknowledge: ack
      };
      compose(packet, middlewares);
    });
  compose(
    {
      event: 'connection',
      socket: client as EnhancedSocket,
      data: ''
    },
    middlewares
  );
}

/**
 * 增强 socket.io 功能
 * @param socket
 */
export function enhancer(socket: Server) {
  socket.on('connection', onConnection);
  (socket as EnhancedServer).apply = (fn) => {
    middlewares.push(fn);
  };
}
