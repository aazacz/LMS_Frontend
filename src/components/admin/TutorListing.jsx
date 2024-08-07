import React, { useEffect } from "react";
import profile from "../../assets/Admin/profile.jpeg";
import { FaStar } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaCirclePlus } from "react-icons/fa6";
import axios from "axios";
import { useState } from "react";
import ReusablePagination from "../reusable/ReusablePagination";
import Loader from "../reusable/Loader";

const baseURL = process.env.REACT_APP_API_URL;

const TutorCard = ({ tutor }) => {
  return (
    <Link to={`/admin/home/tutors/${tutor._id}`}>
      <div className="bg-[#F5F1F1] rounded-md border-[1px] shadow-lg border-gray-500  px-3 py-2 m-4 flex flex-row  cursor-pointer">
        <div className="w-[90%] ">
          <div className="flex items-center ">
            <div className="w-10 h-10  rounded-full overflow-hidden">
              {/* Placeholder for tutor image */}
              <img src={profile} className="object-" alt="tutor-image" />
            </div>

            <div className="ml-4">
              <h3 className="font-bold text-sm line-clamp-1 w-full font-poppins">
                {tutor?.name}{" "}
              </h3>
              <p className="text-gray-600 text-xs font-poppins">
                {2} Sessions attended
              </p>
              <span className=" font-semibold pr-2">{1}</span>
              <span className="text-xs text-gray-600">({1} Review)</span>
            </div>
          </div>

          <div className="flex justify-between mt-4">
            <div className="flex items-center">
              <span className="text-xs text-gray-500">SAT adv</span>
              <div className="ml-2 flex items-center ">
                <FaStar className="text-xs text-[#FFBB54] mr-1" />
                <span className=" font-semibold pr-2">{1}</span>
                <span className="text-xs text-gray-600">({1} Review)</span>
              </div>
            </div>
          </div>
        </div>
        <div className="  w-[10%] flex justify-center items-center">
          {" "}
          <FaAngleRight />{" "}
        </div>
      </div>
    </Link>
  );
};

const TutorListing = () => {
  const [TutorList, setTutorList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalRows, setTotalRows] = useState(0);
  const [loading, setLoading] = useState(true); // Loader state

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${baseURL}api/tutor/tutors?page=1&pageSize=&search=`, {
        "user-agent": navigator.userAgent,
      })
      .then((res) => {
        console.log(res.data.data);
        setTutorList(res.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching tutors:", error);
      });
  }, []);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  // Function to handle page size change
  const handlePageSizeChange = (event) => {
    setPageSize(parseInt(event.target.value, 10));
    setCurrentPage(1);
  };

  return (
    <div className=" m-4 ">
      {/*Add Button */}
      <div className="flex justify-end mx-4">
        <Link
          replace
          to={`/admin/home/tutors/addtutor`}
          className="bg-[#F5F1F1]"
        >
          <button
            className="flex items-center gap-4 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]
                                    p-1 rounded-lg border-slate-600 px-2  font-poppins text-sm"
          >
            <FaCirclePlus className="text-slate-600 " />
            Add Tutor
          </button>
        </Link>
      </div>
      <div className="font-poppins w-full flex flex-col col relative">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
            <Loader /> {/* Your Loader component */}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-x-2 ">
          {TutorList.map((tutor, index) => {
            return <TutorCard key={index} tutor={tutor} />;
          })}
        </div>

        <ReusablePagination
          currentPage={currentPage}
          pageSize={pageSize}
          totalRows={totalRows}
          handlePageChange={handlePageChange}
          handlePageSizeChange={handlePageSizeChange}
        />
      </div>
    </div>
  );
};

export default TutorListing;
