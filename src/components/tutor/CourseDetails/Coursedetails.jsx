import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { BiSpreadsheet } from 'react-icons/bi'
import { LuTimer } from 'react-icons/lu'
import { Link, useParams } from 'react-router-dom'
import { FaCirclePlus, FaPenRuler } from 'react-icons/fa6'
import { RotatingLines } from 'react-loader-spinner'
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'
import { MdAssignmentAdd } from 'react-icons/md'
import { IoDocuments } from 'react-icons/io5'
import AsideBar from './AsideBar'
import AboutContent from './AboutContent'
import ModuleContent from './ModuleContent'
import TestsContent from './TestsContent'

const Coursedetails = () => {
    const baseURL = process.env.REACT_APP_API_URL
    const { courseId ,role} = useParams()
    const [course, setCourse] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                setLoading(true)
                const response = await axios.get(
                    `${baseURL}api/course/get-course/${courseId}`
                )
                setCourse(response.data)
                setLoading(false)
            } catch (error) {
                console.error('Error fetching course:', error)
                setLoading(false)
            }
        }

        fetchCourse()
    }, [courseId])

    const [activeTab, setActiveTab] = useState('about')

    const handleTabClick = (tab) => {
        setActiveTab(tab)
    }

    return (
        <div className="px-2 font-poppins flex">
            {loading ? (
                <RotatingLines
                    visible={true}
                    height="96"
                    width="96"
                    strokeColor="#01729c"
                    strokeWidth="2"
                    animationDuration="0.75"
                    ariaLabel="rotating-lines-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                />
            ) : (
                <div className="w-[70%] scroll overflow-y-scrol h-max p-4 flex flex-col">
                    <div className="w-full h-[300px] bg-gray-800 flex items-center justify-center text-white font-semibold text-3xl">
                        {course?.courseName}
                    </div>

                    <div className="w-full mt-4">
                        <div className="mb-4">
                            <h1 className="font-bold text-xl">
                                {course?.courseName}
                            </h1>
                            <div className="flex items-center gap-x-6 mt-2">
                                <span className="flex items-center gap-x-1 text-sm">
                                    <BiSpreadsheet className="text-gray-400" />
                                    {course?.modules?.length} Modules
                                </span>
                                <span className="flex items-center gap-x-1 text-sm">
                                    <LuTimer className="text-gray-400" />
                                    {course?.trainingDuration}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="w-full bg-blue-400 mt-4 relative">
                        <div className="flex w-full gap-x-6 px-2">
                            {['about', 'modules', 'tests', 'review'].map(
                                (tab, index) => (
                                    <button
                                        key={index}
                                        className={`relative py-2 ${
                                            activeTab === tab
                                                ? 'border-b-4 border-amber-500'
                                                : ''
                                        }`}
                                        onClick={() => handleTabClick(tab)}
                                    >
                                        {tab.charAt(0).toUpperCase() +
                                            tab.slice(1)}
                                    </button>
                                )
                            )}
                        </div>
                    </div>

                    <div className="relative mt-4 overflow-hidden h-64">
                        {activeTab === 'about' && (
                            <AboutContent about={course?.description} />
                        )}
                        {activeTab === 'modules' && (
                            <ModuleContent modules={course?.modules} />
                        )}
                        {activeTab === 'tests' && (
                            <TestsContent tests={course?.tests} />
                        )}
                        {activeTab === 'review' && (
                            <ReviewContent review={course?.review} />
                        )}
                    </div>
                </div>
            )}
            <AsideBar courseId={courseId} course={course?.modules} />
        </div>
    )
}

export default Coursedetails







