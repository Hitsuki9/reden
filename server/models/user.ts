import { Schema, model, Document } from 'mongoose';

export interface UserDocument extends Document {
  /** id */
  _id: Schema.Types.ObjectId;
  /** 用户名 */
  username: string;
  /** 密码 */
  password: string;
  /** 头像 */
  avatar: string;
  /** 标签 */
  tag: string;
  /** 创建时间 */
  createTime: Date;
  /** 最后登录时间 */
  lastLoginTime: Date;
}

const userSchema = new Schema({
  username: {
    type: String,
    index: true,
    unique: true,
    required: true,
    trim: true,
    match: /^[0-9a-zA-Z\u4e00-\u9fd5]{1,30}$/
  },
  password: {
    type: String,
    required: true,
    maxLength: 100
  },
  avatar: String,
  tag: {
    type: String,
    default: '',
    trim: true,
    match: /^[0-9a-zA-Z\u4e00-\u9fd5]{1,10}$/
  },
  createTime: { type: Date, default: Date.now },
  lastLoginTime: { type: Date, default: Date.now }
});

const User = model<UserDocument>('User', userSchema);

export default User;
