import { Packet } from '../utils';
import User from '../models/user';
import Group from '../models/group';

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
  if (keyword === '') {
    return {
      users: [],
      groups: []
    };
  }

  const [users, groups] = await Promise.all([
    User.find(
      {
        username: {
          $regex: keyword
        }
      },
      'username avatar'
    ),
    Group.find(
      {
        name: {
          $regex: keyword
        }
      },
      'name avatar members'
    )
  ]);
  return {
    users,
    groups: groups.map((group) => ({
      ...group.toObject(),
      members: group.members.length
    }))
  };
}
