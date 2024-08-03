import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'
import { useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import { FaChalkboardTeacher } from 'react-icons/fa'
import { PiStudentBold } from 'react-icons/pi'
import { AdminAxiosInstance } from '../../../routes/AdminRoutes'






const Asidebar = ({ course, setTutorModal,setStudentModal}) => {
   
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
        AdminAxiosInstance
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

    

    const handleEditCourse = () => {
        Swal.fire({
            title: `Are you sure you want to edit this course?`,
            text: "You won't be able to revert this!",
             showCancelButton: true,
            confirmButtonColor: '#eb5048',
            cancelButtonColor: '#878ca7',
            confirmButtonText: 'Edit Course!',
        }).then((result) => {
            if (result.isConfirmed) {
       
                navigate(`/admin/home/courses/editcourse/${courseId}`)
                
            }
        })
    }

    return (
        <div className="relative bg-slate-200 lg:w-[30%] w-full   flex flex-col">

            {/* adding student and tutor */}
            <div className='w-full  flex justify-evenly h-max p-4 '>

                <div
                    onClick={() => {           setTutorModal(true)}
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
                        setStudentModal(true)}
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

            <div className="absolute bottom-2 w-full grid grid-flow-row grid-cols-2  gap-x-4 mb-4 px-4">

                <div
                    className="cursor-pointer  h-8 rounded-xl flex justify-center items-center text-base font-semibold font-poppins border-[1px] text-blue-700 border-blue-600 bg-opacity-30 bg-blue-500"
                    onClick={()=>handleEditCourse()}
                >
                    <h1>Edit</h1> 
                </div>

                <div
                    className="cursor-pointer  h-8 rounded-xl flex justify-center items-center text-base font-semibold font-poppins border-[1px] text-red-700 border-red-600 bg-opacity-30 bg-red-500"
                    onClick={handleDeleteCourse}
                >
                    <h1>Delete Course</h1>
                </div>

            </div>

        </div>
    )
}

export default Asidebar