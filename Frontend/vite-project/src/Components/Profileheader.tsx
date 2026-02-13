import  { useEffect, useRef, useState, type ChangeEvent } from 'react'
import { useAuthStore } from '../Store/useAuthStore';
import { LogOutIcon } from 'lucide-react';


const Profileheader = () => {

  const [selectedImg,setSelectedImg] = useState<string | null>(null);

  const {authUser,logOut,uploadProfile}  = useAuthStore();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleInput = async(e:ChangeEvent<HTMLInputElement>)=>{
    const files = e.target.files;

    if(!files)
    {
      return;
    }

    const file = files[0];

    if(!file)
    {
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    setSelectedImg(previewUrl);

    const formData = new FormData();
    formData.append("profilePic",file);

    await uploadProfile(formData);
  }

  useEffect(()=>{
    return()=>{
      if(selectedImg?.startsWith("blob:"))
      {
        URL.revokeObjectURL(selectedImg);
      }
    }
  },[selectedImg]);


  return (
    <div className='p-4 border-b-2 border-b-zinc-700/50'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-x-7'>
          {/*Avatar*/}
          <div className='avatar'>
           <button className='size-14 rounded-full relative group'
           onClick={()=>fileInputRef.current?.click()}>
            <img src={selectedImg || authUser?.profilePic?.url || "/avatar.png"}
            className='size-full object-cover'/>

            <div className='absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity'>
              <span className='text-xs text-white'>Change</span>
            </div>
           </button>

           <input type='file'
           accept='image/*'
           ref={fileInputRef}
          onChange={handleInput}
          className='hidden'
           />
          </div>

          {/*Username*/}

          <div>
            <h4 className='font-medium max-w-45 text-white truncate'>{authUser?.name}</h4>
            <p className='text-white text-xs'>Online</p>
          </div>
        </div>

        {/*Logout button*/}
        <div>
          <button type='button' className='text-white hover:bg-black/50 transition-colors p-2 rounded-xl'
          onClick={logOut}>
            <LogOutIcon className='size-6'/>
          </button>
        </div>
      </div>

    </div>
  )
}

export default Profileheader