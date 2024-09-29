import { useEffect, useState } from 'react'
import './App.css'
import backgroundImg from './assets/backgroundImg.jpg'
import Card from './Card';

function App() {
  const [data,setData]=useState({});//TO STORE THE DYANAMICALLY CREATED DATA BY THE API CALL
  const [location,setLocation]=useState("");
  
  useEffect(() =>{
    const searchedLocation=async() => {
      try{
        const report=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=315d1002d986f1b147d16411d70d1575`);
        if(!report.ok){
          console.error("error encountered while fetching data: ",report.statusText);
          return;
        }
        const result=await report.json();
        setData(result);
        console.log("API Response:", result);  // Log the API response
      }catch(error){
        console.error("error while fetching data: ",error)
      }
     
      };

      if(location){
      searchedLocation();
    }
  },[location])

  return (
    // OVERFLOW-HIDDEN : controls how content that exceeds the size of its container is handled
    <div className='relative min-h-screen m-0 p-0 overflow-hidden'> 
      <img className='absolute object-cover w-full h-full z-0' src={backgroundImg} alt="img" />

{/* HANDLING USER INPUTS */}
      <div className='w-full h-auto relative z-10 mt-5 flex justify-center'>
      <input className='bg-gray-300 hover:bg-gray-100 focus:bg-gray-100 outline-blue-700 text-xl w-3/4 h-16 p-3 rounded-lg'
      type="text" 
      placeholder='Enter a city'
      value={location}
      onChange={(e) => setLocation(e.target.value)}
      /> 
      </div>
      <Card data={data} location={location}/>
    </div>
  )
}

export default App;
