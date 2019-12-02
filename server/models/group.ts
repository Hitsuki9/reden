import { Schema, model, Document } from 'mongoose';

interface GroupDocument extends Document {
  /** id */
  _id: Schema.Types.ObjectId;
  /** 群组名 */
  name: string;
  /** 创建时间 */
  createTime: Date;
  /** 创建者 */
  creator: Schema.Types.ObjectId;
  /** 是否为默认群组 */
  isDefault: boolean;
  /** 群组成员 */
  member: Schema.Types.ObjectId[];
}

const groupSchema = new Schema({
  createTime: { type: Date, default: Date.now },
  name: { type: String },
  creator: { type: Schema.Types.ObjectId, ref: 'User' },
  isDefault: { type: Boolean, default: false },
  members: [
    { type: Schema.Types.ObjectId, ref: 'User' }
  ]
});

const Group = model<GroupDocument>('Group', groupSchema);

export default Group;
