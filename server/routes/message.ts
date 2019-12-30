import assert from 'assert';
import { Packet } from '../utils';
import User from '../models/user';
import Group from '../models/group';
import Message, { MessageType } from '../models/message';
import Socket from '../models/socket';

const step = 20;

interface MessageData {
  /** 接收者 */
  to: string;
  /** 接收者类型 */
  receiverType: 'friend' | 'group';
  /** 消息类型 */
  type: MessageType;
  /** 消息内容 */
  content: string;
}

interface OffsetData {
  /** 客户端已有消息数 */
  offset: number;
}

interface LimitData extends OffsetData {
  /** 联系人 id */
  linkmanId: string;
}

/**
 * 发送消息
 * @param packet
 */
export async function sendMessage(packet: Packet<MessageData>) {
  const { to, receiverType, type, content } = packet.data;

  assert(to, '未指定发送对象');
  assert(receiverType, '未指定对象类型');
  if (receiverType === 'friend') {
    const user = await User.findOne({ _id: to });
    assert(user, '用户不存在');
  } else {
    const group = await Group.findOne({ _id: to });
    assert(group, '群组不存在');
  }

  if (type === 'text') {
    assert(content.length <= 2048, '消息内容过长');
  }

  // const message = await Message.create({
  //   from: packet.socket.user,
  //   to,
  //   type,
  //   content
  // });

  const user = await User.findOne(
    {
      _id: packet.socket.user
    },
    'username avatar tag'
  );

  if (user) {
    const messageData = {
      // id: message._id,
      from: {
        id: user._id,
        username: user.username,
        avatar: user.avatar,
        tag: user.tag
      },
      to,
      type,
      content
    };

    if (receiverType === 'friend') {
      const sockets = await Socket.find({ user: to });
      sockets.forEach((socket) =>
        packet.socket.to(socket.id).emit('message', messageData)
      );
    } else {
      packet.socket.to(to).emit('message', messageData);
    }
    return messageData;
  }
  return null;
}

/**
 * 获取默认群组历史消息
 * @param packet
 */
export async function getDefaultGroupMessages(packet: Packet<OffsetData>) {
  let { offset } = packet.data;
  offset = Math.floor(offset);
  offset = !Number.isNaN(offset) ? offset : 0;
  const group = await Group.findOne({ default: true });
  if (group) {
    const messages = await Message.find(
      {
        to: group._id
      },
      'from content type time',
      {
        sort: { time: 'desc' },
        limit: offset + step
      }
    ).populate('from', 'username avatar tag');
    return messages;
  }
  return [];
}

/**
 * 获取联系人历史消息
 * @param packet
 */
export async function getHistoryMessages(packet: Packet<LimitData>) {
  const { linkmanId, offset } = packet.data;
  console.log(linkmanId, offset);
  return [];
}
