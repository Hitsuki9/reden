import { Packet } from '../utils';

interface MessageData {
  /** 接收者 */
  to: string;
  /** 消息类型 */
  type: string;
  /** 消息内容 */
  content: string;
}

/**
 * 发送消息
 * @param packet
 */
export async function sendMessage (packet: Packet<MessageData>) {
  const {
    to,
    type,
    content
  } = packet.data;
  console.log(to, type, content);
}
