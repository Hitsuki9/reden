export enum ActionTypes {
  SetUser = 'SetUser', // 设置用户信息
  Connect = 'Connect', // socket 连接成功
  Disconnect = 'Disconnect' // socket 断开连接
}

export interface Action {
  type: ActionTypes;
}
