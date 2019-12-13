import { Schema } from 'mongoose';
import { Packet } from '../utils';

interface MessageData {
  /** 接收者 */
  to: string;
  /** 消息类型 */
  type: string;
  /** 消息内容 */
  content: string;
}

interface HistoryData {
  /** 联系人 id */
  linkmanId: Schema.Types.ObjectId;
  /** 客户端已有消息数 */
  offset: number;
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

/**
 * 获取联系人历史消息
 * @param packet
 */
export async function getHistoryMessages (packet: Packet<HistoryData>) {
  const { linkmanId, offset } = packet.data;
  console.log(linkmanId, offset);
  return [];
}
