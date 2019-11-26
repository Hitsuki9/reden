import { Socket } from 'socket.io';

/**
 * 打印请求日志
 */
export default function logger () {
  return async (packet: Socket, next: Function) => {
    console.log(`<-- ${JSON.stringify(packet.eventNames())}`);
    await next();
    console.log('-->\n');
  };
}
