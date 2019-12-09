import { Packet } from '../utils';

interface SearchData {
  /** 搜索关键字 */
  keywords: string;
}

/**
 * 搜索
 * @param packet
 */
export async function search (packet: Packet<SearchData>) {
  const { keywords } = packet.data;
  console.log(keywords);
}
