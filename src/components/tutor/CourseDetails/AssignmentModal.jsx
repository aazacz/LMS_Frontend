import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa"; // Import a close icon
import { TutorAxiosInstance } from "../../../routes/TutorRoutes";
import GradingModal from "./GradingModal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AssignmentModal = ({ isOpen, onClose, assignmentId }) => {
  const [assignment, setAssignment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //For Modal
  const [isGradingModalOpen, setIsGradingModalOpen] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState(null);

  const openGradingModal = (submission) => {
    setSelectedSubmission(submission);
    setIsGradingModalOpen(true);
  };

  const closeGradingModal = () => {
    setIsGradingModalOpen(false);
    setSelectedSubmission(null);
  };

  const handleGradeSubmit = (updatedSubmission) => {
    setAssignment((prevAssignment) => ({
      ...prevAssignment,
      submissions: prevAssignment.submissions.map((sub) =>
        sub._id === updatedSubmission._id ? updatedSubmission : sub
      ),
    }));
    toast.success("Assignment updated successfully");
  };

  useEffect(() => {
    if (isOpen && assignmentId) {
      const fetchAssignment = async () => {
        try {
          const { data } = await TutorAxiosInstance.get(
            `api/assignments/tutor/assignment/${assignmentId}`
          );
          console.log(data.data.assignment, "Inside Assignemnt MOdal");
          console.log(data);
          if (data?.success) {
            setAssignment(data.data.assignment);
          } else {
            setAssignment(null); // No assignment found
          }
        } catch (err) {
          setError(err);
        } finally {
          setLoading(false);
        }
      };
      fetchAssignment();
    }
  }, [isOpen, assignmentId]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // Prevent background scroll
    } else {
      document.body.style.overflow = ""; // Re-enable scroll
    }
    return () => {
      document.body.style.overflow = ""; // Cleanup on unmount
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center backdrop-blur-sm z-50 mt-5">
      <div className="relative bg-white p-6 rounded-lg w-[90%] md:w-[80%] lg:w-[70%] h-[90%] overflow-y-auto z-60">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
        >
          <FaTimes size={24} />
        </button>
        {loading ? (
          <div className="text-center">Please wait for a moment</div>
        ) : error ? (
          <div className="text-center text-red-500">Error: {error.message}</div>
        ) : assignment ? (
          <>
            <h2 className="text-2xl font-bold mb-4">Assignment Details</h2>
            <p className="mb-2">
              <strong>Title:</strong> {assignment.assignmentName}
            </p>
            <p className="mb-4">
              <strong>Description:</strong> {assignment.assignmentDescription}
            </p>
            <p className="mb-4">
              <strong>Due Date:</strong> {assignment.dueDate}
            </p>
            {assignment.filePath && (
              <p className="mb-4 px-4 w-max rounded-md py-2 bg-blue-600 text-white">
                <a
                  href={assignment.filePath}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Assignment File
                </a>
              </p>
            )}
            <h3 className="text-xl font-semibold mt-4">Submissions</h3>

            <div className="overflow-x-auto">
              {assignment?.submissions?.filter(
                (submission) => submission.filePath
              ).length > 0 ? (
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Student Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        File
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {assignment.submissions
                      .filter((submission) => submission.filePath)
                      .map((submission, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {submission.studentId.name}{" "}
                          </td>
                          {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <a
                              href={submission.filePath}
                              target="_blank"
                              className="text-blue-600 hover:text-blue-900"
                              rel="noopener noreferrer"
                            >
                              View File
                            </a>
                          </td> */}
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <button
                              onClick={() => openGradingModal(submission)}
                              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                            >
                              Grade
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              ) : (
                <p>No submissions found.</p>
              )}
            </div>
          </>
        ) : (
          <div className="text-center">No assignment found</div>
        )}
        <GradingModal
          isOpen={isGradingModalOpen}
          onClose={closeGradingModal}
          submission={selectedSubmission}
          assignmentId={assignmentId}
          onGradeSubmit={handleGradeSubmit}
        />
        <ToastContainer />
      </div>
    </div>
  );
};

const formatDate = (date) => {
  const options = {
    timeZone: "Asia/Kolkata",
    hour12: true,
    hour: "numeric",
    minute: "2-digit",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  };
  return new Date(date).toLocaleString("en-IN", options);
};

export default AssignmentModal;
