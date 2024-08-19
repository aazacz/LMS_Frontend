import React, { useEffect, useState } from "react";
import { BiSpreadsheet } from "react-icons/bi";
import { LuTimer } from "react-icons/lu";
import { useParams, useNavigate } from "react-router-dom";
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
import { PiChalkboardTeacherBold } from "react-icons/pi";

const Coursedetails = ({ edit }) => {
  const baseUrl = process.env.REACT_APP_API_URL;
  const token = useSelector((state) => state.AdminDetails.token);
  const [Course, SetCourse] = useState();
  const [Loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("about");
  const [slideDirection, setSlideDirection] = useState("left");

  const [TutorDropDownList, SetTutorDropDownList] = useState();
  const [StudentDropDownList, SetStudentDropDownList] = useState();
  const [EnrolledStudentDropDownList, SetEnrolledStudentDropDownList] =
    useState();
  const [EnrolledTutorDropDownList, SetEnrolledTutorDropDownList] = useState();

  const [StudentModal, setStudentModal] = useState(false);
  const [TutorModal, setTutorModal] = useState(false);
  const [count, setcount] = useState(0);

  const [isPending, setisPending] = useState(false);
  const [player, setPlayer] = useState(null);

  const { courseId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }, []);

  useEffect(() => {
    window.onYouTubeIframeAPIReady = () => {
      const newPlayer = new window.YT.Player("youtube-player", {
        height: "315",
        width: "560",
        videoId: "lcygUPCkW6U",
        playerVars: {
          controls: 0,
          autoplay: 1,
          mute: 1,
        },
        events: {
          onReady: onPlayerReady,
          onStateChange: onPlayerStateChange,
        },
      });
      setPlayer(newPlayer);
    };
  }, []);

  const onPlayerReady = (event) => {
    // You can do something when the player is ready
  };

  const onPlayerStateChange = (event) => {
    const overlay = document.getElementById("video-overlay");
    if (event.data === window.YT.PlayerState.PLAYING) {
      overlay.classList.add("hidden");
    } else {
      overlay.classList.remove("hidden");
    }
  };

  const handleTabClick = (tab) => {
    setSlideDirection(
      activeTab === "about" && tab === "module" ? "left" : "right"
    );
    setActiveTab(tab);
  };

  useEffect(() => {
    AdminAxiosInstance.get(`api/course/get-course/${courseId}`,
    ).then((response) => {
      console.log(response.data);
      SetCourse(response.data);
    });
  }, [courseId]);

  useEffect(() => {
    console.log(courseId);

    const getStudentList = async () => {
      try {
        setisPending(true);
        const response = await AdminAxiosInstance.get(
          `api/course/paid-students/${courseId}`
        );
        console.log("response.data student not addeddddd");
        console.log(response.data);
        if (response.data) {
          SetStudentDropDownList(response.data);
          setisPending(false);
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          console.log("Student not added list returned 404");
        } else {
          console.log(error);
        }
      }

      try {
        setisPending(true);
        const EnrolledStudents = await AdminAxiosInstance.get(
          `api/course/student-enrolled/${courseId}`
        );

        if (EnrolledStudents.data) {
          SetEnrolledStudentDropDownList(EnrolledStudents.data);
          setisPending(false);
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
      setisPending(true);

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
        setisPending(false);
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
          {StudentModal && (
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
          )}

          {TutorModal && (
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
          )}

          <div className="flex flex-col lg:flex-row">
            <div className="w-full p-4 flex flex-col">
              <button className="w-[50%]" onClick={() => navigate(-1)}>
                <IoChevronBackCircleOutline className="text-4xl mb-2" />
              </button>
              <div className="w-full  border-2 bg-black h-[200px] md:h-[300px] relative flex justify-center overflow-hidden">
                <div id="youtube-player"></div>

                <h2
                  id="video-overlay"
                  className="text-black invert-0 absolute top-1/2 left-1/2  transform -translate-x-1/2 -translate-y-1/2 font-semibold font-poppins text-2xl md:text-3xl z-10"
                >
                  {Course ? Course.courseName : ""}
                </h2>
              </div>

              <div className="w-full mt-4">
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
                    {Course && Course.trainingDuration}
                  </span>
                  <span className="flex items-center gap-x-1 text-sm font-poppins">
                    <BiSpreadsheet className="text-gray-400" />
                    {Course && Course.courseType}
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

              <div className="text-sm md:text-base relative mt-4 overflow-hidden h-max">
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
