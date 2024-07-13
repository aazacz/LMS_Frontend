import React from 'react'
import { AiOutlinePieChart } from 'react-icons/ai'
import { PiDownloadSimpleFill } from 'react-icons/pi'
import { PiMoney } from 'react-icons/pi'
import { FaBook } from 'react-icons/fa'
import { FaBookBookmark } from 'react-icons/fa6'
import { FaUserGraduate } from 'react-icons/fa'
import { FaChalkboardTeacher } from 'react-icons/fa'
import { FaUsersRectangle } from 'react-icons/fa6'
import { GoPerson } from 'react-icons/go'
import { IoMdTime } from 'react-icons/io'
import { IoBookOutline } from 'react-icons/io5'
import { CiLocationOn } from 'react-icons/ci'
import { CiCalendar } from 'react-icons/ci'
import { FaRegCircle } from 'react-icons/fa6'
import { FaCircle } from 'react-icons/fa'
import { CiSettings } from 'react-icons/ci'
import { FaRegArrowAltCircleUp } from 'react-icons/fa'
import { SlOptions } from 'react-icons/sl'
import { FaMedal } from 'react-icons/fa'
import { FaTrophy } from 'react-icons/fa'
import { FaCrown } from 'react-icons/fa6'
import { Bar } from 'react-chartjs-2'

const Dashboard_TopSellingCourses = () => {
    const tutors = [
        {
            name: 'Travis Fuller',
            role: 'Tutor',
            students: 2348,
            subject: 'Math',
            modules: 5,
            progress: [
                { label: 'Classes', value: '33%', color: '#4F46E5' },
                { label: 'Tests', value: '17%', color: '#10B981' },
                { label: 'Assessments', value: '17%', color: '#2DB1EC' },
            ],
        },
        {
            name: 'Jordan Smith',
            role: 'Instructor',
            students: 1923,
            subject: 'Science',
            modules: 5,
            progress: [
                { label: 'Classes', value: '45%', color: '#4F46E5' },
                { label: 'Tests', value: '30%', color: '#10B981' },
                { label: 'Assessments', value: '25%', color: '#2DB1EC' },
            ],
        },
        {
            name: 'Jordan Smith',
            role: 'Tutor',
            students: 1900,
            subject: 'Science',
            modules: 5,
            progress: [
                { label: 'Classes', value: '15%', color: '#4F46E5' },
                { label: 'Tests', value: '40%', color: '#10B981' },
                { label: 'Assessments', value: '35%', color: '#2DB1EC' },
            ],
        },
        {
            name: 'Jordan Smith',
            role: 'Instructor',
            students: 1823,
            subject: 'Science',
            modules: 5,
            progress: [
                { label: 'Classes', value: '45%', color: '#4F46E5' },
                { label: 'Tests', value: '30%', color: '#10B981' },
                { label: 'Assessments', value: '25%', color: '#2DB1EC' },
            ],
        },
        // Add more tutor objects here as needed
    ]

    return (
        <div className="w-full h-max shadow-md bg-blue-100 rounded-lg p-2 flex justify-start items-start flex-wrap">
            <div className="w-full md:w-[45%] lg:w-[25%]  h-max flex flex-col justify-start items-stretch gap-2 m-2 p-2">
                <p className="text-md  font-semibold font-poppins">
                    Top Selling Courses and Employees
                </p>
                <p className="text-xs text-gray-500 font-poppins">
                    The top selles are calculated based on the sales of a
                    product and undergoes hourly updations.
                </p>
                <div className="flex flex-col justify-center items-start ">
                    <p className="font-poppins text-sm text-gray-500">
                        Sales Growth
                    </p>
                    <div className="flex justify-center item-center gap-2">
                        <FaRegArrowAltCircleUp className="text-lg text-green-400" />
                        <p className="font-poppins text-sm font-semibold">
                            22,225.22
                        </p>
                    </div>
                </div>
            </div>
            <div className="w-full md:w-[50%] lg:w-[70%] h-max flex justify-start items-start p-2 gap-4 overflow-x-scroll no-scrollbar ">
                <div className="w-full h-max rounded-md p-4 flex flex-row gap-4">
                    {tutors.map((tutor, index) => (
                        <div
                            key={index}
                            className="w-max bg-white h-max rounded-md p-4 flex flex-col gap-2"
                        >
                            <div className="w-full h-max flex justify-start items-center">
                                <div className="w-12 h-12 bg-red-400 overflow-hidden">
                                    {/* <img src={MonaLisa} /> */}
                                </div>
                                <div className="w-max h-max p-2 flex flex-col justify-start items-start">
                                    <p className="text-xs md:text-sm font-poppins">
                                        {tutor.name}
                                    </p>
                                    <p className="text-xs text-gray-500 font-poppins">
                                        {tutor.role}
                                    </p>
                                </div>
                            </div>
                            <div className="w-full h-max flex justify-around items-center gap-4">
                                <div className="w-max h-max flex flex-col justify-center items-center">
                                    <p className="text-xs text-gray-500 font-poppins">
                                        Students
                                    </p>
                                    <p className="text-xs md:text-sm font-poppins font-semibold">
                                        {tutor.students}
                                    </p>
                                </div>
                                <div className="w-max h-max flex flex-col justify-center items-center">
                                    <p className="text-xs text-gray-500 font-poppins">
                                        Subject
                                    </p>
                                    <p className="text-xs md:text-sm font-poppins font-semibold">
                                        {tutor.subject}
                                    </p>
                                </div>
                                <div className="w-max h-max flex flex-col justify-center items-center">
                                    <p className="text-xs text-gray-500 font-poppins">
                                        Modules
                                    </p>
                                    <p className="text-xs md:text-sm font-poppins font-semibold">
                                        {tutor.modules}
                                    </p>
                                </div>
                            </div>
                            <div className="w-full h-2 rounded-lg bg-red-400"></div>
                            <div className="w-full text-xs md:text-sm h-max flex flex-col gap-2">
                                {tutor.progress.map((item, idx) => (
                                    <div
                                        key={idx}
                                        className="flex font-poppins text-xs font-medium gap-1"
                                    >
                                        <p className="flex gap-1 justify-center items-center">
                                            <FaCircle
                                                className={`text-[${item.color}]`}
                                            />
                                            {item.label}
                                        </p>
                                        <p className="text-gray-500">
                                            {item.value}
                                        </p>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-4 w-full h-max flex justify-between items-center">
                                <div className="flex gap-1">
                                    <FaMedal className="text-yellow-400" />
                                    <FaTrophy className="text-yellow-400" />{' '}
                                    <FaCrown className="text-yellow-400" />
                                </div>
                                <div>
                                    <CiSettings className="text-xl cursor-pointer" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Dashboard_TopSellingCourses
