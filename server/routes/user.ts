import assert from 'assert';
import { Packet } from '../utils';

export function register (packet: Packet) {
  const { username, password } = packet.data;
  console.log(username, password);
  assert(password, '密码为空');
}
