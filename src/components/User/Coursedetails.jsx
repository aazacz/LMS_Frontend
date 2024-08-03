import React, { useEffect, useState } from "react";
import { BiSpreadsheet } from "react-icons/bi";
import { LuTimer } from "react-icons/lu";
import { useParams } from "react-router-dom";
import axios from "axios";
import "react-tooltip/dist/react-tooltip.css";
import { useSelector } from "react-redux";
import Loader from "../reusable/Loader";
import Asidebar from "./AsideBar";
import AboutContent from "./AboutContent";
import ModuleContent from "./ModuleContent";
import ReviewContent from "./ReviewContent";
import TestsContent from "./TestsContent";
// import ListModal from "./ListModal";
import { axiosInstanceStudent } from "../../routes/UserRoutes";
import UserNavbar from "./UserNavbar";

const Coursedetails = ({ edit }) => {
  const baseUrl = process.env.REACT_APP_API_URL;
  const token = useSelector((state) => state.AdminDetails.token);
  const [Course, SetCourse] = useState();
  const [Loading, SetLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("about");
  const [slideDirection, setSlideDirection] = useState("left");

  const [TutorDropDownLoader, SetTutorDropDownLoader] = useState(false);

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
        console.log(response.data);
        SetCourse(response.data);
      });
  }, [baseUrl, courseId, token]);

  useEffect(() => {
    const getStudentList = async () => {
      const response = await axiosInstanceStudent.get(
        `api/course/student-not-added/${courseId}`
      );
      const EnrolledStudents = await axiosInstanceStudent.get(
        `api/course/student-enrolled/${courseId}`
      );

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
      <UserNavbar />
      {Loading ? (
        <div className="w-full bg-gray-300 h-max flex justify-center items-center ">
          <Loader />
        </div>
      ) : (
        <>
          {/* {StudentModal ? (
            <ListModal
              List={StudentDropDownList}
              Role="Student"
              HandleModalClose={HandleModalClose}
              courseId={courseId}
              Loader={false}
              setcount={setcount}
              List2={EnrolledStudentDropDownList}
            />
          ) : null} */}

          {/* {TutorModal ? (
            <ListModal
              List={TutorDropDownList}
              Role="Tutor"
              HandleModalClose={HandleModalClose}
              courseId={courseId}
              setcount={setcount}
              Loader={false}
              List2={EnrolledTutorDropDownList}
            />
          ) : null} */}

          <div className="flex flex-col lg:flex-row">
            <div className="md:w-[70%] w-full p-4 flex flex-col ">
              <div className="w-full h-[200px]  md:h-[300px] bg-gray-800 flex items-center justify-center text-white font-semibold font-plusjakartasans text-2xl md:text-3xl">
                {Course ? Course.courseName : ""}
              </div>
              <div className="w-full  mt-4">
                <h1 className="font-bold text-lg md:text-xl font-plusjakartasans">
                  {Course ? Course.courseName : ""}
                </h1>
                <div className="flex items-center gap-x-6 mt-2">
                  <span className="flex items-center gap-x-1 text-sm font-plusjakartasans">
                    <BiSpreadsheet className="text-gray-400" />
                    {Course ? Course.modules.length : 0} Modules
                  </span>
                  <span className="flex items-center gap-x-1 text-sm font-plusjakartasans">
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
            <Asidebar {...asidebarProps} />
          </div>
        </>
      )}
    </>
  );
};

export default Coursedetails;
