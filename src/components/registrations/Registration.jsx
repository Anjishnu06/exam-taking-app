import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { validateForm } from "../../validations/formValidation";

const Registration = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm(formData);
    setErrors(validationErrors);

    if (Object.values(validationErrors).some((error) => error !== "")) return;

    setIsLoading(true);
    setSuccessMessage("");

    try {
      await axios.post("https://demo-practice.onrender.com/register", formData);
      setIsLoading(false);
      setSuccessMessage("Account successfully created!");
    } catch (error) {
      setIsLoading(false);
      console.error("Registration error: ", error);
      setSuccessMessage(
        "An error occurred during registration. Please try again."
      );
    }
  };

  return (
    <div>
      <div>
        <h2>Create Account</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              placeholder="First name"
              name="first_name"
              disabled={isLoading}
              value={formData.first_name}
              onChange={handleChange}
            />
            {errors.first_name && <p>{errors.first_name}</p>}
          </div>

          <div>
            <input
              type="text"
              placeholder="Last name"
              name="last_name"
              disabled={isLoading}
              value={formData.last_name}
              onChange={handleChange}
            />
            {errors.last_name && <p>{errors.last_name}</p>}
          </div>

          <div>
            <input
              type="text"
              placeholder="Email"
              name="email"
              disabled={isLoading}
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p>{errors.email}</p>}
          </div>

          <div>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              name="password"
              disabled={isLoading}
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <p>{errors.password}</p>}
            <i type="button" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </i>
          </div>

          <div>
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm password"
              name="confirmPassword"
              disabled={isLoading}
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
            <i
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </i>
          </div>

          <div>
            <button type="submit" disabled={isLoading}>
              {isLoading ? "Registering..." : "Register"}
            </button>
          </div>

          {successMessage && !isLoading && <div>{successMessage}</div>}
        </form>

        <p>Already have an account?</p>

        {isLoading && (
          <div>
            <div></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Registration;
