import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEyeSlash, FaTimes } from "react-icons/fa";
import "../../assets/Login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useTranslation } from "react-i18next";
import axios from "axios";

const Login = () => {
  const { t } = useTranslation();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    let errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordMinLength = 8;

    if (!emailRegex.test(formData.email)) {
      errors.email = t("login.invalidEmail");
    }

    if (formData.password.length < passwordMinLength) {
      errors.password = t("login.passwordMinLength", { minLength: passwordMinLength });
    }

    setValidationErrors(errors);
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setValidationErrors({});

    const errors = validateForm();
    if (Object.keys(errors).length > 0) return; // Stop if there are validation errors

    setIsLoading(true);

    try {
      const response = await axios.post("https://demo-practice.onrender.com/login", formData);

      if (response.status === 200) {
        sessionStorage.setItem("email", formData.email);
        setIsLoading(false);

        // Display success notification
        toast.success(t("login.loginSuccess"), {
          position: "top-center",
          autoClose: 2000
        });

        // Redirect to home page after a short delay
        setTimeout(() => {
          navigate("/home");
        }, 2500);
      }
    } catch (err) {
      setError(err.response?.data?.detail || t("login.loginError"));
      setIsLoading(false);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="card p-4 shadow" style={{ maxWidth: "400px", width: "100%" }}>
        <div className="text-left mb-1">
          <img
            src="https://www.msg-global.com/images/logo_msg_global_RGB.svg"
            alt="Logo"
            className="mb-2 w-25"
          />
          <h4>{t("login.title")}</h4>
          <p>{t("login.subtitle")}</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3 position-relative">
            <label htmlFor="email">{t("login.emailLabel")}</label>
            <input
              type="text"
              id="email"
              name="email"
              className="form-control mt-2"
              placeholder={t("login.emailLabel")}
              value={formData.email}
              onChange={handleChange}
              disabled={isLoading}
            />
            {isLoading && (
              <FaTimes className="position-absolute" style={{ top: "70%", right: "10px", transform: "translateY(-50%)", color: "#dc3545" }} />
            )}
            {validationErrors.email && <p className="text-danger mt-1">{validationErrors.email}</p>}
          </div>
          <div className="form-group mb-3 position-relative">
            <label htmlFor="password">{t("login.passwordLabel")}</label>
            <div className="input-group">
              <input
                type={passwordVisible ? "text" : "password"}
                id="password"
                name="password"
                className="form-control mt-1"
                placeholder={t("login.passwordLabel")}
                value={formData.password}
                onChange={handleChange}
                disabled={isLoading}
              />
              <button
                type="button"
                className="btn btn-outline-secondary mt-1"
                onClick={togglePasswordVisibility}
                disabled={isLoading}
              >
                {passwordVisible ? <FaEye /> : <FaEyeSlash />}
              </button>
              {isLoading && (
                <FaTimes className="position-absolute" style={{ top: "60%", right: "44px", transform: "translateY(-50%)", color: "#dc3545" }} />
              )}
            </div>
            {validationErrors.password && <p className="text-danger mt-1">{validationErrors.password}</p>}
          </div>

          {error && <p className="text-danger text-center mt-2">{error}</p>}

          <button type="submit" disabled={isLoading} className="custom-login-btn w-100 mt-3" style={{ backgroundColor: "#8B0000", color: "#fff" }}>
            {isLoading ? t("login.loggingInButton") : t("login.loginButton")}
          </button>

          <div className="text-center mt-3">
            <p>
              {t("login.registerPrompt")}{" "}
              <Link to="/register" className="register-link text-decoration-none">
                {t("login.registerLink")}
              </Link>
            </p>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
