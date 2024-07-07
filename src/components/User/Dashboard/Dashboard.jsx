import React from "react";
import "./Dashboard.css";
import SearchIcon from "@mui/icons-material/Search";
import classroomimage from "../../../assets/ClassesToday/classestoday.png";
import NotificationsIcon from "@mui/icons-material/Notifications";
import importantimage from "../../../assets/ClassesToday/important.png";
import continuetests from "../../../assets/ClassesToday/continuetests.png";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import Swal from "sweetalert2";
import { FaCalendarAlt } from "react-icons/fa";
import { FaClock } from "react-icons/fa6";
import { FaArrowRightLong } from "react-icons/fa6";

const Dashboard = () => {
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
  const handleReschedule = () => {
    Swal.fire({
      title: "Are you sure want to reschedule?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Reschedule",
      customClass: {
        actions: "my-actions",
        confirmButton: "my-confirm-button",
        denyButton: "my-deny-button",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Rescheduled!",
          text: "Your Class has been rescheduled.",
          icon: "success",
          customClass: {
            confirmButton: "my-toast-confirm-button",
          },
        });
      }
    });
  };

  return (
    <div className="  font-poppins h-screen overflow-y-scroll no-scrollbar classes-container">
      <div className=" testt">
        <h1 className="p-2 font-semibold text-base md:text-base lg:text-lg ">
          Dashboard
        </h1>
        <div className=" classes-heading h-max text-sm md:text-base  p-2 flex gap-2 items-center">
          Classes Today
          <FaCalendarAlt className=" text-[#0066DE]" />{" "}
        </div>
        <div className=" content-container ">
          <div className="  left-content  flex-wrap">
            <div className="left-sub-content1 w-full  lg:w-[45%] p-4 m-2">
              <div className="p-2 gap-2 flex justify-between text-sm md:text-base">
                <p className=" w-max">
                  Introduction to basic <br /> DSAT & MAT
                </p>
                <h1 className="w-max ">
                  David
                  <br /> Beckham
                </h1>
              </div>

              <div className="left-sub-content-box1 flex-col md:flex-row p-2 justify-around  text-xs md:text-sm">
                <p className="p-2 text-sm ">1st Module</p>
                <p className="flex p-2 items-center ">
                  {" "}
                  <FaClock className="text-lg" />
                  1Hr 30Min
                </p>
                <p className="flex p-2 items-center text-semibold">
                  View course
                  <FaArrowRightLong className="text-black" />{" "}
                </p>
              </div>
              <div className="training-dates text-sm md:text-base">
                <p>
                  Training Dates <span className="text-red-900">*</span>
                </p>
                <input
                  type="date"
                  className="training-date-box text-sm"
                  placeholder="Select Training Dates"
                />
              </div>
            </div>
            <div className="left-sub-content2 p-2 m-2 w-full  lg:w-[50%]">
              <img src={classroomimage} alt="classroom" />
              <div className="left-sub-content-box2">
                <p>Module 2</p>
                <p className="flex justify-center items-center">
                  <FaClock />
                  1Hr 30Min
                </p>
                <p className="flex justify-center items-center">
                  View course <FaArrowRightLong />
                </p>
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
                <button type="button" className="join-now-button common-button">
                  Join Now
                </button>

                <button
                  type="button"
                  onClick={handleReschedule}
                  className="reschedule-button common-button"
                >
                  Reschedule
                </button>
                <button type="button" className="cancel-button common-button">
                  Cancel
                </button>
              </div>
            </div>

            <div className=" p-2  continue-tests">
              <h1 className=" text-sm md:text-[16px] w-full flex justify-start">
                Continue Tests
              </h1>
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
              <div className="test-item ">
                <div className="test-image">
                  <img src={continuetests} alt="Test image" />
                </div>
                <div className="test-details ">
                  <h2 className="text-sm md:text-[16px]">SAT practice test</h2>
                  <p className="text-sm">English & Writing Skills Test</p>

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
          </div>
          <div className="p-2 right-content sm:hidden md:flex   ">
            <div className="rounded-lg right-stats">
              <p>Stats</p>
              <div className="grid grid-flow-row grid-cols-1 lg:grid-cols-2 gap-4 justify-center items-center">
                {Stats.map((member, index) => (
                  <ConstData
                    className="flex flex-col justify-center items-center bg-red-800"
                    key={index}
                    {...member}
                  />
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <p className="text-lg lg:text-2xl font-bold flex justify-center items-center">
                Importants
              </p>
              <div className="flex flex-col gap-2 bg-gray-100">
                <div className="p-4 flex flex-col gap-4">
                  {" "}
                  <img src={importantimage} alt="important" />
                  <p className="text-base">
                    <span className="text-lg font-semibold">Course</span> <br />{" "}
                    Module 1
                  </p>
                  <p className="text-sm">
                    Complete The Test 1 before proceeding for the next module.
                  </p>
                  <button className="text-bold  py-2 px-4 rounded-lg bg-[#f99406]">
                    Complete Test Now
                  </button>
                </div>
              </div>
              <div className="sats-grid">
                <p className="text-sm ">
                  SAT Assignment 1<br />
                  View Feedback
                </p>
                <span>25/35</span>
              </div>
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

export default Dashboard;
