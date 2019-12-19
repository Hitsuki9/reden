import { Packet } from '../utils';

/**
 * 响应客户端事件
 */
export default function acknowledgement() {
  return async (packet: Packet, next: Function) => {
    await next();
    if (packet.acknowledge) {
      packet.acknowledge(packet.res);
    }
  };
}
