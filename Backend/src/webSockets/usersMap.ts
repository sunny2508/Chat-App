import type { AuthenticateWebSocket } from "./auth.js";

const onlineUsers = new Map<string,AuthenticateWebSocket>();

const addUser = (userId:string,ws:AuthenticateWebSocket)=>{
    onlineUsers.set(userId,ws);
}

const removeUser = (userId:string)=>{
    onlineUsers.delete(userId);
}

const getOnlineUsers = ():string[]=>{
    return Array.from(onlineUsers.keys());
}

const getUserWs = (userId:string):AuthenticateWebSocket | undefined =>{
    return onlineUsers.get(userId);
}

export {addUser,removeUser,getOnlineUsers,getUserWs};