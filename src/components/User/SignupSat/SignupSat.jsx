import React, { useState } from "react";
import "./SignupSat.css";
import personalDetailsImage from "../../../assets/SignupPersonalDetails/personaldetails.png";
import UserNavbar from "../UserNavbar";
import { Link } from "react-router-dom";

const SignupSat = () => {
  const [selectedDate, setDate] = useState(null);
  const [open, setOpen] = useState(false);
  const [hasGivenSat, setHasGivenSat] = useState(null);

  const handleIconClick = () => {
    setOpen(!open);
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
            <p className="sat-content">Signup to get started </p>
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
          <input type="date" name="" id="" />

        </div>

        <div className="sat-exam-given">
          <p>Have you given any SAT before</p>
          <div className="sat-radio">
            <label>
              <input
                type="radio"
                name="givenSat"
                value="yes"
                checked={hasGivenSat === "yes"}
                onChange={() => setHasGivenSat("yes")}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="givenSat"
                value="no"
                checked={hasGivenSat === "no"}
                onChange={() => setHasGivenSat("no")}
              />
              No
            </label>
          </div>
        </div>
        <Link to={"/signup/signupEducation"}>
        <section className="sat-button-container">
          <button type="submit" className="sat-request">
            Next
          </button>
        </section>
        </Link>
      </div>
    </>
  );
};

export default SignupSat;
