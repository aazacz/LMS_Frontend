import React, { useState, useEffect } from "react";
import "./SignupSat.css";
import personalDetailsImage from "../../../assets/SignupPersonalDetails/personal.svg";
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
    console.log("storedDetailsdata");
    if (!comingSatExamDate || isSatExamtaken === null) {
      Swal.fire({
        icon: "warning",
        title: "All fields are required",
        text: "Please fill out all fields before proceeding.",
      });
    } else {
      try {
        console.log("storedDetails");
        const storedDetails = JSON.parse(
          sessionStorage.getItem("SignupPersonalDetails"),
        );
        sessionStorage.setItem(
          "SignupPersonalDetails",
          JSON.stringify({
            ...storedDetails,
            comingSatExamDate,
            isSatExamtaken,
          }),
        );
        navigate("/signup/signupEducation");
      } catch (error) {
        console.error("Error in storing SAT details", error);
      }
    }
  };

  return (
    <>
      <div className="satcontainer bg-white bg-opacity-50">
        <form onSubmit={handleSubmit}>
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
          <div className="sat-details-heading">
            <div className="sat-heading">
              <p className="sat-sub-heading">2. SAT Exam preference</p>
              <p className="sat-sub-sub-heading">
                This helps us show you information related to your courses &
                country of interest.
              </p>
              <div className="sat-exam">
                <p>When do you plan to take your SAT Exam?</p>
              </div>
              <div className="sat-date">
                <input
                  className="bg-transparent outline-none w-full placeholder:text-black"
                  type="date"
                  value={comingSatExamDate}
                  onChange={handleDateChange}
                />
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
              <div className="flex flex-col md:flex-row items-center w-full justify-center">
                <button type="submit" className="sat-request">
                  Fill in the details
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignupSat;
