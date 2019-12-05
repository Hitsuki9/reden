import {
  Action,
  ActionTypes,
  SetUserPayload,
  SetStatusPayload
} from './action';

/** 用户 */
export interface User {
  id: string;
  username: string;
  avatar: string;
  tag: string;
  admin: boolean;
}

/** 群组 */
export interface Group {
  id: string;
  name: string;
  avatar: string;
}

/** 好友 */
export interface Friend {
  id: string;
  name: string;
  avatar: string;
}

export interface State {
  /** 用户信息 */
  user: User | null;
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
    case ActionTypes.Connect: {
      return {
        ...state,
        connect: true
      };
    }
    case ActionTypes.Disconnect: {
      return {
        ...state,
        connect: false
      };
    }
    case ActionTypes.SetUser: {
      const {
        id,
        username,
        avatar,
        tag,
        admin
      } = (action as Action<SetUserPayload>).payload;
      return {
        ...state,
        user: {
          id,
          username,
          avatar,
          tag,
          admin
        }
      };
    }
    case ActionTypes.SetStatus: {
      const { payload } = action as Action<SetStatusPayload>;
      return {
        ...state,
        status: {
          ...state.status,
          [payload.key]: payload.value
        }
      };
    }
    default: {
      return state;
    }
  }
}

export default reducer;
