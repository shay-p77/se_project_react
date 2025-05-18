import React, { useContext } from "react";
import "../blocks/weathercard.css";
import cloudy from "../assets/Cloudy.png";
import CurrentTemperatureUnitContext from "../contexts/CurrentTemperatureUnitContext";

function WeatherCard({ temperature, weatherType }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  return (
    <div className="weather__card">
      <p className="weather__card-temp">
        {temperature[currentTemperatureUnit]}°{currentTemperatureUnit}
      </p>
      <img className="weather__card-image" src={cloudy} alt={weatherType} />
    </div>
  );
}

export default WeatherCard;
