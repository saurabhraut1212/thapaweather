//api.openweathermap.org/data/2.5/weather?q=pune&appid=9098f67394e8abd052691ef272fac48a
import React,{useEffect, useState} from 'react';
import "./Style.css";
import WeatherCard from './WeatherCard';
const Temp = () => {

    const [searchValue,setSearchValue]=useState("pune");
    const [newData,setNewData]=useState({})

    const getWeatherData=async()=>{
       try {
           let url =`https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=9098f67394e8abd052691ef272fac48a`;//units=metric is for degree celcius
           const res=await fetch(url);
           const data=await res.json();

           const { temp,humidity,pressure }=data.main;
           const { main:weathermood }=data.weather[0];
           const {name}=data;
           const {speed}=data.wind;
           const {country,sunset}=data.sys;

           const myNewValue={
               temp ,
               humidity, 
               pressure,
               weathermood ,
               name,
               speed,
               country,
               sunset
           }

           setNewData(myNewValue);
       } catch (error) {
        console.log(error)
       }
    }
    useEffect(() => {
        getWeatherData();
    }, []);
    return (
        <>
        <div  className="wrap">
            <div className="search">
                <input type="search" 
                placeholder='Search..' 
                autoFocus 
                id="search" 
                className="searchItem"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}/>
                <button className="searchButton" onClick={getWeatherData}>Search</button>

            </div>
            
        </div>
            <WeatherCard newData={newData}/>
      
        </>
    );
};

export default Temp;