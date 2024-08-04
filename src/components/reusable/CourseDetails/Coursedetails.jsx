import React, { useEffect, useState } from "react";
import { BiSpreadsheet } from "react-icons/bi";
import { LuTimer } from "react-icons/lu";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "react-tooltip/dist/react-tooltip.css";
import { useSelector } from "react-redux";
import Loader from "../../reusable/Loader";
import { IoIosCloseCircle } from "react-icons/io";
import { AdminAxiosInstance } from "../../../routes/AdminRoutes";
import Asidebar from "./AsideBar";
import AboutContent from "./AboutContent";
import ModuleContent from "./ModuleContent";
import ReviewContent from "./ReviewContent";
import AddDeletemodal from "./AddDeletemodal";
import TestsContent from "./TestsContent";

const Coursedetails = () => {
  const baseUrl = process.env.REACT_APP_API_URL;
  const token = useSelector((state) => state.AdminDetails.token);
  const [Course, SetCourse] = useState();
  const [Loading, SetLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("about");
  const [slideDirection, setSlideDirection] = useState("left");

  const [TutorDropDownLoader, SetTutorDropDownLoader] = useState(false);
  const [StudentDropDownLoader, SetStudentDropDownLoader] = useState(false);
  const [loader, setLoader] = useState(false);

  const [TutorDropDownList, SetTutorDropDownList] = useState();
  const [StudentDropDownList, SetStudentDropDownList] = useState();
  const [EnrolledStudentDropDownList, SetEnrolledStudentDropDownList] =
    useState();
  const [EnrolledTutorDropDownList, SetEnrolledTutorDropDownList] = useState();

  const [StudentModal, setStudentModal] = useState(false);
  const [TutorModal, setTutorModal] = useState(false);
  const [count, setcount] = useState(0);

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
        SetCourse(response.data);
      });
  }, [baseUrl, courseId, token]);

  useEffect(() => {
    const getStudentList = async () => {
      const response = await AdminAxiosInstance.get(
        `api/course/student-not-added/${courseId}`
      );
      const EnrolledStudents = await AdminAxiosInstance.get(
        `api/course/student-enrolled/${courseId}`
      );
      console.log("Student list");

      console.log(response.data);
      console.log(EnrolledStudents.data);
      if (response.data && EnrolledStudents.data) {
        SetEnrolledStudentDropDownList(EnrolledStudents.data);
        SetStudentDropDownList(response.data);
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
      console.log("courseId", courseId);
      SetTutorDropDownLoader(true);

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
        SetTutorDropDownLoader(false);
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
        <div className="w-full bg-gray-300 h-max flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <>
          {StudentModal ? (
            <AddDeletemodal
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
            <AddDeletemodal
              List={TutorDropDownList}
              Role="Tutor"
              HandleModalClose={HandleModalClose}
              courseId={courseId}
              setcount={setcount}
              Loader={false}
              List2={EnrolledTutorDropDownList}
            />
          ) : null}

          <div className="flex  flex-col lg:flex-row   ">
            <div className="md:w-[70%] w-full   p-4 flex flex-col">
              <div className="w-full h-[200px]  md:h-[300px] bg-gray-800 flex items-center justify-center text-white font-semibold font-poppins text-2xl md:text-3xl">
                Introduction to SAT & DSAT
              </div>

              <div className="w-full  mt-4">
                <h1 className="font-bold text-lg md:text-xl font-poppins">
                  Introduction to Basic SAT & DSAT
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

              <div className="w-full bg-blue-400 mt-4">
                <div className="flex w-full gap-x-4">
                  {["about", "module", "tests", "review"].map((tab, index) => (
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

              <div className="relative mt-4 overflow-hidden h-64">
                <div className={`slide-content ${slideDirection}`}>
                  {activeTab === "about" && <AboutContent />}
                  {activeTab === "module" && <ModuleContent course={Course} />}
                  {activeTab === "tests" && <TestsContent />}
                  {activeTab === "review" && <ReviewContent />}
                </div>
              </div>
            </div>
            <Asidebar {...asidebarProps} />
          </div>
        </>
      )}
    </>
  );
};

export default Coursedetails;
