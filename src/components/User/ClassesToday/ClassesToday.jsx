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
  const [loading, setLoading] = useState(true); // Set to true initially
  const baseURL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${baseURL}api/tutor/tutors?page=1&pageSize=&search`,
          {
            "user-agent": navigator.userAgent,
          }
        );
        setTutorList(response.data.data);
        setProgress(35);
      } catch (error) {
        console.error("Error fetching tutors:", error);
      } finally {
        setLoading(false); // Hide loader when data is fetched or on error
      }
    };

    fetchData();
  }, [baseURL]);

  return (
    <div className="relative w-full -z-10 flex-wrap overflow-y-scroll no-scrollbar flex">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-100 z-50">
          <Loader />
        </div>
      )}
      <div
        className={`w-full h-max p-5 overflow-y-scroll no-scrollbar ${
          loading ? "opacity-0" : "opacity-100"
        }`}
      >
        <h1 className="mt-4 text-base md:text-lg lg:text-xl font-poppins font-semibold">
          Tutors
        </h1>

        {/* Card Showing div */}
        <div className="w-full h-max max-w-[1200px] flex justify-center relative">
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-2 relative">
            {TutorList.map((tutor, index) => (
              <TutorCard key={index} tutor={tutor} />
            ))}
          </div>
        </div>
      </div>

      <div className="w-full pb-5 pl-8 pr-5 h-max border-none md:border-l-2 overflow-y-scroll no-scrollbar">
        <h1 className="font-poppins font-semibold text-base md:text-lg py-2">
          Classes Scheduled
        </h1>
        <h1 className="font-poppins text-sm md:text-base font-semibold">
          February
        </h1>
        <h1 className="py-2 font-poppins text-sm md:text-base">Schedule</h1>
        <div className="flex flex-col gap-8">
          <SheduleCard />
          <SheduleCard />
          <SheduleCard />
          <SheduleCard />
        </div>
      </div>
    </div>
  );
};

export default ClassesToday;

const TutorCard = ({ tutor }) => (
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
  </div>
);

const SheduleCard = ({}) => {
  return (
    <div className="">
      <div className="bg-[#F5F1F1] w-full flex py-2">
        <div className="w-[10%] border-r-2 flex font-bold justify-center items-center">
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
