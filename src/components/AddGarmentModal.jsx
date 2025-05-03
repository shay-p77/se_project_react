 import React, { useEffect, useState } from "react";
import ModalWithForm from "./ModalWithForm";
import "../blocks/modalwithform.css";

function AddGarmentModal({ isOpen, onClose, onAddItem }) {
  const [itemName, setItemName] = useState("");
  const [itemImage, setItemImage] = useState("");
  const [weatherType, setWeatherType] = useState("");
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setItemName("");
      setItemImage("");
      setWeatherType("");
      setErrors({});
      setIsValid(false);
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value, validationMessage } = e.target;

    if (name === "itemName") setItemName(value);
    if (name === "itemImage") setItemImage(value);

    setErrors((prev) => ({ ...prev, [name]: validationMessage }));

    const form = e.target.closest("form");
    if (form) setIsValid(form.checkValidity());
  };

  const handleRadioChange = (e) => {
    setWeatherType(e.target.value);

    if (!e.target.value) {
      setErrors((prev) => ({ ...prev, weather: "Please select a weather type." }));
    } else {
      setErrors((prev) => ({ ...prev, weather: "" }));
    }

    const form = e.target.closest("form");
    if (form) setIsValid(form.checkValidity());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) return;

    onAddItem({ name: itemName, link: itemImage, weather: weatherType });
    onClose();
  };

  return (
    <ModalWithForm
      name="add-garment"
      title="New Garment"
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Add Garment"
      isValid={isValid}
      isOpen={isOpen}
    >
      <label className="form__modal-input_title">
        Name*
        <input
          className={`form__modal-input ${errors.itemName ? "form__modal-input_error" : ""}`}
          placeholder="Name"
          name="itemName"
          value={itemName}
          onChange={handleChange}
          required
          maxLength={30}
          minLength={1}
        />
        <span className="form__modal-error">{errors.itemName}</span>
      </label>

      <label className="form__modal-input_title">
        Image*
        <input
          className={`form__modal-input ${errors.itemImage ? "form__modal-input_error" : ""}`}
          placeholder="Image URL"
          type="url"
          name="itemImage"
          value={itemImage}
          onChange={handleChange}
          required
        />
        <span className="form__modal-error">{errors.itemImage}</span>
      </label>

      <label className="form__modal-weather_type">
        Select the weather type*:
        <div className="form__modal-radio_group">
          {["hot", "warm", "cold"].map((type) => (
            <label key={type} className="form__modal-radio_label">
              <input
                type="radio"
                name="weather"
                value={type}
                checked={weatherType === type}
                onChange={handleRadioChange}
                className="modal__radio-input"
                required
              />
              <span>{type.charAt(0).toUpperCase() + type.slice(1)}</span>
            </label>
          ))}
        </div>
        <span className="form__modal-error">{errors.weather}</span>
      </label>
    </ModalWithForm>
  );
}

export default AddGarmentModal;
