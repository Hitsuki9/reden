import { Schema, model, Document } from 'mongoose';

export type MessageType = 'text' | 'image' | 'code' | 'system';
type MessageState = 'normal' | 'cancel';

export interface MessageDocument extends Document {
  /** 发送人 */
  from: Schema.Types.ObjectId;
  /** 接收者 */
  to: Schema.Types.ObjectId;
  /** 第三方（管理员） */
  operator: Schema.Types.ObjectId;
  /** 消息内容 */
  content: string;
  /** 消息类型 */
  type: MessageType;
  /** 消息状态 */
  state: MessageState;
  /** 发送时间 */
  time: Date;
}

const messageSchema = new Schema({
  from: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true
  },
  to: { type: Schema.Types.ObjectId, index: true },
  operator: { type: Schema.Types.ObjectId, ref: 'User' },
  content: { type: String, default: '' },
  type: {
    type: String,
    enum: ['text', 'image', 'code', 'system'],
    default: 'text'
  },
  state: {
    type: String,
    enum: ['normal', 'cancel'],
    default: 'normal'
  },
  time: { type: Date, default: Date.now }
});

const Message = model<MessageDocument>('Message', messageSchema);

export default Message;
