import { useDispatch } from 'react-redux';
import { ActionTypes } from '@/store/action';

/**
 * 获取 actions
 */
export default function useAction () {
  const dispatch = useDispatch();
  return {
    setUser (payload: Object) {
      dispatch({
        type: ActionTypes.SetUser,
        payload
      })
    }
  }
}
