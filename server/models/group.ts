import { Schema, model } from 'mongoose';

const GroupSchema = new Schema({
  createTime: { type: Date, default: Date.now },
  name: { type: String },
  creator: { type: Schema.Types.ObjectId, ref: 'User' },
  isDefault: { type: Boolean, default: false },
  members: [
    { type: Schema.Types.ObjectId, ref: 'User' }
  ]
});

const Group = model('Group', GroupSchema);

export default Group;
