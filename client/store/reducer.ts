import {
  Action,
  ActionTypes,
  SetUserPayload,
  SetStatusPayload,
  SetGuestPayload,
  UpdateHistoryMessagesPayload
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
interface Friend {
  id: string;
  name: string;
  avatar: string;
}

/** 消息 */
export interface Message {
  id: string;
  type: string;
  content: string;
  from: {
    id: string;
    username: string;
    avatar: string;
    tag: string;
  };
}

/** 消息集合 */
interface MessagesMap {
  [messageId: string]: Message;
}

/** 联系人 */
export interface Linkman extends Friend, Group {
  type: string;
  unread: number;
  messages: MessagesMap;
}

/** 联系人集合 */
interface LinkmansMap {
  [linkmanId: string]: Linkman;
}

/** redux store state */
export interface State {
  /** 用户信息 */
  user: User | null;
  /** 联系人集合 */
  linkmans: LinkmansMap;
  /** socket 连接状态 */
  connect: boolean;
  /** 聚焦的联系人 */
  focus: string;
  /** 客户端状态 */
  status: {
    /** 登陆注册框显示状态 */
    loginAndRegisterDialogVisible: boolean;
  };
}

/**
 * 转换联系人数组为联系人 map
 * @param linkmans 联系人数组
 */
function getLinkmansMap (linkmans: Linkman[]) {
  return linkmans.reduce((map: LinkmansMap, linkman: Linkman) => {
    linkman.unread = 0;
    linkman.messages = {};
    map[linkman.id] = linkman;
    return map;
  }, {});
}

const initialState: State = {
  user: null,
  linkmans: {},
  connect: false,
  focus: '',
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
        admin,
        linkmans: linkmanList
      } = (action as Action<SetUserPayload>).payload;
      const linkmans = getLinkmansMap(linkmanList);
      return {
        ...state,
        user: {
          id,
          username,
          avatar,
          tag,
          admin
        },
        linkmans,
        focus: linkmanList[0] ? linkmanList[0].id : ''
      };
    }
    case ActionTypes.SetGuest: {
      const { payload } = action as Action<SetGuestPayload>;
      const user = {
        id: '',
        username: '',
        avatar: '',
        tag: '',
        admin: false
      };
      if (!Object.keys(payload).length) {
        return {
          ...state,
          user: {
            ...user
          }
        };
      }
      const linkmans = getLinkmansMap([payload]);
      return {
        ...state,
        user: {
          ...user
        },
        linkmans,
        focus: payload.id
      };
    }
    case ActionTypes.Logout: {
      return {
        ...initialState
      };
    }
    case ActionTypes.UpdateHistoryMessages: {
      const { linkmanId, messages } = (action as Action<UpdateHistoryMessagesPayload>).payload;
      return {
        ...state,
        linkmans: {
          ...state.linkmans,
          [linkmanId]: {
            ...state.linkmans[linkmanId],
            messages: {
              temp: messages[0]
            }
          }
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
