import React, { useEffect, useState } from "react";
import coursephoto from "/coursephoto.jpeg";
import { BiSpreadsheet } from "react-icons/bi";
import { LuTimer } from "react-icons/lu";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import Loader from "../reusable/Loader";
import Swal from "sweetalert2";

const Coursedetails = ({ height }) => {
  const baseUrl = process.env.REACT_APP_API_URL;
  const token = useSelector((state) => state.AdminDetails.token);
  const [Course, SetCourse] = useState();
  const [Loading, SetLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("about");
  const [slideDirection, setSlideDirection] = useState("left");

  const { courseId } = useParams();

  const handleTabClick = (tab) => {
    setSlideDirection(
      activeTab === "about" && tab === "module" ? "left" : "right"
    );
    setActiveTab(tab);
  };

  useEffect(() => {
    axios
      .get(`${baseUrl}api/course/get-course/${courseId}`, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log("response.data");
        console.log(response.data);
        SetCourse(response.data);
      });
  }, []);

  return (
    <>
      {Loading ? (
        <div className="w-full bg-gray-300 h-max flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <>
          <div className="h-full flex bg-red-500">
            <div className="w-[70%]  scroll overflow-y-scroll  p-4 flex flex-col ">
              <div className="w-full h-[300px] bg-gray-800 flex items-center justify-center text-white font-semibold font-plusjakartasans text-3xl">
                {" "}
                Introduction to SAT & DSAT
              </div>

              <div className="w-full  ">
                {/* heading and Module line */}
                <div className="mt-4">
                  <h1 className="font-bold text-xl font-plusjakartasans ">
                    Introduction to Basic SAT & DSAT
                  </h1>
                  <div className="flex items-center gap-x-6 mt-2">
                    <span className="flex items-center gap-x-1 text-sm font-plusjakartasans">
                      <BiSpreadsheet className="text-gray-400" />{" "}
                      {Course ? Course.modules.length : 0} Modules
                    </span>
                    <span className="flex items-center gap-x-1 text-sm font-plusjakartasans">
                      <LuTimer className="text-gray-400" />{" "}
                      {Course && Course.trainingDuration}Hrs
                    </span>
                  </div>
                </div>

                <div className="w-full bg-blue-400 mt-4 relative">
                  <div className="flex w-full gap-x-4">
                    {["about", "module", "tests", "review"].map(
                      (tab, index) => (
                        <button
                          key={index}
                          className={`relative py-2 ${
                            activeTab === tab
                              ? "border-b-4 border-amber-500"
                              : ""
                          }`}
                          onClick={() => handleTabClick(tab)}
                        >
                          {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                      )
                    )}
                  </div>

                  {/* <div className={`underline absolute bottom-0 h-1 bg-amber-500 transition-all duration-300 ${activeTab}`} /> */}
                </div>

                <div className="relative mt-4 overflow-hidden h-64">
                  <div className={`slide-content ${slideDirection}`}>
                    {activeTab === "about" && <AboutContent />}
                    {activeTab === "module" && (
                      <ModuleContent course={Course} />
                    )}
                    {activeTab === "tests" && <TestsContent />}
                    {activeTab === "review" && <ReviewContent />}
                  </div>
                </div>
              </div>
            </div>
            <AsideBAr course={Course} />
          </div>
        </>
      )}
    </>
  );
};

export default Coursedetails;

const AboutContent = () => {
  <div className="bg-red-300">About Content</div>;
};
const ModuleContent = ({ Course }) => {
  const [modules, setModules] = useState([]);
  console.log("course");

  useEffect(() => {
    if (Course && Course.modules) {
      setModules(Course.modules);
    }
  }, [Course]);

  return (
    <div className="bg-green-300 w-full h-full  border-2 ">
      <h1></h1>
    </div>
  );
};

const TestsContent = () => {
  <div className="bg-blue-300">Tests Content</div>;
};
const ReviewContent = () => {
  <div className="bg-yellow-300">Review Content</div>;
};

const AsideBAr = ({ course, id }) => {
  const { courseId } = useParams();
  const baseUrl = process.env.REACT_APP_API_URL;
  const token = useSelector((state) => state.AdminDetails.token);
  const navigate = useNavigate();
  const [modules, setModules] = useState([]);

  useEffect(() => {
    if (course && course.modules) {
      setModules(course.modules);
    }
  }, [course]);

  const deleteHandler = (id) => {
    axios
      .delete(`${baseUrl}api/course/delete/${id}`, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.data.message === "Course deleted successfully") {
          Swal.fire({
            timer: 2000,
            timerProgressBar: true,
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
          navigate("/admin/home/courses");
        }
      })
      .catch((error) => {
        console.warn(error);
        Swal.fire({
          title: "Error!",
          text: "There was an error deleting the course. Please try again later.",
          icon: "error",
        });
      });
  };

  const handleDeleteCourse = () => {
    Swal.fire({
        
      title: `Are you sure you want to delete this course?`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#eb5048",
      cancelButtonColor: "#878ca7",
      confirmButtonText: "Delete Course!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Are you absolutely sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          timer: 2000,
          timerProgressBar: true,
          showCancelButton: true,
          confirmButtonColor: "#eb5048",
          cancelButtonColor: "#878ca7",
          confirmButtonText: "Yes, delete it!",
        }).then((result) => {
          if (result.isConfirmed) {
            deleteHandler(courseId);
          }
        });
      }
    });
  };

  return (
    <>
      <div className="sticky top-[10vh] bg-slate-200 w-[30%] flex flex-col ">
        <div className="p-6 ">
          <h1 className="font-plusjakartasans font-bold ">Modules List</h1>

          <div className="bg-white rounded-lg flex flex-col mt-5 p-5 items-center">
            <h1 className="font-plusjakartasans font-bold line-clamp-2">
              Introduction Basic SAT & DSAT
            </h1>

            {modules.map((value, index) => {
              return (
                <div
                  key={index}
                  className="flex w-full justify-between  items-center py-5"
                >
                  <div className="flex  gap-x-3 items-center w-[65%]  ">
                    <div>
                      <div className="w-6 h-6 bg-[#C75625] text-white rounded-[5px] text-sm flex justify-center items-center">
                        {index + 1}
                      </div>
                    </div>

                    <h1 className=" text-orange-600 text-[12px] line-clamp-1">
                      {value.moduleName}
                    </h1>
                  </div>

                  <h1 className="w-[35%] text-right text-xs text-gray-400">
                    {" "}
                    {value.sessions ? value.sessions.length : "0"} Sessions
                  </h1>
                </div>
              );
            })}

            {/* <div className='w-[90%] flex justify-center items-center bg-[#FFBB54] text-black rounded-md py-2'>Edit</div> */}
          </div>
        </div>
        {/* Delete Button */}

        <div className="w-full h-7 px-4 ">
          <div
            className="cursor-pointer
                    w-full h-8 rounded-xl
                    flex justify-center 
                    items-center text-base 
                    font-semibold font-poppins 
                    border-[1px] text-red-700 
                    border-red-600  bg-opacity-30 
                    bg-red-500 "
            onClick={handleDeleteCourse}
          >
            <h1>Delete Course</h1>
          </div>
        </div>
      </div>
    </>
  );
};
