import {
  Action,
  ActionTypes
} from './action';


export interface SetStatusPayload {
  key: string;
  value: any;
}

export interface State {
  /** 用户信息 */
  user: {
    _id: string;
    username: string;
    avatar: string;
  } | null;
  /** socket 连接状态 */
  connect: boolean;
  /** 客户端状态 */
  status: {
    /** 登陆注册框显示状态 */
    loginAndRegisterDialogVisible: boolean;
  };
}

const initialState: State = {
  user: null,
  connect: false,
  status: {
    loginAndRegisterDialogVisible: false
  }
};

function reducer (state: State = initialState, action: Action): State {
  switch (action.type) {
    case ActionTypes.Connect:
      return {
        ...state,
        connect: true
      };
    case ActionTypes.Disconnect:
      return {
        ...state,
        connect: false
      };
    case ActionTypes.SetUser:
      return {
        ...state
      };
    case ActionTypes.SetStatus:
      const { payload } = action as Action<SetStatusPayload>;
      return {
        ...state,
        status: {
          ...state.status,
          [payload.key]: payload.value
        }
      };
    default:
      return state;
  }
}

export default reducer;
