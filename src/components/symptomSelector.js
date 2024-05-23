import React, { useEffect, useState } from 'react';
import Select from 'react-select';

const options = [
  { value: 'Acidity', label: 'Acidity' },
  { value: 'Cold', label: 'Cold' },
  { value: 'Fever', label: 'Fever' },
  { value: 'Headache', label: 'Headache' },
  { value: 'Cough', label: 'Cough' },
  { value: 'Stomachache', label: 'Stomachache' },
  { value: 'Back Pain', label: 'Back Pain' },
  { value: 'Allergy', label: 'Allergy' },
  { value: 'Flu', label: 'Flu' },
  { value: 'Sore Throat', label: 'Sore Throat' },
  { value: 'Constipation', label: 'Constipation' },
  { value: 'Diarrhea', label: 'Diarrhea' },
  { value: 'Nausea', label: 'Nausea' },
  { value: 'Vomiting', label: 'Vomiting' },
  { value: 'Fatigue', label: 'Fatigue' },
  { value: 'Dizziness', label: 'Dizziness' },
  { value: 'Insomnia', label: 'Insomnia' },
  { value: 'Muscle Pain', label: 'Muscle Pain' },
  { value: 'Joint Pain', label: 'Joint Pain' },
  { value: 'Rash', label: 'Rash' },
  { value: 'Itching', label: 'Itching' },
  { value: 'Anxiety', label: 'Anxiety' },
  { value: 'Depression', label: 'Depression' },
  { value: 'High Blood Pressure', label: 'High Blood Pressure' },
  { value: 'Low Blood Pressure', label: 'Low Blood Pressure' },
  { value: 'Heartburn', label: 'Heartburn' },
  { value: 'Indigestion', label: 'Indigestion' },
  { value: 'Chills', label: 'Chills' },
];

export const Selector = ({selectedOptions,setSelectedOptions,setSelectedSymptoms,refresh,setrefresh}) => {
  // let filteredOptions = options
  const [list,setlist]=useState([])
  const [filteredOptions,setfilteredOptions]=useState(options)
  useEffect(() => {
  const getData=async()=>{
      const res=await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/api/data/allsm?page=1&limit=7`,{

          method:'get',
          headers:{
              'Content-Type':'application/json',
              'auth-token':localStorage.getItem('token')
          },
      })
      const data=await res.json();
      const newSymptomsArray=data?.entries?.symptoms
      const newSymptoms=newSymptomsArray?.map((nm)=>{return nm.name})
       
      if(newSymptoms){
        console.log(newSymptoms)
          setlist(newSymptoms)

      }
      
  } 
  getData()
  
  }, [refresh])

  useEffect(() => {
     let tempOptions = options.filter(option => !list.includes(option.value));
     setfilteredOptions(tempOptions)
console.log(filteredOptions)
  }, [list])
  

  const handleChange = (selected) => {

   const values = selected ? selected?.map(option => option.value) : [];
   setSelectedSymptoms(values);
   setSelectedOptions(selected);
  };

  return (
    <Select 
      isMulti={true} 
      options={filteredOptions} 
      value={selectedOptions} 
      onChange={handleChange} 
    />
  );
};
