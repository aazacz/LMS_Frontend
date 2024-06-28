import React, { useState } from "react";
import "./SignupPersonalDetails.css";
import personalDetailsImage from "../../../assets/SignupPersonalDetails/personaldetails.png";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const SignupPersonalDetails = () => {
  const [session, setsession] = useState({
    name: "",
    grade: "",
    number: "",
    email: "",
    parentNumber: "",
    parentEmail: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setsession((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleKeyPress = (e) => {
    const charCode = e.which ? e.which : e.keyCode;
    if (charCode < 48 || charCode > 57) {
      e.preventDefault();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, grade, number, email, parentNumber, parentEmail } = session;

    if (!name || !grade || !number || !email || !parentNumber || !parentEmail) {
      Swal.fire({
        icon: "warning",
        title: "All fields are required",
        text: "Please fill out all fields before proceeding.",
      });
      return;
    }

    try {
      sessionStorage.setItem("SignupPersonalDetails", JSON.stringify(session));
      navigate("/signup/signupotpverify");
    } catch (error) {
      console.error("Error in registering", error);
    }
  };

  return (
    <div className="personaldetailscontainer">
      <form onSubmit={handleSubmit}>
        <div className="personaldetailsphoto">
          <img
            className="detailphoto"
            src={personalDetailsImage}
            alt="Personal Details"
          />
          <div className="details-content-container">
            <p className="details-content">Signup to get started</p>
            <p className="details-sub-content">
              2,97,565 students and parents signed up to study <br />
              abroad. Make an informed decision about your abroad education.
            </p>
          </div>
        </div>
        <div className="details-heading">
          <p className="deatils-sub-heading">1. Personal details</p>
          <p className="details-sub-sub-heading">
            This will create your account and enable you to receive
            recommendations (you can opt-out anytime)
          </p>
        </div>
        <section className="detail-section">
          <div className="input-row">
            <input
              type="text"
              className="detail-input"
              name="name"
              placeholder="Student Name"
              value={session.name}
              onChange={handleChange}
            />
            <input
              type="text"
              className="detail-input"
              name="grade"
              placeholder="Current Studying Grade"
              value={session.grade}
              onChange={handleChange}
              pattern="\d*"
              onKeyPress={handleKeyPress}
            />
          </div>
          <div className="input-row">
            <input
              type="text"
              className="detail-input"
              name="number"
              placeholder="Mobile Number"
              value={session.number}
              onChange={handleChange}
              pattern="\d*"
              onKeyPress={handleKeyPress}
            />
            <input
              type="email"
              className="detail-input"
              name="email"
              placeholder="Email ID"
              value={session.email}
              onChange={handleChange}
            />
          </div>
          <div className="input-row">
            <input
              type="text"
              className="detail-input"
              name="parentNumber"
              placeholder="Parent Number"
              value={session.parentNumber}
              onChange={handleChange}
              pattern="\d*"
              onKeyPress={handleKeyPress}
            />
            <input
              type="email"
              className="detail-input"
              name="parentEmail"
              placeholder="Parent Mail ID"
              value={session.parentEmail}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="personal-detail-submit">
            Request OTP
          </button>
        </section>
      </form>
    </div>
  );
};

export default SignupPersonalDetails;
