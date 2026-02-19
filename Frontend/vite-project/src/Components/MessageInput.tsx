import {  useRef, useState, type ChangeEvent, type FormEvent } from "react"
import { useChatStore } from "../Store/useChatStore";
import { ImageIcon, SendIcon, XIcon } from "lucide-react";
import toast from "react-hot-toast";


const MessageInput = () => {
  const [text,setText] = useState<string>("");
  const [selectedImage,setSelectedImage] = useState<string | null>(null);
  const [imageFile,setImageFile] = useState<File | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const {sendMessage} = useChatStore();

  const handleSendMessage =  (e:FormEvent<HTMLFormElement>)=>
  {
    e.preventDefault();

    if(!text.trim() && !imageFile)
    {
      return;
    }

    try{
      //message image(text optional)
       if(imageFile)
       {
        const formData = new FormData();
        formData.append("image-Message",imageFile);

        if(text.trim())
        {
          formData.append("text",text.trim());
        }

        sendMessage(
          {
            formData,
            previewURL:selectedImage!
          },
          true
        );
       }
       else{
         sendMessage({text:text.trim()});
       }

       setText("");
       removeImage();
    }
    catch(error)
    {
      console.log(error);
    }
  }

  const handleImageChange = (e:ChangeEvent<HTMLInputElement>)=>{
    const files = e.currentTarget.files;

    if(!files)
    {
      return;
    }

    const file = files[0];

    if(!file)
    {
      return;
    }

    if(!file.type.startsWith("image/"))
    {
      toast.error("Only image files are allowed");
      return;
    }

    const preview = URL.createObjectURL(file);
    setImageFile(file);
    setSelectedImage(preview);
  }

  const removeImage = ()=>{
     if(selectedImage?.startsWith("blob:"))
     {
      URL.revokeObjectURL(selectedImage);
     }
     setSelectedImage(null);
     setImageFile(null);

     if(fileInputRef.current)
     {
      fileInputRef.current.value=""
     }
  }

  
  return (
    <div className="p-4 border-t border-slate-800/50">
      {selectedImage && (<div className="max-w-3xl mx-auto flex items-center mb-3 ">
        <div className="relative">
        <img src={selectedImage} alt="shared" className="h-20 w-20 object-cover border border-slate-700 rounded-lg"/>

        <button type="button" className="absolute -top-2 -right-2 flex justify-center items-center h-6 w-6 bg-slate-800 text-slate-200 hover:bg-slate-700"
        onClick={removeImage}>
          <XIcon className="w-4 h-4"/>
        </button>
        </div>
      </div>)}

      <form onSubmit={handleSendMessage} className="max-w-3xl mx-auto flex space-x-4">
       <input
       type="text"
       value={text}
       onChange={(e:ChangeEvent<HTMLInputElement>)=>setText(e.currentTarget.value)}
       placeholder="Send Message"
       className="flex-1 bg-slate-800/50 border border-slate-700/50 px-4 py-2 rounded-lg"
       />

       <input
       type="file"
       ref={fileInputRef}
       className="hidden"
       onChange={handleImageChange}
       accept="image/*"
       />

       <button type="button" onClick={()=>fileInputRef.current?.click()}
        className={`bg-slate-800/50 text-slate-400 hover:text-slate-200 px-4 rounded-lg transition-colors ${selectedImage ? "text-cyan-500":""}`}>
       <ImageIcon className="h-5 w-5"/>
       </button>

       <button className="bg-linear-to-r from-cyan-500 to-cyan-600 text-white rounded-lg px-4 py-2 font-medium hover:from-cyan-600 hover:to-cyan-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
       type="submit"
       disabled={!text.trim() && !selectedImage}>
       <SendIcon className="h-5 w-5"/>
       </button>
      </form>
    </div>
  )
}

export default MessageInput