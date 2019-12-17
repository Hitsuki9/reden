import { Schema, model, Document } from 'mongoose';

export interface UserDocument extends Document {
  /** 用户名 */
  username: string;
  /** 密码 */
  password: string;
  /** 头像 */
  avatar: string;
  /** 标签 */
  tag: string;
  /** 是否是管理员 */
  admin: boolean;
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
    trim: true,
    match: /^[0-9a-zA-Z\u4e00-\u9fd5]{1,30}$/
  },
  password: String,
  avatar: String,
  tag: {
    type: String,
    default: '',
    trim: true,
    match: /^[0-9a-zA-Z\u4e00-\u9fd5]{1,10}$/
  },
  admin: Boolean,
  createTime: { type: Date, default: Date.now },
  lastLoginTime: { type: Date, default: Date.now }
});

const User = model<UserDocument>('User', userSchema);

export default User;
