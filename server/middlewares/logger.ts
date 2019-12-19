import { Packet } from '../utils';

/**
 * 打印请求日志
 */
export default function logger() {
  return async (packet: Packet, next: Function) => {
    // 事件名   socket id   用户 id
    console.log(
      `<-- ${packet.event} ${packet.socket.id} ${packet.socket.user || ''}`
    );
    const before = Date.now();
    await next();
    const after = Date.now();
    // 事件名   耗时  错误信息
    console.log(
      `--> ${packet.event} ${after - before}ms ${
        typeof packet.res === 'string' ? packet.res : ''
      }\n`
    );
  };
}
