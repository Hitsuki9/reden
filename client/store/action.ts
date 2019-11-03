export enum ActionTypes {
  /** 设置用户信息 */
  SetUser = 'SetUser',
  /** socket 连接成功 */
  Connect = 'Connect',
  /** socket 断开连接 */
  Disconnect = 'Disconnect'
}

export interface Action {
  type: ActionTypes;
}
