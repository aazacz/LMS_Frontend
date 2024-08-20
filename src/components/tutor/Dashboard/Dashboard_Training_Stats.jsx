// import React from "react";
// import { HiOutlineBookOpen } from "react-icons/hi2";
// import { IoMdPeople } from "react-icons/io";
// import { FaRegClock } from "react-icons/fa6";

// const Dashboard_Training_Stats = () => {
//     return (
//         <div className="z-50 w-full h-max p-4">
//             <div>
//                 <p className=" p-2 font-poppins text-sm sm:text-md font-semibold">
//                     Training Stats
//                 </p>
//                 <div className="w-full h-max grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
//                     <div className="h-16 p-2 bg-[#E5F0FC] rounded-lg flex justify-start shadow-md items-start gap-2">
//                         <div className="w-10 h-10 bg-white flex justify-center items-center rounded-lg">
//                             <HiOutlineBookOpen className="text-black text-2xl" />
//                         </div>
//                         <div className="flex flex-col justify-center items-start font-poppins">
//                             <p className="text-xs lg:text-[14px] font-semibold">
//                                 Total Trainings
//                             </p>
//                             <p className="text-sm md:text-md">20</p>
//                         </div>
//                     </div>
//                     <div className="h-16 p-2  bg-[#E5F0FC]  rounded-lg flex justify-start shadow-md items-start gap-2">
//                         <div className="w-10 h-10 bg-white flex justify-center items-center rounded-lg">
//                             <IoMdPeople className="text-black text-2xl" />
//                         </div>
//                         <div className="flex flex-col justify-center items-start font-poppins">
//                             <p className="text-xs lg:text-[14px] font-semibold">
//                                 Total Students
//                             </p>
//                             <p className="text-sm md:text-md">20</p>
//                         </div>
//                     </div>
//                     <div className="h-16 p-2  bg-[#E5F0FC]  rounded-lg flex justify-start shadow-md items-start gap-2">
//                         <div className="w-10 h-10 bg-white flex justify-center items-center rounded-lg">
//                             <FaRegClock className="text-black text-2xl" />
//                         </div>
//                         <div className="flex flex-col justify-center items-start font-poppins">
//                             <p className="text-xs lg:text-[14px] font-semibold">
//                                 Total Sessions
//                             </p>
//                             <p className="text-sm md:text-md">20</p>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Dashboard_Training_Stats




import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { HiOutlineBookOpen } from 'react-icons/hi2';
import { IoMdPeople } from 'react-icons/io';
import { FaRegClock } from 'react-icons/fa6';
import { TutorAxiosInstance } from "../../../routes/TutorRoutes";


const Dashboard_Training_Stats = () => {
    const [trainingStats, setTrainingStats] = useState({
        totalTrainings: 0,
        totalStudents: 0,
        totalSessions: 0,
    });

    useEffect(() => {
        const fetchTrainingStats = async () => {
            try {
                // Replace 'YOUR_API_ENDPOINT' with the actual API endpoint
                const response = await TutorAxiosInstance.get('api/courseTutor/dashboard');
                
                // Update the state with the fetched data
                setTrainingStats({
                    totalTrainings: response.data.totalTrainings,
                    totalStudents: response.data.totalStudents,
                    totalSessions: response.data.totalSessions,
                });
            } catch (error) {
                console.error('Error fetching training stats:', error);
            }
        };

        fetchTrainingStats();
    }, []);

    return (
        <div className="z-50 w-full h-max p-4">
            <div>
                <p className="p-2 font-poppins text-sm sm:text-md font-semibold">
                    Training Stats
                </p>
                <div className="w-full h-max grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="h-16 p-2 bg-[#E5F0FC] rounded-lg flex justify-start shadow-md items-start gap-2">
                        <div className="w-10 h-10 bg-white flex justify-center items-center rounded-lg">
                            <HiOutlineBookOpen className="text-black text-2xl" />
                        </div>
                        <div className="flex flex-col justify-center items-start font-poppins">
                            <p className="text-xs lg:text-[14px] font-semibold">
                                Total Trainings
                            </p>
                            <p className="text-sm md:text-md">{trainingStats.totalTrainings}</p>
                        </div>
                    </div>
                    <div className="h-16 p-2  bg-[#E5F0FC]  rounded-lg flex justify-start shadow-md items-start gap-2">
                        <div className="w-10 h-10 bg-white flex justify-center items-center rounded-lg">
                            <IoMdPeople className="text-black text-2xl" />
                        </div>
                        <div className="flex flex-col justify-center items-start font-poppins">
                            <p className="text-xs lg:text-[14px] font-semibold">
                                Total Students
                            </p>
                            <p className="text-sm md:text-md">{trainingStats.totalStudents}</p>
                        </div>
                    </div>
                    <div className="h-16 p-2  bg-[#E5F0FC]  rounded-lg flex justify-start shadow-md items-start gap-2">
                        <div className="w-10 h-10 bg-white flex justify-center items-center rounded-lg">
                            <FaRegClock className="text-black text-2xl" />
                        </div>
                        <div className="flex flex-col justify-center items-start font-poppins">
                            <p className="text-xs lg:text-[14px] font-semibold">
                                Total Sessions
                            </p>
                            <p className="text-sm md:text-md">{trainingStats.totalSessions}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard_Training_Stats;
