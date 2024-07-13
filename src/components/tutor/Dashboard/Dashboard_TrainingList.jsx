import React from "react";
import { HiDotsVertical } from "react-icons/hi";

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
    <div className="w-full flex flex-col bg-[#E5F0FC] shadow-md  rounded-md">
      <p className="font-poppins text-semibold p-4">Training List</p>

      <div className="overflow-x-scroll">
        <table className="min-w-full bg-white rounded-lg font-poppins">
          <thead>
            <tr className="bg-white uppercase text-xs md:text-sm lg:text-base">
              <th className="py-3  md:px-6 text-center">ID</th>
              <th className="py-3  md:px-6 text-center">Course Name</th>
              <th className="py-3  md:px-6 text-center">Training Details</th>
              <th className="py-3  md:px-6 text-center">Status</th>
              <th className="py-3 md:px-6 text-center">Students</th>
              <th className="py-3 md:px-6 text-center"></th>
            </tr>
          </thead>
          <tbody className="text-xs md:text-sm font-medium text-center">
            {data.map((item, index) => (
              <tr key={index} className="bg-[#E5F0FC] hover:bg-white">
                <td className="py-3  md:px-6  text-center">{item.id}</td>
                <td className="py-3 md:px-6 text-center">{item.courseName}</td>
                <td className="py-3 md:px-6 text-center">
                  {item.trainingDetails}
                </td>
                <td className="py-3 md:px-6 text-center text-black">
                  <button
                    className={` h-max p-1 ${
                      item.status === "Today" ? "bg-green-500" : "bg-yellow-200"
                    } rounded-md`}
                  >
                    {item.status}
                  </button>
                </td>
                <td className="py-3 md:px-6 text-center">{item.students}</td>
                <td className="py-3  md:px-6 text-center">
                  <HiDotsVertical className="cursor-pointer text-lg md:text-xl lg:text-2xl" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard_TrainingList;
