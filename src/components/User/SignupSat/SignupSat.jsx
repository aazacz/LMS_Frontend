import React, { useState, useEffect } from "react";
import "./SignupSat.css";
import personalDetailsImage from "../../../assets/SignupPersonalDetails/personaldetails.png";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const SignupSat = () => {
  const [comingSatExamDate, setSelectedDate] = useState("");
  const [isSatExamtaken, setHasGivenSat] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedDetails = sessionStorage.getItem("SignupPersonalDetails");
    if (!storedDetails) {
      navigate("/signup/signupPersonalDetails");
    }
  }, [navigate]);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!comingSatExamDate || isSatExamtaken === null) {
      Swal.fire({
        icon: 'warning',
        title: 'All fields are required',
        text: 'Please fill out all fields before proceeding.',
      });
    } else {
      try {
        const storedDetails = JSON.parse(
          sessionStorage.getItem("SignupPersonalDetails")
        );
        sessionStorage.setItem(
          "SignupPersonalDetails",
          JSON.stringify({ ...storedDetails, comingSatExamDate, isSatExamtaken })
        );
        navigate("/signup/signupEducation");
      } catch (error) {
        console.error("Error in storing SAT details", error);
      }
    }
  };

  return (
    <>
      <div className="satcontainer">
        <div className="satphoto">
          <img
            className="satimage"
            src={personalDetailsImage}
            alt="Personal Details"
          />
          <div className="sat-content-container">
            <p className="sat-content">Signup to get started</p>
            <p className="sat-sub-content">
              2,97,565 students and parents signed up to study <br />
              abroad. Make an informed decision about your abroad education.
            </p>
          </div>
        </div>
        <div className="sat-heading">
          <p className="sat-sub-heading">2. SAT Exam preference</p>
          <p className="sat-sub-sub-heading">
            This helps us show you information related to your courses & country
            of interest.
          </p>
        </div>
        <div className="sat-exam">
          <p>When do you plan to take your SAT Exam?</p>
        </div>
        <div className="sat-date">
          <input type="date" value={comingSatExamDate} onChange={handleDateChange} />
        </div>

        <div className="sat-exam-given">
          <p>Have you given any SAT before?</p>
          <div className="sat-radio">
            <label>
              <input
                type="radio"
                name="givenSat"
                value="yes"
                checked={isSatExamtaken === "yes"}
                onChange={() => setHasGivenSat("yes")}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="givenSat"
                value="no"
                checked={isSatExamtaken === "no"}
                onChange={() => setHasGivenSat("no")}
              />
              No
            </label>
          </div>
        </div>
        <section className="sat-button-container">
          <button type="button" className="sat-request" onClick={handleSubmit}>
            Next
          </button>
        </section>
      </div>
    </>
  );
};

export default SignupSat;
