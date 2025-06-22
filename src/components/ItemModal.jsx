import React, { useEffect, useContext } from "react";
import "../blocks/itemmodal.css";
import CurrentUserContext from "../contexts/CurrentUserContext";

function ItemModal({ item, onClose, onOpenConfirmModal }) {
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

  const currentUser = useContext(CurrentUserContext);
  // only show delete button if user is logged in AND owns the item
  const isOwn = currentUser && item.owner && item.owner === currentUser._id;

  return (
    <div className="item__modal" onClick={handleClickOutside}>
      <div className="item__modal-container">
        <button className="item__modal-close_button" onClick={onClose}>
          &times;
        </button>
        <img
          src={item.imageUrl}
          alt={item.name}
          className="item__modal-image"
        />
        <div className="item__modal-header">
          <p className="item__modal-name">{item.name}</p>
          {isOwn && (
            <button
              className="item__modal-delete_button"
              onClick={() => onOpenConfirmModal(item)}
            >
              Delete item
            </button>
          )}
        </div>
        <p className="item__modal-weather_type">Weather: {item.weather}</p>
      </div>
    </div>
  );
}

export default ItemModal;
