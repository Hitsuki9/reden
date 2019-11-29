import { Packet } from '../utils';

/**
 * 全局异常捕获
 */
export default function errorCatcher () {
  return async (packet: Packet, next: Function) => {
    try {
      await next();
    } catch (err) {
      console.log(err.message);
    }
  };
}
