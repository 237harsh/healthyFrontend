import React,{useState} from 'react'
import SymptomForm from './symptomForm'
const FilterBar = ({refresh,setrefresh}) => {
    const [showModal, setshowModal] = useState(false)
  return (
    <div className="w-full  ">

        
<form className='flex justify-center flex-wrap w-full'>   
    <label for="search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
    <div className="relative" >
        <div className="absolute inset-y-0 pl-2 flex items-center pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </div>
        <input type="search" id="search" className="block w-full max-w-lg px-4 py-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required />
    
    </div>

<div className="px-2">
<input type="search" id="search" className="block max-w-sm w-full  px-2 py-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Code" required />
</div>

    <div className="px-2">
    <button type="button" onClick={()=>{setshowModal(true)}} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300  rounded-lg text-sm px-8 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add Symptom</button>
    </div>
<div className="hidden">
    <button type='submit' className='hidden'></button>
</div>
</form>

<SymptomForm showModal={showModal} setshowModal={setshowModal} refresh={refresh} setrefresh={setrefresh}/>
    </div>
  )
}

export default FilterBar