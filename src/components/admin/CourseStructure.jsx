import React, { useEffect, useState } from 'react'
import { useForm, useFieldArray } from "react-hook-form"
import { FcGoogle } from "react-icons/fc";
import { Link } from 'react-router-dom';
import { FiPlusCircle } from "react-icons/fi";

const CourseStructure = () => {

    const { register, control, handleSubmit, formState: { errors }, } = useForm();

    const { fields, append, insert, prepend } = useFieldArray({
        control,
        name: 'modules'
    });


    const [course, setCourse] = useState({
        courseName: "",
        package: "",
        duration: "",
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

    const onSubmit = (data) => {
        console.log(data);
    };

    const submitHandler = async (formData) => {
        console.log(formData);
        // if (formData) {
        //   axios
        //     .post(`${apiURL}/auth/register`, formData)
        //     .then((res) => {
        //       toast.success("Sign Up Success");
        //       setTimeout(() => {
        //         navigate("/login");
        //       }, 2000);
        //     })
        //     .catch((err) => {
        //       toast.error("Invalid Credentials");
        //       console.log(err);
        //     });
        // }
    };

    const handleInputChange = (e) => {

        const { name, value } = e.target;
        setCourse(prevState => ({
            ...prevState,
            [name]: value
        }))

        console.log(e.target.name);
        console.log(e.target.value);


    };

    const addModule = ()=>{
        
            
    }


    useEffect(() => {
        console.log(course);

    }, [course])

    return (
        <div className='flex-1 h-full p-5 bg-slate-200 rounded-2xl mt-5'>
            <h1 className='text-2xl font-poppins font-semibold'>Course Structure</h1>

            <div>
                <form onSubmit={handleSubmit(submitHandler)} className="space-y-6">
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
                                className="w-full h-10 bg-white text-sm rounded shadow-lg px-3 mt-2 focus:outline-blue-900" />
                            {errors.coursename && (
                                <p className="text-red-500 text-xs">
                                    {errors.firstname.message}
                                </p>
                            )}
                        </div>



                        <div className="w-full md:w-1/2">
                            <label className="text-sm font-semibold">Package</label>
                            {errors.lastname && (
                                <p className="text-red-500 text-xs">
                                    {errors.lastname.message}
                                </p>
                            )}

                            <select
                                onChange={handleInputChange}
                                name="package"
                                value={course.package}
                                className="w-full h-10 bg-white text-sm rounded shadow-lg px-3 mt-2 focus:outline-blue-900">
                                <option value="Select a package" className='font-poppins opac text-slate-500'>Select a package</option>
                                <option value="Comprehensive">Comprehensive</option>
                                <option value="Standard">Standard</option>
                                <option value="Fasttrack">Fasttrack</option>
                            </select>



                        </div>
                    </div>

                    <div className='flex gap-x-4'>
                        <div className='w-full md:w-1/2'>
                            <label className="text-sm font-semibold">Duration</label>
                            <input 
                             onChange={handleInputChange}
                             name="duration"
                             type="Number"
                             value={course.duration}
                             placeholder="Number of Weeks"
                             className="w-full h-10 bg-white text-sm rounded shadow-lg px-3 mt-2 focus:outline-blue-900"   />


                            {errors.email && (
                                <p className="text-red-500 text-xs">{errors.email.message}</p>
                            )}
                        </div>


                        <div className="relative w-full md:w-1/2">
                            <label className="text-sm font-semibold">Price</label>
                            <input
                                onChange={handleInputChange}
                                name="price"
                                type="Number"
                                value={course.price}
                                placeholder="Enter Price of the module"
                                className="w-full h-10 bg-white text-sm rounded shadow-lg px-3 mt-2 focus:outline-blue-900"
                            />
                                    
                            {errors.password && (
                                <p className="text-red-500 text-xs">{errors.password.message}</p>
                            )}
                        </div>


                    </div>


                    <div className="relative flex flex-col">
                        <label className="text-sm font-semibold">Description</label>

                        <textarea 
                            onChange={handleInputChange}
                            name="description"
                            placeholder="Description"
                            value={course.description}
                            className='w-full md:h-20 rounded mt-2 shadow-lg p-2' />

                        {errors.confirmPassword && ( <p className="text-red-500 text-xs">
                                                        {errors.confirmPassword.message}
                                                    </p>
                        )}

                    </div>

                    {/*________ ADD MODULE BUTTON_____________ */}

                    <button
                        onClick={() => {
                           addModule()
                        }}
                        className='flex gap-3  p-2 text-sm font-poppins content-center items-center rounded-lg bg-blue-900 text-white hover:bg-blue-800'><FiPlusCircle /> Add Module</button>


                    {course.modules.map((module, moduleIndex) => {

                    console.log(module+"module");
                        return (

                            <div className='w-full h-[200px] bg-white rounded-lg p-4  flex flex-col gap-y-4 ' key={moduleIndex}>

                                {/* Module Name */}
                                <div className="w-full ">

                                    <label className="text-sm font-semibold">Module Name</label>
                                    <input 
                                    type="text"
                                    name="moduleName"
                                    value={course.modules[0].moduleName}
                                    placeholder="Course Name" 
                                    className="w-full h-10 bg-slate-200 text-sm rounded px-3 mt-2 focus:outline-blue-900" />
                                    {errors.coursename && (
                                        <p className="text-red-500 text-xs">
                                            {errors.firstname.message}
                                        </p>
                                    )}
                               </div>
                                <div className="w-full ">
                                    <label className="text-sm font-semibold">Description</label>
                                    <textarea 
                                        onChange={handleInputChange}
                                        placeholder="Description"  
                                        name="moduleDescription"
                                        value={course.modules[0].moduleDescription}
                                        className='w-full md:h-20 rounded mt-2 shadow-lg p-2' />
                                   
                                    {errors.coursename && (<p className="text-red-500 text-xs"> {errors.firstname.message} </p>
                                    )}
                                </div>
                                

                                {/* <button onClick={() => appendResource({ resourceName: "", resourceLink: "" })}
                                    className='flex gap-3 w-32 p-2 text-sm font-poppins content-center items-center rounded-lg bg-blue-900 text-white hover:bg-blue-800'><FiPlusCircle /> Add Session</button>


                                {module.resources.map((resource, resourceIndex) => (
                                    <div key={resourceIndex}>
                                        <input
                                            {...register(`modules.${moduleIndex}.resources.${resourceIndex}.resourceName`)}
                                            placeholder="Resource Name"
                                        />
                                        <input
                                            {...register(`modules.${moduleIndex}.resources.${resourceIndex}.resourceLink`)}
                                            placeholder="Resource Link"
                                        />
                                    </div>
                                ))} */}

                                {/* <h3>Module {moduleIndex + 1}</h3>
                            <input

                                {...register(`modules.${moduleIndex}.moduleName`)}
                                placeholder="Module Name"
                            /> */}

                            </div>
                        )
                    })
                    }


                    <button type="submit">Submit</button>
                </form>





            </div>












        </div>
    )
}

export default CourseStructure