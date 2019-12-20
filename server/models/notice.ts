import { Schema, model, Document } from 'mongoose';

type NoticeType = '';
type NoticeState = 'read' | 'unread' | 'cleaned';

interface NoticeDocument extends Document {
  /** 通知对象 id */
  to: Schema.Types.ObjectId;
  /** 通知类型 */
  type: NoticeType;
  /** 通知内容 */
  content: string;
  /** 通知状态 */
  state: NoticeState;
  /** 创建时间 */
  createTime: Date;
  /** 已读时间 */
  readTime: Date;
}

const noticeSchema = new Schema({
  to: {},
  type: {},
  content: {},
  state: {},
  createTime: {},
  readTime: {}
});

const Notice = model<NoticeDocument>('Notice', noticeSchema);

export default Notice;
