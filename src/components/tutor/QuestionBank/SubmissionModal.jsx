import React from 'react';

const SubmissionModal = ({ submission, isOpen, onClose }) => {
  
  if (!isOpen || !submission) return null;

  const { studentId, submittedAt, tests } = submission;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-3/4 max-h-3/4 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Submission Details</h2>
        <p><strong>Student:</strong> {studentId.name}</p>
        <p><strong>Email:</strong> {studentId.email}</p>
        <p><strong>Submitted At:</strong> {new Date(submittedAt).toLocaleString()}</p>
        
        <h3 className="font-bold mt-4 mb-2">Test Results:</h3>
        {tests.map((test, testIndex) => (
          <div key={testIndex}>
            <h4 className="font-semibold mt-2">Test: {test.testId.title}</h4>
            <table className="w-full mt-2">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left">Question</th>
                  <th className="px-4 py-2 text-left">Selected Answer</th>
                  <th className="px-4 py-2 text-left">Correct?</th>
                  <th className="px-4 py-2 text-left">Reason</th>
                </tr>
              </thead>
              <tbody>
                {test.result.map((question, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2">{question.question}</td>
                    <td className="px-4 py-2">{question.answer}</td>
                    <td className="px-4 py-2">{question.isCorrect ? "Yes" : "No"}</td>
                    <td className="px-4 py-2">{question.reason}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
        
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

export default SubmissionModal;