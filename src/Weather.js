import React from 'react'
import { useState } from 'react'
import "./style/Weather.css"
import axios from 'axios'

function Weather() {

    const [weather, setWeather] = useState('');
    const [city, setCity] = useState('');
   
   const apiKey = process.env.REACT_APP_APIKEY;
  
    const apiCall = async (e) => {
        e.preventDefault()
        const location = e.target.elements.location.value
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric&lang=eng`;
        const req = axios.get(url);
        const res = await req;
        setWeather({
            country: res.data.sys.country,
            descr: res.data.weather[0].description,
            temp: res.data.main.temp,
            city: res.data.name,
            humidity: res.data.main.humidity,
            press: res.data.main.pressure,
            img: res.data.weather[0].icon
        })

        setCity(res.data.name)
       

    }

    //Converting K to C
    let k = weather.temp;
    let C = k - 273.15

    const WETHERINFO = () => {
        return <div>
            <div className="wetherInfo">
                Weather information for {city},{weather.country}
                <hr></hr>
            </div>
            <div className="wetherContainer">
            <div className="wetherElement">
                    Temperature : {C.toFixed(2)} &#8451;
                </div>
                <div className="wetherElement">
                    Weather : {weather.descr}
                </div>
                <div className="wetherElement">
                   <img src={"http://openweathermap.org/img/wn/"+weather.img+"@2x.png"} alt="img"/> 
                </div>
               
                <div className="wetherElement">
                    Humidity :{weather.humidity} %
                </div>
                <div className="wetherElement">
                    Pressure :  {weather.press} mb
                </div>
                
            </div>
        </div>
    }
    return (<>
        
        <div className="mainweather">
            <div className="weather">
                <form onSubmit={apiCall} className="form">
                    <input type="text" placeholder="Enter city..." name="location" />
                    <button className="bttn">Search</button>
                </form>

                {weather && <WETHERINFO />}
            </div>
        </div>
    </>
    )
}

export default Weather
