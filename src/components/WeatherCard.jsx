import React from "react";
import "../blocks/weathercard.css";
import cloud from "../assets/cloud.png";
import sun from "../assets/sun.png";

function WeatherCard({ temperature }) {
  return (
    <div className="weather__card">
      <p className="weather__card-temp">{temperature}°F</p>
      <div className="weather__card-icons">
        <img className="weather__card-cloud" src={cloud} alt="cloud"></img>
        <img className="weather__card-sun" src={sun} alt="sun"></img>
      </div>
    </div>
  );
}

export default WeatherCard;

// style it better
