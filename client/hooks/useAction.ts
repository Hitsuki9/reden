import { useDispatch } from 'react-redux';
import { ActionTypes, SetUserPayload } from '@/store/action';
import { Linkman } from '@/store/reducer';

/**
 * 获取 actions
 */
export default function useAction() {
  const dispatch = useDispatch();
  return {
    setUser(user: SetUserPayload) {
      dispatch({
        type: ActionTypes.SetUser,
        payload: user
      });
    },
    logout() {
      dispatch({
        type: ActionTypes.Logout
      });
    },
    setStatus(key: string, value: any) {
      dispatch({
        type: ActionTypes.SetStatus,
        payload: {
          key,
          value
        }
      });
    },
    addLinkman(linkman: Linkman) {
      dispatch({
        type: ActionTypes.AddLinkman,
        payload: linkman
      });
    },
    removeLinkman() {
      dispatch({
        type: ActionTypes.RemoveLinkman,
        payload: {}
      });
    }
  };
}
