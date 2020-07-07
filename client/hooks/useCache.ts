import { useRef } from 'react';

/**
 * 缓存 hook
 * @param value 缓存值
 * @param useSetter 是否使用 setter
 */
function useCache<T extends any>(value: T, useSetter?: false): [T, undefined];
function useCache<T extends any>(
  value: T,
  useSetter: true
): [T, (newValue: T) => void];
function useCache<T extends any>(
  value: T,
  useSetter = false
): [T, ((newValue: T) => void) | undefined] {
  const ref = useRef(value);
  const setter = useSetter
    ? (newValue: T) => {
        ref.current = newValue;
      }
    : void 0;
  return [ref.current, setter];
}

export default useCache;
