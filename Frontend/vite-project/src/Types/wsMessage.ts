import type { Message } from "./message";

export type wsMessage = {type:"getOnlineUsers",data:string[]} | {type:"getNewMessage",data:Message};