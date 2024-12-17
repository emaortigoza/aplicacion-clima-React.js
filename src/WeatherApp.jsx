import { useState } from 'react'
import './WeatherApp.css'
export const WeatherApp = () => {

    const [city, setCity] = useState('')
    const [weatherData, setWeatherData] = useState(null)

    const urlBase = 'https://api.openweathermap.org/data/2.5/weather'
    const API_KEY = '21331d6d041e912c485da15ff5b395aa'
    const difKelvin = 273.15

    const fetchWeatherData = async() =>{
        try{
            const response = await fetch(`${urlBase}?q=${city}&appid=${API_KEY}&lang=es`)
            const data = await response.json()
            console.log(data)
            setWeatherData(data)
        }catch(error){
            console.error('Ha habido un error: ', error)
        }
    }

    const handleCityChange = (event) => {
        setCity(event.target.value)
    }


    const handleSubmit = (event) => {
        event.preventDefault()
        fetchWeatherData()
    }


  return (
    <div className="container">
        <h1>App del clima</h1>
        <form onSubmit={handleSubmit} className='search-box'>
            <input type="text" placeholder="Ingrese la ciudad" value={city} onChange={handleCityChange}/>
            <button type="submit">Buscar</button>
        </form>

        {weatherData && (
                <div className='weather-box'>
                    <h2>{weatherData.name}, {weatherData.sys.country}</h2>
                    <div className='dataClima'>
                    <div className='dataClima__principal'>
                       <p>La temperatura actual es {Math.floor(weatherData.main.temp -difKelvin)}°C</p> 
                       <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt= {weatherData.weather[0].description} />
                       <p> {weatherData.weather[0].description} </p>
                    </div>
                    <div className='dataClima_secundaria'>
                        <ul>
                            <li>Humedad: {weatherData.main.humidity}%</li>
                            <li>Presion: {weatherData.main.pressure}hPa</li>
                            <li>Viento: {weatherData.wind.speed}km/h</li>
                            <li>Visibilidad: {weatherData.visibility} metros</li>
                        </ul>
                    </div>

                    </div>
                </div>

        )}
    </div>
  )
}
