import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import Aside_Section_Test_Page from "./Aside_Section_Test_Page/Aside_Section_Test_Page";
import { axiosInstanceStudent } from "../../routes/UserRoutes";
import { useNavigate } from "react-router-dom";
import { IoArrowBackCircleOutline } from "react-icons/io5";

const StudentTests = () => {
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isTestModalOpen, setIsTestModalOpen] = useState(false);
  const [studentId, setstudentId] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        const response = await axiosInstanceStudent.get('api/test/Enrolledcourse-coursetestslist');
        console.log("response.data", response.data.data);
        setList(response.data.data);
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, []);

  useEffect(()=>{
    const fetchUserId = async()=>{
     try {
       const response = await axiosInstanceStudent.get('api/test/getId');
       setstudentId(response.data.userId) 
      console.log("response.data.userId")
      console.log(response.data.userId)
     } catch (error) {
      console.log(error)
     }
     }

    fetchUserId()
  })

  const HandleStartTest = (courseId, testId) => {
    console.log("courseId", courseId);
    console.log("testId", testId);
    navigate(`/coursetest/start/${courseId}/${testId}`);
  };

  const openTestModal = (course) => {
    setSelectedCourse(course);
    setIsTestModalOpen(true);
  };

  const closeTestModal = () => {
    setSelectedCourse(null);
    setIsTestModalOpen(false);
  };



  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isTestModalOpen) {
      window.addEventListener("keydown", handleKeyDown);
    } else {
      window.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isTestModalOpen]);

  const TestModal = ({ course, isOpen, onClose,studentId }) => {
    if (!isOpen || !course) return null;





    return (
      <div className="fixed inset-0 bg-white flex flex-col px-6   ">
       
       <div className="w-full h-max">
       <IoArrowBackCircleOutline className="text-4xl my-4 " onClick={onClose}  />
       </div>




          <h2 className="text-xl font-bold mb-4">{course.courseName} - Tests</h2>
          <table className="w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">Title</th>
                <th className="px-4 py-2">Positive Mark</th>
                <th className="px-4 py-2">Negative Mark</th>
                <th className="px-4 py-2">Time Slot</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {course.tests.map((test) => (
                <tr key={test._id}>
                  <td className="border px-4 py-2">{test.title}</td>
                  <td className="border px-4 py-2">{test.positiveMark}</td>
                  <td className="border px-4 py-2">{test.negativeMark}</td>
                  <td className="border px-4 py-2">{test.timeSlot} minutes</td>
                  <td className="border px-4 py-2">
                  {test.users.includes(studentId) ? (
                      <button
                        onClick={() => navigate(`/coursetest/CourseTestResult/${test._id}`)}
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                      >
                        Show Result
                      </button>
                    ) : (
                      <button
                        onClick={() => HandleStartTest(test.courseId, test._id)}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      >
                        Start Test
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
       
        </div>
     
    );
  };

  return (
    <div className="w-full flex flex-wrap font-poppins">
      <div className="p-2 flex flex-col gap-2 h-max w-full md:w-[70%]">
        <div className="flex justify-between flex-wrap">
          <p className="p-2 font-bold text-lg lg:text-xl">Tests</p>
          <div className="p-2 flex items-center text-xs md:text-sm h-max cursor-pointer flex-wrap">
            <p
              className={`p-2 ${filter === "all" ? "font-bold" : ""}`}
              onClick={() => setFilter("all")}
            >
              All
            </p>
            <p
              className={`p-2 ${filter === "completed" ? "font-bold" : ""}`}
              onClick={() => setFilter("completed")}
            >
              Completed
            </p>
            <p
              className={`p-2 ${filter === "failed" ? "font-bold" : ""}`}
              onClick={() => setFilter("failed")}
            >
              Failed
            </p>
            <p
              className={`p-2 ${filter === "upcoming" ? "font-bold" : ""}`}
              onClick={() => setFilter("upcoming")}
            >
              Upcoming
            </p>
          </div>
        </div>
        <div className="w-full h-10 border-2 border-[#7EB1ED] flex gap-2 p-2 rounded-lg">
          <CiSearch className="text-[#277EE3] text-xl font-bold" />
          <input
            type="text"
            placeholder="Search here"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="text-sm text-black w-full p-2 outline-none"
          />
        </div>
        <div className="w-full h-max overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b border-gray-200">Course Name</th>
                <th className="py-2 px-4 border-b border-gray-200">Tutors</th>
                <th className="py-2 px-4 border-b border-gray-200">Tests</th>
                <th className="px-2 py-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {list && list.filter(course => course.tests.length > 0).map((course) => (
                <tr key={course.courseName}>
                  <td className="py-2 px-4 border-b border-gray-200">{course.courseName}</td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {course.tutors.map((tutor, index) => (
                      <div key={index}>
                        <p>Name: {tutor.name}</p>
                        <p>Email: {tutor.email}</p>
                      </div>
                    ))}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {course.tests.length}
                  </td>
                  <td className="px-4 py-2 text-center">
                    <button 
                      onClick={() => openTestModal(course)}
                      className="rounded-xl px-4 py-2 text-[10px] md:text-sm bg-[#277EE3] text-white"
                    >
                      View Tests
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="w-full h-full md:w-[30%]">
        <Aside_Section_Test_Page />
      </div>

      <TestModal
        course={selectedCourse}
        isOpen={isTestModalOpen}
        onClose={closeTestModal}
        studentId={studentId}
      />
    </div>
  );
};

export default StudentTests;