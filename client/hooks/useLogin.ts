import { useSelector } from 'react-redux';
import { State } from '@/store/reducer';

/**
 * 获取登陆状态
 */
export default function useLogin() {
  const isLogin = useSelector(
    (state: State) => state.user && state.user._id !== ''
  );
  return isLogin;
}
