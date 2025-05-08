import { useState, useEffect } from "react";
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
    const defaultCoords = { latitude: 40.7128, longitude: -74.006 }; // NYC
  
    function fetchWeather(coords) {
      getWeatherData(coords.latitude, coords.longitude)
        .then((data) => setWeatherData(data))
        .catch((err) => console.error("Error fetching weather data:", err));
    }
  
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeather(position.coords);
        },
        (error) => {
          console.warn("Geolocation denied or failed, using default coords.", error);
          fetchWeather(defaultCoords);
        },
        { timeout: 10000 }
      );
    } else {
      console.warn("Geolocation not supported, using default coords.");
      fetchWeather(defaultCoords);
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
