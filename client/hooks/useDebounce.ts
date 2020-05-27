import { useRef } from 'react';
import { debounce } from '../utils';

/**
 * 防抖 hook
 * @param fn 执行函数
 * @param delay 延迟毫秒数
 */
export default function useDebounce<T extends (...args: any[]) => void>(
  fn: T,
  delay: number
) {
  const debounceRef = useRef<T | null>(null);
  if (!debounceRef.current) {
    debounceRef.current = debounce(fn, delay);
  }
  return debounceRef.current;
}
