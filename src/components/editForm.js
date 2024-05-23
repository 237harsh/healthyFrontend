import React, { useState,useEffect } from "react";
import { Selector } from "./symptomSelector";
import DateSelector from "./dateselector";

const EditForm = ({ showModal, setshowModal,refresh,setrefresh,name,Note }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [notes, setnotes] = useState(Note);
  useEffect(() => {
    setSelectedDate(new Date)
 console.log(process.env.NEXT_PUBLIC_BACKEND)
  }, [])
  useEffect(() => {
   setnotes(Note)
  }, [Note])
  
    const handleSubmit=async(e)=>{
      e.preventDefault();
        if(!name || !selectedDate){
            return;
        }
       
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/api/data/editsm`, {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                headers: {
                  'Content-Type': 'application/json',
                  'auth-token':localStorage.getItem('token')

                  // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify({symptom:name,notes:notes,date:selectedDate}) // body data type must match "Content-Type" header
              });
              const result=await response.json()
              console.log(result)
              if(result.response){
                setshowModal(false)
              }
        } catch (error) {
            console.log(error)
        }

        setrefresh(!refresh)
    }

  return (
    <div className="">
      <div
        id="authentication-modal"
        tabIndex="-1"
        aria-hidden="true"
        className={`${
          !showModal && "hidden"
        } overflow-y-auto overflow-x-hidden fixed flex z-50 justify-center items-center w-full md:inset-0 h-[calc(100%)] max-h-full bg-black/50`}
      >
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Edit Symptom
              </h3>
              <button
                onClick={() => {
                  setshowModal(false);
                }}
                type="button"
                className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="authentication-modal"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>

            <div className="p-4 md:p-5">
              <form className="space-y-4" action="#">
                <div>
                  <label
                    for="selector"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Symptom
                  </label>
                  <input
                    type="text"
                    id="selector"
                    disabled={true}
                    value={name}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 opacity-90"
                  />
                </div>
                <div>
                  <label
                    for="datepicker"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your DatePicker
                  </label>

                  <DateSelector setSelectedDate={setSelectedDate} />
                </div>
                <div>
                  <label
                    for="Notes"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Any Note
                  </label>
                  <input
                    type="text"
                    id="Notes"
                    onChange={(e) => {
                      setnotes(e.target.value);
                    }}
                    value={notes}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>

                <button
                onClick={(e)=>{handleSubmit(e)}}
                  type="submit"
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditForm;
