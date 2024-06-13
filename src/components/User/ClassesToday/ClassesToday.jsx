import React from "react";
import "./ClassesToday.css";
import SearchIcon from "@mui/icons-material/Search";
import classroomimage from "../../../assets/ClassesToday/classestoday.png";
import NotificationsIcon from "@mui/icons-material/Notifications";
import importantimage from "../../../assets/ClassesToday/important.png";
import continuetests from "../../../assets/ClassesToday/continuetests.png";
import AcUnitIcon from '@mui/icons-material/AcUnit';

const ClassesToday = () => {
  const Stats = [
    {
      heading: "Classes",
      module: "05",
    },
    {
      heading: "Tests",
      module: "04/05",
    },
    {
      heading: "Quiz Won",
      module: "03/05",
    },
    {
      heading: "Assignments",
      module: "00/03",
    },
  ];

  return (
    <div className="classes-container">
    <div className="testt">

    </div>
      
      <div className="classes-heading">Classes Today 🗓️</div>
      <div className="content-container">
        <div className="parent-content-container">
          <div className="left-content">
            <div className="left-sub-content1">
              <p>
                Introduction to basic <br /> DSAT & MAT
              </p>
              <h1>David Beckham</h1>
              <div className="left-sub-content-box1">
                <p>1st Module</p>
                <p>🕒1Hr 30Min</p>
                <p>View course ➡️</p>
              </div>
              <div className="training-dates">
                <p>Training Dates*</p>
                <input
                  type="date"
                  className="training-date-box"
                  placeholder="Select Training Dates"
                />
              </div>
            </div>
            <div className="left-sub-content2">
              <img src={classroomimage} alt="classroom" />
              <div className="left-sub-content-box2">
                <p>Module 2</p>
                <p>🕒1Hr 30Min</p>
                <p>View course ➡️</p>
              </div>
              <div className="left-sub-content2-heading">
                <h1>David Beckham</h1>
                <p>
                  The community's need for applications that can facilitate
                  dailty activities is increasing as technology
                  advaces.Currently,The community's need for applications that
                  can facilitate daily activities is increasing as technology
                  advances,Currently.
                </p>
              </div>
              <div className="left-sub-content2-buttons">
                <button type="button" className="join-now-button">
                  Join Now
                </button>
                <button type="button" className="reschedule-button">
                  Reschedule
                </button>
                <button type="button" className="cancel-button">
                  Cancel
                </button>
              </div>
            </div>
          </div>
          <div className="continue-tests">
            <h1>Continue Tests</h1>
            <div className="test-item">
              <div className="test-image">
                <img src={continuetests} alt="Test image" />
              </div>
              <div className="test-details">
                <h2>SAT practice test</h2>
                <p>English & Writing Skills Test</p>
                <div className="progress-bar">
                  <div className="progress" style={{ width: "60%" }}></div>
                  <span className="progress-value">60%</span>
                </div>
              </div>
              <button className="continue-button">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
                </svg>
              </button>
            </div>
          </div>
          <div className="test-item">
            <div className="test-image">
              <img src={continuetests} alt="Test image" />
            </div>
            <div className="test-details">
              <h2>SAT practice test</h2>
              <p>English & Writing Skills Test</p>

     

              <div className="progress-bar">
                <div className="progress" style={{ width: "60%" }}></div>
                <span className="progress-value">60%</span>
              </div>
            </div>
            <button className="continue-button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
              </svg>
            </button>
          </div>
        </div>
        <div className="right-content">
          {/* <div className="right-heading">
            <NotificationsIcon className="notification-icon" />
            <p>
              Christian Bale <br />
              imvengance@gmail.com
            </p>
          </div> */}
          <div className="right-stats">
            <p>Stats</p>
            <div className="stats-grid">
              {Stats.map((member, index) => (
                <ConstData key={index} {...member} />
              ))}
            </div>
          </div>
          <div className="important-container">
            <p>Importants</p>
            <div className="important-grid">
              <img src={importantimage} alt="important" />
              <p>
                <span className="course-text">Course</span> Module 1
              </p>
              <p>Complete The Test 1 before proceeding for the next module.</p>
              <button type="test">Complete Test Now</button>
            </div>
            <div className="sats-grid">
              <p>
                SAT Assignment 1<br />
                View Feedback
              </p>
              <span>25/35</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ConstData = ({ heading, module }) => {
  return (
    <div className="stats-member">
      <div className="stats-member-box">
        <h1>{heading}</h1>
        <p>{module}</p>
      </div>
    </div>
  );
};

export default ClassesToday;
