import {
  Action,
  ActionTypes
} from './action';

interface State {
  user: {
    id: string,
    username: string,
    avatar: string
  } | null,
  connect: boolean
}

const initialState: State = {
  user: null,
  connect: false
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
    default:
      return state;
  }
}

export default reducer;
