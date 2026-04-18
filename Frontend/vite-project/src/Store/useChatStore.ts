import {create} from "zustand"
import type { AuthUser } from "../Types/authUser";
import { axiosInstance } from "../lib/axios";
import type { ApiResponse } from "../Types/api";
import type { ChatPartner } from "../Types/chatPartners";
import { getApiError } from "../utils/getApiError";
import toast from "react-hot-toast";
import type { Message } from "../Types/message";
import { useAuthStore } from "./useAuthStore";
import type { zodMessageInputs } from "shared";
import type { ImagePayload } from "../Types/ImagePayload";




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
    setSelectedUser:(user:AuthUser | null)=>void;

    getAllContacts:()=>Promise<void>;

    getChatPartners:()=>Promise<void>;

    getMessageById:(_id:string)=>Promise<void>;

    sendMessage:{
        (data:zodMessageInputs):Promise<void>;
        (data:ImagePayload,isMultiPart:true):Promise<void>;
    };

    handleIncomingMessage:(newMessage:Message)=>void;

}


export const useChatStore = create<ChatStore>((set,get)=>({
    allContacts:[],
    allChatsPartners:[],
    selectedUser:null,
    messages:[],
    activeTab:"Chats",
    isMessageLoading:false,
    isChatPartnersLoading:false,
    isContactsLoading:false,

    setActiveTab:(tab)=>set({activeTab:tab}),
    setSelectedUser:(user)=>set({selectedUser:user}),

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
    },

    getMessageById:async(id)=>{
        try{
           set({isMessageLoading:true});

           const response = await axiosInstance.get<ApiResponse<Message[]>>(`messages/${id}`);

           set({messages:response.data.data});
           toast.success(response.data.message || "Messages fetched successfully");
        }
        catch(error:unknown)
        {
            const {message} = getApiError(error);

            console.log("Error in fetching messages",message);

            toast.error(message || "Error in fetching messages");
        }
        finally{
            set({isMessageLoading:false});
        }
    },

    sendMessage:async (messageData:zodMessageInputs | ImagePayload,isMultiPart?:true)=>{
        const {selectedUser} = get();
        const {authUser} = useAuthStore.getState();

        if(!selectedUser || !authUser)
        {
            return;
        }

        const tempId = Date.now().toString();

        const isImage = isMultiPart === true;

        const optimisticMessage:Message = {
            _id:tempId,
            senderId:authUser._id,
            receiverId:selectedUser._id,
            text:!isImage? (messageData as zodMessageInputs).text:undefined,
            image:isImage ?(messageData as ImagePayload).previewURL:undefined,
            createdAt:new Date().toISOString(),
            updatedAt:new Date().toISOString(),
        }

        set((state)=>({
            messages:[...state.messages,optimisticMessage]
        }));
        try{
           const body = isImage ? (messageData as ImagePayload).formData : messageData;

          const config = isImage ? {headers:{"Content-Type":"multipart/form-data"}}:undefined

          const response = await axiosInstance.post<ApiResponse<Message>>(`/messages/send/${selectedUser._id}`,body,config);

          const realMessage = response.data.data;
          if(!realMessage)
          {
            return;
          }

          set((state)=>(
            {messages:state.messages.map((msg)=>
            msg._id === tempId ? realMessage:msg)}
          ));
        }
        catch(error:unknown)
        {

            set((state)=>(
                {messages:state.messages.filter((msg)=>
                msg._id !== tempId)}
            ));

            const {message} = getApiError(error);

            console.log("Error occured",message);

            toast.error(message || "Failed to send message");
        }
    },

    handleIncomingMessage:(newMessage)=>{

        const {selectedUser} = get();

        if(!selectedUser || newMessage.senderId !== selectedUser._id)
        {
            return;
        }
        set({messages:[...get().messages,newMessage]});
    },
}))