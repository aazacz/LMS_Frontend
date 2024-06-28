import React, { useState, useEffect } from "react";
import "./SignupOtp.css";
import personalDetailsImage from "../../../assets/SignupPersonalDetails/personaldetails.png";
import UserNavbar from "../UserNavbar";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const SignupOtp = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
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

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!password || !confirmPassword) {
      Swal.fire({
        icon: 'warning',
        title: 'All fields are required',
        text: 'Please fill out all fields before proceeding.',
      });
    } else if (password !== confirmPassword) {
      setError("Passwords do not match!");
    } else {
      setError("");
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

  return (
    <div>
      <div className="otpcontainer">
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
        <div className="otp-heading">
          <p className="otp-sub-heading">Set Your Password</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="otp-number">
            <input
              className="input"
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
            />
            <input
              className="input"
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <section className="otp-button-container">
            <button type="submit" className="otp-request">
              Confirm Password
            </button>
          </section>
        </form>
      </div>
    </div>
  );
};

export default SignupOtp;
