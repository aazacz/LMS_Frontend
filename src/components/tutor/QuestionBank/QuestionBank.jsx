import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import "./QuestionBank.css";
import { useQuery } from "@tanstack/react-query";
import ViewModal from "./ViewModal";
import Loader from "../../reusable/Loader";
import { TutorAxiosInstance } from "../../../routes/TutorRoutes";
import TestTable from "./TestTable";
import TopPerformer from "./TopPerformer";
import LeastPerformer from "./LeastPerformer";

const QuestionBank = () => {
  const [Modal, setModal] = useState(false);
  const [Data, setdata] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isSubmissionModalOpen, setIsSubmissionModalOpen] = useState(false);
  const [selectedTest, setSelectedTest] = useState(null);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [selectedTestId, setSelectedTestId] = useState(null);


  //useQuery function calling
  const fetchQuestions = async () => {
    const response = await TutorAxiosInstance.get("api/test/course-tests?page=1&pageSize=10&search=");
    console.log(response.data.data);
    return response.data.data;
  };

  
  const { data: reviewData, isPending: reviewLoading } = useQuery({
    queryKey: ["getReviewList", selectedTestId],
    queryFn: () => fetchReviewList(selectedTestId),
    enabled: !!selectedTestId,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
  });

  
  const fetchReviewList = async (testId) => {
    try {
      console.log("fetch Review List step 1");
      const response = await TutorAxiosInstance.get(`api/test/submissions/${testId}`);
      console.log("fetch Review List step 2");
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching review list:", error);
      console.error( error.response.data.error);
      // You can also throw the error again or handle it according to your needs
      return error.response.data.error;
    }
  };
  
  
  const { data: questionsData, isPending: questionsLoading } = useQuery({
    queryKey: ["fetchAllTests"],
    queryFn: fetchQuestions,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
  });
 
 
 
  const handleView = (data) => {
    console.log("open modal function clicked");
    setdata([data]);
    console.log(data);
    setModal(true);
  };

  const handleReview = (test) => {
    console.log("review funciotn is triggered")
    console.log(test)
    setSelectedTest(test);
    setSelectedTestId(test); // Assuming `test.id` is the correct ID
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



  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const best = [
    { name: "John Doe", email: "john.doe@example.com"     ,image:"/photo1.jpg"},
    { name: "Jane Smith", email: "jane.smith@example.com" ,image:"/photo2.jpg"},
    { name: "Jane Smith", email: "jane.smith@example.com" ,image:"/photo3.jpg"},
    { name: "Jane Smith", email: "jane.smith@example.com" ,image:"/photo4.jpg"},
    { name: "Jane Smith", email: "jane.smith@example.com" ,image:"/photo5.jpg"},
    { name: "Jane Smith", email: "jane.smith@example.com" ,image:"/photo6.jpg"},
    { name: "Jane Smith", email: "jane.smith@example.com" ,image:"/photo7.jpg"},
  ];
  const least = [
    { name: "John Doe",   email: "john.doe@example.com  " ,image:"/photo8.jpg"       },
    { name: "Jane Smith", email: "jane.smith@example.com" ,image:"/photo7.jpg" },
    { name: "Jane Smith", email: "jane.smith@example.com" ,image:"/photo6.jpg" },
    { name: "Jane Smith", email: "jane.smith@example.com" ,image:"/photo5.jpg" },
    { name: "Jane Smith", email: "jane.smith@example.com" ,image:"/photo4.jpg" },
    { name: "Jane Smith", email: "jane.smith@example.com" ,image:"/photo3.jpg" },
    { name: "Jane Smith", email: "jane.smith@example.com" ,image:"/photo2.jpg" },
  ];






  const ReviewModal = ({ test, isOpen, onClose, reviewLoading, reviewData, onSubmissionView }) => {
    if (!isOpen) return null;
  
    console.log("reviewLoading:", reviewLoading);
    console.log("reviewData:", reviewData);
  
    // Destructure and map the submissions from reviewData
    
    const submissions = reviewData?.submissions || [];
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg w-3/4 max-h-3/4 overflow-y-auto">
          <h2 className="text-xl font-bold mb-4">Review: {test.title}</h2>
          {reviewLoading ? (
            
            <div className=" flex justify-center items-center w-full h-full">
              <Loader/>
            </div>
          ) : (
            <table className="w-full mb-4">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left">Student Name</th>
                  <th className="px-4 py-2 text-left">Score</th>
                  <th className="px-4 py-2 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((submission) => (
                  <tr key={submission._id}>
                    <td className="px-4 py-2">{submission.studentId.name}</td>
                    <td className="px-4 py-2">
                      {/* Assuming score is calculated as the number of correct answers */}
                      {submission.tests[0].result.filter((r) => r.isCorrect).length}
                    </td>
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
          )}
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
        reviewLoading={reviewLoading}
        reviewData={reviewData}
      />
      <SubmissionModal
        submission={selectedSubmission}
        isOpen={isSubmissionModalOpen}
        onClose={closeSubmissionModal}
      />

      {/* Aside Bar */}
      <div className="w-[320px] h-max  flex-col justify-center items-center  pl-4 gap-2 font-poppins border-l border-black hidden lg:block">
          <TopPerformer   best={best}  />
          <LeastPerformer least={least}  />
      </div>

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
            <TestTable handleReview={handleReview} handleView={handleView} />
        
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionBank;