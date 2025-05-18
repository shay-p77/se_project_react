import React, { useEffect } from "react";
import "../blocks/modalwithform.css";

function ModalWithForm({
  name,
  onClose,
  onSubmit,
  title,
  buttonText,
  children,
  isValid,
  isLoading,
}) {
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
    if (e.target.classList.contains("form__modal")) {
      onClose();
    }
  };

  return (
    <div
      className={`form__modal modal_type_${name}`}
      onClick={handleClickOutside}
    >
      <div className="form__modal-container">
        <button className="form__modal-close_button" onClick={onClose}>
          &times;
        </button>
        <h2 className="form__modal-title">{title}</h2>
        <form className="modal__form" onSubmit={onSubmit} noValidate>
          {children}
          <button
            type="submit"
            className={`form__modal-submit_button ${
              !isValid ? "form__modal-submit_button_disabled" : ""
            }`}
            disabled={!isValid}
          >
            {isLoading ? "Saving..." : buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
