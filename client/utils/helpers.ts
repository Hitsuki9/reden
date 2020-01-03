/**
 * 防抖
 * @param fn 执行函数
 * @param delay 延迟毫秒数
 */
export function debounce<T extends (...args: any[]) => void>(
  fn: T,
  delay: number
) {
  let timer: number;
  return ((...args: any[]) => {
    clearTimeout(timer);
    timer = window.setTimeout(() => {
      fn(...args);
    }, delay);
  }) as T;
}

/**
 * 填充日期左侧 0
 * @param str
 */
function padLeftZero(str: string) {
  return `00${str}`.substr(str.length);
}

/**
 * 日期格式化
 * @param date Date 实例
 * @param dateFormat 格式化格式
 */
export function formatDate(date: Date, dateFormat = 'yyyy-MM-dd HH:mm:ss') {
  let res = dateFormat;
  // 单独格式化年份，根据 y 的字符数量输出年份
  // 例如：yyyy => 2019
  //      yy => 19
  //      y => 9
  if (/(y+)/.test(res)) {
    res = res.replace(
      RegExp.$1,
      date
        .getFullYear()
        .toString()
        .substr(4 - RegExp.$1.length)
    );
  }
  // 格式化月、日、时、分、秒
  const o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'H+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  ['M+', 'd+', 'H+', 'm+', 's+'].forEach((k) => {
    if (new RegExp(`(${k})`).test(res)) {
      const str = o[k as keyof typeof o].toString();
      // 根据设置的格式，输出对应的字符
      // 例如：早上 8 时，HH => 08，H => 8
      // 但是当数字 >= 10 时，不做截取
      // 例如：15 时，HH => 15, H => 15
      res = res.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? str : padLeftZero(str)
      );
    }
  });
  return res;
}
