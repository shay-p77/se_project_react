import React, { useEffect } from "react";
import "../blocks/deleteconfirmationmodal.css";

function DeleteConfirmationModal({ onClose, onConfirmDelete }) {
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
    if (e.target.classList.contains("delete__modal")) {
      onClose();
    }
  };

  return (
    <div className="delete__modal" onClick={handleClickOutside}>
      <div className="delete__modal-container">
        <button className="delete__modal-close_button" onClick={onClose}>
          &times;
        </button>
        <p className="delete__modal-message">
          <span>Are you sure you want to delete this item?</span>
          <br />
          <span>This action is irreversible.</span>
        </p>
        <div className="delete__modal-buttons">
          <button
            className="delete__modal-confirm_button"
            onClick={onConfirmDelete}
          >
            Yes, delete item
          </button>
          <button className="delete__modal-cancel_button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmationModal;
