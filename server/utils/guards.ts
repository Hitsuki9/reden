import { Server } from "socket.io";
import { EnhancedServer } from "./enhancer";

export function isEnhancedServer (socket: Server): socket is EnhancedServer {
  return (socket as EnhancedServer)._use !== undefined;
}
