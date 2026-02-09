import { Routes,Route, Navigate } from "react-router-dom"
import SignupPage from "./Pages/SignupPage"
import LoginPage from "./Pages/LoginPage"
import ChatPage from "./Pages/ChatPage"
import AppBackground from "./Components/AppBackground"
import { Toaster } from "react-hot-toast"
 import { useAuthStore } from "./Store/useAuthStore"
import { useEffect } from "react"
 import PageLoader from "./Components/PageLoader"

function App(){

   const {checkAuth,isCheckingAuth,authUser} = useAuthStore();

   useEffect(()=>{
    checkAuth();
   },[checkAuth]);

   if(isCheckingAuth)
   {
     return(
      <PageLoader/>
     )
   }

  return(
    <div className="min-h-screen flex justify-center items-center relative
    overflow-hidden p-4">
      <AppBackground/>
      <Routes>
        <Route path="/" element={authUser?<ChatPage/>:<Navigate to="/login" replace/>}/>
        <Route path="/signup" element={!authUser?<SignupPage/>:<Navigate to="/" replace/>}/>
        <Route path="/login" element={!authUser?<LoginPage/>:<Navigate to="/" replace/>}/>
      </Routes>

      <Toaster/>
    </div>
  )
}

export default App;

