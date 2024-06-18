import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiPlusCircle } from "react-icons/fi"
import { toast } from 'react-toastify'
import { coursestructureform } from "../../utils/adminSide/Formvalidation"
import axios from "axios"


const CourseStructure = () => {

    const navigate = useNavigate();

    const baseURL = process.env.REACT_APP_API_URL;

    const [errors, setErrors] = useState({});

    useEffect(() => {
        axios.get(`${baseURL}api/package/get-all-package?page=1&pageSize=1`,
            {
                "user-agent": navigator.userAgent,
            }
        ).then((res) => {
            console.log(res.data);
        })

    }, [])




    const [course, setCourse] = useState({
        courseName: "",
        package: "",
        trainingDuration: "",
        hoursPerDay: "",
        price: "",
        description: "",
        modules: [
            {
                moduleName: "",
                moduleDescription: "",
                sessions: [
                    {
                        "sessionName": "",
                        "sessionDescription": "",
                        "sessionDateTime": "",
                        "sessionLink": ""
                    }
                ]
            }
        ]
    })


    // function to add a new module
    const addModule = () => {
        setCourse(prevState => ({
            ...prevState,
            modules: [
                ...prevState.modules,
                {
                    moduleName: "",
                    moduleDescription: "",
                    sessions: [
                        {
                            sessionName: "",
                            sessionDescription: "",
                            sessionDateTime: "",
                            sessionLink: ""
                        }
                    ]
                }
            ]
        }));
    }

    

    // function to add a new Session
    const addSession = (moduleIndex) => {
        const updatedModules = [...course.modules];
        updatedModules[moduleIndex].sessions.push({
            sessionName: "",
            sessionDescription: "",
            sessionDateTime: "",
            sessionLink: ""
        });
        setCourse({ ...course, modules: updatedModules });
    }


    const handleModuleInputChange = (e, moduleIndex) => {
        const { name, value } = e.target;
        const updatedModules = [...course.modules];
        updatedModules[moduleIndex][name] = value;
        setCourse({ ...course, modules: updatedModules });
    }


    const handleSessionInputChange = (e, moduleIndex, sessionIndex) => {
        const { name, value } = e.target;
        const updatedModules = [...course.modules];
        updatedModules[moduleIndex].sessions[sessionIndex][name] = value;
        setCourse({ ...course, modules: updatedModules });
    }


    const submitHandler = async (event) => {
        event.preventDefault();
        console.log(course);
        try {
            await coursestructureform.validate(course, { abortEarly: false });

            axios.post(`${baseURL}api/structure/create`, course,
                {
                    "user-agent": navigator.userAgent,
                }
            )
                .then((res) => {
                    toast.success(res.message)

                }).catch((error) => {
                    toast.error(error.response.data.message)
                })



        } catch (validationErrors) {
            console.log(validationErrors);
            const newErrors = {};
            validationErrors.inner.forEach(error => {
                newErrors[error.path] = error.message;
            });
            setErrors(newErrors);
        }


    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCourse(prevState => ({
            ...prevState,
            [name]: value
        }))

    };


    useEffect(() => {
        console.log(course);
        console.log(errors);
    }, [course, errors])

    return (
        <div className='flex-1 p-5 bg-slate-200 rounded-2xl mt-5'>

            <h1 className='text-2xl font-poppins font-semibold'>Course Structure</h1>

            <div>
                <form onSubmit={(e) => submitHandler(e)} className="space-y-6">
                    <div className="flex flex-col md:flex-row md:space-x-4">


                        {/* Course Name */}
                        <div className="w-full md:w-1/2">
                            <label className="text-sm font-semibold">Course Name</label>
                            <input

                                onChange={handleInputChange}
                                name="courseName"
                                value={course.courseName}
                                type="text"
                                placeholder="Course Name"
                                className="w-full  h-10 bg-white text-sm rounded shadow-lg px-3 mt-2 focus:outline-blue-900" />
                            {errors.courseName && (
                                <p className="text-red-500 text-xs">
                                    {errors.courseName}
                                </p>
                            )}
                        </div>



                        <div className="w-full md:w-1/2">
                            <label className="text-sm font-semibold">Package</label>
                            {errors.package && (
                                <p className="text-red-500 text-xs">
                                    {errors.package}
                                </p>
                            )}

                            <select

                                onChange={handleInputChange}
                                name="package"
                                value={course.package}
                                className="w-full h-10 bg-white text-sm rounded shadow-lg px-3 mt-2 focus:outline-blue-900">
                                <option defaultValue="Select a package" className='font-poppins opac text-slate-500'>Select a package</option>
                                <option >Comprehensive</option>
                                <option >Standard</option>
                                <option >Fasttrack</option>
                            </select>



                        </div>
                    </div>

                    <div className='flex gap-x-4'>
                        <div className='w-full md:w-1/2'>
                            <label className="text-sm font-semibold">Training Duration</label>
                            <input

                                onChange={handleInputChange}
                                name="trainingDuration"
                                type="Number"
                                value={course.trainingDuration}
                                placeholder="Total Hours"
                                className="w-full h-10 bg-white text-sm rounded shadow-lg px-3 mt-2 focus:outline-blue-900" />


                            {errors.trainingDuration && (
                                <p className="text-red-500 text-xs">{errors.trainingDuration}</p>
                            )}
                        </div>

                        <div className='w-full md:w-1/2'>
                            <label className="text-sm font-semibold">Hours Per Day</label>
                            <input

                                onChange={handleInputChange}
                                name="hoursPerDay"
                                type="Number"
                                value={course.hoursPerDay}
                                placeholder="Hours Per Day"
                                className="w-full h-10 bg-white text-sm rounded shadow-lg px-3 mt-2 focus:outline-blue-900" />


                            {errors.hoursPerDay && (
                                <p className="text-red-500 text-xs">{errors.hoursPerDay}</p>
                            )}
                        </div>


                        <div className=" w-full md:w-1/2">
                            <label className="text-sm font-semibold">Price</label>
                            <input
                                onChange={handleInputChange}
                                name="price"
                                type="Number"
                                value={course.price}
                                placeholder="Enter Price of the module"
                                className="w-full h-10 bg-white text-sm rounded shadow-lg px-3 mt-2 focus:outline-blue-900"
                            />

                            {errors.price && (<p className="text-red-500 text-xs">
                                {errors.price}
                            </p>
                            )}
                        </div>


                    </div>


                    <div className=" flex flex-col ">
                        <label className="text-sm font-semibold">Description</label>

                        <textarea
                            onChange={handleInputChange}
                            name="description"
                            placeholder="Description"
                            value={course.description}
                            className='w-full  md:h-20 rounded mt-2 shadow-lg p-2' />

                        {errors.description && (<p className="text-red-500 text-xs">
                            {errors.description}
                        </p>
                        )}

                    </div>

                    {/*________ ADD MODULE BUTTON_____________ */}
                    <div className='border-b-[1px] border-gray-400 '>

                        <h1 className='text-xl font-semibold font-poppins' >Modules</h1>
                    </div>


                    {course.modules.map((module, moduleIndex) => {

                        console.log(module + "module");
                        return (

                            <div className=' w-full h-auto bg-white rounded-lg p-4  flex flex-col gap-y-4 border-2 border-blue-900' key={moduleIndex}>

                                {/* Module Counter */}
                                <div className=''>
                                    <div className='w-7 h-7 border-2 border-blue-900 rounded-md flex justify-center items-center'>
                                        <h1 className='font-Roboto font-medium text-blue-900'>{moduleIndex + 1} </h1>

                                    </div>
                                </div>
                                {/* Module Name */}
                                <div className="w-full ">

                                    <label className="text-sm font-semibold">Module Name</label>
                                    <input
                                        onChange={e => handleModuleInputChange(e, moduleIndex)}
                                        type="text"
                                        name="moduleName"
                                        value={module.moduleName}
                                        placeholder="Course Name"
                                        className="w-full h-10 shadow-lg border-[1px] text-sm rounded px-3 mt-2 focus:outline-blue-900" />
                                    {errors[`modules[${moduleIndex}].moduleName`] && (
                                        <p className="text-red-500 text-xs">
                                            {errors[`modules[${moduleIndex}].moduleName`]}
                                        </p>
                                    )}
                                </div>
                                <div className="w-full ">
                                    <label className="text-sm font-semibold">Description</label>
                                    <textarea
                                        onChange={e => handleModuleInputChange(e, moduleIndex)}
                                        placeholder="Description"
                                        name="moduleDescription"
                                        value={module.moduleDescription}
                                        className='w-full md:h-20 rounded mt-2 shadow-lg border-[1px] p-2 ' />

                                    {errors[`modules[${moduleIndex}].moduleDescription`] && (<p className="text-red-500 text-xs">
                                        {errors[`modules[${moduleIndex}].moduleDescription`]}
                                    </p>
                                    )}
                                </div>

                                {/* Session Starts Here */}
                                <div className='border-b-2'>
                                    <h1 className='text-base font-semibold font-poppins' >Session</h1>

                                </div>

                                {module.sessions.map((session, sessionIndex) => (
                                    <div key={sessionIndex} className=' border-2 border-blue-200 p-6  rounded-xl'>
                                        <div className=''>
                                            <div className='w-5 h-5 border-[1px] border-gray-700 flex justify-center items-center'>
                                                <h1 className='font-Roboto font-extralight '>{sessionIndex + 1} </h1>

                                            </div>

                                        </div>
                                        <div className="w-full ">
                                            <label className="text-sm font-semibold">Session Name</label>
                                            <input
                                                onChange={e => handleSessionInputChange(e, moduleIndex, sessionIndex)}
                                                type="text"
                                                name="sessionName"
                                                value={session.sessionName}
                                                placeholder="Session Name"
                                                className="w-full h-10 shadow-lg border-[1px] text-sm rounded px-3 mt-2 focus:outline-blue-900" />
                                            {errors[`modules[${moduleIndex}].sessions[${sessionIndex}].sessionName`] && (<p className="text-red-500 text-xs">
                                                {errors[`modules[${moduleIndex}].sessions[${sessionIndex}].sessionName`]}
                                            </p>
                                            )}
                                        </div>


                                        <div className="w-full mt-4 ">
                                            <label className="text-sm font-semibold">Session Description</label>
                                            <textarea
                                                onChange={e => handleSessionInputChange(e, moduleIndex, sessionIndex)}
                                                placeholder="Description"
                                                name="sessionDescription"
                                                value={session.sessionDescription}
                                                className='w-full md:h-20 rounded mt-2 shadow-lg border-[1px] p-2' />

                                            {errors[`modules[${moduleIndex}].sessions[${sessionIndex}].sessionDescription`] && (<p className="text-red-500 text-xs">
                                                {errors[`modules[${moduleIndex}].sessions[${sessionIndex}].sessionDescription`]}
                                            </p>
                                            )}
                                        </div>

                                        <div className='w-full grid grid-flow-row grid-cols-2 gap-x-4 mt-3'>

                                            {/* session Date */}
                                            <div className="w-full ">
                                                <label className="text-sm font-semibold">Session Date</label>
                                                <input
                                                    onChange={e => handleSessionInputChange(e, moduleIndex, sessionIndex)}
                                                    type="date"
                                                    name="sessionDateTime"
                                                    value={course.modules[moduleIndex].sessions[sessionIndex].sessionDateTime}
                                                    placeholder="Session Date"
                                                    className="w-full h-10 shadow-lg border-[1px] text-sm rounded px-3 mt-2 focus:outline-blue-900" />
                                                {errors[`modules[${moduleIndex}].sessions[${sessionIndex}].sessionDateTime`] && (<p className="text-red-500 text-xs">
                                                    {errors[`modules[${moduleIndex}].sessions[${sessionIndex}].sessionDateTime`]}
                                                </p>
                                                )}
                                            </div>

                                            <div className="w-full ">
                                                <label className="text-sm font-semibold">Session Date</label>
                                                <input
                                                    onChange={e => handleSessionInputChange(e, moduleIndex, sessionIndex)}
                                                    type="text"
                                                    name="sessionLink"
                                                    value={course.modules[moduleIndex].sessions[sessionIndex].sessionLink}
                                                    placeholder="Session Link"
                                                    className="w-full h-10 shadow-lg border-[1px] text-sm rounded px-3 mt-2 focus:outline-blue-900" />
                                                {errors[`modules[${moduleIndex}].sessions[${sessionIndex}].sessionLink`] && (<p className="text-red-500 text-xs">
                                                    {errors[`modules[${moduleIndex}].sessions[${sessionIndex}].sessionLink`]}
                                                </p>
                                                )}
                                            </div>


                                        </div>



                                    </div>
                                ))}


                                {/* Button to Add New Sessions */}
                                <div className='flex justify-end mt-3'>
                                    <button onClick={() => addSession(moduleIndex)}
                                        className='flex gap-3  p-2 text-sm font-poppins content-center items-center rounded-lg bg-slate-600 text-white hover:bg-blue-800'><FiPlusCircle /> Add Session</button>
                                </div>
                            </div>
                        )
                    })
                    }

                    {/* Button to Add new Module */}
                    <div className='flex justify-end px-4'>
                        <button onClick={() => {
                            addModule()
                        }}
                            className='flex gap-3  p-2 text-sm font-poppins content-center items-center rounded-lg bg-blue-900 text-white hover:bg-blue-800'><FiPlusCircle /> Add Module</button>
                    </div>

                    <div className='flex justify-center'>
                        <button className='px-20 py-2 bg-green-600 rounded-md text-white font-poppins' type="submit">create course</button>
                    </div>
                </form>

            </div>

        </div>
    )
}

export default CourseStructure