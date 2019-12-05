import { useDispatch } from 'react-redux';
import { ActionTypes, SetUserPayload } from '@/store/action';

/**
 * 获取 actions
 */
export default function useAction () {
  const dispatch = useDispatch();
  return {
    setUser (user: SetUserPayload) {
      dispatch({
        type: ActionTypes.SetUser,
        payload: user
      });
    },
    setStatus (key: string, value: any) {
      dispatch({
        type: ActionTypes.SetStatus,
        payload: {
          key,
          value
        }
      });
    }
  };
}
