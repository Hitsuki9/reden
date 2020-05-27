import { useSelector } from 'react-redux';
import { State } from '@/store/reducer';

export default function useUserInfo() {
  const hasUserInfo = useSelector((state: State) => !!state.user);
  return hasUserInfo;
}
