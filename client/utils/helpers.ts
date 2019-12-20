/**
 * 节流
 * @param fn 执行函数
 * @param delay 延迟毫秒数
 */
export function throttle<T extends (...args: any[]) => void>(
  fn: T,
  delay: number
) {
  let sleep = false;
  return ((...args: any[]) => {
    if (sleep) return;
    sleep = true;
    setTimeout(() => {
      fn(...args);
      sleep = false;
    }, delay);
  }) as T;
}
