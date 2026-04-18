import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import type { AuthUser } from "../Types/authUser";
import type { ApiResponse } from "../Types/api";
import { getApiError } from "../utils/getApiError";
import type {signUpInputs,loginInputs, updateInputs} from "shared"
import toast from "react-hot-toast";
import type { wsMessage } from "../Types/wsMessage";
import { useChatStore } from "./useChatStore";

const BASE_URL = "ws://localhost:3000";

interface AuthStore{
    authUser:AuthUser | null;
    isCheckingAuth:boolean;
    checkAuth:()=>Promise<void>;

    fieldErrors:Record<string,string> | null;
    clearFieldErrors:()=>void;

     isSigningUp:boolean;
     signup:(data:signUpInputs)=>Promise<void>;

     isLoggingIn:boolean;
     login:(data:loginInputs)=>Promise<void>;

     logOut:()=>Promise<void>;
     updateProfile:(data:updateInputs)=>Promise<void>;
     isUpdatingProfile:boolean;

     uploadProfile:(data:FormData)=>Promise<void>
     isUploadingProfile:boolean;

     socket:WebSocket | null;
     onlineUsers:string[];

     connectSocket:()=>void;
     dissConnectSocket:()=>void;
     
};

export const useAuthStore = create<AuthStore>((set,get)=>({
    authUser:null,
    isCheckingAuth:false,
    isSigningUp:false,
    fieldErrors:null,
    isLoggingIn:false,
    isUpdatingProfile:false,
    isUploadingProfile:false,

    socket:null,
    onlineUsers:[],

    clearFieldErrors:()=>set({fieldErrors:null}),

    
    checkAuth:async()=>{
        try{
          set({isCheckingAuth:true});
          const response = await axiosInstance.get<ApiResponse<AuthUser>>("/users/checkauth");
          
          set({authUser:response.data.data?? null});
          get().connectSocket();
        }
        catch(error:unknown)
        {
            const {message} = getApiError(error)
          console.log("Auth check failed",message);
          set({authUser:null})
        }
        finally{
            set({isCheckingAuth:false});
        }
    },

    signup:async(data:signUpInputs)=>{
        try{
          set({isSigningUp:true});

          const response = await axiosInstance.post<ApiResponse<AuthUser>>("/users/signup",data);

          toast.success(response.data.message || "Signup Successfull");
        }
        catch(error:unknown)
        {
           const {message,fieldErrors} = getApiError(error);
           console.log("Signup error occured",message);
           console.log(fieldErrors);

           if(fieldErrors)
           {
            set({fieldErrors})
           }
           if(message)
           {
            toast.error(message);
           }
        }
        finally{
            set({isSigningUp:false});
        }
    },

    login:async(data:loginInputs)=>{
        try{
            set({isLoggingIn:true});

            const response = await axiosInstance.post<ApiResponse<AuthUser>>("/users/login",data);

            set({authUser:response.data.data});
            toast.success(response.data.message || "Login successfull");
            get().connectSocket();
        }
        catch(error:unknown)
        {
            const {message,fieldErrors} = getApiError(error);
            console.log("Login error occured",message);

            if(fieldErrors)
            {
                set({fieldErrors});
            }

            if(message)
            {
                toast.error(message);
            }
        }
        finally{
            set({isLoggingIn:false});
        }
    },

    logOut:async()=>{
        try{
           const response = await axiosInstance.post<ApiResponse<AuthUser>>("/users/logout");

           set({authUser:null});
           toast.success(response.data.message || "Logged out successfully");
           get().dissConnectSocket();
        }
        catch(error:unknown)
        {
            const{message} = getApiError(error);
            console.log("Logout error occured",message);
            toast.error(message || "Error occured in logout");
        }
    },

    updateProfile:async(data:updateInputs)=>{
        try{
            set({isUpdatingProfile:true});

            const response = await axiosInstance.post<ApiResponse<AuthUser>>("/users/updateinfo",data);

            set({authUser:response.data.data});
            toast.success(response.data.message || "Profile updated successfully");
        }
        catch(error:unknown)
        {
            const{message} = getApiError(error);

            console.log("Error occured in update",message);
            toast.error(message || "Error occured in updating profile")
        }
        finally{
            set({isUpdatingProfile:false})
        }
    },

    uploadProfile:async(formData)=>{
        try{
           set({isUploadingProfile:true});

           const response = await axiosInstance.post<ApiResponse<AuthUser>>("/users/upload-profile",formData,{
            headers:{
                "Content-Type":"multipart/form-data"
            }
           })

           set({authUser:response.data.data});

           toast.success(response.data.message || "Profile Pic uploaded successfully");
        }
        catch(error:unknown)
        {
            const {message} = getApiError(error);

            console.log("Error occured in uploading profile",message);

            toast.error(message || "Cannot upload profile,try again");
        }
        finally{
            set({isUploadingProfile:false});
        }
    },

    connectSocket:()=>{
        const authUser = get().authUser;

        if(!authUser || get().socket?.readyState === WebSocket.OPEN)
        {
            return;
        }

        //making webSocket instance
        const socket = new WebSocket(BASE_URL);

        socket.onopen = ()=>{
            console.log("WebSocket connected");
            set({socket});
        };

        socket.onmessage = (event:MessageEvent<string>)=>{
            console.log("=== ON Message fired ===");
            console.log("Raw event data:",event.data);
            const data = JSON.parse(event.data) as wsMessage;
            console.log("Parsed data:",data);

            if(data.type === "getOnlineUsers")
            {
                set({onlineUsers:data.data});
            }

            if(data.type === "newMessage")
            {
                console.log("new Message type detected");
                useChatStore.getState().handleIncomingMessage(data.data);
            }
        };

        socket.onclose = ()=>{
            console.log("WebSocket disconnected");
            set({socket:null});
        };

        socket.onerror = (error)=>{
            console.log("WebSocket error",error);
            toast.error("Connection error,Please refresh the page");
        };
    },

    dissConnectSocket:()=>{
        const socket = get().socket;

        if(socket?.readyState === WebSocket.OPEN)
        {
            socket.close();
            set({socket:null});
        };
    },

}))
