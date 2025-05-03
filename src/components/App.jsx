import React, { useState, useEffect } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
 import ItemModal from "./ItemModal";
import "../blocks/app.css";
import { getWeatherData } from "../utils/weatherApi";
import { defaultClothingItems } from "../utils/constants";
import AddGarmentModal from "./AddGarmentModal";
function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  const [selectedCard, setSelectedCard] = useState(null); // Track which card was clicked
  const [isItemModalOpen, setIsItemModalOpen] = useState(false); // For ItemModal
  const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false); // For Add Item Form Modal

  // Open Add Item modal
  const handleOpenAddItemModal = () => {
    setIsAddItemModalOpen(true);
  };

  // Close Add Item modal
  const handleCloseAddItemModal = () => {
    setIsAddItemModalOpen(false);
  };

  // Add item to clothing list
  const handleAddItem = (newItem) => {
    const itemWithId = { ...newItem, _id: Date.now().toString() };
    setClothingItems([itemWithId, ...clothingItems]);
    console.log(clothingItems);
  };

  // Open ItemModal when a card is clicked
  const handleCardClick = (card) => {
    setSelectedCard(card); // Set the selected card
    setIsItemModalOpen(true); // Open the ItemModal
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        getWeatherData(latitude, longitude)
          .then((data) => {
            const weatherType = data.weatherType;
            const isDay = data.isDay; // boolean true/false

            setWeatherData({
              ...data,
              weatherType,
              isDay,
            });
          })
          .catch((err) => console.error(err));
      });
    }
  }, []);

  return (
    <div className="app">
      <Header openModalWithForm={handleOpenAddItemModal} />

      {/* render ItemModal for the selected card */}
      {isItemModalOpen && selectedCard && (
        <ItemModal
          item={selectedCard}
          onClose={() => setIsItemModalOpen(false)} // Close ItemModal
        />
      )}

      <AddGarmentModal
        isOpen={isAddItemModalOpen}
        onClose={handleCloseAddItemModal}
        onAddItem={handleAddItem}
        
      />

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
