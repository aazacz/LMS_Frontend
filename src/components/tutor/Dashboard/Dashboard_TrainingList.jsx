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
    <div className="font-poppins max-h-72 flex flex-col bg-[#E5F0FC] shadow-md rounded-md">
      <div>
        <p className="font-semibold p-4">Training List</p>
      </div>

      {/* Table for large screens */}
      <div className=" text-sm hidden lg:block max-h-72 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Training Details</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Students</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.courseName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.trainingDetails}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button
                    className={`px-2 py-1 rounded-sm text-white ${
                      item.status === "Today" ? "bg-red-600" : "bg-blue-600"
                    }`}
                  >
                    {item.status}
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.students}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <HiDotsVertical className="text-gray-600 cursor-pointer" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Card layout for medium and small screens */}
      <div className="max-h-72 overflow-x-auto text-sm lg:hidden grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
        {data.map((item) => (
          <div key={item.id} className="bg-white p-4 rounded-md shadow-md flex flex-col space-y-2">
            <div className="flex flex-col">
              <div className="flex">
                <p className="font-semibold text-gray-700 w-1/3">ID:</p>
                <p className="text-gray-500">{item.id}</p>
              </div>
              <div className="flex">
                <p className="font-semibold text-gray-700 w-1/3">Course Name:</p>
                <p className="text-gray-500">{item.courseName}</p>
              </div>
              <div className="flex">
                <p className="font-semibold text-gray-700 w-1/3">Training Details:</p>
                <p className="text-gray-500">{item.trainingDetails}</p>
              </div>
              <div className="flex items-center">
                <p className="font-semibold text-gray-700 w-1/3">Status:</p>
                <button
                  className={`px-2 py-1 rounded-sm text-white ${
                    item.status === "Today" ? "bg-red-600" : "bg-blue-600"
                  }`}
                >
                  {item.status}
                </button>
              </div>
              <div className="flex">
                <p className="font-semibold text-gray-700 w-1/3">Students:</p>
                <p className="text-gray-500">{item.students}</p>
              </div>
              <div className="flex items-center">
                <p className="font-semibold text-gray-700 w-1/3">Actions:</p>
                <HiDotsVertical className="text-gray-600 cursor-pointer" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard_TrainingList;
