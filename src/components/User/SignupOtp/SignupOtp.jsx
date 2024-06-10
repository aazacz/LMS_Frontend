import React, { useState } from "react";
import "./SignupOtp.css";
import personalDetailsImage from "../../../assets/SignupPersonalDetails/personaldetails.png";
import UserNavbar from "../UserNavbar";
import { Link } from "react-router-dom";

const SignupOtp = () => {
  const [otp, setOtp] = useState(new Array(6).fill(""));

  const handleChange = (element, index) => {
    if (/^\d*$/.test(element.value)) {
      let newOtp = [...otp];
      newOtp[index] = element.value;
      setOtp(newOtp);

      // Focus next input if current value is not empty
      if (element.value && element.nextSibling) {
        element.nextSibling.focus();
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
          <p className="otp-content">Signup to get started </p>
          <p className="otp-sub-content">
            2,97,565 students and parents signed up to study <br />
            abroad. Make an informed decision about your abroad education.
          </p>
        </div>
      </div>
      <div className="otp-heading">
        <p className="otp-sub-heading">Submit OTP</p>
        <p className="otp-sub-sub-heading">
          OTP sent to 630XXXXXXXX6, <a href="#">Change?</a>
        </p>
      </div>
      <div className="otp-number">
        {otp.map((data, i) => {
          return (
            <input
              className="input"
              type="text"
              name="otp"
              maxLength="1"
              key={i}
              value={data}
              onChange={(e) => handleChange(e.target, i)}
              onFocus={(e) => e.target.select()}
            />
          );
        })}
      </div>
      <div className="otp-number-sub-heading">
        <p>
          Didn't receive the OTP yet? <a href="#">Send Again</a>
        </p>
      </div>
        <Link  to={'/signup/signupSat'}>
      <section className="otp-button-container">
        <button type="submit" className="otp-request">Confirm OTP</button>
      </section>
        </Link>
    </div>
    </div>
  );
};

export default SignupOtp;
