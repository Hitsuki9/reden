import { Schema, model, Document } from 'mongoose';

export type MessageType = 'text' | 'image' | 'code';

export interface MessageDocument extends Document {
  /** 发送人 */
  from: Schema.Types.ObjectId;
  /** 接收者 */
  to: Schema.Types.ObjectId;
  /** 消息内容 */
  content: string;
  /** 消息类型 */
  type: MessageType;
  /** 发送时间 */
  time: Date;
}

const messageSchema = new Schema({
  from: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  to: {},
  content: {},
  type: {},
  time: { type: Date, default: Date.now }
});

const Message = model<MessageDocument>('Message', messageSchema);

export default Message;
