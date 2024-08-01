import React from "react";
import { HiDotsVertical } from "react-icons/hi";
import "./Dashboard.css"

const Dashboard_TrainingList = () => {
  const data = [
    {
      id: 1,
      courseName: "Course A",
      trainingDetails: "Details for Course A",
      status: "Today",
      students: 10,
    },
    {
      id: 2,
      courseName: "Course B",
      trainingDetails: "Details for Course B",
      status: "Confirmed",
      students: 20,
    },
    {
      id: 3,
      courseName: "Course C",
      trainingDetails: "Details for Course C",
      status: "Confirmed",
      students: 15,
    },
    {
      id: 4,
      courseName: "Course C",
      trainingDetails: "Details for Course C",
      status: "Today",
      students: 15,
    },
    {
      id: 5,
      courseName: "Course C",
      trainingDetails: "Details for Course C",
      status: "Confirmed",
      students: 15,
    },
    {
      id: 6,
      courseName: "Course C",
      trainingDetails: "Details for Course C",
      status: "Today",
      students: 15,
    },
  ];

  return (
    <div className="flex flex-col bg-[#E5F0FC] shadow-md rounded-md">
      <div>
        {" "}
        <p className="font-poppins text-semibold p-4">Training List</p>
      </div>

      <div className="responsive-table">
  {data.map((item, index) => (
    <div key={index} className="table-row text-sm">
      <div className="table-cell">
        <span className="cell-header">ID:</span>
        <span className="cell-data">{item.id}</span>
      </div>
      <div className="table-cell">
        <span className="cell-header">Course Name:</span>
        <span className="cell-data">{item.courseName}</span>
      </div>
      <div className="table-cell">
        <span className="cell-header">Training Details:</span>
        <span className="cell-data">{item.trainingDetails}</span>
      </div>
      <div className="table-cell">
        <span className="cell-header">Status:</span>
        <span className="cell-data">
          <button
            className={`status-button ${
              item.status === 'Today' ? 'status-today' : 'status-other'
            }`}
          >
            {item.status}
          </button>
        </span>
      </div>
      <div className="table-cell">
        <span className="cell-header">Students:</span>
        <span className="cell-data">{item.students}</span>
      </div>
      <div className="table-cell">
        <span className="cell-header">Actions:</span>
        <span className="cell-data">
          <HiDotsVertical className="action-icon" />
        </span>
      </div>
    </div>
  ))}
</div>
    </div>
  );
};

export default Dashboard_TrainingList;
