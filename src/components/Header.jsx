import React from "react";
import { Link } from "react-router-dom";  
import logo from "../assets/wtwr.svg";
import avatar from "../assets/avatar.png";
import ToggleSwitch from "./ToggleSwitch";

function Header({ openModalWithForm, weatherData, isCelsius, onToggleTemp }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const location = weatherData?.city || "Loading...";

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
        <button className="header__add-button" onClick={openModalWithForm}>
          + Add Clothes
        </button>

        <Link to="/profile" className="header__profile-link">
          <span className="header__name">Terrence Tegegne</span>
          <img className="header__avatar" src={avatar} alt="User Avatar" />
        </Link>
      </div>
    </header>
  );
}

export default Header;
