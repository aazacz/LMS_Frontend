// export default GradingModal;
import React, { useState, useEffect } from "react";
import axios from "axios";
import pdfIcon from "../../../assets/Tutor/pdf.png";
import { TutorAxiosInstance } from "../../../routes/TutorRoutes";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const GradingModal = ({
  isOpen,
  onClose,
  submission,
  assignmentId,
  onGradeSubmit,
}) => {
  const [allotedMarks, setAllotedMarks] = useState("");
  const [feedback, setFeedback] = useState("");
  const [status, setStatus] = useState("pending");

  useEffect(() => {
    if (isOpen && submission) {
      setAllotedMarks(submission.allotedMarks || "");
      setFeedback(submission.feedback || "");
      setStatus(submission.status || "pending");
    }
  }, [isOpen, submission]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!assignmentId) {
        console.error("Assignment ID is missing");
        toast.error("Assignment ID is missing");
        return;
      }
      const token = localStorage.getItem("token");
      const url = `api/assignments/assign-grade/${assignmentId}/${submission._id}`;
      console.log("Request URL:", url);

      const response = await TutorAxiosInstance.put(
        url,
        {
          allotedMarks: Number(allotedMarks),
          feedback,
          status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Grade submitted successfully", response.data);
      alert("Success");
      toast.success("Grade submitted successfully");

      // Check if onGradeSubmit is a function before calling it
      if (typeof onGradeSubmit === "function") {
        onGradeSubmit({
          ...submission,
          allotedMarks: Number(allotedMarks),
          feedback,
          status,
        });
      } else {
        console.warn("onGradeSubmit is not a function or not provided");
      }

      onClose();
    } catch (error) {
      console.error("Error submitting grade:", error);

      let errorMessage = "An unexpected error occurred";

      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        errorMessage =
          error.response.data.message || error.response.data || error.message;
      } else if (error.request) {
        console.error("No response received:", error.request);
        errorMessage = "No response received from server";
      } else {
        console.error("Error setting up request:", error.message);
        errorMessage = error.message;
      }

      toast.error(`Error submitting grade: ${errorMessage}`);
    }
  };
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center z-50">
      <ToastContainer />
      <div className="relative bg-white p-5 rounded-lg w-full max-w-4xl mx-auto">
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
          onClick={onClose}
          aria-label="Close"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
        <h2 className="text-xl font-bold mb-4">Grade Submission</h2>
        <form onSubmit={handleSubmit} className="w-full">
          <div className="w-full mb-4">
            {submission?.filePath ? (
              <a
                href={submission.filePath}
                target="_blank"
                className="text-blue-600 hover:text-blue-900"
                rel="noopener noreferrer"
              >
                <img
                  src={pdfIcon}
                  alt="PDF"
                  className="w-32 h-32 object-cover"
                />
              </a>
            ) : (
              <p className="text-gray-500">No File</p>
            )}
          </div>
          <div className="space-y-4">
            <p className="text-sm md:text-base font-semibold">
              Student Name: {submission?.studentId?.name || "Student Name"}
            </p>
            <div>
              <p className="text-sm md:text-base">
                Marks for the Assignment <span className="text-red-500">*</span>
              </p>
              <input
                type="number"
                className="w-full h-10 outline-none border-2 border-gray-300 p-2 text-sm"
                value={allotedMarks}
                onChange={(e) => setAllotedMarks(e.target.value)}
                placeholder="Enter marks"
                min="0"
                max="500"
                required
              />
            </div>
            <div>
              <p className="text-sm md:text-base">Remarks / Feedback </p>
              <textarea
                className="w-full h-32 outline-none border-2 border-gray-300 p-2 text-sm resize-none"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Enter feedback"
                required
              />
            </div>
            <div>
              <p className="text-sm md:text-base">Status</p>
              <select
                className="w-full h-10 outline-none border-2 border-gray-300 p-2 text-sm"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                required
              >
                <option value="pending">Pending</option>
                <option value="submitted">Submitted</option>
                <option value="rejected">Rejected</option>
                <option value="approved">Approved</option>
              </select>
            </div>
            <div className="w-full flex gap-6 flex-wrap mt-4">
              <button
                className="py-3 px-8 bg-[#2525AD] text-white text-sm md:text-base"
                type="submit"
              >
                Grade
              </button>
              <button
                className="py-3 px-8 bg-[#2525AD] text-white text-sm md:text-base"
                type="button"
                onClick={onClose}
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GradingModal;
