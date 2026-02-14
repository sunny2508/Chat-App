import {create} from "zustand"
import type { AuthUser } from "../Types/authUser";
import { axiosInstance } from "../lib/axios";
import type { ApiResponse } from "../Types/api";
import type { ChatPartner } from "../Types/chatPartners";
import { getApiError } from "../utils/getApiError";
import toast from "react-hot-toast";
import type { Message } from "../Types/message";


type ActiveTab = "Chats" | "Contacts"

interface ChatStore{
    allContacts:AuthUser[];
    allChatsPartners:ChatPartner[];
    activeTab:ActiveTab;
    selectedUser:AuthUser | null;
    messages:Message[];
    isContactsLoading:boolean;
    isChatPartnersLoading:boolean;
    isMessageLoading:boolean;
    setActiveTab:(tab:ActiveTab)=>void;

    getAllContacts:()=>Promise<void>;

    getChatPartners:()=>Promise<void>;

}


export const useChatStore = create<ChatStore>((set)=>({
    allContacts:[],
    allChatsPartners:[],
    selectedUser:null,
    messages:[],
    activeTab:"Chats",
    isMessageLoading:false,
    isChatPartnersLoading:false,
    isContactsLoading:false,

    setActiveTab:(tab)=>set({activeTab:tab}),

    getAllContacts:async()=>{
        try{
           set({isContactsLoading:true});

           const response = await axiosInstance.get<ApiResponse<AuthUser[]>>("/messages/contacts");

           set({allContacts:response.data.data?? []})
        }
        catch(error:unknown)
        {
           const{message} = getApiError(error);
           console.log("Error occured in fetching contacts",message);
           toast.error(message || "Error occured in fetching contacts");
        }
        finally{
            set({isContactsLoading:false});
        }
    },

    getChatPartners:async()=>{
        try{
           set({isChatPartnersLoading:true});

           const response = await axiosInstance.get<ApiResponse<ChatPartner[]>>("/messages/chats");

           set({allChatsPartners:response.data.data?? []});
        }
        catch(error:unknown)
        {
          const {message} = getApiError(error);

          console.log("Error occured in fetching chat list",message);
          toast.error(message || "Error occured in fetching chat list");
        }
        finally{
            set({isChatPartnersLoading:false});
        }
    }

}))