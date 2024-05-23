import React, { useEffect, useState } from 'react'
import EditForm from './editForm'

const SymptomList = ({refresh,setrefresh}) => {
    const [showEditModal, setshowEditModal] = useState(false)
    const [symptomName, setsymptomName] = useState("")
    const [symptomNote, setsymptomNote] = useState("")
    const [page, setpage] = useState(1)
    const [totalPage, settotalPage] = useState(1)
    const [limit, setlimit] = useState(7)
    const [list,setlist]=useState([])
    useEffect(() => {
        console.log(localStorage.getItem('token'))
    const getData=async()=>{
        const res=await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/api/data/allsm?page=${page}&limit=${limit}`,{

            method:'get',
            headers:{
                'Content-Type':'application/json',
                'auth-token':localStorage.getItem('token')
            },
        })
        const data=await res.json();
        const newSymptoms=data?.symptoms
        if(data?.totalPages){settotalPage(data.totalPages)}
        if(newSymptoms){
            setlist(newSymptoms)
        }
        console.log(data)
    } 
    getData()
    }, [refresh,page])
    

    const handleDelete=async(symptom)=>{
        
        if(!symptom)
        return;
          try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/api/data/deletesm`, {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                headers: {
                  'Content-Type': 'application/json',
                  'auth-token':localStorage.getItem('token')

                  // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify({symptom:symptom}) // body data type must match "Content-Type" header
              });
              const result=await response.json()
              console.log(result)
        } catch (error) {
            console.log(error)
        }
        setrefresh(!refresh)
    }
    const handleEdit=async(symptom,note)=>{
       
        if(!symptom)
        return;
          setsymptomName(symptom);
          setsymptomNote(note);
          setshowEditModal(true)
       
    }
  return (
    <div className='mt-12 p-8 w-full flex justify-center'>


<div className="relative overflow-x-auto w-full max-w-3xl">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                   S.No.
                </th>
                <th scope="col" className="px-6 py-3">
                    Symptom 
                </th>
                <th scope="col" className="px-6 py-3">
                    Code
                </th>
                <th scope="col" className="px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>
        <tbody>

            {/* <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Apple MacBook Pro 17"
                </th>
                <td className="px-6 py-4">
                    Silver
                </td>
                <td className="px-6 py-4">
                    Laptop
                </td>
                <td className="px-6 py-4">
                    $2999
                </td>
            </tr> */}
           {list?.map((l,index)=>{
            return <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
               {index+1}
            </th>
            <td className="px-6 py-4">
                {l.name}
            </td>
            <td className="px-6 py-4">
                {l.description}
            </td>
            <td className="px-6 py-4">
                <button className='mx-2 bg-gray-200 rounded-md p-1' onClick={()=>{handleEdit(l.name,l.description)}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pen" viewBox="0 0 16 16">
  <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z"/>
</svg>
                </button>
                <button className='mx-2 bg-gray-200 rounded-md p-1' onClick={()=>{handleDelete(l.name)}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
</svg>
                </button>
            </td>
        </tr>
           })}
        </tbody>
    </table>

<div className='w-full mt-8 justify-center'>

    <div className="w-full justify-center flex">

  <button onClick={()=>{if(page>1) setpage(page-1)}} className={`${page<=1 && "disabled"} flex items-center justify-center px-3 h-8 me-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}>
    <svg className="w-3.5 h-3.5 me-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5H1m0 0 4 4M1 5l4-4"/>
    </svg>
    Previous
  </button>
  <button onClick={()=>{if(page<totalPage)setpage(page+1)}} className={`${page>=totalPage && "disabled"} flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}>
    Next
    <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
    </svg>
  </button>
</div>
</div>
</div>
    <EditForm showModal={showEditModal} setshowModal={setshowEditModal} refresh={refresh} setrefresh={setrefresh} name={symptomName} Note={symptomNote}/>
    </div>
  )
}

export default SymptomList