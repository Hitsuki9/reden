import { Server } from 'socket.io';
import { EnhancedServer } from './enhancer';
import { UserDocument } from '../models/user';
import { GroupDocument } from '../models/group';

export function isEnhancedServer (socket: Server): socket is EnhancedServer {
  return (socket as EnhancedServer)._use !== undefined;
}

export function isUser (user: UserDocument | null): user is UserDocument {
  return !!user;
}

export function isGroup (group: GroupDocument | null): group is GroupDocument {
  return !!group;
}
