import React, { ReactNode, useState } from 'react';
import Link from 'next/link';
import FilterBar from '@/components/filterBar';
import SymptomList from '@/components/symptomList';
import { useRouter } from 'next/router';




const Layout = ({ setisLoggedIn }) => {
  const [refresh,setrefresh]=useState(false)
  const router=useRouter()
  const handleLogout=()=>{
    localStorage.clear()
    setisLoggedIn(false)
    router.push("/signin")
  }

  return (
    

    <div>
   
      <div className='mt-20 '>
        <div className='absolute right-5 top-5'>
          <button onClick={()=>handleLogout()} className='mx-2 bg-red-50 text-gray-950 rounded-md p-2'>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-right" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"/>
  <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"/>
</svg>
          </button>
        </div>
        <div>
            <FilterBar setrefresh={setrefresh} refresh={refresh}/>
            <SymptomList refresh={refresh} setrefresh={setrefresh}/>
        </div>
      </div>
    </div>
  
  );
};

export default Layout;