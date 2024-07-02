import React, { useState, useEffect } from "react";
import "./SignupOtp.css";
import personalDetailsImage from "../../../assets/SignupPersonalDetails/personal.svg";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const SignupOtp = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedDetails = sessionStorage.getItem("SignupPersonalDetails");
    if (!storedDetails) {
      navigate("/signup/signupPersonalDetails");
    }
  }, [navigate]);

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const validatePassword = (password) => {
    const passwordCriteria = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{9,}$/;
    return passwordCriteria.test(password);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!password || !confirmPassword) {
      Swal.fire({
        icon: "warning",
        title: "All fields are required",
        text: "Please fill out all fields before proceeding.",
      });
    } else if (password !== confirmPassword) {
      Swal.fire({
        icon: "warning",
        title: "All fields are required",
        text: "Passwords do not match!",
      });
    } else if (!validatePassword(password)) {
      Swal.fire({
        icon: "warning",
        title: "All fields are required",
        text: "Password must be alphanumeric, start with a capital letter, contain a special character, and be longer than 8 characters.",
      });
    } else {
      // setError("");
      try {
        const storedDetails = JSON.parse(
          sessionStorage.getItem("SignupPersonalDetails")
        );
        sessionStorage.setItem(
          "SignupPersonalDetails",
          JSON.stringify({ ...storedDetails, password })
        );
        navigate("/signup/signupSat");
      } catch (error) {
        console.error("Error in storing password", error);
      }
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div>
      <div className="otpcontainer">
        <form onSubmit={handleSubmit}>
          <div className="flex">
            <div className="otpphoto">
              <img
                className="otpimage"
                src={personalDetailsImage}
                alt="Personal Details"
              />
              <div className="otp-content-container">
                <p className="otp-content">Signup to get started</p>
                <p className="otp-sub-content">
                  2,97,565 students and parents signed up to study <br />
                  abroad. Make an informed decision about your abroad education.
                </p>
              </div>
            </div>
          </div>
          <div className="otp-heading">
            <p className="otp-sub-heading">Set Your Password</p>
            <div className="otp-number">
              <div className="password-input-container">
                <input
                  className="input"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={handlePasswordChange}
                />
                <button
                  type="button"
                  className="show-password-button"
                  onClick={toggleShowPassword}
                >
                  {showPassword ?  <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
              <div className="password-input-container">
                <input
                  className="input"
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                />
                <button
                  type="button"
                  className="show-password-button"
                  onClick={toggleShowConfirmPassword}
                >
                  {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center w-full justify-center">
              <button type="submit" className="otp-request">
                Confirm Password
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupOtp;
