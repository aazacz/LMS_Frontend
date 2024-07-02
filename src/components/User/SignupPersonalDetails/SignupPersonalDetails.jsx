import React, { useState } from "react";
import "./SignupPersonalDetails.css";
import personalDetailsImage from "../../../assets/SignupPersonalDetails/personal.svg";
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

    if (name === "number" || name === "parentNumber") {
      if (value.length > 10) return;
    } else if (name === "grade") {
      if (value.length > 2) return;
    } else if (name === "name") {
      if (!/^[a-zA-Z\s]*$/.test(value)) return;
    }

    setsession((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, grade, number, email, parentNumber, parentEmail } = session;

    if (!name || !/^[a-zA-Z\s]+$/.test(name)) {
      Swal.fire({
        icon: "warning",
        title: "Invalid Name",
        text: "Please enter a valid name with alphabets and spaces only.",
      });
      return;
    }

    if (!grade || isNaN(grade)) {
      Swal.fire({
        icon: "warning",
        title: "Invalid Grade",
        text: "Please enter a valid grade (numbers only, up to 2 digits).",
      });
      return;
    }

    if (!number || !/^\d{10}$/.test(number)) {
      Swal.fire({
        icon: "warning",
        title: "Invalid Mobile Number",
        text: "Please enter a valid 10-digit mobile number.",
      });
      return;
    }

    if (!email || !validateEmail(email)) {
      Swal.fire({
        icon: "warning",
        title: "Invalid Email",
        text: "Please enter a valid email address.",
      });
      return;
    }

    if (!parentNumber || !/^\d{10}$/.test(parentNumber)) {
      if (num < 10)
        Swal.fire({
          icon: "warning",
          title: "Invalid Parent Mobile Number",
          text: "Please enter a valid 10-digit parent mobile number.",
        });
      return;
    }

    if (!parentEmail || !validateEmail(parentEmail)) {
      Swal.fire({
        icon: "warning",
        title: "Invalid Parent Email",
        text: "Please enter a valid parent email address.",
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
    <div>
      <div className="personaldetailscontainer">
        <form onSubmit={handleSubmit}>
          <div className="flex">
            <div className="personaldetailsphoto">
              <img
                className="detailphoto -z-20"
                src={personalDetailsImage}
                alt="Personal Details"
              />
              <div className="details-content-container">
                <p className="details-content">Signup to get started</p>
                <p className="details-sub-content">
                  2,97,565 students and parents signed up to study <br />
                  abroad.Make an informed decision about your abroad education.
                </p>
              </div>
            </div>
          </div>
          <div className="personal-details-heading">
            <div className="details-heading ">
              <p className="deatils-sub-heading">1. Personal details</p>
              <p className="details-sub-sub-heading">
                This will create your account and enable you to receive
                recommendations (you can opt-out anytime)
              </p>
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
                    onKeyPress={(e) => {
                      const charCode = e.which ? e.which : e.keyCode;
                      if (charCode < 48 || charCode > 57) {
                        e.preventDefault();
                      }
                    }}
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
                    onKeyPress={(e) => {
                      const charCode = e.which ? e.which : e.keyCode;
                      if (charCode < 48 || charCode > 57) {
                        e.preventDefault();
                      }
                    }}
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
                <div className="input-row ">
                  <input
                    type="text"
                    className="detail-input"
                    name="parentNumber"
                    placeholder="Parent Number"
                    value={session.parentNumber}
                    onChange={handleChange}
                    pattern="\d*"
                    onKeyPress={(e) => {
                      const charCode = e.which ? e.which : e.keyCode;
                      if (charCode < 48 || charCode > 57) {
                        e.preventDefault();
                      }
                    }}
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
                <div className="flex flex-col md:flex-row items-center w-full justify-center">
                  <button type="submit" className="personal-detail-submit ">
                    Set Password
                  </button>
                </div>
              </section>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupPersonalDetails;
