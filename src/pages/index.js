
// import { getSession, useSession,signIn,signOut } from "next-auth/react";
import { useState,useEffect } from "react";
import Layout from "./layout";
import {useRouter} from "next/router";
import SigninForm from "./signin";
export default function Home() {
const router=useRouter()

const [isLoggedIn, setisLoggedIn] = useState(false);

  useEffect(() => {
   const token=localStorage.getItem('token')
   if(token)
   setisLoggedIn(true)
  else{
    router.push("/signin")
  }
  }, []);
  return (
  <>
  {isLoggedIn &&
  <Layout setisLoggedIn={setisLoggedIn}/>
    
    }
  </>
  );
}

