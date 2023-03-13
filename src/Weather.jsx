import axios from 'axios';
import React, { useState } from 'react';

function Weather() {
    const [city,setCity] =  useState("");
    const [temp,setTemp] = useState("");
    const [min,setMin] = useState("");
    const [max,setMax] = useState("");
    const [description,setDescription] = useState("");
    const [icon,setIcon] = useState("");
    const [showMyComponent,setShowMyComponent] = useState(false);
    const getWeatherData = async(city) => {
        await axios({
            method: 'GET',
            url: `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=5acccbbc984af5ed3a9a521a8d2d979f`,
        }).then((res) => {
          setTemp(res.data.main.temp - 273.15);
          setIcon(res.data.weather[0].icon);
          setMin(res.data.main.temp_min - 273.15);
          setMax(res.data.main.temp_max - 273.15);
          setDescription(res.data.weather[0].description);
          setShowMyComponent(true);
        }).catch((err) => {
          console.log(err);
        })
    }
  return (
    <div className='container my-4'>
      <input type="text" value={city} onChange={(e)=>setCity(e.target.value)} placeholder="Enter city name" className='mx-1 p-1'/>
      <button onClick={getWeatherData(city)} className='btn btn-primary' style={{backgroundColor:"#51456a",fontWeight:"bold",fontSize:20,border:0}}>Get Weather</button>
      {showMyComponent ? (
        <div class="data_container p-4 my-5">
          <h1>{city}</h1>
          <div className='my-2'>
            <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt='weather-icon' style={{width:200,height:200}}></img>
          </div>
          <h1>{Math.floor(temp)}°C</h1>
          <h4 className='my-4'>Min: 
          <span>{Math.floor(min)}°C</span> 
          <span className='mx-3'> | </span> Max: 
          <span>{Math.floor(max)}°C</span>
          </h4>
          <h1>{description}</h1>
          <h4 className='my-4'>Date: {new Date().toLocaleDateString()}</h4>
        </div>
      ) : null}
    </div>
  )
}

export default Weather;
