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

      <div className="responsive-tablee">
  {data.map((item, index) => (
    <div key={index} className="table-roww text-sm">
      <div className="table-celll">
        <span className="cell-headerr">ID:</span>
        <span className="cell-dataa">{item.id}</span>
      </div>
      <div className="table-celll">
        <span className="cell-headerr">Course Name:</span>
        <span className="cell-dataa">{item.courseName}</span>
      </div>
      <div className="table-celll">
        <span className="cell-headerr">Training Details:</span>
        <span className="cell-dataa">{item.trainingDetails}</span>
      </div>
      <div className="table-celll">
        <span className="cell-headerr">Status:</span>
        <span className="cell-dataa">
          <button
            className={`status-buttonn ${
              item.status === 'Today' ? 'status-today' : 'status-other'
            }`}
          >
            {item.status}
          </button>
        </span>
      </div>
      <div className="table-celll">
        <span className="cell-headerr">Students:</span>
        <span className="cell-dataa">{item.students}</span>
      </div>
      <div className="table-celll">
        <span className="cell-headerr">Actions:</span>
        <span className="cell-dataa">
          <HiDotsVertical className="action-iconn" />
        </span>
      </div>
    </div>
  ))}
</div>
    </div>
  );
};

export default Dashboard_TrainingList;
