import { Schema, model, Document } from 'mongoose';

export interface GroupDocument extends Document {
  /** 群组名 */
  name: string;
  /** 群组头像 */
  avatar: string;
  /** 公告 */
  announcement: string;
  /** 创建时间 */
  createTime: Date;
  /** 创建者 */
  creator: Schema.Types.ObjectId;
  /** 是否为默认群组 */
  isDefault: boolean;
  /** 群组成员 */
  members: Schema.Types.ObjectId[];
}

const groupSchema = new Schema({
  name: {
    type: String,
    trim: true,
    index: true,
    unique: true,
    match: /^[0-9a-zA-Z\u4e00-\u9fd5]{1,30}$/
  },
  avatar: String,
  announcement: { type: String, default: '' },
  createTime: { type: Date, default: Date.now },
  creator: { type: Schema.Types.ObjectId, ref: 'User' },
  isDefault: { type: Boolean, default: false },
  members: [
    { type: Schema.Types.ObjectId, ref: 'User' }
  ]
});

const Group = model<GroupDocument>('Group', groupSchema);

export default Group;
