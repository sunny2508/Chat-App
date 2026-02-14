import { useEffect } from "react";
import { useChatStore } from "../Store/useChatStore"
import NoChatsFound from "./NoChatsFound";
import UsersLoadingSkeleton from "./UsersLoadingSkeleton";

const ChatList = () => {

  const {allChatsPartners,isChatPartnersLoading,getChatPartners} = useChatStore();

  if(isChatPartnersLoading)
  {
    return <UsersLoadingSkeleton/>
  }

  if(allChatsPartners.length === 0)
  {
    return <NoChatsFound/>
  }

  useEffect(()=>{
    getChatPartners();
  },[getChatPartners]);

  return (
    <>
    </>
  )
}

export default ChatList