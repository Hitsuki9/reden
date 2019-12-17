import { Schema, model, Document } from 'mongoose';

type FriendState = 'pending' | 'fulfilled' | 'rejected';

interface FriendDocument extends Document {
  /** 申请用户 id */
  from: Schema.Types.ObjectId;
  /** 被申请用户 id */
  to: Schema.Types.ObjectId;
  /** 申请状态 */
  state: FriendState;
  /** 申请时间 */
  createTime: Date;
  /** 状态更新时间 */
  updateTime: Date;
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
  state: {
    type: String,
    default: 'pending',
    enum: ['pending', 'fulfilled', 'rejected']
  },
  createTime: { type: Date, default: Date.now },
  updateTime: Date
});

const Friend = model<FriendDocument>('Friend', friendSchema);

export default Friend;
