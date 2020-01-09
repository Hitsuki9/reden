import { fetch } from '@/utils';

/**
 * 加入群组
 * @param groupId 群组 id
 */
export async function joinGroup(groupId: string) {
  const [, res] = await fetch('joinGroup', { groupId });
  return res;
}

/**
 * 离开群组
 * @param groupId 群组 id
 */
export async function leaveGroup(groupId: string) {
  console.log(groupId);
}

/**
 * 创建群组
 * @param name 群组名
 */
export async function createGroup(name: string) {
  console.log(name);
}

/**
 * 解散群组
 * @param groupId 群组 id
 */
export async function discardGroup(groupId: string) {
  console.log(groupId);
}
