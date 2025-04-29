import React, { useEffect, useState } from "react";
import logo from "../assets/wtwr.svg";
import avatar from "../assets/avatar.png";
 

function Header({ openModalWithForm }) {
  const [location, setLocation] = useState("Loading...");
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await fetch(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
            );
            const data = await response.json();
            console.log(data);
            if (data.city) {
              setLocation(data.city);
            } else if (data.locality) {
              setLocation(data.locality);
            } else {
              setLocation("Unknown Location");
            }
          } catch (error) {
            console.error("Error fetching location:", error);
            setLocation("Location unavailable");
          }
        },
        (error) => {
          console.error(error);
          setLocation("Location unavailable");
        }
      );
    } else {
      setLocation("Geolocation not supported");
    }
  }, []);

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
