//this file is tracking online users
import type { AuthenticateWebSocket } from "./auth.js";


const onlineUsers = new Map<string,AuthenticateWebSocket>();

