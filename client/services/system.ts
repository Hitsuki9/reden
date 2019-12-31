import { fetch } from '@/utils';

export interface SearchResult {
  users: {
    id: string;
    username: string;
    avatar: string;
  }[];
  groups: {
    id: string;
    name: string;
    avatar: string;
    members: number;
  }[];
}

/**
 * 搜索
 * @param keyword 关键字
 */
export async function search(keyword: string) {
  const [, res] = await fetch<SearchResult>('search', {
    keyword
  });
  return res;
}
