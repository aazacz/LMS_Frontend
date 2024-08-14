import React, { useState, useEffect } from "react";
import { axiosInstanceStudent } from "../../routes/UserRoutes";
import "./Modal.css";

const Modal = ({ isOpen, onClose,closeModal, assignmentId, onSubmit }) => {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");
  const [assignmentDetails, setAssignmentDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const fetchAssignmentDetails = async () => {
      try {
        const { data } = await axiosInstanceStudent.get(
          `api/assignments/assignment/${assignmentId}`
        );
        setAssignmentDetails(data?.data?.assignment);
        console.log(data?.data);
        console.log(data?.data?.assignment);
        setLoading(false);
        setIsSubmitted(
          data?.data?.assignment?.studentSubmissionStatus === "submitted"
        );
      } catch (error) {
        console.error("Error fetching assignment details:", error);
        setStatus("Error fetching assignment details.");
        setLoading(false);
      }
    };

    if (isOpen && assignmentId) {
      setLoading(true);
      fetchAssignmentDetails();
    }
  }, [isOpen, assignmentId]);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!file) {
      setStatus("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axiosInstanceStudent.post(
        `api/assignments/student/submit/${assignmentId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      onSubmit(); // Call the onSubmit callback to refresh the assignment list
      setStatus(response.data.message);
      setIsSubmitted(true); // Mark as submitted
    } catch (error) {
      console.error("Error submitting assignment:", error);
      setStatus("Error submitting assignment.");
    }
  };

  if (!isOpen) return null;

  const renderSubmissionStatus = (studentSubmissionStatus) => {
    switch (studentSubmissionStatus) {
      case "submitted":
        return <p className="text-blue-600">Assignment has been submitted</p>;
      case "approved":
        return <p className="text-green-600">Assignment has been approved</p>;
      case "rejected":
        return (
          <>
            <p className="text-red-600 mb-2">Assignment has been rejected</p>
            <input type="file" onChange={handleFileChange} className="mb-4" />
          </>
        );
      case "pending":
      case "not-submitted":
        return (
          <input type="file" onChange={handleFileChange} className="mb-4" />
        );
      default:
        return null;
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button
          className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold hover:bg-red-700 transition"
          onClick={closeModal}
        >
          X
        </button>
        {loading ? (
          <p>Loading...</p>
        ) : (
          assignmentDetails && (
            <>
              <p className="mb-2">
                <strong className="text-gray-800">Assignment:</strong>{" "}
                {assignmentDetails?.assignmentName || "N/A"}
              </p>
              <p className="mb-2">
                <strong className="text-gray-800">Description:</strong>{" "}
                {assignmentDetails?.assignmentDescription || "N/A"}
              </p>
              <p className="mb-2">
                <strong className="text-gray-800">File:</strong>{" "}
                {assignmentDetails?.filePath ? (
                  <a
                    href={assignmentDetails?.filePath}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700 "
                  >
                    View File
                  </a>
                ) : (
                  "No file available"
                )}
              </p>
              <p className="mb-4">
                <strong className="text-gray-800">Status:</strong>{" "}
                {assignmentDetails?.studentSubmissionStatus || "Pending"}
              </p>
              <div className="flex flex-col">
                {/* {["submitted"].includes(
                  assignmentDetails?.studentSubmissionStatus?.toLowerCase()
                ) ? (
                  <p className="text-green-500 mb-4">
                    Assignment has been submitted.
                  </p>
                ) : (
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="mb-4"
                    disabled={isSubmitted}
                  />
                )} */}
                {renderSubmissionStatus(
                  assignmentDetails?.studentSubmissionStatus
                )}
                <button
                  className={`bg-blue-500 text-white rounded px-4 py-2 cursor-pointer ${
                    isSubmitted
                      ? "bg-blue-300 cursor-not-allowed"
                      : "hover:bg-blue-700"
                  } transition`}
                  onClick={handleSubmit}
                  disabled={isSubmitted}
                >
                  {isSubmitted
                    ? "Assignment Already Submitted"
                    : "Submit Assignment"}
                </button>
                {status && <p className="text-red-500 mt-4">{status}</p>}
              </div>
            </>
          )
        )}
      </div>
    </div>
  );
};

export default Modal;
