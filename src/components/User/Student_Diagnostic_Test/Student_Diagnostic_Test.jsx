import React from "react";
import "./Student_Diagnostic_test.css";

const Student_Diagnostic_Test = () => {
  return (
    <div className="student-diagnostic-test-rules-main-container">
      <div className="student-diagnostic-test-main-title">Instructions:</div>
      <div className="student-diagnostic-test-sub-title">
        <li>Total Number of Questions: <span className="text-bold">9</span></li>
        <li>Time Alloted: <span className="text-bold">25 mins</span></li>
        <li>
          Each Question Carries:{" "}
          <span className="text-bold"> 4 Marks,Negative :-1 Mark</span>
        </li>
        <li>Mic must be muted.</li>
        <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. </li>
        <li>
          Saepe iste dignissimos repudiandae possimus, neque deleniti laudantium
          a ab tempora blanditiis ut corporis amet dicta incidunt eos eius nobis
          perspiciatis.
        </li>
      </div>
      <div className="student-diagnostic-test-main-title">
        Total 10 Questions Correct +4|Wrong -1
      </div>
      <div className="student-diagnostic-test-sub-title">
        <li>
          Click on submit button given at the bottom of the page to submit your
          exam.
        </li>
        <li>Test will be submitted automatically if the time expires.</li>
        <li>
          Each Question Carries{" "}
          <span className="text-bold"> 4 Marks,Nagative :-1 Mark</span>
        </li>
        <li>Do not refresh the page during your test.</li>
      </div>
      <div className="student-diagnostic-test-submit-button">Submit</div>
    </div>
  );
};

export default Student_Diagnostic_Test;
