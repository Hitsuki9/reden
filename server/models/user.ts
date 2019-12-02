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
  /** 创建时间 */
  createTime: Date;
  /** 最后登录时间 */
  lastLoginTime: Date;
}

const userSchema = new Schema({
  username: { type: String },
  password: { type: String },
  avatar: String,
  createTime: { type: Date, default: Date.now },
  lastLoginTime: { type: Date, default: Date.now }
});

const User = model<UserDocument>('User', userSchema);

export default User;
