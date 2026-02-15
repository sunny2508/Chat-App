import { useEffect } from "react";
import { useChatStore } from "../Store/useChatStore"
import NoChatsFound from "./NoChatsFound";
import UsersLoadingSkeleton from "./UsersLoadingSkeleton";

const ChatList = () => {

  const {allChatsPartners,isChatPartnersLoading,getChatPartners,setSelectedUser} = useChatStore();

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
       <div className="flex items-center gap-3 ">
        <div>
          <div className="size-12 rounded-full">
            <img src={chatPatner.singleUser.profilePic?.url || "/avatar.png"}/>
          </div>
        </div>
        <h4 className="text-slate-200 font-medium">{chatPatner.singleUser.name}</h4>
       </div>
      </div>
   ))}
    </>
  )
}

export default ChatList