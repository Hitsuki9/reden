import assert from 'assert';
import { Packet } from '../utils';

/**
 * 全局异常捕获
 */
export default function errorCatcher() {
  return async (packet: Packet, next: Function) => {
    try {
      await next();
    } catch (err) {
      if (err instanceof assert.AssertionError) {
        packet.res = err.message;
        return;
      }
      packet.res = `Internal Server Error: ${err.message}`;
      console.error(`Unhandled Error:\n\t${err}\n`);
    }
  };
}
