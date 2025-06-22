import React, { useState, useContext } from "react";
import WeatherCard from "./WeatherCard";
import ItemCard from "./ItemCard";
import CurrentTemperatureUnitContext from "../contexts/CurrentTemperatureUnitContext";
import "../blocks/main.css";
import "../blocks/itemcard.css";

function Main({
  weatherData,
  clothingItems,
  onCardClick,
  onCardLike,
  weatherType,
}) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  const temperature = weatherData?.temperature;

  const filteredItems = clothingItems?.filter(
    (item) => item.weather === weatherType?.[currentTemperatureUnit],
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
            <ItemCard
              key={item._id || `${item.name}-${item.weather}`} // fallback key
              item={item}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
            />
          ))}
      </ul>
    </main>
  );
}

export default Main;
