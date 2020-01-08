import { Schema, model, Document } from 'mongoose';

interface FriendDocument extends Document {
  /** 用户 id */
  from: Schema.Types.ObjectId;
  /** 被添加好友用户 id */
  to: Schema.Types.ObjectId;
  /** 添加时间 */
  createTime: Date;
}

const friendSchema = new Schema({
  from: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  to: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  createTime: { type: Date, default: Date.now }
});

const Friend = model<FriendDocument>('Friend', friendSchema);

export default Friend;
