import React, { useState, useEffect, useContext } from "react";
import ModalWithForm from "./ModalWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";

function EditProfileModal({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (isOpen && currentUser) {
      setName(currentUser.name || "");
      setAvatar(currentUser.avatar || "");
      setIsValid(true);
    }
  }, [isOpen, currentUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    onUpdateUser({ name, avatar })
      .then(() => {
        setIsLoading(false);
        onClose();
      })
      .catch((err) => {
        console.error("Error updating profile:", err);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    setIsValid(name.trim() !== "" && avatar.trim() !== "");
  }, [name, avatar]);

  return (
    <ModalWithForm
      name="editprofile"
      title="Edit Profile"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={isLoading ? "Saving..." : "Save"}
      isValid={isValid}
    >
      <label className="form__modal-input_title">
        Name*
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="form__modal-input"
          minLength={2}
          maxLength={40}
        />
      </label>

      <label className="form__modal-input_title">
        Avatar URL*
        <input
          type="url"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
          required
          className="form__modal-input"
        />
      </label>
    </ModalWithForm>
  );
}

export default EditProfileModal;
