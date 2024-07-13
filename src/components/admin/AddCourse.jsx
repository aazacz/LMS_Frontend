import React, { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import { AdminAxiosInstance } from '../../routes/AdminRoutes'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { TfiWrite } from 'react-icons/tfi'
import { IoIosCloseCircle } from 'react-icons/io'
import '../../index.css'
import './Addcourse.css'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'
const AddCourse = () => {
    const navigate = useNavigate()
    const token = useSelector((state) => state.AdminDetails.token)
    const baseURL = process.env.REACT_APP_API_URL

    const [errors, setErrors] = useState({})
    const [courseStructureDropDown, setCourseStructureDropDown] = useState([])
    const [packages, setpackages] = useState()
    const [CourseStructure, setCourseStructure] = useState([])
    const [course, setCourse] = useState({
        courseType: '',
        courseStructure: '',
        courseName: '',
        package: '',
        trainingDuration: '',
        hoursPerDay: '',
        price: '',
        description: '',
        trainingDateTimeDetails: 'This Course will start from June 1st',
        modules: [
            {
                moduleName: '',
                moduleDescription: '',
                sessions: [
                    {
                        sessionName: '',
                        sessionDescription: '',
                        sessionDateTime: '',
                        sessionLink: '',
                    },
                ],
            },
        ],
        students: [],
        tutors: [],
    })

    //Getting course structure data from database
    useEffect(() => {
        AdminAxiosInstance.get(`api/structure/get-all-structure`)
            .then((res) => {
                const data = res.data.data
                setCourseStructure(data)

                const newDropDownOptions = data.map((value) => ({
                    _id: value._id,
                    courseName: value.courseName,
                }))
                setCourseStructureDropDown(newDropDownOptions)
            })
            .catch((err) => {
                console.error(err.message)
            })
    }, [token])

    //getting the package information from database
    useEffect(() => {
        AdminAxiosInstance.get(
            `api/package/get-all-package?page=1&pageSize=10&search=`
        )
            .then((res) => {
                setpackages(res.data.data)
            })
            .catch((err) => {
                console.error(err.message)
            })
    }, [baseURL, token])

    // function to add a new module
    const addModule = () => {
        setCourse((prevState) => ({
            ...prevState,
            modules: [
                {
                    moduleName: '',
                    moduleDescription: '',
                    sessions: [
                        {
                            sessionName: '',
                            sessionDescription: '',
                            sessionDateTime: '',
                            sessionLink: '',
                        },
                    ],
                },
                ...prevState.modules,
            ],
        }))
    }

    // function to chan
    const handleModuleChange = (e, moduleIndex) => {
        const { name, value } = e.target
        const updatedModules = [...course.modules]

        updatedModules[moduleIndex][name.split('-')[0]] = value

        setCourse((prevState) => ({
            ...prevState,
            modules: updatedModules,
        }))
    }

    const handleSessionChange = (e, moduleIndex, sessionIndex) => {
        const { name, value } = e.target
        const updatedModules = [...course.modules]
        updatedModules[moduleIndex].sessions[sessionIndex][name.split('-')[0]] =
            value
        setCourse((prevState) => ({
            ...prevState,
            modules: updatedModules,
        }))
    }

    // Function to Remove a Module
    const RemoveModule = (moduleIndex, e) => {
        console.log(moduleIndex)

        setCourse((prevData) => {
            const updatedModules = prevData.modules.filter(
                (_, index) => index !== moduleIndex
            )
            return {
                ...prevData,
                modules: updatedModules,
            }
        })
    }

    // function to add a new Session
    const addSession = (moduleIndex) => {
        const updatedModules = [...course.modules]

        updatedModules[moduleIndex].sessions.push({
            sessionName: '',
            sessionDescription: '',
            sessionDateTime: '',
            sessionLink: '',
        })
        setCourse({ ...course, modules: updatedModules })
    }

    // Function to Remove a Module
    const RemoveSession = (moduleIndex, sessionIndex, e) => {
        console.log('moduleIndex, sessionIndex, e', moduleIndex, sessionIndex)

        setCourse((prevData) => {
            // Create a deep copy of the previous state to avoid direct mutation
            const updatedModules = [...prevData.modules]

            // Filter out the session to be removed
            updatedModules[moduleIndex].sessions = updatedModules[
                moduleIndex
            ].sessions.filter((_, index) => index !== sessionIndex)
            return {
                ...prevData,
                modules: updatedModules,
            }
        })
    }

    // Auto Populate function
    const handleAutofill = (e) => {
        const { value } = e.target
        const selectedCourse = CourseStructure.find(
            (course) => course.courseName === value
        )

        if (selectedCourse) {
            setCourse((prevState) => ({
                ...prevState,
                courseName: selectedCourse.courseName,
                package: selectedCourse.package,
                trainingDuration: selectedCourse.trainingDuration,
                hoursPerDay: selectedCourse.hoursPerDay,
                price: selectedCourse.price,
                description: selectedCourse.description,
                modules: selectedCourse.modules,
            }))
        }
    }

    // Function to change the input element value
    const handleInputChange = (e) => {
        const { name, value } = e.target
        setCourse((prevState) => ({
            ...prevState,
            [name]: value,
        }))
    }

    useEffect(() => {
        console.log(course)
    }, [course])

    const submitHandler = (e) => {
        e.preventDefault()

        Swal.fire({
            title: 'You are going to create a new course',
            text: 'Please check every field before submitting ',
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Create',
            customClass: {
                title: 'custom-title',
                content: 'custom-content',
            },
        }).then((result) => {
            if (result.isConfirmed) {
                AdminAxiosInstance.post(`api/course/create`, course).then(
                    (res) => {
                        console.log(res.data)
                        if (
                            res.data.message === 'Course created successfully'
                        ) {
                            toast.success('Course created Successfully')
                            setCourse({
                                courseType: '',
                                courseStructure: '',
                                courseName: '',
                                package: '',
                                trainingDuration: '',
                                hoursPerDay: '',
                                price: '',
                                description: '',
                                trainingDateTimeDetails:
                                    'This Course will start from June 1st',
                                modules: [
                                    {
                                        moduleName: '',
                                        moduleDescription: '',
                                        sessions: [
                                            {
                                                sessionName: '',
                                                sessionDescription: '',
                                                sessionDateTime: '',
                                                sessionLink: '',
                                            },
                                        ],
                                    },
                                ],
                                students: [],
                                tutors: [],
                            })
                        }
                    }
                )
            }
        })
    }

    return (
        <div className="w-full p-5 md:px-16 bg-slate-200 rounded-lg mt-2">
            <h1 className="font-bold font-poppins text-2xl pb-6 flex items-center gap-x-4">
                Create a new Course {<TfiWrite className="text-lg " />}
            </h1>
            <form className="space-y-6">
                <div className="w-full grid grid-flow-row grid-cols-2 gap-x-4">
                    <div className="w-full ">
                        <label className="text-sm font-semibold">
                            Course Type
                        </label>
                        <select
                            name="courseType"
                            onChange={handleInputChange}
                            value={course?.courseType}
                            id=""
                            className="w-full h-10 bg-white border-[1px] border-gray-500 text-sm rounded shadow-lg px-3 mt-2 focus:outline-blue-900"
                        >
                            <option defaultChecked disabled value="">
                                Select a course type
                            </option>
                            <option value="Individual">Individual</option>
                            <option value="Group">Group</option>
                        </select>
                        {errors.courseName && (
                            <p className="text-red-500 text-xs">
                                {errors.courseName}
                            </p>
                        )}
                    </div>

                    <div className="w-full ">
                        <label className="text-sm font-semibold">
                            Course Structure
                        </label>

                        <select
                            name="courseStructure"
                            onChange={(e) => {
                                handleInputChange(e)
                                handleAutofill(e)
                            }}
                            value={course.courseStructure}
                            id=""
                            className="w-full h-10 bg-white text-sm border-[1px] border-gray-500 rounded shadow-lg px-3 mt-2 focus:outline-blue-900"
                        >
                            <option defaultChecked disabled value="">
                                {' '}
                                Select the Course Structure{' '}
                            </option>
                            {courseStructureDropDown.map((value, index) => (
                                <option key={index} value={value.courseName}>
                                    {value.courseName}
                                </option>
                            ))}
                        </select>
                        {errors.courseName && (
                            <p className="text-red-500 text-xs">
                                {errors.courseName}
                            </p>
                        )}
                    </div>
                </div>
                <div className="flex flex-col md:flex-row md:space-x-4">
                    {/* Course Name */}
                    <div className="w-full md:w-1/2">
                        <label className="text-sm font-semibold">
                            Course Name
                        </label>

                        <input
                            onChange={handleInputChange}
                            name="courseName"
                            value={course.courseName}
                            type="text"
                            placeholder="Course Name"
                            className="w-full h-10 bg-white text-sm border-[1px] border-gray-500 rounded shadow-lg px-3 mt-2 focus:outline-blue-900"
                        />

                        {errors.courseName && (
                            <p className="text-red-500 text-xs">
                                {errors.courseName}
                            </p>
                        )}
                    </div>

                    <div className="w-full md:w-1/2 pt-4 md:pt-0">
                        <label className="text-sm font-semibold">Package</label>
                        <select
                            onChange={handleInputChange}
                            name="package"
                            value={course.package}
                            className="w-full h-10 bg-white text-sm rounded shadow-lg px-3 mt-2 focus:outline-blue-900 border-[1px] border-gray-500"
                        >
                            <option
                                value="Select a package"
                                className="font-poppins opac text-slate-500"
                            >
                                Select a package
                            </option>

                            {packages &&
                                packages.map((val, index) => {
                                    return (
                                        <option key={index}>
                                            {val.packageName}
                                        </option>
                                    )
                                })}
                        </select>
                        {errors.package && (
                            <p className="text-red-500 text-xs">
                                {errors.package}
                            </p>
                        )}
                    </div>
                </div>

                <div className="flex gap-x-4  items-end">
                    <div className="w-full md:w-1/2">
                        <label className="text-sm font-semibold line-clamp-1">
                            Duration
                        </label>
                        <input
                            min="0"
                            oninput="validity.valid||(value='');"
                            onChange={handleInputChange}
                            name="trainingDuration"
                            type="Number"
                            value={course?.trainingDuration}
                            placeholder="Total Hours"
                            className="w-full h-10 border-[1px] border-gray-500 bg-white text-sm rounded shadow-lg px-3 mt-2 focus:outline-blue-900"
                        />
                        {errors.trainingDuration && (
                            <p className="text-red-500 text-xs">
                                {errors.trainingDuration}
                            </p>
                        )}
                    </div>

                    <div className="w-full md:w-1/2">
                        <label className="text-sm font-semibold">
                            Hours Per Day
                        </label>
                        <input
                            onChange={handleInputChange}
                            name="hoursPerDay"
                            type="Number"
                            value={course?.hoursPerDay}
                            placeholder="Hours Per Day"
                            className="w-full h-10 bg-white border-[1px] border-gray-500 text-sm rounded shadow-lg px-3 mt-2 focus:outline-blue-900"
                        />
                        {errors.hoursPerDay && (
                            <p className="text-red-500 text-xs">
                                {errors.hoursPerDay}
                            </p>
                        )}
                    </div>

                    <div className="w-full md:w-1/2">
                        <label className="text-sm font-semibold">Price</label>
                        <input
                            onChange={handleInputChange}
                            name="price"
                            type="Number"
                            value={course.price}
                            placeholder="Enter Price of the module"
                            className="w-full h-10 bg-white border-[1px] border-gray-500 text-sm rounded shadow-lg px-3 mt-2 focus:outline-blue-900"
                        />
                        {errors.price && (
                            <p className="text-red-500 text-xs">
                                {errors.price}
                            </p>
                        )}
                    </div>
                </div>

                <div className="flex flex-col ">
                    <label className="text-sm font-semibold">Description</label>
                    <textarea
                        onChange={handleInputChange}
                        name="description"
                        placeholder="Description"
                        value={course.description}
                        className="w-full h-20 md:h-20 rounded border-[1px] border-gray-500 mt-2 shadow-lg p-2"
                    />
                    {errors.description && (
                        <p className="text-red-500 text-xs">
                            {errors.description}
                        </p>
                    )}
                </div>

                {/*________ ADD MODULE BUTTON_____________ */}
                <div className="border-b-[1px] border- ">
                    <h1 className="text-xl font-semibold font-poppins">
                        Modules
                    </h1>
                </div>

                <button
                    type="button"
                    onClick={(e) => addModule(e)}
                    className="w-full  md:w-[100%] md:max-w-[150px] h-10 bg-blue-900 rounded-lg text-white font-poppins font-semibold flex  justify-center items-center"
                >
                    Add Module
                </button>

                {course?.modules?.map((module, moduleIndex) => {
                    return (
                        <div className="w-full h-auto border-2 border-blue-900 bg-white rounded-lg p-4 flex flex-col shadow-lg space-y-4">
                            <div className="w-full flex gap-x-6 justify-between items-center ">
                                <h1 className=" font-poppins text-xl text-blue-900 font-semibold">
                                    Module {moduleIndex + 1}
                                </h1>
                                <div className="  ">
                                    <IoIosCloseCircle
                                        className="font-black text-3xl  text-red-900 "
                                        onClick={(e) =>
                                            RemoveModule(moduleIndex, e)
                                        }
                                    />
                                </div>
                            </div>

                            <div className="w-full flex flex-col md:flex-row md:gap-x-4 ">
                                <div className="w-full md:w-1/2">
                                    <label className="text-sm font-semibold">
                                        Module Name
                                    </label>
                                    <input
                                        name={`moduleName-${moduleIndex}`}
                                        value={
                                            course.modules[moduleIndex]
                                                .moduleName
                                        }
                                        onChange={(e) =>
                                            handleModuleChange(e, moduleIndex)
                                        }
                                        placeholder="Module Name"
                                        className="w-full h-10 bg-white border-[1px] border-gray-500 text-sm rounded shadow-[0_3px_10px_rgb(0,0,0,0.2)] px-3 mt-2 focus:outline-blue-900"
                                    />
                                </div>
                                <div className="w-full md:w-1/2">
                                    <label className="text-sm font-semibold">
                                        Module Description
                                    </label>
                                    <input
                                        name={`moduleDescription-${moduleIndex}`}
                                        value={
                                            course.modules[moduleIndex]
                                                .moduleDescription
                                        }
                                        onChange={(e) =>
                                            handleModuleChange(e, moduleIndex)
                                        }
                                        placeholder="Module Description"
                                        className="w-full h-10 bg-white border-[1px] border-gray-500 text-sm rounded shadow-[0_3px_10px_rgb(0,0,0,0.2)] px-3 mt-2 focus:outline-blue-900"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end px-4 ">
                                <button
                                    type="button"
                                    onClick={(e) => addSession(moduleIndex, e)}
                                    className="px-5  h-8 bg-blue-900 rounded-md text-sm text-white flex justify-center items-center "
                                >
                                    Add Session
                                </button>
                            </div>
                            {module?.sessions?.map((session, sessionIndex) => {
                                return (
                                    <div className="w-full bg-gray-200 border-[1px] border-blue-700 rounded-lg p-4 flex flex-col shadow-lg space-y-4">
                                        <div className="w-full flex gap-x-6 justify-between items-center ">
                                            <h1 className="text-md font-semibold">
                                                Session {sessionIndex + 1}
                                            </h1>

                                            <button
                                                type="button"
                                                onClick={(e) =>
                                                    RemoveSession(
                                                        moduleIndex,
                                                        sessionIndex,
                                                        e
                                                    )
                                                }
                                                className="px-2 h-8 bg-red-900 leading-3  rounded-md text-sm text-white flex items-center "
                                            >
                                                Remove Session
                                            </button>
                                        </div>

                                        <div className="w-full flex flex-col md:flex-row md:gap-x-4">
                                            <div className="w-full md:w-1/2">
                                                <label className="text-sm font-semibold">
                                                    Session Name
                                                </label>
                                                <input
                                                    name={`sessionName-${moduleIndex}-${sessionIndex}`}
                                                    value={
                                                        course.modules[
                                                            moduleIndex
                                                        ].sessions[sessionIndex]
                                                            .sessionName
                                                    }
                                                    onChange={(e) =>
                                                        handleSessionChange(
                                                            e,
                                                            moduleIndex,
                                                            sessionIndex
                                                        )
                                                    }
                                                    placeholder="Session Name"
                                                    className="w-full h-10 bg-white  text-sm rounded shadow-lg px-3 mt-2 focus:outline-blue-900"
                                                />
                                            </div>
                                            <div className="w-full md:w-1/2 pt-4 md:pt-0">
                                                <label className="text-sm font-semibold">
                                                    Session Description
                                                </label>
                                                <input
                                                    name={`sessionDescription-${moduleIndex}-${sessionIndex}`}
                                                    value={
                                                        course.modules[
                                                            moduleIndex
                                                        ].sessions[sessionIndex]
                                                            .sessionDescription
                                                    }
                                                    onChange={(e) =>
                                                        handleSessionChange(
                                                            e,
                                                            moduleIndex,
                                                            sessionIndex
                                                        )
                                                    }
                                                    placeholder="Session Description"
                                                    className="w-full h-10 bg-white text-sm rounded shadow-lg px-3 mt-2 focus:outline-blue-900"
                                                />
                                            </div>
                                        </div>

                                        <div className="w-full flex flex-col md:flex-row md:gap-x-4">
                                            <div className="w-full md:w-1/2">
                                                <label className="text-sm font-semibold">
                                                    Session Date & Time
                                                </label>
                                                <input
                                                    type="datetime-local"
                                                    name={`sessionDateTime-${moduleIndex}-${sessionIndex}`}
                                                    value={
                                                        course.modules[
                                                            moduleIndex
                                                        ].sessions[sessionIndex]
                                                            .sessionDateTime
                                                    }
                                                    onChange={(e) =>
                                                        handleSessionChange(
                                                            e,
                                                            moduleIndex,
                                                            sessionIndex
                                                        )
                                                    }
                                                    className="w-full h-10 bg-white text-sm rounded shadow-lg px-3 mt-2 focus:outline-blue-900"
                                                />
                                            </div>
                                            <div className="w-full md:w-1/2">
                                                <label className="text-sm font-semibold">
                                                    Session Link
                                                </label>
                                                <input
                                                    name={`sessionLink-${moduleIndex}-${sessionIndex}`}
                                                    value={
                                                        course.modules[
                                                            moduleIndex
                                                        ].sessions[sessionIndex]
                                                            .sessionLink
                                                    }
                                                    onChange={(e) =>
                                                        handleSessionChange(
                                                            e,
                                                            moduleIndex,
                                                            sessionIndex
                                                        )
                                                    }
                                                    placeholder="Session Link"
                                                    className="w-full h-10 bg-white text-sm rounded shadow-lg px-3 mt-2 focus:outline-blue-900"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    )
                })}

                <div className="flex items-center justify-end ">
                    <button
                        onClick={(e) => submitHandler(e)}
                        type="submit"
                        className=" px-8 py-2 bg-green-900 rounded-md text-white"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )
}

export default AddCourse
