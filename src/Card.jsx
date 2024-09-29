import React, { useCallback, useEffect, useState } from 'react';

function Card({data,location}) {
  const [icon_code,setIcon_code]=useState("");

  useEffect(() =>{
   if( data && data.weather && data.weather[0] && data.weather[0].icon){
    setIcon_code(data.weather[0].icon) ;
  }
  <p>Loading...</p>;
},[location]);

  const timeZone=useCallback(()=>{
    if(data&&data.dt){
    const unixTime=data.dt;
    const millTime=new Date(unixTime*1000);
    const formattedTime=millTime.toLocaleString();
    return formattedTime;
  }
  <p>Loading...</p>;
  },[data])
  
  const sunRiseTime=useCallback(() => {
    if(data && data.sys && data.sys.sunrise){
    const unixTime=data.sys.sunrise;
    const millTime=new Date(unixTime*1000);
    const formattedTime=millTime.toLocaleTimeString();
    return formattedTime;
  }
  <p>Loading...</p>;
  },[data])

  const sunSetTime=useCallback(() => {
    if(data && data.sys && data.sys.sunrise){
    const unixTime=data.sys.sunset;
    const millTime=new Date(unixTime*1000);
    const formattedTime=millTime.toLocaleTimeString();
    return formattedTime;
  }
  <p>Loading...</p>;
  },[data])
  
  const countryRendereing=() =>{
    if(data&&data.sys&&data.sys.country){
      <p>data.sys.country</p>
    }
    <p>Loading...</p>;
  }

  const descriptionRendering=() =>{
    if(data && data.weather && data.weather[0] && data.weather[0].description){
    <p>data.weather[0].description</p> 
  }
  <p>Loading...</p>;
  }
  return (
    <div className="bg-white bg-opacity-80 shadow-lg rounded-lg p-6 w-80 relative z-10 mt-8 mx-auto">
      <h2 className="text-xl font-bold text-center">{location},{countryRendereing()}</h2>
      <p className="text-center text-gray-600">{timeZone()}</p>
      
      <div className="flex justify-between mt-4">
        <div>
          <p className="text-lg font-semibold">Sunrise: {sunRiseTime()}</p>
          <p className="text-lg font-semibold">Sunset: {sunSetTime()}</p>
        </div>
        <div className="flex flex-col items-center">
          
          {icon_code ? (
          <img 
          src={`http://openweathermap.org/img/wn/${icon_code}@2x.png`}
          // Example icon URL
          alt="Sunny"
          className="w-16 h-16" 
        />)
      :(
        <p>Loading ... </p>
        )
        }
          
          <p className="text-lg font-semibold">{descriptionRendering()}</p>
        </div>
      </div>
      
      {data&&data.main ? (
      <div className="mt-4">
        {data.main.temp ? (<p className="text-lg font-semibold">Temperature: {data.main.temp - 273.15}℃</p>) :(<p>Loading...</p>) }
          
          {data.main.feels_like ? (<p className="text-lg font-semibold">Feels Like: {data.main.feels_like - 273.15}℃</p>):(<p>Loading...</p>)}
          {data.main.humidity ? (<p className="text-lg font-semibold">Humidity: {data.main.humidity}%</p>) : (<p>Loading...</p>)}
          {data.visibility ? (<p className="text-lg font-semibold">Visibility: {data.visibility}</p>) : (<p>Loading...</p>)}
          {data.wind && data.wind.speed ? (<p className="text-lg font-semibold">Wind Speed: {data.wind.speed}m/s</p>) : (<p>Loading...</p>)}
          {data.clouds && data.clouds.all ? (<p className="text-lg font-semibold">Cloudiness: {data.clouds.all}%</p>):(<p>Loading...</p>)}
      </div>
      ) : (
    <p>Loading ...</p>
    )
    }
      </div>
  )
}

export default Card;
