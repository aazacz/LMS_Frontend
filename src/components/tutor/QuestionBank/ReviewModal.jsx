import React from "react";
import Loader from "../../reusable/Loader";

const ReviewModal = ({
  test,
  isOpen,
  onClose,
  reviewLoading,
  reviewData,
  onSubmissionView,
  handleSubmissionView,
}) => {
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
            <Loader />
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
              {reviewData === "No submissions found for this course" ? (
                <p>No submissions found for this course</p>
              ) : (
                submissions.map((submission) => (
                  <tr key={submission._id}>
                    <td className="px-4 py-2">{submission.studentId.name}</td>
                    <td className="px-4 py-2">
                      {/* Assuming score is calculated as the number of correct answers */}
                      {
                        submission.tests[0].result.filter((r) => r.isCorrect)
                          .length
                      }
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
                ))
              )}
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

export default ReviewModal;
