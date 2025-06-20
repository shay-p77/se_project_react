import ModalWithForm from "./ModalWithForm";
import { useState, useEffect } from "react";
import "../blocks/registermodal.css";

function RegisterModal({
  isOpen,
  onClose,
  onRegister,
  isLoading,
  onOpenLogin,
}) {
  const [form, setForm] = useState({
    name: "",
    avatar: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (e) => {
    const { name, value, validationMessage } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: validationMessage }));

    const formElement = e.target.closest("form");
    if (formElement) {
      setIsValid(formElement.checkValidity());
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) return;
    onRegister(form);
  };

  useEffect(() => {
    if (isOpen) {
      setForm({ name: "", avatar: "", email: "", password: "" });
      setErrors({});
      setIsValid(false);
    }
  }, [isOpen]);

  return (
    <ModalWithForm
      name="register"
      title="Sign up"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={isLoading ? "..." : "Sign Up"}
      isValid={isValid}
      secondaryButton={
        <button
          type="button"
          className="register__modal-login_button"
          onClick={() => {
            onClose();
            onOpenLogin();
          }}
        >
          or Log In
        </button>
      }
    >
      <label className="register__modal-input_label">
        Email*
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className={`register__modal-input ${
            errors.email ? "form__modal-input_error" : ""
          }`}
        />
        <span className="form__modal-error">{errors.email}</span>
      </label>

      <label className="register__modal-input_label">
        Password*
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          className={`register__modal-input ${
            errors.password ? "form__modal-input_error" : ""
          }`}
        />
        <span className="form__modal-error">{errors.password}</span>
      </label>

      <label className="register__modal-input_label">
        Name*
        <input
          name="name"
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
          className={`register__modal-input ${
            errors.name ? "form__modal-input_error" : ""
          }`}
        />
        <span className="form__modal-error">{errors.name}</span>
      </label>

      <label className="register__modal-input_label">
        Avatar URL*
        <input
          name="avatar"
          type="url"
          placeholder="Avatar URL"
          value={form.avatar}
          onChange={handleChange}
          required
          className={`register__modal-input ${
            errors.avatar ? "form__modal-input_error" : ""
          }`}
        />
        <span className="form__modal-error">{errors.avatar}</span>
      </label>
    </ModalWithForm>
  );
}

export default RegisterModal;
