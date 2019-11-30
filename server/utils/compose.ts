import { Packet } from './enhancer';

export function compose (packet: Packet, ...fns: Function[]) {
  console.log(`middleware num: ${fns.length}`);
  fns[0](packet, async () => {
    await fns[1](packet, async () => {
      await fns[2](packet, async () => {
        await fns[3](packet);
      });
    });
  });
}
