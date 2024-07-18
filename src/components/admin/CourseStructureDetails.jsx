import React, { useEffect, useState } from 'react'
import coursephoto from '../../assets/Common/coursephoto.jpeg'
import { BiSpreadsheet } from 'react-icons/bi'
import { LuTimer } from 'react-icons/lu'
import { Link, useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useSelector } from 'react-redux'
import Loader from '../reusable/Loader'
import { FaCirclePlus } from 'react-icons/fa6'
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'
import Swal from 'sweetalert2'

const CourseStructureDetails = ({ height }) => {
    const baseUrl = process.env.REACT_APP_API_URL
    const token = useSelector((state) => state.AdminDetails.token)
    const [Course, SetCourse] = useState()
    const [Loading, SetLoading] = useState(false)
    const [activeTab, setActiveTab] = useState('about')
    const [slideDirection, setSlideDirection] = useState('left')

    const { structureId } = useParams()

    const handleTabClick = (tab) => {
        setSlideDirection(
            activeTab === 'about' && tab === 'module' ? 'left' : 'right'
        )
        setActiveTab(tab)
    }

    useEffect(() => {
        axios
            .get(`${baseUrl}api/structure/get/${structureId}`, {
                headers: { authorization: `Bearer ${token}` },
            })
            .then((response) => {
                console.log('response.data')
                console.log(response.data)
                console.log(response.data._id)
                SetCourse(response.data)
            })
    }, [baseUrl, structureId, token])

    return (
        <>
            {Loading ? (
                <div className="w-full bg-gray-300 h-max flex justify-center items-center">
                    <Loader />
                </div>
            ) : (
                <div className="flex flex-col lg:flex-row h-full">
                    <div className="lg:w-[70%] w-full p-4 flex flex-col">
                        <div className="w-full h-[150px] bg-gray-800 flex items-center justify-center text-white font-semibold font-plusjakartasans md:text-3xl">
                            {Course ? Course.modules[0].moduleName : ''}
                        </div>

                        <div className="w-full mt-4">
                            <h1 className="font-bold text-xl font-plusjakartasans">
                                {Course ? Course.modules[0].moduleName : ''}
                            </h1>
                            <div className="flex items-center gap-x-6 mt-2">
                                <span className="flex items-center gap-x-1 text-sm font-plusjakartasans">
                                    <BiSpreadsheet className="text-gray-400" />
                                    {Course ? Course.modules.length : 0} Modules
                                </span>
                                <span className="flex items-center gap-x-1 text-sm font-plusjakartasans">
                                    <LuTimer className="text-gray-400" />
                                    {Course && Course.trainingDuration}
                                </span>
                            </div>
                        </div>

                        <div className="w-full mt-4">
                            <div className="flex w-full gap-x-4 bg-gray-400">
                                {['about', 'module', 'tests', 'review'].map(
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
                            <div className={`slide-content ${slideDirection}`}>
                                {activeTab === 'about' && <AboutContent />}
                                {activeTab === 'module' && (
                                    <ModuleContent course={Course} />
                                )}
                                {activeTab === 'tests' && <TestsContent />}
                                {activeTab === 'review' && <ReviewContent />}
                            </div>
                        </div>
                    </div>
                    <div className="lg:w-[30%] w-full">
                        <AsideBAr course={Course?.modules} id={Course?._id} />
                    </div>
                </div>
            )}
        </>
    )
}

export default CourseStructureDetails

const AboutContent = () => {
    return <div className="w-full h-full bg-red-300">About Content</div>
}

const ModuleContent = ({ Course }) => {
    const [modules, setModules] = useState([])

    useEffect(() => {
        if (Course && Course.modules) {
            setModules(Course.modules)
        }
    }, [Course])

    return (
        <div className="bg-green-300 w-full h-full">
            <h1></h1>
        </div>
    )
}

const TestsContent = () => {
    return <div className="bg-blue-300">Tests Content</div>
}

const ReviewContent = () => {
    return <div className="bg-yellow-300">Review Content</div>
}

const AsideBAr = ({ course, id }) => {
    const baseUrl = process.env.REACT_APP_API_URL
    const Token = useSelector((state) => state.AdminDetails.token)
    const navigate = useNavigate()

    const deleteHandler = () => {
        axios
            .delete(`${baseUrl}api/structure/delete/${id}`, {
                headers: { authorization: `Bearer ${Token}` },
            })
            .then((res) => {
                if (res.data.message === 'Structure deleted successfully') {
                    Swal.fire({
                        timer: 2000,
                        timerProgressBar: true,
                        title: 'Deleted!',
                        text: 'Your file has been deleted.',
                        icon: 'success',
                    })
                    navigate('/admin/home/coursestructure')
                }
            })
            .catch((error) => {
                console.warn(error)
                console.warn(error.message)
                throw new Error(error.messsage)
            })
    }

    const handleDeleteCourse = (id) => {
        Swal.fire({
            title: `Are you sure, you want to delete ?`,
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#eb5048',
            cancelButtonColor: '#878ca7',
            confirmButtonText: 'Delete Course Structure!',
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: 'Are you absolutely sure?',
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    timer: 2000,
                    timerProgressBar: true,
                    showCancelButton: true,
                    confirmButtonColor: '#eb5048',
                    cancelButtonColor: '#878ca7',
                    confirmButtonText: 'Yes, delete it!',
                }).then((result) => {
                    if (result.isConfirmed) {
                        deleteHandler()
                    }
                })
            }
        })
    }

    return (
        <div className="flex flex-col justify-between pb-8 bg-slate-200 h-full lg:sticky top-[10vh]">
            <div className="p-4">
                <div className="rounded-lg flex flex-col items-center">
                    <div className="w-full h-max border-b-2 border-gray-300 p-3 text-center bg-white">
                        <h1 className="font-plusjakartasans font-bold line-clamp-2">
                            Course Modules
                        </h1>
                    </div>
                    <div className="flex flex-col w-full mt-3 gap-y-2">
                        {course?.length > 0 ? (
                            course.map((module, moduleIndex) => (
                                <div
                                    key={module._id}
                                    className="w-full px-4 py-2 flex flex-col rounded-lg bg-white shadow-[0px_6px_12px_0px_#00000024]"
                                >
                                    <div className="flex justify-between items-center">
                                        <div className="flex gap-x-3 items-center w-[65%]">
                                            <div className="px-2 py- bg-[#C75625] text-white rounded-[4px] text-x flex font justify-center items-center">
                                                {moduleIndex + 1}
                                            </div>
                                            <h1
                                                className="text-orange-600 text-[14px] line-clamp-1 cursor-default"
                                                data-tooltip-id="my-tooltip"
                                                data-tooltip-content={
                                                    module.moduleName
                                                }
                                                data-tooltip-delay-show={300}
                                            >
                                                {module.moduleName}
                                            </h1>
                                            <Tooltip
                                                id="my-tooltip"
                                                place="top"
                                                type="dark"
                                                effect="solid"
                                                style={{
                                                    backgroundColor: '#89877c',
                                                    color: '#FFFFFF',
                                                }}
                                            />
                                        </div>
                                        <h1 className="w-[35%] text-right text-xs text-gray-400">
                                            {module.sessions.length}{' '}
                                            {module.sessions.length === 1
                                                ? 'Session'
                                                : 'Sessions'}
                                        </h1>
                                    </div>
                                    <div className="flex flex-col ml-4">
                                        {module.sessions.map(
                                            (session, sessionIndex) => (
                                                <div
                                                    key={session._id}
                                                    className="flex justify-between items-center py-2"
                                                >
                                                    <div className="flex gap-x-3 items-center w-[65%]">
                                                        <div className="w-5 h-5 bg-[#FFBB54] text-white rounded-full text-sm flex justify-center items-center">
                                                            {sessionIndex + 1}
                                                        </div>
                                                        <h1
                                                            className="text-gray-600 text-[12px] line-clamp-1 cursor-default"
                                                            data-tooltip-id="Sessiontooltip"
                                                            data-tooltip-content={
                                                                session.sessionName
                                                            }
                                                            data-tooltip-delay-show={
                                                                700
                                                            }
                                                        >
                                                            {
                                                                session.sessionName
                                                            }
                                                        </h1>
                                                        <Tooltip
                                                            id="Sessiontooltip"
                                                            place="bottom"
                                                            type="dark"
                                                            effect="solid"
                                                            style={{
                                                                backgroundColor:
                                                                    '#CCCCCC',
                                                                color: '#141414',
                                                                fontSize:
                                                                    '10px',
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            )
                                        )}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No modules available.</p>
                        )}
                    </div>
                </div>
            </div>
            <div className="w-full px-4  flex gap-x-4 ">
                <Link
                    to={`/admin/home/coursestructure/editcoursestructure/${id}`}
                >
                    <div className="cursor-pointer md:w-[150px] h-8 rounded-sm flex justify-center items-center text-base font-semibold font-poppins border-[1px] text-white border-gray-400 hover:bg-blue-600 bg-blue-500">
                        <h1 className="text-sm">Edit</h1>
                    </div>
                </Link>
                <div
                    className="cursor-pointer md:w-[150px] h-8 rounded-sm flex justify-center items-center text-base font-semibold font-poppins border-[1px] text-red-700 border-red-600 hover:bg-opacity-90 hover:text-white bg-opacity-30 bg-red-500"
                    onClick={handleDeleteCourse}
                >
                    <h1 className="text-sm">Delete</h1>
                </div>
            </div>
        </div>
    )
}
