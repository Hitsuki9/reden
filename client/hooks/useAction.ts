import { useDispatch } from 'react-redux';
import { ActionTypes } from '@/store/action';

/**
 * 获取 actions
 */
export default function useAction () {
  const dispatch = useDispatch();
  return {
    setUser (payload: any) {
      dispatch({
        type: ActionTypes.SetUser,
        payload
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
