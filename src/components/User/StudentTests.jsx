import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import Aside_Section_Test_Page from "./Aside_Section_Test_Page/Aside_Section_Test_Page";
import { axiosInstanceStudent } from "../../routes/UserRoutes";

const dummyTests = [
  {
    id: 1,
    name: "Test 1",
    attempts: 1,
    questions: 10,
    marks: 30,
    status: "completed",
  },
  {
    id: 2,
    name: "Test 2",
    attempts: 2,
    questions: 20,
    marks: 25,
    status: "failed",
  },
  {
    id: 3,
    name: "Test 3",
    attempts: 1,
    questions: 15,
    marks: 35,
    status: "upcoming",
  },
  {
    id: 4,
    name: "Test 4",
    attempts: 1,
    questions: 12,
    marks: 28,
    status: "completed",
  },
  {
    id: 5,
    name: "Test 5",
    attempts: 1,
    questions: 18,
    marks: 33,
    status: "failed",
  },
  {
    id: 6,
    name: "Test 6",
    attempts: 0,
    questions: 10,
    marks: 0,
    status: "upcoming",
  },
];

const StudentTests = () => {
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [list,setlist] = useState()

  const [loading,setLoading] = useState(false)

  const normalizeString = (str) => str.replace(/\s+/g, "").toLowerCase();

  const filteredTests = dummyTests.filter((test) => {
    const matchesFilter = filter === "all" || test.status === filter;
    const query = searchQuery.trim().toLowerCase();

    const matchesSearch =
      query === "" ||
      normalizeString(test.name).includes(query) ||
      test.attempts.toString().includes(query) ||
      test.questions.toString().includes(query) ||
      test.marks.toString().includes(query);

    return matchesFilter && matchesSearch;
  });


  useEffect(()=>{

    const fetchcourse = async ()=>{
      try{
        const response = await axiosInstanceStudent.get('api/test/Enrolledcourse-coursetestslist')
        console.log("response.data")
        console.log(response.data.data)
        setlist(response.data.data)

      }catch(error){
        console.log(error.message)
      }
    }


    fetchcourse()
  },[])



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
        <div className="overflow-x-auto ">
          <table className="text-[12px] w-full border-collapse min-w-full">
            <thead className=" text-[12px] md:text-[14px] bg-[#E3EDF9]">
              <tr>
                <th className="px-2 py-3 text-center">Sl.No</th>
                <th className="px-2 py-3 text-center">Name</th>
                <th className="px-2 py-3 text-center">Attempts</th>
                <th className="px-2 py-3 text-center">Questions</th>
                <th className="px-2 py-3 text-center">Marks</th>
                <th className="px-2 py-3 text-center">Status</th>
                <th className="px-2 py-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredTests.map((test, index) => (
                <tr key={test.id} className="bg-white even:bg-gray-100">
                  <td className=" py-2 text-center">{index + 1}</td>
                  <td className=" py-2 text-center">{test.name}</td>
                  <td className=" py-2 text-center">{test.attempts}</td>
                  <td className=" py-2 text-center">{test.questions}</td>
                  <td className=" py-2 text-center">{test.marks}</td>
                  <td className="py-2 text-center">
                    <button
                      className={`rounded-xl px-4 py-2 text-[10px] md:text-sm text-white ${
                        test.status === "completed"
                          ? "bg-green-500"
                          : test.status === "failed"
                          ? "bg-red-500"
                          : "bg-blue-500"
                      }`}
                    >
                      {test.status.charAt(0).toUpperCase() +
                        test.status.slice(1)}
                    </button>
                  </td>
                  <td className="border px-4 py-2 text-center">
                    <button className="rounded-xl px-4 py-2 text-[10px] md:text-sm bg-[#277EE3] text-white">
                      {test.status === "upcoming" ? "Start" : "Review"}
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







 {/* extra */}
 <div className="w-full  h-max overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b border-gray-200">Course Name</th>
            <th className="py-2 px-4 border-b border-gray-200">Tutors</th>
            <th className="py-2 px-4 border-b border-gray-200">Tests</th>
          </tr>
        </thead>
        <tbody>
          {list && list?.map((course) => (
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
                {/* {course.tests.map((test) => (
                  <div key={test._id}>
                    <p>Title: {test.title}</p>
                    <p>Positive Mark: {test.positiveMark}</p>
                    <p>Negative Mark: {test.negativeMark}</p>
                    <p>Is Active: {test.isActive ? 'Yes' : 'No'}</p>
                    <p>Time Slot: {test.timeSlot} mins</p>
                    {test.questions.map((question, qIndex) => (
                      <div key={question._id} className="ml-4">
                        <p>Question: {question.question}</p>
                        <p>Why is Incorrect: {question.whyIsIncorrect}</p>
                        <p>Choices:</p>
                        <ul>
                          {question.choices.map((choice, cIndex) => (
                            <li key={choice._id}>
                              {choice.choiceText} {choice.isCorrect ? '(Correct)' : ''}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                ))} */}

{course.tests.length}

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>








    </div>
  );
};

export default StudentTests;
