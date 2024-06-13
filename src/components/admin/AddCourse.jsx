import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { TfiWrite } from 'react-icons/tfi';
import { CiCircleRemove } from "react-icons/ci";
import { IoIosCloseCircle } from 'react-icons/io';


const AddCourse = () => {

  const navigate = useNavigate();
  const token = useSelector((state) => state.token.token);
  const baseURL = process.env.REACT_APP_API_URL;

  const [errors, setErrors] = useState({});
  const [courseStructureDropDown, setCourseStructureDropDown] = useState([]);
  const [CourseStructure, setCourseStructure] = useState([]);
  const [course, setCourse] = useState({
    courseName: '',
    package: '',
    trainingDuration: '',
    hoursPerDay: '',
    price: '',
    description: '',
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
  });

useEffect(() => {
console.log("course is changed in useEffect ")
console.log(course)

}, [course])




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


// function to add a new module
const RemoveModule = () => {
  console.log(e.target.moduleIndex)
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



  // Auto Populate function
  const handleAutofill = (e) => {
    const { value } = e.target;
    const selectedCourse = CourseStructure.find((course) => course.courseName === value);
    console.log("selectedCourse is");
    console.log(selectedCourse);
    if (selectedCourse) {
      setCourse({
        courseName: selectedCourse.courseName,
        package: selectedCourse.package,
        trainingDuration: selectedCourse.trainingDuration,
        hoursPerDay: selectedCourse.hoursPerDay,
        price: selectedCourse.price,
        description: selectedCourse.description,
        modules: selectedCourse.modules,
      });
    }
  };

  // Function to change the input element value
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourse((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    axios
      .get(`${baseURL}api/structure/get-all-structure`, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const data = res.data.data;
        setCourseStructure(data);

        const newDropDownOptions = data.map((value) => ({
          _id: value._id,
          courseName: value.courseName,
        }));
        setCourseStructureDropDown(newDropDownOptions);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, []);

  useEffect(() => {
    console.log(courseStructureDropDown);
    console.log('CourseStructure after API load');
    console.log(CourseStructure);
  }, [courseStructureDropDown, CourseStructure]);

  return (
    <div className="w-full p-5 px-16 bg-gray-300 rounded-lg mt-2">
      <h1 className="font-bold font-poppins text-2xl pb-6 flex items-center gap-x-4">
        Create a new Course {<TfiWrite className="text-lg " />}
      </h1>
      <form className="space-y-6">
        <div className="w-full grid grid-flow-row grid-cols-2 gap-x-4">
          <div className="w-full ">
            <label className="text-sm font-semibold">Course Type</label>
            <select
              name="courseType"
              onChange={handleInputChange}
              value={course?.courseType}
              id=""
              className="w-full h-10 bg-white text-sm rounded shadow-lg px-3 mt-2 focus:outline-blue-900"
            >
              <option value="">Individual</option>
              <option value="">Group</option>
            </select>
            {errors.courseName && <p className="text-red-500 text-xs">{errors.courseName}</p>}
          </div>

          <div className="w-full ">
            <label className="text-sm font-semibold">Course Structure</label>
            <select
              name="courseStructure"
              onChange={(e) => {
                handleInputChange(e);
                handleAutofill(e);
              }}
              value={course.courseStructure}
              id=""
              className="w-full h-10 bg-white text-sm rounded shadow-lg px-3 mt-2 focus:outline-blue-900"
            >
              <option disabled value="">
                Select the Course Structure
              </option>
              {courseStructureDropDown.map((value, index) => (
                <option key={index} value={value.courseName}>
                  {value.courseName}
                </option>
              ))}
            </select>
            {errors.courseName && <p className="text-red-500 text-xs">{errors.courseName}</p>}
          </div>
        </div>
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
              className="w-full h-10 bg-white text-sm rounded shadow-lg px-3 mt-2 focus:outline-blue-900"
            />
            {errors.courseName && <p className="text-red-500 text-xs">{errors.courseName}</p>}
          </div>

          <div className="w-full md:w-1/2">
            <label className="text-sm font-semibold">Package</label>
            <select
              onChange={handleInputChange}
              name="package"
              value={course.package}
              className="w-full h-10 bg-white text-sm rounded shadow-lg px-3 mt-2 focus:outline-blue-900"
            >
              <option defaultValue="Select a package" className="font-poppins opac text-slate-500">
                Select a package
              </option>
              <option>Comprehensive</option>
              <option>Standard</option>
              <option>Fasttrack</option>
            </select>
            {errors.package && <p className="text-red-500 text-xs">{errors.package}</p>}
          </div>
        </div>

        <div className="flex gap-x-4">
          <div className="w-full md:w-1/2">
            <label className="text-sm font-semibold">Training Duration</label>
            <input
              min="0"
              oninput="validity.valid||(value='');"
              onChange={handleInputChange}
              name="trainingDuration"
              type="Number"
              value={course?.trainingDuration}
              placeholder="Total Hours"
              className="w-full h-10 bg-white text-sm rounded shadow-lg px-3 mt-2 focus:outline-blue-900"
            />
            {errors.trainingDuration && <p className="text-red-500 text-xs">{errors.trainingDuration}</p>}
          </div>

          <div className="w-full md:w-1/2">
            <label className="text-sm font-semibold">Hours Per Day</label>
            <input
              onChange={handleInputChange}
              name="hoursPerDay"
              type="Number"
              value={course?.hoursPerDay}
              placeholder="Hours Per Day"
              className="w-full h-10 bg-white text-sm rounded shadow-lg px-3 mt-2 focus:outline-blue-900"
            />
            {errors.hoursPerDay && <p className="text-red-500 text-xs">{errors.hoursPerDay}</p>}
          </div>

          <div className="w-full md:w-1/2">
            <label className="text-sm font-semibold">Price</label>
            <input
              onChange={handleInputChange}
              name="price"
              type="Number"
              value={course.price}
              placeholder="Enter Price of the module"
              className="w-full h-10 bg-white text-sm rounded shadow-lg px-3 mt-2 focus:outline-blue-900"
            />
            {errors.price && <p className="text-red-500 text-xs">{errors.price}</p>}
          </div>
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-semibold">Description</label>
          <textarea
            onChange={handleInputChange}
            name="description"
            placeholder="Description"
            value={course.description}
            className="w-full md:h-20 rounded mt-2 shadow-lg p-2"
          />
          {errors.description && <p className="text-red-500 text-xs">{errors.description}</p>}
        </div>

        {/*________ ADD MODULE BUTTON_____________ */}
        <div className="border-b-[1px] border- ">
          <h1 className="text-xl font-semibold font-poppins">Modules</h1>
        </div>

          <button
            type='button'
            onClick={(e) => addModule(e)}
            className="w-full  md:w-[100%] md:max-w-[150px] h-10 bg-blue-900 rounded-lg text-white font-poppins font-semibold flex  justify-center items-center"
          >
            Add Module
          </button>
     
        {course?.modules?.map((module, moduleIndex) => {
          return (
            <div className="w-full h-auto border-2 border- bg-white rounded-lg p-4 flex flex-col shadow-lg space-y-4">
              <div className="w-full flex gap-x-6 justify-between items-center ">
                <h1 className="text-md font-semibold">Module {moduleIndex + 1}</h1>
                <div className="  ">
                 <IoIosCloseCircle  className='font-black text-2xl  text-red-900 ' onClick={(e) => RemoveModule(moduleIndex, e)}/>
                 
                </div>
              </div>

              <div className="w-full flex flex-col md:flex-row md:gap-x-4 ">
                <div className="w-full md:w-1/2">
                  <label className="text-sm font-semibold">Module Name</label>
                  <input
                    name={`moduleName-${moduleIndex}`}
                    value={course.modules[moduleIndex].moduleName}
                    onChange={(e) => handleModuleChange(e, moduleIndex)}
                    placeholder="Module Name"
                    className="w-full h-10 bg-white text-sm rounded shadow-lg px-3 mt-2 focus:outline-blue-900"
                  />
                </div>
                <div className="w-full md:w-1/2">
                  <label className="text-sm font-semibold">Module Description</label>
                  <input
                    name={`moduleDescription-${moduleIndex}`}
                    value={course.modules[moduleIndex].moduleDescription}
                    onChange={(e) => handleModuleChange(e, moduleIndex)}
                    placeholder="Module Description"
                    className="w-full h-10 bg-white text-sm rounded shadow-lg px-3 mt-2 focus:outline-blue-900"
                  />
                </div>
              </div>

              {module?.sessions?.map((session, sessionIndex) => {
                return (
                  <div className="w-full bg-gray-200 rounded-lg p-4 flex flex-col shadow-lg space-y-4">
                    <div className="w-full flex gap-x-6 justify-between items-center ">
                      <h1 className="text-md font-semibold">Session {sessionIndex + 1}</h1>
                    
                    <div className='flex gap-x-2'>

                    
                      <button
                    onClick={(e) => addSession(moduleIndex, e)}
                    className="px-3 h-8 bg-blue-900 rounded-md text-sm text-white flex items-center "
                    >
                    Add Session
                  </button>
                     
                      <button
                        onClick={(e) => removeSession(moduleIndex, sessionIndex, e)}
                        className="px-3 h-8 bg-red-900 rounded-md text-sm text-white flex items-center "
                      >
                        Remove Session
                      </button>
                    </div>
                    </div>

                    <div className="w-full flex flex-col md:flex-row md:gap-x-4">
                      <div className="w-full md:w-1/2">
                        <label className="text-sm font-semibold">Session Name</label>
                        <input
                          name={`sessionName-${moduleIndex}-${sessionIndex}`}
                          value={course.modules[moduleIndex].sessions[sessionIndex].sessionName}
                          onChange={(e) => handleSessionChange(e, moduleIndex, sessionIndex)}
                          placeholder="Session Name"
                          className="w-full h-10 bg-white text-sm rounded shadow-lg px-3 mt-2 focus:outline-blue-900"
                        />
                      </div>
                      <div className="w-full md:w-1/2">
                        <label className="text-sm font-semibold">Session Description</label>
                        <input
                          name={`sessionDescription-${moduleIndex}-${sessionIndex}`}
                          value={course.modules[moduleIndex].sessions[sessionIndex].sessionDescription}
                          onChange={(e) => handleSessionChange(e, moduleIndex, sessionIndex)}
                          placeholder="Session Description"
                          className="w-full h-10 bg-white text-sm rounded shadow-lg px-3 mt-2 focus:outline-blue-900"
                        />
                      </div>
                    </div>

                    <div className="w-full flex flex-col md:flex-row md:gap-x-4">
                      <div className="w-full md:w-1/2">
                        <label className="text-sm font-semibold">Session Date & Time</label>
                        <input
                          type="datetime-local"
                          name={`sessionDateTime-${moduleIndex}-${sessionIndex}`}
                          value={course.modules[moduleIndex].sessions[sessionIndex].sessionDateTime}
                          onChange={(e) => handleSessionChange(e, moduleIndex, sessionIndex)}
                          className="w-full h-10 bg-white text-sm rounded shadow-lg px-3 mt-2 focus:outline-blue-900"
                        />
                      </div>
                      <div className="w-full md:w-1/2">
                        <label className="text-sm font-semibold">Session Link</label>
                        <input
                          name={`sessionLink-${moduleIndex}-${sessionIndex}`}
                          value={course.modules[moduleIndex].sessions[sessionIndex].sessionLink}
                          onChange={(e) => handleSessionChange(e, moduleIndex, sessionIndex)}
                          placeholder="Session Link"
                          className="w-full h-10 bg-white text-sm rounded shadow-lg px-3 mt-2 focus:outline-blue-900"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}

        <div className="flex items-center justify-center">
          <button onClick={(e) => submitHandler(e)} type="submit" className="px-6 py-2 bg-green-900 rounded-md text-white">
            Submit
          </button>
        </div>

      </form>
    </div>
  );
};

export default AddCourse;
