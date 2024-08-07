import React, { useEffect, useState } from "react";
import { BiSpreadsheet } from "react-icons/bi";
import { LuTimer } from "react-icons/lu";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "react-tooltip/dist/react-tooltip.css";
import { useSelector } from "react-redux";
import Loader from "../../reusable/Loader";
import { AdminAxiosInstance } from "../../../routes/AdminRoutes";
import Asidebar from "./AsideBar";
import AboutContent from "./AboutContent";
import ModuleContent from "./ModuleContent";
import ReviewContent from "./ReviewContent";
import TestsContent from "./TestsContent";
import ListModal from "./ListModal";
import { IoChevronBackCircleOutline } from "react-icons/io5";

const Coursedetails = ({ edit }) => {
  const baseUrl = process.env.REACT_APP_API_URL;
  const token = useSelector((state) => state.AdminDetails.token);
  const [Course, SetCourse] = useState();
  const [Loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("about");
  const [slideDirection, setSlideDirection] = useState("left");

  const [TutorDropDownList, SetTutorDropDownList] = useState();
  const [StudentDropDownList, SetStudentDropDownList] = useState();
  const [EnrolledStudentDropDownList, SetEnrolledStudentDropDownList] =  useState();
  const [EnrolledTutorDropDownList, SetEnrolledTutorDropDownList] = useState();

  const [StudentModal, setStudentModal] = useState(false);
  const [TutorModal, setTutorModal] = useState(false);
  const [count, setcount] = useState(0);

  const [isPending,setisPending] = useState(false)


  const { courseId } = useParams();
  const navigate = useNavigate();

  const handleTabClick = (tab) => {
    setSlideDirection(
      activeTab === "about" && tab === "module" ? "left" : "right"
    );
    setActiveTab(tab);
  };

  useEffect(() => {
    
    AdminAxiosInstance.get(`api/course/get-course/${courseId}`, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response.data);
        SetCourse(response.data);
      });
  }, [baseUrl, courseId, token]);

  

  useEffect(() => {
    console.log(courseId);

    const getStudentList = async () => {
      try {
        setisPending(true)
        const response = await AdminAxiosInstance.get(
          `api/course/paid-students/${courseId}`
        );
        console.log("response.data student not addeddddd");
        console.log(response.data);
        if (response.data) {
          SetStudentDropDownList(response.data);
          setisPending(false)
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          console.log("Student not added list returned 404");
        } else {
          console.log(error);
        }
      }

      try {
        setisPending(true)
        const EnrolledStudents = await AdminAxiosInstance.get(
          `api/course/student-enrolled/${courseId}`
        );
        
        if (EnrolledStudents.data) {

          SetEnrolledStudentDropDownList(EnrolledStudents.data);
          setisPending(false)
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          console.log("Enrolled student list returned 404");
        } else {
          console.log(error);
        }
      }
    };
    try {
      if (StudentModal === true) {
        getStudentList();
      }
    } catch (error) {
      console.log(error);
    }
  }, [StudentModal, count]);

  useEffect(() => {
    const getTutorList = async () => {
      
      setisPending(true)

      const response = await AdminAxiosInstance.get(
        `api/course/tutor-not-added/${courseId}`
      );
      const EnrolledTutors = await AdminAxiosInstance.get(
        `api/course/tutor-enrolled/${courseId}`
      );
      console.log("tutor list");
      console.log(EnrolledTutors.data);
      if (response.data && EnrolledTutors.data) {
        SetTutorDropDownList(response.data);
        SetEnrolledTutorDropDownList(EnrolledTutors.data);
        setisPending(false)
      }
    };

    try {
      if (TutorModal === true) {
        getTutorList();
      }
    } catch (error) {
      console.log(error);
    }
  }, [TutorModal, count]);

  //function to close the modal
  const HandleModalClose = () => {
    setTutorModal(false);
    setStudentModal(false);
  };

  const asidebarProps = {
    course: Course,
    setTutorModal: setTutorModal,
    setStudentModal: setStudentModal,
  };

  return (
    <>
      {Loading ? (
        <div className="w-full bg-gray-300 h-screen flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <>
          {StudentModal ? (
            <ListModal
            isPending={isPending}
              List={StudentDropDownList}
              Role="Student"
              HandleModalClose={HandleModalClose}
              courseId={courseId}
              Loader={false}
              setcount={setcount}
              List2={EnrolledStudentDropDownList}

            />
          ) : null}

          {TutorModal ? (
            <ListModal
            isPending={isPending}
              List={TutorDropDownList}
              Role="Tutor"
              HandleModalClose={HandleModalClose}
              courseId={courseId}
              setcount={setcount}
              Loader={false}
              List2={EnrolledTutorDropDownList}
            />
          ) : null}

          <div className="flex flex-col lg:flex-row  ">
            <div className=" w-full   p-4 flex flex-col">
              <button
                className="w-[50%]"
                onClick={() => navigate(-1)}
              >
                <IoChevronBackCircleOutline className="text-4xl mb-2 " />
              </button>
              <div className="w-full h-[200px]  md:h-[300px] bg-gray-800 flex items-center justify-center text-white font-semibold font-poppins text-2xl md:text-3xl">
                {Course ? Course.courseName : ""}
              </div>

              <div className="w-full  mt-4">
                <h1 className="font-bold text-lg md:text-xl font-poppins">
                  {Course ? Course.courseName : ""}
                </h1>
                <div className="flex items-center gap-x-6 mt-2">
                  <span className="flex items-center gap-x-1 text-sm font-poppins">
                    <BiSpreadsheet className="text-gray-400" />
                    {Course ? Course.modules.length : 0} Modules
                  </span>
                  <span className="flex items-center gap-x-1 text-sm font-poppins">
                    <LuTimer className="text-gray-400" />
                    {Course && Course.trainingDuration}Hrs
                  </span>
                </div>
              </div>

              <div className="w-full mt-4 relative">
                <div className="flex w-full gap-x-6 px-2">
                  {["about", "modules", "tests", "review"].map((tab, index) => (
                    <button
                      key={index}
                      className={`relative py-2 ${
                        activeTab === tab ? "border-b-4 border-amber-500" : ""
                      }`}
                      onClick={() => handleTabClick(tab)}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="text-sm  md:text-base relative mt-4 overflow-hidden h-max">
                {activeTab === "about" && (
                  <AboutContent about={Course?.description} />
                )}
                {activeTab === "modules" && (
                  <ModuleContent modules={Course?.modules} />
                )}
                {activeTab === "tests" && (
                  <TestsContent tests={Course?.tests} />
                )}
                {activeTab === "review" && (
                  <ReviewContent review={Course?.review} />
                )}
              </div>
            </div>
            <Asidebar className="hidden lg:block" {...asidebarProps} />
          </div>
        </>
      )}
    </>
  );
};

export default Coursedetails;
