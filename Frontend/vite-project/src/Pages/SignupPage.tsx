import { Link, useNavigate } from "react-router-dom"
import { Eye,EyeOff, LoaderIcon } from "lucide-react"
import { useState, type ChangeEvent, type FormEvent, } from "react"
import type  {  signUpInputs } from "shared";
import { useAuthStore } from "../Store/useAuthStore";

 function SignupPage() {

  const [showPassword,setShowPassword] = useState<boolean>(false);
  const [inputs,setInputs] = useState<signUpInputs>({
    name:"",
    email:"",
    password:""
  });

  const {signup,isSigningUp,fieldErrors,clearFieldErrors} = useAuthStore();

  const navigate = useNavigate();

  const handleInputs = (e:ChangeEvent<HTMLInputElement>)=>{
    const {name,value} = e.currentTarget;

    setInputs((prev)=>({
      ...prev,[name]:value
    }));

    clearFieldErrors();
  };

  const handleSignUP = (e:FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    signup(inputs);
    navigate("/login")
  }

  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8
      bg-zinc-800/70 backdrop-blur-xl
border border-white/10
rounded-xl
w-105">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">Create Your Account</h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSignUP} className="space-y-6">
            <div>
              <div className="flex space-x-1">
                <label htmlFor="name" className="block text-sm/6 font-medium text-gray-100">Name</label>
                <span className="text-red-500">*</span>
              </div>
              <div className="mt-2">
                <input
                id="name"
                type="text"
                name="name"
                value={inputs.name}
                onChange={handleInputs}
                autoComplete="name"
                required
                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
                {fieldErrors?.name && <p className="text-sm text-red-500">{fieldErrors.name}</p>}
              </div>
            </div>
            <div>
              <div className="flex space-x-1">
              <label htmlFor="email" className="block text-sm/6 font-medium text-gray-100">
                Email address
              </label>
              <span className="text-red-500">*</span>
              </div>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={inputs.email}
                  onChange={handleInputs}
                  required
                  autoComplete="email"
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
                {fieldErrors?.email &&<p className="text-sm text-red-500">{fieldErrors.email}</p>}
              </div>
            </div>

            <div>
              <div className="flex space-x-1">
                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-100">
                  Password
                </label>
                <span className="text-red-500">*</span>
              </div>
              <div className="mt-2 relative">
                <div>
                <input
                  id="password"
                  name="password"
                  type={showPassword?"text":"password"}
                  value={inputs.password}
                  onChange={handleInputs}
                  required
                  autoComplete="new-password"
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
                <button type="button" className="absolute inset-y-0 right-2 flex items-center
                "onClick={()=>setShowPassword((prev)=>!prev)}>{showPassword?<Eye/>:<EyeOff/>}</button>
                </div>
              </div>
              {fieldErrors?.password && <p className="text-sm text-red-500">{fieldErrors.password}</p>}
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                disabled={isSigningUp}
              >
                {isSigningUp?(<LoaderIcon className="size-5 animate-spin"/>):("Register")}
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-400">
            Already Registered?{' '}
            <Link to="/login" className="text-blue-400">Login</Link>
          </p>
        </div>
      </div>
    </>
  )
}


export default SignupPage