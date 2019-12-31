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
      friends: [],
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
    users: users.map((user) => ({
      id: user._id,
      username: user.username,
      avatar: user.avatar
    })),
    groups: groups.map((group) => ({
      id: group._id,
      name: group.name,
      avatar: group.avatar,
      members: group.members.length
    }))
  };
}
