import { useChatStore } from "../Store/useChatStore"


const ActiveTabSwitch = () => {

  const{activeTab,setActiveTab} = useChatStore();

  return (
    <div className="tabs tabs-box bg-transparent flex justify-between m-2 p-2">
      <button type="button" onClick={()=>setActiveTab("Chats")}
        className={`tab cursor-pointer ${activeTab === "Chats"?"bg-cyan-400 text-black":"bg-zinc-600"}`}>Chats</button>
      <button type="button" onClick={()=>setActiveTab("Contacts")}
        className={`tab cursor-pointer ${activeTab === "Contacts"? "bg-cyan-400 text-black":"bg-zinc-600"}`}>Contacts</button>
    </div>
  )
}

export default ActiveTabSwitch