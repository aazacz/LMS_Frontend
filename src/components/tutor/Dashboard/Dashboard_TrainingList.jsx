import React from 'react'
import { HiDotsVertical } from "react-icons/hi";

const Dashboard_TrainingList = () => {
  const status ='swarna'
  const data = [
    {
      id: 1,
      courseName: 'Course A',
      trainingDetails: 'Details for Course A',
      status: 'Today',
      students: 10
    },
    {
      id: 2,
      courseName: 'Course B',
      trainingDetails: 'Details for Course B',
      status: 'Confirmed',
      students: 20
    },
    {
      id: 3,
      courseName: 'Course C',
      trainingDetails: 'Details for Course C',
      status: 'Confirmed',
      students: 15
    },
    {
      id: 4,
      courseName: 'Course C',
      trainingDetails: 'Details for Course C',
      status: 'Today',
      students: 15
    },
    {
      id: 5,
      courseName: 'Course C',
      trainingDetails: 'Details for Course C',
      status: 'Confirmed',
      students: 15
    },
    {
      id: 6,
      courseName: 'Course C',
      trainingDetails: 'Details for Course C',
      status: 'Today',
      students: 15
    },
  ];

  return (
    <div className='w-full flex flex-col    bg-[#E5F0FC] shadow-md  rounded-md'>
      <p className='font-poppins text-semibold p-4'>Training List</p>
    
    <div className="w-full h-64">
      <div className=" border-none overflow-x-auto h-56 overflow-xy-auto no-scrollbar">
        <table className=" w-full h-64 bg-white rounded-lg  font-poppins">
          <thead>
            <tr className="bg-white uppercase  text-xs md:text-sm lg:text-xl sticky">
              <th className="py-3 px-6 text-left bg-white">ID</th>
              <th className="py-3 px-6 text-left bg-white">Course Name</th>
              <th className="py-3 px-6 text-left bg-white">Training Details</th>
              <th className="py-3 px-6 text-left bg-white">Status</th>
              <th className="py-3 px-6 text-left bg-white">Students</th>
              <th className="py-3 px-6 text-left bg-white">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm font-medium">
            {data.map((item, index) => (
              <tr key={index} className=" bg-[#E5F0FC]  text-xs md:text-sm hover:bg-white">
                <td className="py-3 px-6 text-left">{item.id}</td>
                <td className="py-3 px-6 text-left">{item.courseName}</td>
                <td className="py-3 px-6 text-left">{item.trainingDetails}</td>
                <td className="py-3 px-6 text-left text-black"><button className={`w-max h-max p-1 ${item.status=== "Today" ? "bg-green-500": "bg-yellow-200"} rounded-md`}>{item.status}</button></td>
                <td className="py-3 px-6 text-left">{item.students}</td>
                <td className="py-3 px-6">
                  <HiDotsVertical className='cursor-pointer text-2xl'/>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  )
}

export default Dashboard_TrainingList