import { fetch } from '@/utils';

/**
 * 搜索
 * @param keyword 关键字
 */
export async function search(keyword: string) {
  const [, res] = await fetch('search', {
    keyword
  });
  return res;
}
