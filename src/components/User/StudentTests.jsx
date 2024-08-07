import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import Aside_Section_Test_Page from "./Aside_Section_Test_Page/Aside_Section_Test_Page";
import { axiosInstanceStudent } from "../../routes/UserRoutes";

const StudentTests = () => {
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedTest, setSelectedTest] = useState(null);
  const [isTestModalOpen, setIsTestModalOpen] = useState(false);
  const [isSubmissionModalOpen, setIsSubmissionModalOpen] = useState(false);

  const normalizeString = (str) => str.replace(/\s+/g, "").toLowerCase();

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

  const openTestModal = (course) => {
    setSelectedCourse(course);
    setIsTestModalOpen(true);
  };

  const closeTestModal = () => {
    setSelectedCourse(null);
    setIsTestModalOpen(false);
  };

  const openSubmissionModal = (test) => {
    setSelectedTest(test);
    setIsSubmissionModalOpen(true);
  };

  const closeSubmissionModal = () => {
    setSelectedTest(null);
    setIsSubmissionModalOpen(false);
  };

  const TestModal = ({ course, isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg w-3/4 max-h-3/4 overflow-y-auto">
          <h2 className="text-xl font-bold mb-4">{course.courseName} Tests</h2>
          <table className="w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">Title</th>
                <th className="px-4 py-2">Time Slot</th>
                <th className="px-4 py-2">Is Active</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {course.tests.map((test) => (
                <tr key={test._id}>
                  <td className="px-4 py-2">{test.title}</td>
                  <td className="px-4 py-2">{test.timeSlot} mins</td>
                  <td className="px-4 py-2">{test.isActive ? 'Yes' : 'No'}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => openSubmissionModal(test)}
                      className="rounded-xl px-4 py-2 text-[10px] md:text-sm bg-[#277EE3] text-white"
                    >
                      View Submissions
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            onClick={onClose}
            className="mt-4 rounded-xl px-4 py-2 bg-red-500 text-white"
          >
            Close
          </button>
        </div>
      </div>
    );
  };

  const SubmissionModal = ({ test, isOpen, onClose }) => {
    if (!isOpen) return null;

    // Fake submission data
    const fakeSubmissions = [
      { id: 1, studentName: "John Doe", score: 85, submittedAt: "2024-08-07 10:30 AM" },
      { id: 2, studentName: "Jane Smith", score: 92, submittedAt: "2024-08-07 11:15 AM" },
      { id: 3, studentName: "Bob Johnson", score: 78, submittedAt: "2024-08-07 09:45 AM" },
    ];

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg w-3/4 max-h-3/4 overflow-y-auto">
          <h2 className="text-xl font-bold mb-4">Submissions for {test.title}</h2>
          <table className="w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">Student Name</th>
                <th className="px-4 py-2">Score</th>
                <th className="px-4 py-2">Submitted At</th>
              </tr>
            </thead>
            <tbody>
              {fakeSubmissions.map((submission) => (
                <tr key={submission.id}>
                  <td className="px-4 py-2">{submission.studentName}</td>
                  <td className="px-4 py-2">{submission.score}</td>
                  <td className="px-4 py-2">{submission.submittedAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            onClick={onClose}
            className="mt-4 rounded-xl px-4 py-2 bg-red-500 text-white"
          >
            Close
          </button>
        </div>
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
              {list && list.map((course) => (
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
                      View
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
      />
      <SubmissionModal
        test={selectedTest}
        isOpen={isSubmissionModalOpen}
        onClose={closeSubmissionModal}
      />
    </div>
  );
};

export default StudentTests;