import React, { useState, useEffect } from "react";
import { axiosInstanceStudent } from "../../routes/UserRoutes";

const Modal = ({ isOpen, onClose, assignmentId, onSubmit }) => {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");
  const [assignmentDetails, setAssignmentDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);


  useEffect(() => {
    const fetchAssignmentDetails = async () => {
      try {
        const response = await axiosInstanceStudent.get(
          `api/studentAssignments/one-assignment/${assignmentId}`
        );
        setAssignmentDetails(response.data);
        setLoading(false);
        setIsSubmitted(response.data.student.status === "Submitted");
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
        `api/studentAssignments/submit-assignment/${assignmentId}`,
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

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
      onClick={onClose}
    > 
      <div
        className="bg-white p-6 rounded-lg shadow-lg relative max-w-lg w-full text-left"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold hover:bg-red-700 transition"
          onClick={onClose}
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
                {assignmentDetails.assignment.assignmentName || "N/A"}
              </p>
              <p className="mb-2">
                <strong className="text-gray-800">Description:</strong>{" "}
                {assignmentDetails.assignment.assignmentDescription || "N/A"}
              </p>
              <p className="mb-2">
                <strong className="text-gray-800">File:</strong>{" "}
                {assignmentDetails.assignment.filePath ? (
                  <a
                    href={assignmentDetails.assignment.filePath}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700"
                  >
                    View File
                  </a>
                ) : (
                  "No file available"
                )}
              </p>
              <p className="mb-4">
                <strong className="text-gray-800">Status:</strong>{" "}
                {assignmentDetails.student.status || "N/A"}
              </p>
              <div className="flex flex-col">
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="mb-4"
                  disabled={isSubmitted} 
                />
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
