import React, { useState } from "react";
import "./SignupPersonalDetails.css";
import personalDetailsImage from "../../../assets/SignupPersonalDetails/personaldetails.png";
import UserNavbar from "../UserNavbar";
import { Link } from "react-router-dom";

const SignupPersonalDetails = () => {
  const [studentName, setStudentName] = useState("");
  const [currentGrade, setCurrentGrade] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [emailID, setEmailID] = useState("");
  const [parentNumber, setParentNumber] = useState("");
  const [parentMailID, setParentMailID] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <div className="personaldetailscontainer">
        <div className="personaldetailsphoto">
          <img
            className="detailphoto"
            src={personalDetailsImage}
            alt="Personal Details"
          />
          <div className="details-content-container">
            <p className="details-content">Signup to get started </p>
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
        <form onSubmit={handleSubmit}>
          <section className="detail-section">
            <div className="input-row">
              <input
                type="text"
                className="detail-input"
                placeholder="Student Name"
              />
              <input
                type="text"
                className="detail-input"
                placeholder="Current Studying Grade"
              />
            </div>
            <div className="input-row">
              <input
                type="text"
                className="detail-input"
                placeholder="IND (+91)"
              />
              <input
                type="text"
                className="detail-input"
                placeholder="Mobile Number"
              />
              <input
                type="text"
                className="detail-input"
                placeholder="Email ID"
              />
            </div>
            <div className="input-row">
              <input
                type="text"
                className="detail-input"
                placeholder="IND (+91)"
              />
              <input
                type="text"
                className="detail-input"
                placeholder="Parent Number"
              />
              <input
                type="text"
                className="detail-input"
                placeholder="Parent Mail ID"
              />
            </div>
            <section className="location-section">
              <p>
                Mountain View is your current location. <a href="#">Change</a>
              </p>
            </section>
            <Link to={"/signup/signupotpverify"}>
              <button type="submit" className="personal-detail-submit">
                Request OTP
              </button>
            </Link>
          </section>
        </form>
      </div>
    </div>
  );
};

export default SignupPersonalDetails;
