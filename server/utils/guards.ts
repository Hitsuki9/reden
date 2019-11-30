import { Server } from 'socket.io';
import { EnhancedServer } from './enhancer';
import { UserDocument } from '../models/user';

export function isEnhancedServer (socket: Server): socket is EnhancedServer {
  return (socket as EnhancedServer)._use !== undefined;
}

export function isUser (user: UserDocument | null): user is UserDocument {
  return !!user;
}
