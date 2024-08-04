import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import Loader from "../../reusable/Loader";
import profile from "../../../assets/Student/profile.jpeg";
import AssignmentImage from "../../../assets/Student/AssignmentImage.png";
import { FaArrowRight } from "react-icons/fa";
import "./ClassesToday.css";
const ClassesToday = () => {
  const [progress, setProgress] = useState(25);
  const [TutorList, setTutorList] = useState([]);
  const [loader, setLoader] = useState(true);
  const baseURL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    axios
      .get(`${baseURL}api/tutor/tutors?page=1&pageSize=5&search`, {
        "user-agent": navigator.userAgent,
      })
      .then((res) => {
        setTutorList(res.data.data);
        setLoader(false); //set Loader False
        setProgress(35); //Set the progress bar
      })
      .catch((error) => {
        console.error("Error fetching tutors:", error);
        setLoader(true); //If Error the loader stil works
      });
  }, []);

  return (
    <div
      className={`w-full -z-10 flex-wrap  overflow-y-scroll no-scrollbar flex relative`}
    >
      <>
        <div className="w-full md:w-[70%] h-max p-5 overflow-y-scroll no-scrollbar ">
          <div className="flex items-center ">
            {/* <Link to={"/student/classestoday"}>
              <button className="font-poppins text-sm lg:text-base font-semibold p-2 bg-[#F99406]  rounded-lg shadow-lg">
                {" "}
                Classes Today
              </button>
            </Link> */}
            {/* <div className="rounded-full w-2 h-2 animate-ping bg-green-600 relative -top-5 right-2 "></div> */}
          </div>

          <h1 className="mt-4 text-base md:text-lg lg:text-xl font-poppins font-semibold ">
            {" "}
            Tutors
          </h1>

          {/* Card Showing div */}
          <div className="w-full   h-max  max-w-[1200px] flex justify-center relative">
            {loader ? (
              <Loader />
            ) : (
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-2 relative">
                {TutorList.map((tutor, index) => (
                  <TutorCard key={index} tutor={tutor} />
                ))}
              </div>
            )}
          </div>

          {/* Pending Assignments */}
          <div className="w-full h-max py-4  flex flex-col gap-y-4">
            <h1 className="font-poppins text-base md:text-lg lg:text-xl font-semibold  py-2">
              {" "}
              Pending Assignment
            </h1>
            {/* Progress Bar */}
            {/* <label for="file">progress</label>
                        <progress id="file" className='progressbar' value="32" max="100" /> */}

            <PendingAssignments progress={progress} />
            <PendingAssignments progress={progress} />
          </div>

          {/* Materials  */}
          <div className="w-full h-max py-4 ">
            <h1 className="font-poppins  text-base md:text-lg lg:text-xl font-semibold  py-2">
              {" "}
              Completed Assignment
            </h1>

            <PendingAssignments progress={100} />
          </div>
        </div>
        <div className="w-full pb-5 pl-8 pr-5 md:w-[30%] h-max border-none md:border-l-2 overflow-y-scroll no-scrollbar">
          <h1 className="font-poppins font-semibold  text-base md:text-lg  py-2">
            Classes Sheduled
          </h1>
          <h1 className="font-poppins text-sm md:text-base font-semibold">
            February
          </h1>
          <h1 className="py-2 font-poppins text-sm md:text-base">Schedule</h1>
          <div className="flex flex-col gap-y-4">
            <SheduleCard />
            <SheduleCard />
            <SheduleCard />
            <SheduleCard />
          </div>
        </div>
      </>
    </div>
  );
};

export default ClassesToday;

const ProgressBar = ({ progress }) => {
  return (
    <div className="w-full  bg-white  rounded-full h-2 ">
      <div
        className="bg-[#F99406] h-2 rounded-full"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

const TutorCard = ({ tutor }) => (
  // <Link to={`/student/tutors/${tutor._id}`}>
  <div className="bg-[#F5F1F1] rounded-md border-[1px] shadow-lg border-gray-500 px-3 py-2 m-4 flex flex-row cursor-pointer">
    <div className="w-[90%] ">
      <div className="flex items-center ">
        <div className="w-10 h-10 rounded-full overflow-hidden">
          <img src={profile} className="object-cover" alt="tutor-image" />
        </div>
        <div className="ml-4">
          <h3 className="font-bold text-sm line-clamp-1 w-full font-poppins">
            {tutor?.name}
          </h3>
          <p className="text-gray-600 text-xs font-poppins">
            {2} Sessions attended
          </p>
        </div>
      </div>
      <div className="flex justify-between mt-4">
        <div className="flex items-center">
          <span className="text-xs text-gray-500">SAT adv</span>
          <div className="ml-2 flex items-center ">
            <FaStar className="text-xs text-[#FFBB54] mr-1" />
            <span className="font-semibold pr-2">{1}</span>
            <span className="text-xs text-gray-600">({1} Review)</span>
          </div>
        </div>
      </div>
    </div>
    {/* <div className="w-[10%] flex justify-center items-center">
        <FaAngleRight />
      </div> */}
  </div>
  // </Link>
);

const SheduleCard = ({}) => {
  return (
    <div className="">
      <div className="bg-[#F5F1F1] flex py-2">
        <div className="w-[20%] border-r-2 flex font-bold justify-center items-center">
          1
        </div>
        <div className="w-[80%] px-4 flex justify-between items-center">
          <div>
            <h1 className="font-bold">SAT</h1>
            <h1 className="font-light text-gray-400 text-xs">
              6 of 20 chapters
            </h1>
          </div>

          <h1 className="font-light text-gray-400 text-xs">17.00 - 18.00</h1>
        </div>
      </div>
    </div>
  );
};

const PendingAssignments = ({ progress }) => {
  return (
    <>
      <div className="w-full h-max p-2  flex bg-[#f2eaea] bg-greeen-200 rounded-lg shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] ">
        <div className="w-[10%] h-full  rounded-s-lg">
          <img src={AssignmentImage} className="w-full h-full" alt="" />
        </div>
        <div className="w-full md:w-[80%] flex-wrap h-full flex justify-center items-center">
          <div className="flex  w-full justify-left md:justify-between flex-wrap   gap-x-24 ">
            <div className="w-[50% ] pl-8">
              <h1 className="font-poppins font-semibold text-sm md:text-base lg:text-lg ">
                SAT Asssignment
              </h1>
              <h1 className="font-poppins text-sm  text-gray-500">
                English & Writing Skills test
              </h1>
            </div>

            <div className="mb-1 pl-8   w-full md:w-[80%] lg:w-[50%]">
              <div className="w-full max-w-md flex flex-col ">
                <div className="flex justify-between">
                  <h2 className="text-xs   text-left font-semibold text-gray-700">
                    Progress
                  </h2>
                  <h2 className="text-sm text-left text-[#F99406] font-semibold">
                    {" "}
                    {progress}%
                  </h2>
                </div>
                <ProgressBar progress={progress} />
              </div>
            </div>
          </div>
        </div>
        <div className="w-[10%] h-full flex justify-end px-2  items-center rounded-e-lg">
          <FaArrowRight className="text-2xl text-gray-800" />
        </div>
      </div>
    </>
  );
};
