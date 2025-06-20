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
import {
  getItems,
  addItem,
  deleteItem,
  updateUserProfile,
  addCardLike,
  removeCardLike,
} from "../utils/api";
import RegisterModal from "./RegisterModal";
import LoginModal from "./LoginModal";
import ProtectedRoute from "./ProtectedRoute";
import { register, authorize, checkToken } from "../utils/auth";
import CurrentUserContext from "../contexts/CurrentUserContext";
import ProfilePage from "./ProfilePage";
import EditProfileModal from "./EditProfileModal";

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
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const handleOpenEditModal = () => setIsEditModalOpen(true);
  const handleCloseEditModal = () => setIsEditModalOpen(false);

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

  const handleOpenEditProfileModal = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseEditProfileModal = () => {
    setIsEditModalOpen(false);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setIsItemModalOpen(true);
  };

  const handleOpenRegisterModal = () => setIsRegisterModalOpen(true);
  const handleOpenLoginModal = () => setIsLoginModalOpen(true);
  const handleCloseModals = () => {
    setIsRegisterModalOpen(false);
    setIsLoginModalOpen(false);
  };

  const handleRegister = (formData) => {
    setIsAuthLoading(true);
    register(formData)
      .then(() =>
        handleLogin({ email: formData.email, password: formData.password })
      )
      .catch(console.error)
      .finally(() => setIsAuthLoading(false));
  };

  const handleLogin = ({ email, password }) => {
    setIsAuthLoading(true);
    authorize({ email, password })
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setLoggedIn(true);
        handleTokenCheck(res.token);
        handleCloseModals();
      })
      .catch(console.error)
      .finally(() => setIsAuthLoading(false));
  };

  const handleUpdateUser = ({ name, avatar }) => {
    return updateUserProfile({ name, avatar }).then((updatedUser) => {
      setCurrentUser(updatedUser);
    });
  };

  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");
    if (!isLiked) {
      addCardLike(id, token)
        .then((updatedCard) => {
          setClothingItems((cards) =>
            cards.map((item) => (item._id === id ? updatedCard : item))
          );
        })
        .catch(console.error);
    } else {
      removeCardLike(id, token)
        .then((updatedCard) => {
          setClothingItems((cards) =>
            cards.map((item) => (item._id === id ? updatedCard : item))
          );
        })
        .catch(console.error);
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    setCurrentUser(null);
    setClothingItems([]);
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
    const token = localStorage.getItem("jwt");
    if (token) {
      handleTokenCheck(token);
    }
  }, []);

  const handleTokenCheck = (token) => {
    console.log("Checking token:", token);
    checkToken(token)
      .then((userData) => {
        setLoggedIn(true);
        setCurrentUser(userData);
        return getItems(token);
      })
      .then((itemsFromServer) => {
        setClothingItems(itemsFromServer);
      })
      .catch((err) => {
        console.error("Token check or getItems failed:", err);
        setLoggedIn(false);
      });
  };

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
        <CurrentUserContext.Provider value={currentUser}>
          <CurrentTemperatureUnitContext.Provider
            value={{ currentTemperatureUnit, handleToggleSwitchChange }}
          >
            <Header
              openModalWithForm={handleOpenAddItemModal}
              weatherData={weatherData}
              isCelsius={isCelsius}
              onToggleTemp={handleToggleTemp}
              onOpenRegisterModal={handleOpenRegisterModal}
              onOpenLoginModal={handleOpenLoginModal}
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

            <RegisterModal
              isOpen={isRegisterModalOpen}
              onClose={handleCloseModals}
              onRegister={handleRegister}
              isLoading={isAuthLoading}
              onOpenLogin={handleOpenLoginModal}
            />
            <LoginModal
              isOpen={isLoginModalOpen}
              onClose={handleCloseModals}
              onLogin={handleLogin}
              isLoading={isAuthLoading}
              onOpenRegister={handleOpenRegisterModal}
            />
            <EditProfileModal
              isOpen={isEditModalOpen}
              onClose={handleCloseEditProfileModal}
              onUpdateUser={handleUpdateUser}
            />

            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    className="main"
                    weatherData={weatherData}
                    // weatherType={
                    //   weatherData?.weatherType?.[currentTemperatureUnit]
                    // }
                    weatherType={weatherData?.weatherType}
                    clothingItems={clothingItems}
                    onCardClick={handleCardClick}
                    onCardLike={handleCardLike}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute loggedIn={loggedIn}>
                    <ProfilePage
                      clothingItems={clothingItems}
                      onCardClick={handleCardClick}
                      onAddItem={handleOpenAddItemModal}
                      onUpdateUser={handleUpdateUser}
                      onSignOut={handleSignOut}
                      onEditProfile={handleOpenEditProfileModal}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>

            <Footer className="footer" />
          </CurrentTemperatureUnitContext.Provider>
        </CurrentUserContext.Provider>
      </Router>
    </div>
  );
}

export default App;
