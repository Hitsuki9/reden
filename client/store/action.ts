import { User, Message, Linkman } from './reducer';

export enum ActionTypes {
  /** 设置用户信息 */
  SetUser = 'SetUser',
  /** 退出登录 */
  Logout = 'Logout',
  /** socket 连接成功 */
  Connect = 'Connect',
  /** socket 断开连接 */
  Disconnect = 'Disconnect',
  /** 更新客户端状态 */
  SetStatus = 'SetStatus',
  /** 设置游客信息 */
  SetGuest = 'SetGuest',
  /** 添加联系人 */
  AddLinkman = 'AddLinkman',
  /** 移除联系人 */
  RemoveLinkman = 'RemoveLinkman',
  /** 更新联系人历史消息 */
  UpdateHistoryMessages = 'UpdateHistoryMessages'
}

export interface Action<T = Record<string, any>, U = ActionTypes> {
  type: U;
  payload: T;
}

export interface SetStatusPayload {
  key: string;
  value: any;
}

export interface SetUserPayload extends User {
  linkmans: Linkman[];
  token: string;
}

export type SetGuestPayload = Linkman;
export type AddLinkmanPayload = Linkman;

export interface UpdateHistoryMessagesPayload {
  linkmanId: string;
  messages: Message[];
}
