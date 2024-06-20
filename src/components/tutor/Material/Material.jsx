import React from "react";
import "./Material.css";
import { LuUpload } from "react-icons/lu";

const Material = () => {
  const courses = ["SAT", "SAT", "SAT"];
  const materials = ["file", "doc", "pdf"];

  return (
    <div className="new-material-container">
      <p className="new-material-title">New Material</p>
      <div className="time-container">
        <div className="new-material-duration">
          <p className="new-material-instruction">Name of the Material</p>
          <input type="text" className="new-material-select" placeholder="" />
        </div>
        <div className="new-material-duration">
          <p className="new-material-instruction">Material Type</p>
          <select
            name="material"
            id="material"
            className="new-material-select"
            defaultValue=""
          >
            <option value="" enabled>
              Select Material Type
            </option>
            {materials.map((material, index) => (
              <option key={index} value={material}>
                {material}
              </option>
            ))}
          </select>
        </div>
      </div>
      <p className="new-assignment-instruction">Select Course</p>
      <select
        name="course-names"
        id="course-names"
        className="new-material-select"
        defaultValue=""
      >
        <option value="" enabled>
          Select a Course
        </option>
        {courses.map((course, index) => (
          <option key={index} value={course}>
            {course}
          </option>
        ))}
      </select>
      <p className="new-material-instruction">Description</p>
      <textarea
        name="postContent"
        className="new-material-name"
        rows={4}
        cols={40}
      />
      <p className="new-material-instruction">Select Files</p>
      <div className="material-file-input">
        <input
          type="file"
          className="material-btn"
          id="file-upload"
          accept=".pdf, .docx, .doc"
        />
        <label htmlFor="file-upload" className="file-input-material-button ">
          Browse
        </label>
      </div>
      <div className="upload-area">
        <div className="upload-icon">
          <LuUpload />
        </div>
        <p>You can drag and drop files here to add them.</p>
      </div>
      <button className="create-material">Create Material</button>
    </div>
  );
};

export default Material;
