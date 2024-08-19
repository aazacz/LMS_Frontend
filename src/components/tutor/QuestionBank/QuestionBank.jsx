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
import ReviewModal from "./ReviewModal";
import SubmissionModal from "./SubmissionModal";

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
    const response = await TutorAxiosInstance.get(
      "api/test/course-tests?page=1&pageSize=10&search=",
    );
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
      const response = await TutorAxiosInstance.get(
        `api/test/submissions/${testId}`,
      );
      console.log("fetch Review List step 2");
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching review list:", error);
      console.error(error.response.data.error);
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

  const fetchSubmissionList = async (submissionId) => {
    try {
      console.log("fetch Submission List step 1");
      const response = await TutorAxiosInstance.get(
        `api/test/course-results/${submissionId}`,
      );
      console.log("fetch Submission List step 2");
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching review list:", error);
      console.error(error.response.data.error);
      // You can also throw the error again or handle it according to your needs
      return error.response.data.error;
    }
  };

  // const { data: submissionsData, isPending: submissionLoading } = useQuery({
  //   queryKey: ["fetchSubmissionList", selectedSubmission],
  //   queryFn: () => fetchSubmissionList(selectedSubmission),
  //   enabled: !!selectedSubmission,
  //   staleTime: 1000 * 60 * 5,
  //   cacheTime: 1000 * 60 * 10,
  // });

  const handleView = (data) => {
    console.log("open modal function clicked");
    setdata([data]);
    console.log(data);
    setModal(true);
  };

  const handleReview = (test) => {
    console.log("review funciotn is triggered");
    console.log(test);
    setSelectedTest(test);
    setSelectedTestId(test);
    setIsReviewModalOpen(true);
  };

  const handleSubmissionView = (submission) => {
    console.log("submission");
    console.log(submission);
    console.log(submission);
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
    { name: "John Doe", email: "john.doe@example.com", image: "/photo1.jpg" },
    {
      name: "Jane Smith",
      email: "jane.smith@example.com",
      image: "/photo2.jpg",
    },
    {
      name: "Jane Smith",
      email: "jane.smith@example.com",
      image: "/photo3.jpg",
    },
    {
      name: "Jane Smith",
      email: "jane.smith@example.com",
      image: "/photo4.jpg",
    },
    {
      name: "Jane Smith",
      email: "jane.smith@example.com",
      image: "/photo5.jpg",
    },
    {
      name: "Jane Smith",
      email: "jane.smith@example.com",
      image: "/photo6.jpg",
    },
    {
      name: "Jane Smith",
      email: "jane.smith@example.com",
      image: "/photo7.jpg",
    },
  ];
  const least = [
    { name: "John Doe", email: "john.doe@example.com  ", image: "/photo8.jpg" },
    {
      name: "Jane Smith",
      email: "jane.smith@example.com",
      image: "/photo7.jpg",
    },
    {
      name: "Jane Smith",
      email: "jane.smith@example.com",
      image: "/photo6.jpg",
    },
    {
      name: "Jane Smith",
      email: "jane.smith@example.com",
      image: "/photo5.jpg",
    },
    {
      name: "Jane Smith",
      email: "jane.smith@example.com",
      image: "/photo4.jpg",
    },
    {
      name: "Jane Smith",
      email: "jane.smith@example.com",
      image: "/photo3.jpg",
    },
    {
      name: "Jane Smith",
      email: "jane.smith@example.com",
      image: "/photo2.jpg",
    },
  ];

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
        <TopPerformer best={best} />
        <LeastPerformer least={least} />
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
