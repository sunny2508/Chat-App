import { useEffect } from "react";
import { useChatStore } from "../Store/useChatStore"
import UsersLoadingSkeleton from "./UsersLoadingSkeleton";
import { useAuthStore } from "../Store/useAuthStore";

const ContactList = () => {

  const {allContacts,getAllContacts,isContactsLoading,setSelectedUser} = useChatStore();

  const {onlineUsers} = useAuthStore();


  useEffect(()=>{
    getAllContacts();
  },[getAllContacts]);

  if(isContactsLoading)
  {
    return(
      <UsersLoadingSkeleton/>
    )
  }
  return (
    <>
    {allContacts.map((contact)=>(
      <div key={contact._id}
      onClick={()=>setSelectedUser(contact)}
      className="bg-cyan-400/10 p-4 cursor-pointer rounded-lg
      hover:bg-cyan-500/20 transition-colors">
        {/*Todo:Work with websocket*/}
       <div className="flex items-center gap-3">
        <div className="relative">
        <div className="avatar">
          <div className="size-12 rounded-full">
            <img src={contact.profilePic?.url || "/avatar.png"}/>
          </div>
        </div>
        {/*Online users or not */}
        <span className={`absolute right-0 bottom-0 size-3 rounded-full ring-0 ring-base-100 ${onlineUsers.includes(contact._id)?"bg-green-500":"bg-gray-500"}`}></span>
        </div>
        <h4 className="font-medium text-slate-200">{contact.name}</h4>
       </div>
      </div>
    ))}
    </>
  )
}

export default ContactList