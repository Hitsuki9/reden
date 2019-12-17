import { Schema, model, Document } from 'mongoose';

interface SocketDocument extends Document {
  /** socket id */
  id: string;
  /** socket 关联用户 id */
  user: Schema.Types.ObjectId;
  /** ip 地址 */
  ip: string;
  /** 客户端操作系统 */
  os: string;
  /** 客户端浏览器 */
  browser: string;
  /** 客户端环境信息 */
  environment: string;
  /** 创建时间 */
  createTime: Date;
}

const socketSchema = new Schema({
  id: {
    type: String,
    index: true,
    unique: true
  },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  ip: String,
  os: { type: String, default: '' },
  browser: { type: String, default: '' },
  environment: { type: String, default: '' },
  createTime: { type: Date, default: Date.now }
});

const Socket = model<SocketDocument>('Socket', socketSchema);

export default Socket;
