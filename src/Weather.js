import React, { useState } from "react";
import axios from "axios";

export default function Weather() {
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [weather, setWeather] = useState({});

  function displayWeather(response) {
    setLoading(true);
    setWeather({
      temperature: response.data.main.temp,
      wind: response.data.wind.speed,
      humidity: response.data.main.humidity,
      description: response.data.weather[0].description,
      icon: ` https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    let apiKey = `b35c686ba9565ba0ab254c2230937552`;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayWeather);
  }

  function updateCity(event) {
    setCity(event.target.value);
  }

  let form = (
    <div className="WeatherSearch">
      <form onSubmit={handleSubmit}>
        <input
          type="search"
          placeholder="Enter a city..."
          onChange={updateCity}
        />

        <button type="submit"> Search</button>
      </form>
    </div>
  );

  if (loading) {
    return (
      <div>
        {form}
        <ul>
          <li>Temperature: {Math.round(weather.temperature)}°C</li>
          <li>Humidity: {weather.humidity}%</li>
          <li>Wind: {weather.wind}km/h</li>
          <li>Description: {weather.description}</li>
          <li>
            <img src={weather.icon} alt={weather.description} />
          </li>
        </ul>
        <footer>
          <p>
            This project was coded by Sibongile Tsopo. The code is hosted on{" "}
            <a
              href="https://github.com/SibongileT88/react-weather-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              Github
            </a>
            . The website is hosted on{" "}
            <a
              href="https://fluffy-naiad-b0f8af.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Netlify
            </a>
          </p>
        </footer>
        ;
      </div>
    );
  } else {
    return form;
  }
}
