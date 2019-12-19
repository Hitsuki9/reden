import message from './message';
import socket from './socket';

export function fetch<T = any>(
  event: string,
  data = {},
  toast = true
): Promise<[string | null, T | null]> {
  return new Promise((resolve) => {
    socket.emit(event, data, (res: T) => {
      console.log(event, ' -> ', res);
      if (typeof res === 'string') {
        if (toast) {
          message.error(res);
        }
        resolve([res, null]);
      } else {
        resolve([null, res]);
      }
    });
  });
}
