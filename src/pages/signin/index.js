import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
// import { signIn } from "next-auth/react";


const FormSchema = z.object({
  email: z
    .string()
    .email("Invalid email format")
    .max(255, "Email length must be smaller than 255"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(100, "Password must be smaller than 100 characters"),
});


const SigninForm = ({setisLoggedIn}) => {
//   const {callbackUrl,csrfToken}=props;
  const [submitted, setsubmitted] = useState(false);
  const [showAlert, setshowAlert] = useState(false);
  const [alertText, setalertText] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [alertState, setalertState] = useState(false);

  const router=useRouter();
  const path=router.pathname;

  const handleSubmit=async(e)=>{
    e.preventDefault()
    const response=await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/api/auth/login`, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({email:email,password:password}) // body data type must match "Content-Type" header
      })
      const data=await response.json();
      console.log(data)
      if(data.response){
        localStorage.setItem('token',data.jwtData)
        router.push("/")
        if(setisLoggedIn)
        setisLoggedIn(true)
      }
  }

  return (
    <div className="isolate bg-white dark:bg-transparent px-6 pb-6 pt-24 lg:px-8">
      <div
        className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
        aria-hidden="true"
      >
        <div
          className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        ></div>
      </div>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-200 sm:text-4xl">
        Sign in to your account
        </h2>
        <p className="text-base p-2 dark:text-gray-600">
          Or
        <button onClick={()=>{
          router.push("/signup")
        }} className="text-blue-600 dark:text-blue-500 mx-2" >Create an account</button>
        </p>
      </div>

      <form
      method="post" action="#"
        className="mx-auto mt-16 max-w-xl sm:mt-16"
      >
        {/* <input type="hidden" name="csrfToken" defaultValue={csrfToken} /> */}
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          
          <div className="sm:col-span-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold leading-6 text-gray-900 dark:text-gray-400"
            >
              Email
            </label>
            <div className="mt-2.5">
              <input
                type="email"
                value={email} onChange={(e)=>{setemail(e.target.value)}}
                id="email"
                placeholder="john@gmail.com"
                className={`block w-full rounded-md border-0 px-3.5 py-2 text-gray-900  shadow-sm ring-1 ring-inset ring-gray-300  placeholder:text-gray-400  focus:ring-2  focus:ring-inset dark:bg-gray-900 dark:outline-none dark:text-gray-50 dark:placeholder:text-gray-700 dark:ring-gray-900
                
               `}
                autoComplete="off"
              />
             
            </div>
          </div>
         
          <div className="sm:col-span-2">
            <label
              htmlFor="password"
              className="block text-sm font-semibold leading-6 text-gray-900 dark:text-gray-400"
            >
              Password
            </label>
            <div className="mt-2.5">
              <input
                type="password"
                value={password} onChange={(e)=>{setpassword(e.target.value)}}

                id="password"
                placeholder="********"
                className={`block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset dark:bg-gray-900 dark:outline-none dark:text-gray-50 dark:placeholder:text-gray-700 dark:ring-gray-900 sm:text-sm sm:leading-6`}
              />
             
            </div>
          </div>
        </div>
        <div className="mt-6">
        <div className={`${showAlert && `${ alertState ? 'text-green-800 dark:text-green-400 bg-green-50':' text-red-800 dark:text-red-400 bg-red-50'} p-4 `} text-transparent ${!showAlert &&"h-0"} transition-all ease-in-out duration-300 p-0 mb-4 text-sm  rounded-lg  dark:bg-gray-800 `} role="alert">
         {alertText}
      </div>
          <button
            type="submit" onClick={(e)=>handleSubmit(e)}
            className={`block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${submitted && 'opacity-50 pointer-events-none'}`}
          >
            {submitted ?'Submitting':'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SigninForm;