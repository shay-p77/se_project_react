// import React, { useEffect, useState } from "react";
// import "../blocks/modalwithform.css";

// function ModalWithForm({ name, onClose, onAddItem }) {
//   const [itemName, setItemName] = useState("");
//   const [itemImage, setItemImage] = useState("");
//   const [weatherType, setWeatherType] = useState("");
//   const [errors, setErrors] = useState({});
//   const [isValid, setIsValid] = useState(false);

//   useEffect(() => {
//     const handleEscape = (event) => {
//       if (event.key === "Escape") {
//         onClose();
//       }
//     };
//     document.addEventListener("keydown", handleEscape);
//     return () => {
//       document.removeEventListener("keydown", handleEscape);
//     };
//   }, [onClose]);

//   useEffect(() => {
//     // Reset form on open
//     setItemName("");
//     setItemImage("");
//     setWeatherType("");
//     setErrors({});
//     setIsValid(false);
//   }, [name]);

//   const handleClickOutside = (e) => {
//     if (e.target.classList.contains("form__modal")) {
//       onClose();
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value, validationMessage } = e.target;

//     if (name === "itemName") setItemName(value);
//     if (name === "itemImage") setItemImage(value);

//     setErrors((prev) => ({ ...prev, [name]: validationMessage }));

//     const form = e.target.closest("form");
//     if (form) setIsValid(form.checkValidity());
//   };

//   const handleRadioChange = (e) => {
//     setWeatherType(e.target.value);
//     if (!e.target.value) {
//       setErrors((prev) => ({
//         ...prev,
//         weather: "Please select a weather type.",
//       }));
//     } else {
//       setErrors((prev) => ({ ...prev, weather: "" }));
//     }

//     const form = e.target.closest("form");
//     if (form) setIsValid(form.checkValidity());
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!isValid) return;

//     onAddItem({ name: itemName, link: itemImage, weather: weatherType });

//     setItemName("");
//     setItemImage("");
//     setWeatherType("");
//     onClose();
//   };

//   return (
//     <div
//       className={`form__modal modal_type_${name}`}
//       onClick={handleClickOutside}
//     >
//       <div className="form__modal-container">
//         <button className="form__modal-close_button" onClick={onClose}>
//           &times;
//         </button>
//         <h2 className="form__modal-title">New Garment</h2>
//         <form className="modal__form" onSubmit={handleSubmit} noValidate>
//           <label className="form__modal-input_title">Name* 
//           <input
//             className={`form__modal-input ${
//               errors.itemName ? "form__modal-input_error" : ""
//             }`}
//             placeholder="Name"
//             name="itemName"
//             value={itemName}
//             onChange={handleChange}
//             required
//             maxLength={30}
//             minLength={1}
//           />
//           <span className="form__modal-error">{errors.itemName}</span>
//           </label>

//           <label className="form__modal-input_title">Image*
//           <input
//             className={`form__modal-input ${
//               errors.itemImage ? "form__modal-input_error" : ""
//             }`}
//             placeholder="Image URL"
//             type="url"
//             name="itemImage"
//             value={itemImage}
//             onChange={handleChange}
//             required
//           />
//           <span className="form__modal-error">{errors.itemImage}</span>
//           </label>

//          <label className="form__modal-weather_type">Select the weather type*:
//           <div className="form__modal-radio_group">
//             <label className="form__modal-radio_label">
//               <input
//                 type="radio"
//                 name="weather"
//                 value="hot"
//                 checked={weatherType === "hot"}
//                 onChange={handleRadioChange}
//                 className="modal__radio-input"
//                 required
//               />
//               <span>Hot</span>
//             </label>

//             <label className="form__modal-radio_label">
//               <input
//                 type="radio"
//                 name="weather"
//                 value="warm"
//                 checked={weatherType === "warm"}
//                 onChange={handleRadioChange}
//                 className="modal__radio-input"
//                 required
//               />
//               <span>Warm</span>
//             </label>

//             <label className="form__modal-radio_label">
//               <input
//                 type="radio"
//                 name="weather"
//                 value="cold"
//                 checked={weatherType === "cold"}
//                 onChange={handleRadioChange}
//                 className="modal__radio-input"
//                 required
//               />
//               <span>Cold</span>
//             </label>
//           </div>
//           <span className="form__modal-error">{errors.weather}</span>
//           </label>

//           <button
//             type="submit"
//             className={`form__modal-submit_button ${
//               !isValid ? "form__modal-submit_button_disabled" : ""
//             }`}
//             disabled={!isValid}
//           >
//             Add Garment
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default ModalWithForm;

import React, { useEffect } from "react";
import "../blocks/modalwithform.css";

function ModalWithForm({ name, title, children, onClose, onSubmit, buttonText = "Submit", isValid = true, isOpen}) {
  if (!isOpen) return null;

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
    <div className={`form__modal modal_type_${name}`} onClick={handleClickOutside}>
      <div className="form__modal-container">
        <button className="form__modal-close_button" onClick={onClose}>
          &times;
        </button>
        {title && <h2 className="form__modal-title">{title}</h2>}
        <form className="modal__form" onSubmit={onSubmit} noValidate>
          {children}
          <button
            type="submit"
            className={`form__modal-submit_button ${
              !isValid ? "form__modal-submit_button_disabled" : ""
            }`}
            disabled={!isValid}
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;

