import React, { useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa'; // Import a close icon
import { TutorAxiosInstance } from '../../../routes/TutorRoutes';

const AssignmentModal = ({ isOpen, onClose, assignmentId }) => {
  const [assignment, setAssignment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen && assignmentId) {
      const fetchAssignment = async () => {
        try {
          const response = await TutorAxiosInstance.get(`api/studentTutorRoutes/assignment-details/${assignmentId}`);
          if (response.data.success) {
            setAssignment(response.data.assignment);
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center backdrop-blur-sm z-10">
      <div className="relative bg-white p-6 rounded-lg w-[90%] md:w-[80%] lg:w-[70%] h-[90%] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
        >
          <FaTimes size={24} />
        </button>
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-500">Error: {error.message}</div>
        ) : assignment ? (
          <>
            <h2 className="text-2xl font-bold mb-4">Assignment Details</h2>
            <p className="mb-2"><strong>Title:</strong> {assignment.assignmentName}</p>
            <p className="mb-4"><strong>Description:</strong> {assignment.assignmentDescription}</p>
            <p className="mb-4"><strong>Created At:</strong> {formatDate(assignment.timestamp)}</p>
            {assignment.filePath && (
              <p className="mb-4"><strong>File:</strong> <a href={assignment.filePath} target="_blank" rel="noopener noreferrer">View File</a></p>
            )}
            <h3 className="text-xl font-semibold mt-4">Student Details</h3>
            {assignment.students.length > 0 ? (
              <ul>
                {assignment.students.map((student, index) => (
                  <li key={index} className="mb-2">
                    <p><strong>Name:</strong> {student.name}</p>
                    <p><strong>File Path:</strong> {student.filePath ? <a href={student.filePath} target="_blank" rel="noopener noreferrer">View File</a> : 'No File Available'}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No students found.</p>
            )}
          </>
        ) : (
          <div className="text-center">No assignment found</div>
        )}
      </div>
    </div>
  );
};

const formatDate = (date) => {
  const options = {
    timeZone: 'Asia/Kolkata',
    hour12: true,
    hour: 'numeric',
    minute: '2-digit',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  };
  return new Date(date).toLocaleString('en-IN', options);
};

export default AssignmentModal;
