import React from "react";
import { useState } from "react";

const Dashboard_Notifications = () => {
  const [activeTab, setActiveTab] = useState("general");

  const generalData = [
    { id: 1, info: "General Info 1" },
    { id: 2, info: "General Info 2" },
    { id: 3, info: "General Info 3" },
  ];

  const studentData = [
    { id: 1, info: "Student Info 1" },
    { id: 2, info: "Student Info 2" },
    { id: 3, info: "Student Info 3" },
  ];
  return (
    <div className="font-poppins w-full h-full flex flex-col bg-[#E5F0FC] mt-2 rounded-md shadow-md justify-center items-center">
      <p className="p-2 text-sm font-medium">Notifications</p>
      <div className="w-[90%] h-64 bg-white rounded-md">
        <div className="p-4">
          <div className="flex gap-4 mb-4">
            <button
              className={`px-4 py-2 rounded text-xs ${
                activeTab === "student"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-black"
              }`}
              onClick={() => setActiveTab("student")}
            >
              Student
            </button>
            <button
              className={`px-4 py-2 rounded text-xs ${
                activeTab === "general"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-black"
              }`}
              onClick={() => setActiveTab("general")}
            >
              General
            </button>
          </div>

          <div>
            {activeTab === "general" && (
              <div>
                <h2 className="text-sm font-bold mb-2">General Data</h2>
                <ul>
                  {generalData.map((item) => (
                    <li key={item.id} className="mb-1 text-xs">
                      {item.info}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === "student" && (
              <div>
                <h2 className="text-xs font-bold mb-2">Student Data</h2>
                <ul>
                  {studentData.map((item) => (
                    <li key={item.id} className="mb-1 text-xs">
                      {item.info}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard_Notifications;
