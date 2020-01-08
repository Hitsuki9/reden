import { fetch } from '@/utils';
import { Group as BaseGroup, User as BaseUser } from '@/store/reducer';

export interface Group extends BaseGroup {
  members: number;
}
export type User = BaseUser;
export interface SearchResult {
  groups: Group[];
  users: User[];
}
export type Item = User | Group;
export type ItemType = 'user' | 'group';

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
