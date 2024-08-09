import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import "./QuestionBank.css";
import { useQuery } from "@tanstack/react-query";
import ViewModal from "./ViewModal";
import Loader from "../../reusable/Loader";
import { TutorAxiosInstance } from "../../../routes/TutorRoutes";

const QuestionBank = () => {
  const [Modal, setModal] = useState(false);
  const [Data, setdata] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isSubmissionModalOpen, setIsSubmissionModalOpen] = useState(false);
  const [selectedTest, setSelectedTest] = useState(null);
  const [selectedSubmission, setSelectedSubmission] = useState(null);

  const handleView = (data) => {
    console.log("open modal function clicked");
    setdata([data]);
    console.log(data);
    setModal(true);
  };

  const handleReview = (test) => {
    setSelectedTest(test);
    setIsReviewModalOpen(true);
  };

  const handleSubmissionView = (submission) => {
    setSelectedSubmission(submission);
    setIsSubmissionModalOpen(true);
  };

  const closeReviewModal = () => {
    setSelectedTest(null);
    setIsReviewModalOpen(false);
  };

  const closeSubmissionModal = () => {
    setSelectedSubmission(null);
    setIsSubmissionModalOpen(false);
  };

  const fetchQuestions = async () => {
    const response = await TutorAxiosInstance.get("api/test/course-tests?page=1&pageSize=10&search=");
    console.log(response.data.data);
    return response.data.data;
  };

  const { data, isPending } = useQuery({
    queryKey: ["fetchAllTests"],
    queryFn: fetchQuestions,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
  });

  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const ReviewModal = ({ test, isOpen, onClose, onSubmissionView }) => {
    if (!isOpen) return null;

    // Fake submissions data
    const fakeSubmissions = [
      { id: 1, studentName: "John Doe", score: 85 },
      { id: 2, studentName: "Jane Smith", score: 92 },
      { id: 3, studentName: "Bob Johnson", score: 78 },
    ];

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg w-3/4 max-h-3/4 overflow-y-auto">
          <h2 className="text-xl font-bold mb-4">Review: {test.title}</h2>
          <table className="w-full mb-4">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">Student Name</th>
                <th className="px-4 py-2 text-left">Score</th>
                <th className="px-4 py-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {fakeSubmissions.map((submission) => (
                <tr key={submission.id}>
                  <td className="px-4 py-2">{submission.studentName}</td>
                  <td className="px-4 py-2">{submission.score}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => onSubmissionView(submission)}
                      className="px-2 py-1 text-xs bg-blue-500 text-white rounded-md"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-red-500 text-white rounded-md"
          >
            Close
          </button>
        </div>
      </div>
    );
  };

  const SubmissionModal = ({ submission, isOpen, onClose }) => {
    if (!isOpen) return null;

    // Fake detailed submission data
    const fakeDetailedSubmission = {
      studentName: submission.studentName,
      score: submission.score,
      submittedAt: "2024-08-07 10:30 AM",
      answers: [
        { question: "Question 1", answer: "Answer 1", correct: true },
        { question: "Question 2", answer: "Answer 2", correct: false },
        { question: "Question 3", answer: "Answer 3", correct: true },
      ],
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg w-3/4 max-h-3/4 overflow-y-auto">
          <h2 className="text-xl font-bold mb-4">Submission Details</h2>
          <p><strong>Student:</strong> {fakeDetailedSubmission.studentName}</p>
          <p><strong>Score:</strong> {fakeDetailedSubmission.score}</p>
          <p><strong>Submitted At:</strong> {fakeDetailedSubmission.submittedAt}</p>
          <h3 className="font-bold mt-4 mb-2">Answers:</h3>
          <table className="w-full">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">Question</th>
                <th className="px-4 py-2 text-left">Answer</th>
                <th className="px-4 py-2 text-left">Correct</th>
              </tr>
            </thead>
            <tbody>
              {fakeDetailedSubmission.answers.map((answer, index) => (
                <tr key={index}>
                  <td className="px-4 py-2">{answer.question}</td>
                  <td className="px-4 py-2">{answer.answer}</td>
                  <td className="px-4 py-2">{answer.correct ? "Yes" : "No"}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            onClick={onClose}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md"
          >
            Close
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="font-poppins w-full h-max flex flex-row-reverse justify-left items-left relative">
      {Modal && <ViewModal setModal={setModal} Data={Data} />}
      <ReviewModal
        test={selectedTest}
        isOpen={isReviewModalOpen}
        onClose={closeReviewModal}
        onSubmissionView={handleSubmissionView}
      />
      <SubmissionModal
        submission={selectedSubmission}
        isOpen={isSubmissionModalOpen}
        onClose={closeSubmissionModal}
      />

      {/* Aside Bar */}
      {/* ... (keep your existing aside bar code) ... */}

      {/* Body */}
      <div className="flex-1 flex flex-col">
        <p className="text-base lg:text-lg font-semibold p-2">Tests</p>

        <div className="w-full h-max flex">
          <div className="w-full lg:w-full h-full flex flex-col p-2">
            <div className="w-full h-max bg-white flex justify-between items-center text-xs md:text-[14px] rounded-lg py-2">
              <input
                type="text"
                placeholder="Search For Student"
                className="w-full p-2 border-2 outline-none mr-2"
                value={searchTerm}
                onChange={handleSearch}
              />
              <button className="p-1 w-max text-[10px] md:text-xs bg-blue-600 text-white rounded-lg flex gap-2 justify-center items-center">
                <CiSearch className="w-5 h-5 lg:w-8 lg:h-8" />
                <p className="w-20">Show Results</p>
              </button>
            </div>

            {/* Table */}
            <div className="relative overflow-x-auto shadow-md rounded-lg">
              <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Positive Mark</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Negative Mark</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Total Questions</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {isPending ? (
                    <tr>
                      <td colSpan="6" className="p-4 h-36">
                        <Loader />
                      </td>
                    </tr>
                  ) : (
                    data?.map((item, index) => (
                      <tr key={item._id}>
                        <td className="p-2 whitespace-nowrap">{index + 1}</td>
                        <td className="p-2 whitespace-nowrap">{item.title}</td>
                        <td className="p-2 whitespace-nowrap hidden sm:table-cell">{item.positiveMark}</td>
                        <td className="p-2 whitespace-nowrap hidden md:table-cell">{item.negativeMark}</td>
                        <td className="p-2 whitespace-nowrap hidden lg:table-cell">{item.questions.length}</td>
                        <td className="p-2 flex gap-2 flex-wrap">
                          <button
                            onClick={() => handleReview(item)}
                            className="px-2 py-1 text-xs border border-black rounded-md mr-2"
                          >
                            Review
                          </button>
                          <button
                            onClick={() => handleView(item)}
                            className="px-2 py-1 text-xs border border-black rounded-md mr-2"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionBank;