// import React from "react";
// import { HiDotsVertical } from "react-icons/hi";

// const Dashboard_TrainingList = () => {
//   const data = [
//     {
//       id: 1,
//       courseName: "Course A",
//       trainingDetails: "Details for Course A",
//       status: "Today",
//       students: 10,
//     },
//     {
//       id: 2,
//       courseName: "Course B",
//       trainingDetails: "Details for Course B",
//       status: "Confirmed",
//       students: 20,
//     },
//     {
//       id: 3,
//       courseName: "Course C",
//       trainingDetails: "Details for Course C",
//       status: "Confirmed",
//       students: 15,
//     },
//     {
//       id: 4,
//       courseName: "Course C",
//       trainingDetails: "Details for Course C",
//       status: "Today",
//       students: 15,
//     },
//     {
//       id: 5,
//       courseName: "Course C",
//       trainingDetails: "Details for Course C",
//       status: "Confirmed",
//       students: 15,
//     },
//     {
//       id: 6,
//       courseName: "Course C",
//       trainingDetails: "Details for Course C",
//       status: "Today",
//       students: 15,
//     },
//   ];

//   return (
//     <div className="font-poppins max-h-72 flex flex-col bg-[#E5F0FC] shadow-md rounded-md">
//       <div>
//         <p className="font-semibold p-4">Training List</p>
//       </div>

//       {/* Table for large screens */}
//       <div className=" w-full max-h-72 overflow-x-auto p-2 mb-4">
//         <table className="text-[12px] md:text-sm min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course Name</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Training Details</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Students</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {data.map((item) => (
//               <tr key={item.id}>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.id}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.courseName}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.trainingDetails}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm">
//                   <button
//                     className={`px-2 py-1 rounded-sm text-white ${
//                       item.status === "Today" ? "bg-red-600" : "bg-blue-600"
//                     }`}
//                   >
//                     {item.status}
//                   </button>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.students}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                   <HiDotsVertical className="text-gray-600 cursor-pointer" />
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Card layout for medium and small screens */}
//       {/* <div className="max-h-72 overflow-x-auto text-sm lg:hidden grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
//         {data.map((item) => (
//           <div key={item.id} className="bg-white p-4 rounded-md shadow-md flex flex-col space-y-2">
//             <div className="flex flex-col">
//               <div className="flex">
//                 <p className="font-semibold text-gray-700 w-1/3">ID:</p>
//                 <p className="text-gray-500">{item.id}</p>
//               </div>
//               <div className="flex">
//                 <p className="font-semibold text-gray-700 w-1/3">Course Name:</p>
//                 <p className="text-gray-500">{item.courseName}</p>
//               </div>
//               <div className="flex">
//                 <p className="font-semibold text-gray-700 w-1/3">Training Details:</p>
//                 <p className="text-gray-500">{item.trainingDetails}</p>
//               </div>
//               <div className="flex items-center">
//                 <p className="font-semibold text-gray-700 w-1/3">Status:</p>
//                 <button
//                   className={`px-2 py-1 rounded-sm text-white ${
//                     item.status === "Today" ? "bg-red-600" : "bg-blue-600"
//                   }`}
//                 >
//                   {item.status}
//                 </button>
//               </div>
//               <div className="flex">
//                 <p className="font-semibold text-gray-700 w-1/3">Students:</p>
//                 <p className="text-gray-500">{item.students}</p>
//               </div>
//               <div className="flex items-center">
//                 <p className="font-semibold text-gray-700 w-1/3">Actions:</p>
//                 <HiDotsVertical className="text-gray-600 cursor-pointer" />
//               </div>
//             </div>
//           </div>
//         ))}
//       </div> */}
//     </div>
//   );
// };

// export default Dashboard_TrainingList;




import React, { useEffect, useState } from "react";
import axios from "axios";
import { HiDotsVertical } from "react-icons/hi";

const Dashboard_TrainingList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(null); // Track visibility of dropdowns
  const [sortOrder, setSortOrder] = useState('asc'); // Default sort order

  useEffect(() => {
    const fetchTrainingList = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/courseTutor/training-list');
        setData(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTrainingList();
  }, []);

  const handleDropdownToggle = (id) => {
    setDropdownVisible(dropdownVisible === id ? null : id);
  };

  const handleViewDetails = (id) => {
    // Handle "View Details" logic here
    console.log(`View details for ID: ${id}`);
  };

  const handleUpdateStatus = (id) => {
    // Handle "Update Status" logic here
    console.log(`Update status for ID: ${id}`);
  };
  const handleSortToggle = () => {
    setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
  };
  const sortedData = [...data].sort((a, b) => {
    const comparison = a.courseName.localeCompare(b.courseName);
    return sortOrder === 'asc' ? comparison : -comparison;
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="font-poppins max-h-72 flex flex-col bg-[#E5F0FC] shadow-md rounded-md">
      <div className="flex justify-between items-center p-4">
        <p className="font-semibold">Training List</p>
        <button
          onClick={handleSortToggle}
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Sort {sortOrder === 'asc' ? 'Descending' : 'Ascending'}
        </button>
      </div>

      {/* Table for large screens */}
      <div className="w-full max-h-72 overflow-x-auto p-2 mb-4">
        <table className="text-[12px] md:text-sm min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Course Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Training Details
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Students
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedData.map((item, index) => (
              <tr key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {item.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.courseName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.trainingDetails}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button
                    className={`px-2 py-1 rounded-sm text-white ${
                      item.status === "completed"
                        ? "bg-green-600"
                        : item.status === "scheduled"
                        ? "bg-yellow-600"
                        : item.status === "incomplete" || item.status === "cancelled" || !item.status
                        ? "bg-red-600"
                        : "bg-gray-600"
                    }`}
                  >
                    {item.status || "Incomplete"}
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.students}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <HiDotsVertical className="text-gray-600 cursor-pointer" />
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
