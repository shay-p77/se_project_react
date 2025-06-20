import ModalWithForm from "./ModalWithForm";
import { useState, useEffect } from "react";
import "../blocks/loginmodal.css";

function LoginModal({ isOpen, onClose, onLogin, isLoading, onOpenRegister }) {
  const [form, setForm] = useState({ email: "", password: "" });
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
    onLogin(form);
  };

  // Reset form and errors when modal opens
  useEffect(() => {
    if (isOpen) {
      setForm({ email: "", password: "" });
      setErrors({});
      setIsValid(false);
    }
  }, [isOpen]);

  return (
    <ModalWithForm
      name="login"
      title="Log in"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={isLoading ? "..." : "Log in"}
      isValid={isValid}
      secondaryButton={
        <button
          type="button"
          className="login__modal-signup_button"
          onClick={() => {
            onClose();
            onOpenRegister();
          }}
        >
          or Sign Up
        </button>
      }
    >
      <label className="login__modal-input_label">
        Email*
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className={`login__modal-input ${
            errors.email ? "form__modal-input_error" : ""
          }`}
        />
        <span className="form__modal-error">{errors.email}</span>
      </label>
      <label className="login__modal-input_label">
        Password*
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          className={`login__modal-input ${
            errors.password ? "form__modal-input_error" : ""
          }`}
        />
        <span className="form__modal-error">{errors.password}</span>
      </label>
    </ModalWithForm>
  );
}

export default LoginModal;
