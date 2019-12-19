import { Packet } from './enhancer';

/**
 * 洋葱圈聚合
 * @param packet
 * @param fns 中间件
 */
export function compose(packet: Packet, ...fns: Function[]) {
  async function dispatch(i: number) {
    const fn = fns[i];
    if (fn) {
      await fns[i](packet, async () => {
        await dispatch(i + 1);
      });
    }
  }
  dispatch(0);
}
