import React from "react";
import logo from "../assets/wtwr.svg";
import avatar from "../assets/avatar.png";

function Header({ openModalWithForm, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const location = weatherData?.city || "Loading...";

  return (
    <header className="header">
      <div className="header__left">
        <img src={logo} alt="WTWR Logo" className="header__logo" />
        <span className="header__date-location">
          {currentDate}, {location}
        </span>
      </div>

      <div className="header__right">
        <button className="header__add-button" onClick={openModalWithForm}>
          + Add Clothes
        </button>
        <span className="header__name">Terrence Tegegne</span>
        <img className="header__avatar" src={avatar} alt="User Avatar" />
      </div>
    </header>
  );
}

export default Header;
