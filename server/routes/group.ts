import { Packet } from '../utils';

interface Group {
  /** 群组名 */
  name: string;
  /** 创建者 */
  creator: string;
}

export function createGroup (packet: Packet<Group>) {
  const {
    name,
    creator
  } = packet.data;
  console.log(name, creator);
}
