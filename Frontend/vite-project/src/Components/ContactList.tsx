import { useEffect } from "react";
import { useChatStore } from "../Store/useChatStore"
import UsersLoadingSkeleton from "./UsersLoadingSkeleton";

const ContactList = () => {

  const {allContacts,getAllContacts,isContactsLoading,setSelectedUser} = useChatStore();

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
       <div className="flex items-center gap-3">
        <div>
          <div className="size-12 rounded-full">
            <img src={contact.profilePic?.url || "/avatar.png"}/>
          </div>
        </div>
        <h4 className="font-medium text-slate-200">{contact.name}</h4>
       </div>
      </div>
    ))}
    </>
  )
}

export default ContactList