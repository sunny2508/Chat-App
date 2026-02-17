import { useEffect } from "react";
import { useChatStore } from "../Store/useChatStore"
import { XIcon } from "lucide-react";

const ChatHeader = () => {

    const {selectedUser,setSelectedUser} = useChatStore();

    useEffect(()=>{
        const handleEsc = (e:KeyboardEvent)=>{
            if(e.key === "Escape")
            {
                setSelectedUser(null);
            }
        }

        window.addEventListener("keydown",handleEsc);

        return()=>{
            window.removeEventListener("keydown",handleEsc);
        }
    },[selectedUser]);


  return (
    <div className="flex justify-between items-center bg-cyan-800/50
    border-b-slate-500 border-b rounded-xl max-h-21 px-6 flex-1 ">
        <div className="flex items-center gap-x-3">
            <div className="avatar">
                <div className="size-12 rounded-full">
                    <img src={selectedUser?.profilePic?.url || "/avatar.png"} alt={selectedUser?.name}/>
                </div>
            </div>

            <div>
                <h3 className="font-medium text-slate-100">{selectedUser?.name}</h3>
                <p className="text-sm text-slate-200">Online</p>
            </div>
        </div>

        <button onClick={()=>setSelectedUser(null)}>
            <XIcon className="cursor-pointer w-5 h-5 text-slate-400 hover:text-slate-200 transition-colors"/>
            </button>
    </div>
  )
}

export default ChatHeader