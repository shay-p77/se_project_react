import React, { useState, useContext } from "react";
import WeatherCard from "./WeatherCard";
import ItemCard from "./ItemCard";
import CurrentTemperatureUnitContext from "../contexts/CurrentTemperatureUnitContext";
import "../blocks/main.css";

function Main({ weatherData, clothingItems, onCardClick, weatherType }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  const temperature = weatherData?.temperature;

  const filteredItems = clothingItems?.filter(
    (item) => item.weather === weatherType
  );

  return (
    <main className="main">
      {weatherData && (
        <WeatherCard
          temperature={weatherData.temperature}
          city={weatherData.city}
          weatherType={weatherData.weatherType}
          isDay={weatherData.isDay}
        />
      )}

      <p className="main__text">
        Today is {temperature?.[currentTemperatureUnit]}°
        {currentTemperatureUnit} / You may want to wear:
      </p>

      <ul className="items__list">
        {filteredItems &&
          filteredItems.map((item) => (
            <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
          ))}
      </ul>
    </main>
  );
}

export default Main;
