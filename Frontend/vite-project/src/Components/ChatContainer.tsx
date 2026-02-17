import ChatHeader from "./ChatHeader"
import { useChatStore } from "../Store/useChatStore"
import { useEffect } from "react";
import NoChatHistoryPlaceHolder from "./NoChatHistoryPlaceHolder";
import  { useAuthStore } from "../Store/useAuthStore";
import MessagesLoadingSkeleton from "./MessagesLoadingSkeleton";
import MessageInput from "./MessageInput";


const ChatContainer = () => {

  const {selectedUser,getMessageById,isMessageLoading,messages} = useChatStore();

  const {authUser} = useAuthStore();

  useEffect(()=>{
    if(!selectedUser)
    {
      return;
    }

    getMessageById(selectedUser._id);
  },[selectedUser,getMessageById]);
  
  return (
    <>
    <ChatHeader/>
    <div className="flex-1 overflow-y-auto px-6 py-8">
    {messages.length > 0 && !isMessageLoading ? 
    (<div className="max-w-3xl mx-auto space-y-6">
      {messages.map((msg)=>(
        <div key={msg._id}
        className={`chat ${msg.senderId === authUser?._id ? "chat-end":"chat-start"}`}>
         <div className={`chat-bubble relative ${msg.senderId === authUser?._id ? "bg-cyan-600 text-white":"bg-slate-800 text-slate-200"}`}>
         {msg.image &&
         <img src={msg.image} alt="shared" className="object-cover h-48 rounded-lg"/>}

         {msg.text && <p className="mt-2">{msg.text}</p>}
         <p className="text-end text-xs ">{new Date(msg.createdAt).toISOString().slice(11,16)}</p>
         </div>
        </div>
      ))}
    </div>):isMessageLoading ? (<MessagesLoadingSkeleton/>):(<NoChatHistoryPlaceHolder name={selectedUser?.name || "User"}/>)}
    </div>
    <MessageInput/>
    </>
  )
}

export default ChatContainer