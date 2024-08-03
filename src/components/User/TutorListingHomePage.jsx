import React, { useEffect, useState } from "react";
import profile from "../../assets/Admin/profile.jpeg";
import { FaStar, FaAngleRight } from "react-icons/fa";
import axios from "axios";
import mindsatLoader from "../../assets/Tutor/mindsatLoader.gif";

const TutorCard = ({ tutor }) => (
  <div className="bg-[#F5F1F1] rounded-md border-[1px] shadow-lg border-gray-500 px-3 py-2 m-2 flex flex-row items-center">
    <div className="w-10 h-10 rounded-full overflow-hidden">
      <img src={profile} className="object-cover" alt="tutor" />
    </div>
    <div className="ml-2 w-full">
      <h3 className="font-bold text-sm line-clamp-1 w-full font-plusjakartasans">
        {tutor?.name}
      </h3>
      <p className="text-gray-600 text-xs font-plusjakartasans">
        {2} Sessions attended
      </p>
      <div className="flex items-center mt-1">
        <FaStar className="text-xs text-[#FFBB54] mr-1" />
        <span className="font-semibold pr-2">{1}</span>
        <span className="text-xs text-gray-600">({1} Review)</span>
      </div>
    </div>
    <FaAngleRight className="text-gray-600" />
  </div>
);

const TutorListingHomePage = () => {
  const [TutorList, setTutorList] = useState([]);
  const [Loader, setLoader] = useState(true);
  const baseURL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    axios
      .get(`${baseURL}api/tutor/tutors?page=1&pageSize=5&search=`, {
        "user-agent": navigator.userAgent,
      })
      .then((res) => {
        setTutorList(res.data.data);
        setLoader(false);
      })
      .catch((error) => {
        console.error("Error fetching tutors:", error);
        setLoader(false);
      });
  }, []);

  return (
    <div className="relative p-2 w-full h-max overflow-y-scroll no-scrollbar">
      {Loader ? (
        <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 flex justify-center items-center bg-opacity-75 z-10">
          <img src={mindsatLoader} className="w-[100px]" alt="Loading..." />
        </div>
      ) : (
        <div className="w-full flex flex-col ">
          <div>
            <p className="font-poppins font-bold text-left mt-3">Tutors Best In Market</p>
          </div>
          {TutorList.map((tutor, index) => (
            <TutorCard key={index} tutor={tutor} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TutorListingHomePage;
