import React, { useContext } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/wtwr.svg";
import avatar from "../assets/avatar.png";
import ToggleSwitch from "./ToggleSwitch";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Header({
  openModalWithForm,
  weatherData,
  isCelsius,
  onToggleTemp,
  onOpenRegisterModal,
  onOpenLoginModal,
}) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const location = weatherData?.city || "Loading...";

  const currentUser = useContext(CurrentUserContext);

  return (
    <header className="header">
      <div className="header__left">
        <Link to="/">
          <img src={logo} alt="WTWR Logo" className="header__logo" />
        </Link>
        <span className="header__date-location">
          {currentDate}, {location}
        </span>
      </div>

      <div className="header__right">
        <ToggleSwitch isChecked={isCelsius} onToggle={onToggleTemp} />
        {currentUser ? (
          <>
            <button className="header__add-button" onClick={openModalWithForm}>
              + Add Clothes
            </button>
            <Link to="/profile" className="header__profile-link">
              <span className="header__name">{currentUser.name}</span>
              {currentUser.avatar ? (
                <img
                  className="header__avatar"
                  src={currentUser.avatar}
                  alt="User Avatar"
                />
              ) : (
                <div className="header__avatar header__avatar-placeholder">
                  {currentUser.name[0]}
                </div>
              )}
            </Link>
          </>
        ) : (
          <>
            <button
              onClick={onOpenRegisterModal}
              className="header__auth-button"
            >
              Sign up
            </button>
            <button onClick={onOpenLoginModal} className="header__auth-button">
              Log in
            </button>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
