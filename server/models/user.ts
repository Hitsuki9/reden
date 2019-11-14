import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
  createTime: { type: Date, default: Date.now },
  lastLoginTime: { type: Date, default: Date.now }
});

const User = model('User', UserSchema);

export default User;
