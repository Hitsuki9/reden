import { Packet } from '../utils';

interface SearchData {
  /** 搜索关键字 */
  keyword: string;
}

/**
 * 搜索
 * @param packet
 */
export async function search(packet: Packet<SearchData>) {
  const { keyword } = packet.data;
  console.log(keyword);
}
