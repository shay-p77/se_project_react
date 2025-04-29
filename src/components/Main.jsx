import React, { useState } from "react";
import WeatherCard from "./WeatherCard";
import ItemCard from "./ItemCard";
import "../blocks/main.css";

function Main({ weatherData, clothingItems, onCardClick }) {
  // Define temperature category
  const temperature = weatherData?.temperature;
  const weatherType =
    temperature >= 86 ? "hot" : temperature >= 66 ? "warm" : "cold";

  // Filter clothing items based on weatherType
  const filteredItems = clothingItems?.filter(
    (item) => item.weather === weatherType
  );

  return (
    <main className="main">
      {/* Weather card */}
      {weatherData && (
        <WeatherCard
          temperature={weatherData.temperature}
          city={weatherData.city}
        />
      )}

      <p className="main__text">
        Today is {temperature}°F / You may want to wear:
      </p>

      {/* Clothing items list */}
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
