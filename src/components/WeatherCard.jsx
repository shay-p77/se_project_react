import React from "react";
import "../blocks/weathercard.css";
import cloudy from "../assets/Cloudy.png";

function WeatherCard({ temperature, weatherType }) {
  return (
    <div className="weather__card">
      <p className="weather__card-temp">{temperature}°F</p>

      <img className="weather__card-image" src={cloudy} alt={weatherType}></img>
    </div>
  );
}

export default WeatherCard;
