import React, { useEffect, useState } from "react";
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
import { PiNotepadBold } from "react-icons/pi";
import Loader from "../../reusable/Loader";
import { axiosInstanceStudent } from "../../../routes/UserRoutes";
import { Link } from "react-router-dom";

//  courseName,
//  courseId,
//   courseImage,
//   sessionId,
//   moduleName,
//   sessionName,
//   sessionDescription,
//   sessionLink,

const SessionCard = ({ sessionData }) => {
  return (
    <div className="left-sub-content2 mr-1 pt-2 flex flex-col bg-[#f4f5fb] h-fit px-4 rounded-xl p-2  w-full  lg:w-[80%] pb-4">
      <h1 className="text-xl font-semibold my-4">{sessionData.courseName}</h1>
      <img
        src={sessionData.courseImage || classroomimage}
        alt="classroom"
        className="h-[15rem] rounded-xl p-1 object-cover"
      />
      <div className="left-sub-content-box2 justify-evenly flex flex-wrap gap-[10px] p-2 ">
        <p className="flex gap-[10px] rounded-xl p-2 text-sm font-poppins font-semibold bg-white ">
          {sessionData.moduleName}
        </p>
        {/* <p className="flex justify-center items-center gap-[10px] rounded-xl p-2 text-sm font-poppins font-semibold bg-white">
          <FaClock />
          1Hr 30Min
        </p> */}
        <Link
          to={`/student/courses/${sessionData.courseId}`}
          className="flex justify-center items-center gap-[10px] rounded-xl p-2 text-sm font-poppins font-semibold bg-white"
        >
          View course <FaArrowRightLong />
        </Link>
      </div>
      <div>
        <div className="flex w-full justify-between">
          <h1 className="font-poppins p-2 text-left text-lg font-bold">
            {sessionData.sessionName}
          </h1>
          <div className="flex font-poppins text-sm p-3 rounded-lg ">
            {sessionData.sessionLink ? (
              <Link
                className="w-fit"
                to={
                  sessionData.sessionLink.startsWith("https")
                    ? sessionData.sessionLink
                    : `https://${sessionData.sessionLink}`
                }
              >
                <button
                  type="button"
                  className="bg-[#13bf78] w-fit text-white font-medium rounded-lg p-1 w-[45%] border border-black"
                >
                  Join Now
                </button>
              </Link>
            ) : (
              <div className="flex flex-col items-center">
                <button
                  disabled
                  type="button"
                  className="bg-slate-400 w-fit cursor-not-allowed text-white font-medium rounded-lg p-1 border "
                >
                  Join Now
                </button>
                <p className="my-2 text-xs">Meeting link not provided</p>
              </div>
            )}
          </div>
        </div>
        <p className="font-poppins text-xs leading-6 text-left pl-2 ">
          {sessionData.sessionDescription}
        </p>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [sessions, setSessions] = useState([]);
  const [testStats, setTestStats] = useState({
    completedTests: 0,
    totalTests: 0,
  });
  const [assignmentStats, setAssignmentStats] = useState({
    totalAssignments: 0,
    completedAssignments: 0,
  });
  const [sessionCount, setSessionCount] = useState(0);

  const fetchTestStats = async () => {
    try {
      const { data } = await axiosInstanceStudent.get("api/test/student-stats");
      setTestStats(data.stats); // Assuming the structure { stats: { totalTests, completedTests, remainingTests } }
    } catch (error) {
      console.error(error);
      Swal.fire(
        "Oops!",
        "Failed to load test stats. Please try again.",
        "error"
      );
    }
  };

  const fetchAssignmentStats = async () => {
    try {
      const { data } = await axiosInstanceStudent.get(
        "api/assignments/student-all-assignments"
      );
      console.log("API Response Data:", data); // Check the response

      if (data.success && data.data) {
        setAssignmentStats({
          totalAssignments: data.data.totalAssignments || 0,
          completedAssignments: data.data.completedAssignmentsCount || 0,
        });
      } else {
        console.error("Unexpected API response:", data);
      }
    } catch (error) {
      console.error("Failed to fetch assignment stats:", error);
      Swal.fire(
        "Oops!",
        "Failed to load assignment stats. Please try again.",
        "error"
      );
    }
  };

  // Check assignmentStats values in render
  console.log("Assignment Stats in Render:", assignmentStats);

  useEffect(() => {
    fetchSessions();
    fetchTestStats(); // Fetch test stats on component mount
    fetchAssignmentStats(); // Fetch assignment stats on component mount
  }, []);

  const Stats = [
    {
      heading: "Classes",
      module: `${sessionCount}`,
    },
    {
      heading: "Tests",
      module: `${testStats.completedTests}/${testStats.totalTests}`, // Dynamically set the test stats
    },
    {
      heading: "Quiz Won",
      module: "03/05",
    },
    {
      heading: "Assignments",
      module: `${assignmentStats.completedAssignments || 0}/${assignmentStats.totalAssignments || 0}`,
    },
  ];

  const fetchSessions = async () => {
    try {
      setLoading(true);
      const { data } = await axiosInstanceStudent.get(
        "api/student-course/upcoming-sessions"
      );

      // Validate if data.sessions is an array
      if (Array.isArray(data.sessions)) {
        setSessions(data.sessions);
        setSessionCount(data.totalCount || 0);
      } else {
        console.error(
          "Expected data.sessions to be an array but got:",
          data.sessions
        );
        setSessions([]);
      }
    } catch (error) {
      console.error("Error fetching sessions:", error);
      setSessions([]); // Ensure sessions is an empty array on error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

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

  return (
    <div className="w-full pl-[8px] font-poppins">
      <h1 className="p-2 font-bold text-base md:text-base lg:text-lg ">
        Dashboard
      </h1>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-100 z-50">
          <Loader />
        </div>
      )}
      <div className="font-poppins font-semibold h-max text-sm md:text-base p-2 flex gap-2 items-center">
        Classes Today
        <span className="border border-black p-2 rounded-lg">
          <FaCalendarAlt className="text-[#0066DE]" />
        </span>
      </div>
      <div className="content-container flex">
        <div className="w-full  pt-3 pr-2 pl-2 gap-5 flex flex-wrap h-max justify-evenly">
          {/* <div className="left-sub-content1 mr-1 bg-[#f4f5fb] w-full lg:w-[40%] p-2  ">
            <div className="font-poppins font-bold p-2 flex-wrap gap-2 flex justify-between text-sm md:text-base">
              <p className="">
                Introduction to basic <br /> DSAT & MAT
              </p>
              <p className="">
                David
                <br /> Beckham
              </p>
            </div>
            <div className="w-full gap-[20px] flex flex-col p-2 justify-around  text-xs md:text-sm">
              <p className="p-2 font-poppins font-semibold text-sm bg-white  ">
                1st Module
              </p>
              <p className="flex gap-2 font-poppins font-semibold p-2 items-center bg-white">
                {" "}
                <FaClock className="text-lg" />
                1Hr 30Min
              </p>
              <p className="flex gap-2 p-2 font-poppins font-semibold items-center bg-white text-semibold">
                View course
                <FaArrowRightLong className="text-black" />{" "}
              </p>
            </div>
            <div className="pt-3 font-poppins font-light text-sm md:text-base mb-2">
              <p>
                Training Dates <span className="text-red-900">*</span>
              </p>
              <input
                type="date"
                className="training-date-box w-full p-2 mt-2 border border-gray-500 text-sm"
                placeholder="Select Training Dates"
              />
            </div>
          </div> */}
          {sessions.map((session) => {
            return (
              <SessionCard sessionData={session} key={session.sessionId} />
            );
          })}
        </div>
        <div className="pr-5 pl-5 pb-5 pt-3 flex flex-col right-content md:flex">
          <div className="rounded-lg bg-white p-5 right-stats">
            <p className="font-poppins font-bold text-2xl pb-2">Stats</p>
            <div className="grid grid-flow-row grid-cols-1 lg:grid-cols-2 gap-4 justify-center items-center">
              {Stats.map((member, index) => (
                <ConstData
                  className="flex flex-col justify-center items-center "
                  key={index}
                  {...member}
                />
              ))}
            </div>
          </div>
          <div className="pt-3 flex flex-col gap-4">
            <p className="font-poppins text-2xl font-bold flex justify-center items-center">
              Importants
            </p>
            <div className="flex flex-col gap-2 bg-gray-100">
              <div className="p-4 flex flex-col gap-4">
                {" "}
                <img src={importantimage} alt="important" />
                <div className="flex gap-4 ">
                  <p className="text-lg font-bold font-poppins">Course </p>
                  <p className="text-sm mt-1 font-semibold font-poppins">
                    Module 1{" "}
                  </p>
                </div>
                <p className="font-poppins text-sm text-left font-medium">
                  Complete The Test 1 before proceeding for the next module.
                </p>
                <button className="font-poppins text-sm text-bold py-2 px-4 rounded-lg bg-[#f99406] w-fit">
                  Complete Test Now
                </button>
              </div>
            </div>
            {/* <div className="mb-2">
              <h1 className="font-poppins font-semibold text-xl pt-3 pb-3">
                Assignment Grading
              </h1>
              <div className="overflow-y-scroll no-scrollbar flex flex-col gap-4">
                {assignments1.map((assignment1) => (
                  <div
                    key={assignment1.id}
                    className="bg-white justify-between h-max shadow-md rounded-lg p-2 flex mb-1  "
                  >
                    <div className="flex ">
                      <PiNotepadBold className="w-8 h-10" />
                      <div className="p-1 flex flex-col">
                        <h2 className="text-blue-gray-600 text-xs font-bold">
                          {assignment1.name}
                        </h2>
                        <p className="text-gray-700 text-xs underline">
                          <a href={assignment1.feedbackLink}>View Feedback</a>
                        </p>
                      </div>
                    </div>
                    <button className="ml-5 bg-[#6C51D9] text-white p-1 rounded-lg text-xs">
                      {assignment1.score}
                    </button>
                  </div>
                ))}
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
