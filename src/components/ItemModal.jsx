import React, { useEffect } from "react";
import "../blocks/itemmodal.css";  
 

function ItemModal({ item, onClose }) {
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  const handleClickOutside = (e) => {
    if (e.target.classList.contains("item__modal")) {
      onClose();
    }
  };

  if (!item) return null;  

  return (
    <div className="item__modal" onClick={handleClickOutside}>
      <div className="item__modal-container">
        <button className="item__modal-close_button" onClick={onClose}>
          &times;
        </button>
        <img
          src={item.link}
          alt={item.name}
          className="item__modal-image"
        />
        <p className="item__modal-name">{item.name}</p>
        <p className="item__modal-weather_type">Weather: {item.weather}</p>
      </div>
    </div>
  );
}

export default ItemModal;
