import type { AuthUser } from "./authUser";

export interface ChatPartner{
    lastMessageAt:string;
    singleUser:AuthUser;
}