import { Packet } from '../utils';

/**
 * 响应客户端事件
 */
export default async function acknowledgement(packet: Packet, next: Function) {
  await next();
  if (packet.acknowledge) {
    packet.acknowledge(packet.res);
  }
}
