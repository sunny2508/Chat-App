import { useEffect } from "react";
import { useChatStore } from "../Store/useChatStore"
import NoChatsFound from "./NoChatsFound";
import UsersLoadingSkeleton from "./UsersLoadingSkeleton";
import { useAuthStore } from "../Store/useAuthStore";


const ChatList = () => {

  const {allChatsPartners,isChatPartnersLoading,getChatPartners,setSelectedUser} = useChatStore();

  const {onlineUsers} = useAuthStore();

  useEffect(()=>{
    getChatPartners();
  },[getChatPartners]);

  if(isChatPartnersLoading)
  {
    return <UsersLoadingSkeleton/>
  }

  if(allChatsPartners.length === 0)
  {
    return <NoChatsFound/>
  }

  

  return (
    <>
    {allChatsPartners.map((chatPatner)=>(
      <div key={chatPatner.singleUser._id}
      onClick={()=>setSelectedUser(chatPatner.singleUser)}
      className="bg-cyan-400/10 p-4 cursor-pointer rounded-lg
      hover:bg-cyan-500/20 transition-colors">
        {/*Todo:Make it work with WebSocket*/}
       <div className="flex items-center gap-3 ">
        <div className="relative">
        <div className="avatar">
          <div className="size-12 rounded-full">
            <img src={chatPatner.singleUser.profilePic?.url || "/avatar.png"}/>
          </div>
        </div>

        {/*Online users or not */}
        <span className={`absolute bottom-0 right-0 size-3 rounded-full ring-0 ring-base-100 ${onlineUsers.includes(chatPatner.singleUser._id)?"bg-green-500":"bg-gray-500"}`}></span>
        </div>
        <h4 className="text-slate-200 font-medium">{chatPatner.singleUser.name}</h4>
       </div>
      </div>
   ))}
    </>
  )
}

export default ChatList