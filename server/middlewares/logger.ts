import { Packet } from '../utils';

/**
 * 打印请求日志
 */
export default function logger () {
  return async (packet: Packet, next: Function) => {
    console.log(`<-- ${packet.event} ${packet.socket.id}`);
    await next();
    console.log('-->\n');
  };
}
