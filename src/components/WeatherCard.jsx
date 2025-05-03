import React from "react";
import "../blocks/weathercard.css";
import cloudy from "../assets/Cloudy.png";
import sunny from "../assets/Sunny.png";
import foggy from "../assets/Foggy.png";
import rainy from "../assets/Rainy.png";
import snowy from "../assets/Snowy.png";
import thunderstorm from "../assets/Thunderstorm.png";


import moon from "../assets/Moon.png";
import cloudynight from "../assets/Cloudynight.png";
import foggynight from "../assets/Foggynight.png";
import rainynight from "../assets/Rainynight.png";
import thunderstormnight from "../assets/Thunderstormnight.png";
import snowynight from "../assets/Snowynight.png";



function WeatherCard({ temperature, weatherType, isDay }) {
  const getWeatherIcon = () => {
    if (isDay) {
      switch (weatherType) {
        case "sunny":
          return sunny;
        case "cloudy":
          return cloudy;
        case "foggy":
          return foggy;
        case "rainy":
          return rainy;
        case "snowy":
          return snowy;
        case "thunderstorm":
          return thunderstorm;
        default:
          return sunny;
      }
    } else {
      switch (weatherType) {
        case "sunny":
          return moon;
        case "cloudy":
          return cloudynight;
        case "foggy":
          return foggynight;
        case "rainy":
          return rainynight;
        case "snowy":
          return snowynight;
        case "thunderstorm":
          return thunderstormnight;
        default:
          return moon;
      }
    }
  };

  const weatherIcon = getWeatherIcon();

  return (
    <div className="weather__card">
      <p className="weather__card-temp">{temperature}°F</p>
      <div className="weather__card-icon">
         <img className="weather__card-image" src={weatherIcon} alt={weatherType}></img>
         </div>
       </div>
   );
}

export default WeatherCard;

 