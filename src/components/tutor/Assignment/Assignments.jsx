import React from "react";
import "./Assignments.css";
import axios from "axios"
import { useParams } from "react-router-dom";

const Assignments = () => {


  const students = ["John", "Rita", "Raj"];

  const { courseId } = useParams();
  console.log(courseId);


  return (

    <div className="new-assignment-container">

      <p className="new-assignment-title">New Assignment</p>
      <p className="new-assignment-instruction">Name of Assignment</p>
      <input type="text" className="new-assignment-name" placeholder="" />
      <p className="new-assignment-instruction">Description</p>
      <textarea
        name="postContent"
        className="new-assignment-name"
        rows={4}
        cols={40}
      />
      <p className="new-assignment-instruction">Assign To</p>
      <select
        name="assignment-names"
        id="assignment-names"
        className="new-assignment-select"
        defaultValue=""
      >
        <option value="" enabled>
          Select a Student
        </option>
        {students.map((student, index) => (
          <option key={index} value={student}>
            {student}
          </option>
        ))}
      </select>
      <p className="new-assignment-instruction">Select Files</p>
      <div className="file-input">
        <input
          type="file"
          className="btn"
          id="file-upload"
          accept=".pdf, .docx, .doc"
        />
        <label htmlFor="file-upload" className="file-input-button ">
          Browse
        </label>
      </div>
      <button  className="create-assignment">Create Assignment</button>
    </div>
  );
};

export default Assignments;
