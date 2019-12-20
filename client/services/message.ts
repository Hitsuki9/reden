import { fetch } from '@/utils';

/**
 * 获取联系人历史消息
 * @param linkmanId 联系人 id
 * @param offset 客户端已有消息数
 */
export async function getHistoryMessages(linkmanId: string, offset: number) {
  const [, res] = await fetch('getHistoryMessages', {
    linkmanId,
    offset
  });
  return res;
}

/**
 * 发送消息
 * @param to 发送对象 id
 * @param receiverType 发送对象类型
 * @param type 消息类型
 * @param content 消息内容
 */
export function sendMessage(
  to: string,
  receiverType: string,
  type: string,
  content: string
) {
  return fetch('sendMessage', {
    to,
    receiverType,
    type,
    content
  });
}

/**
 * 撤回消息
 */
export function withdrawMessage() {
  // TODO
}
