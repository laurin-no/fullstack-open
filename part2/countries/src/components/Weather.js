import React, {useEffect, useState} from 'react'
import axios from 'axios'

const Weather = ({country}) => {
    const capital = country.capital[0]
    const [lat, long] = country.capitalInfo.latlng
    const apiKey = process.env.REACT_APP_OPENWEATHER_API_KEY

    const [weather, setWeather] = useState({})

    useEffect(() => {
        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${apiKey}`)
            .then(response => {
                setWeather(response.data)
            })
    }, [])

    if (Object.keys(weather).length === 0) {
        return (<></>)
    }

    return (
        <div>
            <h2>Weather in {capital}</h2>
            <div>temperature {weather.main.temp} Celsius</div>
            <img alt={weather.weather[0].description}
                 src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}/>
            <div>wind {weather.wind.speed} m/s</div>
        </div>
    )
}

export default Weather