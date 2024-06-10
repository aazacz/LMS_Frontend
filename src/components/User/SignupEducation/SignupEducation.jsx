import React, { useState } from "react";
import { FaUpload } from "react-icons/fa";
import "./SignupEducation.css";
import personalDetailsImage from "../../../assets/SignupPersonalDetails/personaldetails.png";
import UserNavbar from "../UserNavbar";
import Loader from "../../reusable/Loader";
import { useNavigate } from "react-router-dom";

const SignupEducation = () => {
  const headings = ["English (Reading & Writing)", "Math", "Total Score"];
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const handleConsentChange = () => {
    setConsent(!consent);
  };

  const registerUser = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/diagnosistest");
    }, 3000);
  };

  return (
    <>
      <div className="w-screen h-[88vh]relative flex items-center justify-center">
        {loading && (
          <div className="modal-overlay w-screen h-[88vh] absolute">
            <Loader />
          </div>
        )}

        <div className={loading ? "educationcontainer blurred" : "educationcontainer"}>
          <div className="educationphoto">
            <img
              className="educationimage"
              src={personalDetailsImage}
              alt="Personal Details"
            />
            <div className="education-content-container">
              <p className="education-content">Signup to get started </p>
              <p className="education-sub-content">
                2,97,565 students and parents signed up to study <br />
                abroad. Make an informed decision about your abroad education.
              </p>
            </div>
          </div>
          <div className="education-heading">
            <p className="education-sub-heading">3. Current education details</p>
            <p className="education-sub-sub-heading">
              Accurate details will help us show universities & scholarships that
              match your profile.
            </p>
          </div>
          <div className="education-form">
            {headings.map((heading, index) => (
              <div className="education-row" key={index}>
                <div className="education-row-heading">
                  <p>{heading}</p>
                </div>
                <div className="education-boxes">
                  <div className="upload-box">
                    <label className="upload-label">
                      <input type="file" className="file-input" />
                      <FaUpload className="upload-icon" />
                    </label>
                  </div>
                  <div className="marks-box">
                    <input
                      type="text"
                      className="marks-input"
                      placeholder="Enter marks"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="consent-container">
            <label className="consent-label">
              <input
                type="checkbox"
                checked={consent}
                onChange={handleConsentChange}
                className="consent-checkbox"
              />
              I have read and provide consent for my data to be processed for
              purposes mentioned in the Terms and Conditions and agree to be
              contacted for Education related services & promotions.
            </label>
          </div>
          <section className="education-button-container">
            <button type="submit" onClick={registerUser} className="education-request">
              Signup
            </button>
          </section>
        </div>
      </div>
    </>
  );
};

export default SignupEducation;
