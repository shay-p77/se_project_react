import React, { useState, useEffect } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ItemModal from "./ItemModal";
import AddGarmentModal from "./AddGarmentModal";
import "../blocks/app.css";
import { getWeatherData } from "../utils/weatherApi";
import { defaultClothingItems } from "../utils/constants";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isItemModalOpen, setIsItemModalOpen] = useState(false);
  const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);

  const handleOpenAddItemModal = () => {
    setIsAddItemModalOpen(true);
  };

  const handleCloseAddItemModal = () => {
    setIsAddItemModalOpen(false);
  };

  const handleAddItem = (newItem) => {
    const itemWithId = { ...newItem, _id: Date.now().toString() };
    setClothingItems([itemWithId, ...clothingItems]);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setIsItemModalOpen(true);
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        getWeatherData(latitude, longitude)
          .then((data) => {
            console.log("Fetched Weather Data:", data);
            setWeatherData(data);
          })
          .catch((err) => console.error("Error fetching weather data:", err));
      });
    }
  }, []);

  return (
    <div className="app">
      <Header
        openModalWithForm={handleOpenAddItemModal}
        weatherData={weatherData}
      />

      {isItemModalOpen && selectedCard && (
        <ItemModal
          item={selectedCard}
          onClose={() => setIsItemModalOpen(false)}
        />
      )}

      {isAddItemModalOpen && (
        <AddGarmentModal
          isOpen={isAddItemModalOpen}
          onClose={handleCloseAddItemModal}
          onAddItem={handleAddItem}
        />
      )}

      <Main
        className="main"
        weatherData={weatherData}
        clothingItems={clothingItems}
        onCardClick={handleCardClick}
      />

      <Footer className="footer" />
    </div>
  );
}

export default App;
