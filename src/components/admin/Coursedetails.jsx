import React, { useEffect, useState } from 'react'
import coursephoto from '../../assets/Admin/coursephoto.jpeg'
import { BiSpreadsheet } from 'react-icons/bi'
import { LuTimer } from 'react-icons/lu'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'
import { useSelector } from 'react-redux'
import Loader from '../reusable/Loader'
import Swal from 'sweetalert2'
import { FaChalkboardTeacher } from 'react-icons/fa'
import { PiStudentBold } from 'react-icons/pi'
import { IoIosCloseCircle } from 'react-icons/io'
import { AdminAxiosInstance } from '../../routes/AdminRoutes'

const Coursedetails = () => {
    const baseUrl = process.env.REACT_APP_API_URL
    const token = useSelector((state) => state.AdminDetails.token)
    const [Course, SetCourse] = useState()
    const [Loading, SetLoading] = useState(false)
    const [activeTab, setActiveTab] = useState('about')
    const [slideDirection, setSlideDirection] = useState('left')
    const [Modal, setModal] = useState(false)

    const { courseId } = useParams()

    const handleTabClick = (tab) => {
        setSlideDirection(
            activeTab === 'about' && tab === 'module' ? 'left' : 'right'
        )
        setActiveTab(tab)
    }

    useEffect(() => {
        axios
            .get(`${baseUrl}api/course/get-course/${courseId}`, {
                headers: { authorization: `Bearer ${token}` },
            })
            .then((response) => {
                console.log('response.data')
                console.log(response.data)
                SetCourse(response.data)
            })
    }, [baseUrl, courseId, token])


    const [DropDownList, SetDropDownList] = useState()

    const getModalDropDownList = async (List) => {

        try {

            if (List==="TutorList") {

                const response = await AdminAxiosInstance.get("api/tutor/tutors?page=1&pageSize=")
                console.log(response.data.data)
                if(response.data){
                    SetDropDownList(response.data.data)
                    return                    
                }
            }
            else {
                const response = await AdminAxiosInstance.get("api/students/getAll-students")
                console.log(response.data)
                if(response.data){
                    SetDropDownList(response.data.data)
                    return
                }

            }

        }
        catch(error) {
            console.log(error)
        }
    }


    return (
        <>
            {Loading ? (
                <div className="w-full bg-gray-300 h-max flex justify-center items-center">
                    <Loader />
                </div>
            ) : (

                <>
                    {Modal ? (<div  className='w-full  fixed flex justify-center items-center  h-full bg-black bg-opacity-60  top-0 left-0 z-[99999] '>


                        <div className='w-2/4 h-[300px] p-8 bg-white relative rounded-xl'>

                            <IoIosCloseCircle
                                onClick={() => setModal(false)}
                                className='absolute right-3 top-3 text-3xl  ' />

                            <div className='w-full flex  h-[40px] gap-x-4  mt-5'>

                                <select className='w-full border-[1px] border-black rounded-[3px] max-h-32 overflow-auto' name="" id="">
                                    <option defaultValue="select a tutor from the list" >select a tutor from the list</option>
                                  
                                {DropDownList && DropDownList?.map((value,index)=>{

                                    <option key={index} value={value.id}>
                                        {value.name}
                                    </option>
                                 
                                })
                                  }
                                  
                                </select>

                                <button className='bg-blue-700 w-[90px] rounded-lg text-white'> Add</button>
                            </div>

                        </div>



                    </div>) : null}
                    <div className="flex  flex-col lg:flex-row h-screen overflow-y-scroll ">




                        <div className="lg:w-[70%] w-full   p-4 flex flex-col">
                            <div className="w-full h-[200px]  md:h-[300px] bg-gray-800 flex items-center justify-center text-white font-semibold font-plusjakartasans text-2xl md:text-3xl">
                                Introduction to SAT & DSAT
                            </div>

                            <div className="w-full  mt-4">
                                <h1 className="font-bold text-lg md:text-xl font-plusjakartasans">
                                    Introduction to Basic SAT & DSAT
                                </h1>
                                <div className="flex items-center gap-x-6 mt-2">
                                    <span className="flex items-center gap-x-1 text-sm font-plusjakartasans">
                                        <BiSpreadsheet className="text-gray-400" />
                                        {Course ? Course.modules.length : 0} Modules
                                    </span>
                                    <span className="flex items-center gap-x-1 text-sm font-plusjakartasans">
                                        <LuTimer className="text-gray-400" />
                                        {Course && Course.trainingDuration}Hrs
                                    </span>
                                </div>
                            </div>

                            <div className="w-full bg-blue-400 mt-4">
                                <div className="flex w-full gap-x-4">
                                    {['about', 'module', 'tests', 'review'].map(
                                        (tab, index) => (
                                            <button
                                                key={index}
                                                className={`relative py-2 ${activeTab === tab
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
                        <AsideBAr course={Course} Modal={Modal} setModal={setModal} getModalDropDownList={getModalDropDownList} />
                    </div>
                </>
            )}
        </>
    )
}

export default Coursedetails

const AboutContent = () => {
    return <div className="bg-red-300">About Content</div>
}

const ModuleContent = ({ Course }) => {
    const [modules, setModules] = useState([])
    console.log('course')

    useEffect(() => {
        if (Course && Course.modules) {
            setModules(Course.modules)
        }
    }, [Course])

    return (
        <div className="bg-green-300 w-full h-full border-2">
            <h1>Modules</h1>
            {modules.map((module, index) => (
                <div key={index}>{module.moduleName}</div>
            ))}
        </div>
    )
}

const TestsContent = () => {
    return <div className="bg-blue-300">Tests Content</div>
}

const ReviewContent = () => {
    return <div className="bg-yellow-300">Review Content</div>
}

//Aside bar component
const AsideBAr = ({ course, setModal ,getModalDropDownList}) => {
    const { courseId } = useParams()
    const baseUrl = process.env.REACT_APP_API_URL
    const token = useSelector((state) => state.AdminDetails.token)
    const navigate = useNavigate()
    const [modules, setModules] = useState([])

    useEffect(() => {
        if (course && course.modules) {
            setModules(course.modules)
        }
    }, [course])

    const deleteHandler = (id) => {
        axios
            .delete(`${baseUrl}api/course/delete/${id}`, {
                headers: { authorization: `Bearer ${token}` },
            })
            .then((res) => {
                if (res.data.message === 'Course deleted successfully') {
                    Swal.fire({
                        timer: 2000,
                        timerProgressBar: true,
                        title: 'Deleted!',
                        text: 'Your file has been deleted.',
                        icon: 'success',
                    })
                    navigate('/admin/home/courses')
                }
            })
            .catch((error) => {
                console.warn(error)
                Swal.fire({
                    title: 'Error!',
                    text: 'There was an error deleting the course. Please try again later.',
                    icon: 'error',
                })
            })
    }

    const handleDeleteCourse = () => {
        Swal.fire({
            title: `Are you sure you want to delete this course?`,
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#eb5048',
            cancelButtonColor: '#878ca7',
            confirmButtonText: 'Delete Course!',
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
                        deleteHandler(courseId)
                    }
                })
            }
        })
    }

    return (
        <div className="relative bg-slate-200 lg:w-[30%] w-full h-full  flex flex-col">

            {/* adding student and tutor */}
            <div className='w-full  flex justify-evenly h-max p-4 '>

                <div
                    onClick={() => {
                                    setModal(true); 
                                    getModalDropDownList("TutorList")}
                                }
                    data-tooltip-id="assigntutor"
                    data-tooltip-content="Assign Tutor"
                    className='rounded-full border-[3px] text-gray-700 hover:text-gray-900  border-gray-700 hover:border-gray-900 transition-all duration-200 bg-white  w-14 h-14 flex justify-center items-center  ' >
                    +<FaChalkboardTeacher className='text-2xl' />

                    <Tooltip
                        id="assigntutor"
                        place="bottom"
                        type="dark"
                        effect="solid"
                    />
                </div>
                <div
                    onClick={() => {
                        setModal(true); 
                        getModalDropDownList(StudentList)}
                    }
                    data-tooltip-id="assignstudent"
                    data-tooltip-content="Assign Student"
                    className='rounded-full border-[3px] text-gray-700 hover:text-gray-900  border-gray-700 hover:border-gray-900 transition-all duration-200 bg-white  w-14 h-14 flex justify-center items-center  ' >

                    +<PiStudentBold className='text-2xl' />

                    <Tooltip
                        id="assignstudent"
                        place="bottom"
                        type="dark"
                        effect="solid"
                    />
                </div>

            </div>


            <div className="px-6">
                <h1 className="font-plusjakartasans font-bold">Modules List</h1>

                <div className="bg-white rounded-lg flex flex-col mt-5 p-5 items-center">
                    <h1 className="font-plusjakartasans font-bold line-clamp-2">
                        Introduction Basic SAT & DSAT
                    </h1>

                    {modules.map((value, index) => (
                        <div
                            key={index}
                            className="flex w-full justify-between items-center py-5"
                        >
                            <div className="flex gap-x-3 items-center w-[65%]">
                                <div>
                                    <div className="w-6 h-6 bg-[#C75625] text-white rounded-[5px] text-sm flex justify-center items-center">
                                        {index + 1}
                                    </div>
                                </div>

                                <h1 className="text-orange-600 text-[12px] line-clamp-1">
                                    {value.moduleName}
                                </h1>
                            </div>

                            <h1 className="w-[35%] text-right text-xs text-gray-400">
                                {value.sessions ? value.sessions.length : '0'}{' '}
                                Sessions
                            </h1>
                        </div>
                    ))}
                </div>
            </div>

            <div className="absolute bottom-2 w-full mb-4 px-4">
                <div
                    className="cursor-pointer w-full h-8 rounded-xl flex justify-center items-center text-base font-semibold font-poppins border-[1px] text-red-700 border-red-600 bg-opacity-30 bg-red-500"
                    onClick={handleDeleteCourse}
                >
                    <h1>Delete Course</h1>
                </div>
            </div>
        </div>
    )
}
