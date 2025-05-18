import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ItemModal from "./ItemModal";
import AddItemModal from "./AddItemModal";
import "../blocks/app.css";
import { getWeatherData } from "../utils/weatherApi";
import CurrentTemperatureUnitContext from "../contexts/CurrentTemperatureUnitContext";
import Profile from "./Profile";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import { getItems, addItem, deleteItem } from "../utils/api";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [clothingItems, setClothingItems] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isItemModalOpen, setIsItemModalOpen] = useState(false);
  const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);
  const [isCelsius, setIsCelsius] = useState(false);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [cardToDelete, setCardToDelete] = useState(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit((prevUnit) => (prevUnit === "F" ? "C" : "F"));
  };

  const handleToggleTemp = () => {
    setIsCelsius(!isCelsius);
  };

  const handleOpenAddItemModal = () => {
    setIsAddItemModalOpen(true);
  };

  const handleCloseAddItemModal = () => {
    setIsAddItemModalOpen(false);
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
          console.warn(
            "Geolocation denied or failed, using default coords.",
            error
          );
          fetchWeather(defaultCoords);
        },
        { timeout: 10000 }
      );
    } else {
      console.warn("Geolocation not supported, using default coords.");
      fetchWeather(defaultCoords);
    }
  }, []);

  useEffect(() => {
    getItems()
      .then((itemsFromServer) => setClothingItems(itemsFromServer))
      .catch(console.error);
  }, []);

  function handleAddItem(newItemData) {
    setIsLoading(true);
    addItem(newItemData)
      .then((addedItem) => {
        setClothingItems((prev) => [addedItem, ...prev]);
        setIsAddItemModalOpen(false);
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }

  function handleDeleteItem(id) {
    deleteItem(id)
      .then(() =>
        setClothingItems((prev) => prev.filter((item) => item._id !== id))
      )
      .catch(console.error);
  }

  return (
    <div className="app">
      <Router>
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <Header
            openModalWithForm={handleOpenAddItemModal}
            weatherData={weatherData}
            isCelsius={isCelsius}
            onToggleTemp={handleToggleTemp}
          />

          {isItemModalOpen && selectedCard && (
            <ItemModal
              item={selectedCard}
              onClose={() => setIsItemModalOpen(false)}
              onOpenConfirmModal={(item) => {
                setCardToDelete(item);
                setIsItemModalOpen(false);
                setIsConfirmModalOpen(true);
              }}
            />
          )}

          {isAddItemModalOpen && (
            <AddItemModal
              isOpen={isAddItemModalOpen}
              onClose={handleCloseAddItemModal}
              onAddItem={handleAddItem}
              isLoading={isLoading}
            />
          )}

          {isConfirmModalOpen && (
            <DeleteConfirmationModal
              onClose={() => setIsConfirmModalOpen(false)}
              onConfirmDelete={() => {
                handleDeleteItem(cardToDelete._id);
                setIsConfirmModalOpen(false);
                setCardToDelete(null);
              }}
            />
          )}

          <Routes>
            <Route
              path="/"
              element={
                <Main
                  className="main"
                  weatherData={weatherData}
                  weatherType={
                    weatherData?.weatherType?.[currentTemperatureUnit]
                  }
                  clothingItems={clothingItems}
                  onCardClick={handleCardClick}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  clothingItems={clothingItems}
                  onCardClick={handleCardClick}
                  onAddItem={handleOpenAddItemModal}
                />
              }
            />
          </Routes>

          <Footer className="footer" />
        </CurrentTemperatureUnitContext.Provider>
      </Router>
    </div>
  );
}

export default App;
