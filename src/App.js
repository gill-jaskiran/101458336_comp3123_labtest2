// Including all the imports needed for the application
import React, { useState, useEffect } from 'react'; // React features (state management and lifecycle methods)
import axios from 'axios'; // to make Api requests
import './App.css';

function App() {
  const [infoWeather, updateInfo] = useState(null); // to retrieve weather data from the api and updating infoweather
  const [cityLoc, addCityLoc] = useState('Toronto'); // default city set to toronto and is cityloc is updated for new input
  const [dateTime, addDateTime] = useState(new Date()); // updates to the time and date
  
  useEffect(() => { 
    // Here we are getting the weather data from the API and hadling the requests
    // infoWeather is updated when the request is sucessfull
    const getWeatherInfo = async () => {
      const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
      try {
        const response = await axios.get(
          // the URL updates with the cityLoc
          `https://api.openweathermap.org/data/2.5/weather?q=${cityLoc}&appid=${API_KEY}&units=metric` 
        );
        updateInfo(response.data); // Data is updated
      } catch (error) {
        console.error('Error: there was an error retrieving the data', error);
      }
    };

    getWeatherInfo();
    addDateTime(new Date()); // date and times are updated
  }, [cityLoc]);

  // Creating a function so that the cityLoc is updated when the input from the user is altered
  const alterCity = (e) => addCityLoc(e.target.value);

  // Here we are adding div classes for UX/UI 
  // Adding Headings and p 
  // Adding Display elements and weather icons
  return (
    <div className="app">
      <div className="display-container">
        
        <h2 className="title">Weather Data</h2> 

        <div className="date-time">
          <h2>{dateTime.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</h2>
          <p>{dateTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</p> 
        </div>

        <h2 className="search-heading">Search: Please enter a city below</h2> 

        <input
          type="text"
          placeholder="Please Input the City name"
          value={cityLoc}
          onChange={alterCity}
        />

        {infoWeather && (
          <>
            <div className="weather-info">
              <img 
                src={`http://openweathermap.org/img/wn/${infoWeather.weather[0].icon}@2x.png`} 
                alt={infoWeather.weather[0].description} 
                className="weather-icon"
              />
              <h1>{Math.round(infoWeather.main.temp)}°C</h1>
              <p>{infoWeather.weather[0].description}</p> 
              <p>{infoWeather.name}, {infoWeather.sys.country}</p>
            </div>

            <div className="detail-info">
              <div className="detail-heading">
                <h3>Details</h3>
                <p className="detail-list">Humidity: {infoWeather.main.humidity}%</p>
                <p className="detail-list">Wind Speed: {infoWeather.wind.speed} km/h</p>
                <p className="detail-list">Air Pressure: {infoWeather.main.pressure} hPa</p>
                <p className="detail-list">Min Temp: {Math.round(infoWeather.main.temp_min)}°C</p>
                <p className="detail-list">Max Temp: {Math.round(infoWeather.main.temp_max)}°C</p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
