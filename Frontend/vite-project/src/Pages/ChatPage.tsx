//import { useAuthStore } from "../Store/useAuthStore"

import ActiveTabSwitch from "../Components/ActiveTabSwitch"
import ChatContainer from "../Components/ChatContainer";
import ChatList from "../Components/ChatList";
import ContactList from "../Components/ContactList";
import NoConversationContainer from "../Components/NoConversationContainer";
import Profileheader from "../Components/Profileheader"
import { useChatStore } from "../Store/useChatStore"




const ChatPage = () => {

  //const {logOut,authUser} = useAuthStore();
  const {activeTab,selectedUser} = useChatStore();
  
  return (
    <div className="relative w-full max-w-6xl h-200">
      <div className="flex h-200 rounded-2xl">
      {/*Left side*/}
      <div className="w-80 bg-zinc-800 backdrop-blur-sm flex flex-col rounded-l-xl">
       <Profileheader/>
       <ActiveTabSwitch/>

      <div className="flex-1 overflow-y-auto p-4 space-y-2">
       {activeTab === "Chats"?<ChatList/>:<ContactList/>}
       </div>
      </div>

      {/*Right side*/}
      <div className="flex-1 flex flex-col bg-zinc-900/50 backdrop-blur-sm rounded-xl">
      <h1 className="text-5xl">Hello This is Message Section</h1>
      {selectedUser? <ChatContainer/>:<NoConversationContainer/>}
      </div>
      </div>
    </div>
  )
}

export default ChatPage