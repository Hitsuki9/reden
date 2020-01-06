import { fetch } from '@/utils';

export type User = {
  id: string;
  username: string;
  avatar: string;
};

export type Group = {
  id: string;
  name: string;
  avatar: string;
  members: number;
};

export interface SearchResult {
  users: User[];
  groups: Group[];
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
