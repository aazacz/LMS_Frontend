import React from "react";
import "./HomePageDiagnosis.css";

const HomePageDiagnosis = () => {
  return (
    <div className="container">
      <div className="left">
        <p className="left-heading">
          Get Your <span>Diagnosis Test </span> Now
        </p>
        <div className="left-line"></div>
        <p className="left-sub-heading">Get 30% off your first year on Unlimited online courses.</p>
        <p className="left-sub-sub-heading">
          Invest in your future with Unlimited access to 1400+ high-quality
          short courses and digital certificates from world-class institutions.
        </p>
        <button className="left-box-btn">Get Now</button>
      </div>
      <div className="right">
        <div className="right-box">
          <div className="icon">
            <img
              src="https://cdn-icons-png.flaticon.com/512/1263/1263935.png"
              alt="icon"
            />
          </div>
          <p>
            If you had already appeared for the test, Upload your test score to
            directly enroll into a course based on suggestions
          </p>
          <button className="right-box-btn">Upload Now</button>
        </div>
      </div>
    </div>
  );
};
export default HomePageDiagnosis;
