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
export interface Friend {
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
export interface Linkman extends User, Group {
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
    map[linkman.id] = linkman;
    return map;
  }, {});
}

/**
 * 初始化联系人部分字段
 * @param linkman 联系人
 * @param type 联系人类型
 */
function initLinkmanFields (linkman: Linkman, type: string) {
  linkman.type = type;
}

/**
 * 转换群组数据结构
 * @param group 群组
 */
function transformGroup (group: Group) {
  initLinkmanFields(group as Linkman, 'group');
  return group as Linkman;
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
        groups
      } = (action as Action<SetUserPayload>).payload;
      const linkmans = [
        ...groups.map(transformGroup)
      ];
      return {
        ...state,
        user: {
          id,
          username,
          avatar,
          tag,
          admin
        },
        linkmans: getLinkmansMap(linkmans),
        focus: linkmans[0].id
      };
    }
    case ActionTypes.SetGuest: {
      const { payload } = action as Action<SetGuestPayload>;
      const linkman = transformGroup(payload);
      return {
        ...state,
        user: {
          id: '',
          username: '',
          avatar: '',
          tag: '',
          admin: false
        },
        linkmans: {
          [linkman.id]: linkman
        },
        focus: linkman.id
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
