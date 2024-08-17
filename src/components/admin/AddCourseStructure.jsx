import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { TfiWrite } from "react-icons/tfi";
import "./AddCourseStructure.css";
import { IoIosCloseCircle } from "react-icons/io";
import "../../index.css";
import "./Addcourse.css";
import "./AddCourseStructure.css";
import Swal from "sweetalert2";
import { AdminAxiosInstance } from "../../routes/AdminRoutes";
import { IoChevronBackCircleOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import Defaultcourseimage from "../../assets/Admin/Defaultcourseimage.png";
import { TbCategory } from "react-icons/tb";
import TextEditor from "../reusable/TextEditor";
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const AddCourseStructure = ({ view }) => {
  const navigate = useNavigate();
  const token = useSelector((state) => state.AdminDetails.token);
  const baseURL = process.env.REACT_APP_API_URL;
  const { structureId } = useParams();
  const [errors, setErrors] = useState({});
  const [packages, setPackages] = useState();
  const [durationType, setDurationType] = useState("");
  const [View, SetView] = useState(view);

  const [imageUrl, setImageUrl] = useState("");
  const [Imagestate, setImage] = useState("");
  const img = useRef();

  const [course, setCourse] = useState({
    courseName: "",
    package: "",
    trainingDuration: "",
    hoursPerDay: "",
    price: "",
    description: EditorState.createEmpty(),
    modules: [
      {
        moduleName: "",
        moduleDescription: "",
        sessions: [
          {
            sessionName: "",
            sessionDescription: "",
            sessionDateTime: "",
            sessionLink: "",
          },
        ],
      },
    ],
    individualCourse: true,
    groupCourse: true,
  });


  const onEditorStateChange = (newState) => {
    setCourse(prevState => ({
      ...prevState,
      description: newState
    }));
  };
  



  const convertCourseToFormData = (course) => {
    const formData = new FormData();
   
    const rawContent = convertToRaw(course.description.getCurrentContent());

    formData.append("courseName", course.courseName);
    formData.append("package", course.package);
    formData.append("trainingDuration", course.trainingDuration);
    formData.append("hoursPerDay", course.hoursPerDay);
    formData.append("price", course.price);
    // formData.append("description", course.description);
    formData.append('description', JSON.stringify(rawContent));
    formData.append("individualCourse", course.individualCourse);
    formData.append("groupCourse", course.groupCourse);
    formData.append("modules", JSON.stringify(course.modules));

    if (Imagestate) {
      formData.append("image", Imagestate);

      console.log("vvalue in the formdata");
      console.log(formData.get("image"));
    }

    return formData;
  };

  useEffect(() => {
    const fetchStructure = async () => {
      try {
        if (structureId) {
          const response = await AdminAxiosInstance.get(
            `/api/structure/get/${structureId}`
          );
          console.log("res.data structureId", response.data);
          if (response.data) {
            setCourse(response.data);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchStructure();
  }, [structureId]);

  useEffect(() => {
    AdminAxiosInstance.get(
      "/api/package/get-all-package?page=1&pageSize=10&search="
    )
      .then((res) => {
        setPackages(res.data.data);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, [baseURL, token]);

  const addModule = () => {
    setCourse((prevState) => ({
      ...prevState,
      modules: [
        {
          moduleName: "",
          moduleDescription: "",
          sessions: [
            {
              sessionName: "",
              sessionDescription: "",
              sessionDateTime: "",
              sessionLink: "",
            },
          ],
        },
        ...prevState.modules,
      ],
    }));
  };

  const validate = (course) => {
    let validationErrors = {};

    if (!course.courseName || !course.courseName.trim()) {
      validationErrors.courseName = "Course Name is required";
    }
    if (!course.package || !course.package.trim()) {
      validationErrors.package = "Package is required";
    }
    if (!course.trainingDuration.split(" ")[0]) {
      validationErrors.trainingDuration = "Training Duration is required";
    }
    if (!course.trainingDuration.split(" ")[0]) {
      validationErrors.trainingDuration = "Select type";
    }
    if (!course.hoursPerDay) {
      validationErrors.hoursPerDay = "Hours Per Day is required";
    }
    if (!course.price) {
      validationErrors.price = "Price is required";
    }
    if (!course.description || !JSON.stringify(convertToRaw(course.description.getCurrentContent())) ) {
      validationErrors.description = "Description is required";
    }

    course.modules.forEach((module, moduleIndex) => {
      if (!module.moduleName || !module.moduleName.trim()) {
        validationErrors[`modules[${moduleIndex}].moduleName`] =
          "Module Name is required";
      }
     
      if (!module.moduleDescription || !module.moduleDescription.trim()) {
        validationErrors[`modules[${moduleIndex}].moduleDescription`] =
          "Module Description is required";
      }

      module.sessions.forEach((session, sessionIndex) => {
        if (!session.sessionName || !session.sessionName.trim()) {
          validationErrors[
            `modules[${moduleIndex}].sessions[${sessionIndex}].sessionName`
          ] = "Session Name is required";
        }
        if (!session.sessionDescription || !session.sessionDescription.trim()) {
          validationErrors[
            `modules[${moduleIndex}].sessions[${sessionIndex}].sessionDescription`
          ] = "Session Description is required";
        }
      });
    });

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleModuleChange = (e, moduleIndex) => {
    const { name, value } = e.target;
    const updatedModules = [...course.modules];
    updatedModules[moduleIndex][name.split("-")[0]] = value;
    setCourse((prevState) => ({
      ...prevState,
      modules: updatedModules,
    }));
  };

  const handleSessionChange = (e, moduleIndex, sessionIndex) => {
    const { name, value } = e.target;
    const updatedModules = [...course.modules];
    updatedModules[moduleIndex].sessions[sessionIndex][name.split("-")[0]] =
      value;
    setCourse((prevState) => ({
      ...prevState,
      modules: updatedModules,
    }));
  };

  const RemoveModule = (moduleIndex, e) => {
    console.log(moduleIndex);

    setCourse((prevData) => {
      const updatedModules = prevData.modules.filter(
        (_, index) => index !== moduleIndex
      );
      return {
        ...prevData,
        modules: updatedModules,
      };
    });
  };

  const addSession = (moduleIndex) => {
    const updatedModules = [...course.modules];

    updatedModules[moduleIndex].sessions.push({
      sessionName: "",
      sessionDescription: "",
      sessionDateTime: "",
      sessionLink: "",
    });
    setCourse({ ...course, modules: updatedModules });
  };

  const RemoveSession = (moduleIndex, sessionIndex, e) => {
    console.log("moduleIndex, sessionIndex, e", moduleIndex, sessionIndex);

    setCourse((prevData) => {
      const updatedModules = [...prevData.modules];
      updatedModules[moduleIndex].sessions = updatedModules[
        moduleIndex
      ].sessions.filter((_, index) => index !== sessionIndex);
      return {
        ...prevData,
        modules: updatedModules,
      };
    });
  };

  const handleInputChange = (event) => {
    const { name, type, checked, value } = event.target;
    setCourse((prevCourse) => ({
      ...prevCourse,
      [name]: type === "checkbox" ? checked : value,
    }));
    console.log(name);

    if (name === "trainingDuration" || name === "durationType") {
      setCourse((prevCourse) => ({
        ...prevCourse,
        trainingDuration:
          name === "trainingDuration"
            ? `${value} ${durationType}`
            : `${prevCourse.trainingDuration.split(" ")[0]} ${value}`,
      }));
    }
  };

  useEffect(() => {
    console.log(course);
    console.log("errors");
    console.log(errors["modules[0].moduleName"]);
  }, [course, errors]);

  const axiosHandler = async (e) => {
    e.preventDefault();
    console.log("validate");
    console.log(validate(course));

    if (validate(course)) {
      try {
        const formData = convertCourseToFormData(course);

        const logFormData = (formData) => {
          for (let pair of formData.entries()) {
            console.log(`${pair[0]}: ${pair[1]}`);
          }
        };

        logFormData(formData);
        AdminAxiosInstance.post("/api/structure/create", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }).then((res) => {
          console.log(res);

          Swal.fire({
            timer: 1000,
            timerProgressBar: true,
            title: "Success",
            text: "Course Structure Created Successfully.",
            icon: "success",
          });

          navigate("/admin/home/courseStructure");
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      toast.error("Please fix validation errors before submitting.");
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();

    Swal.fire({
      title: "Do You want to create a new Structure",
      text: "Please check that the course structure details are correct",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#238D23",
      cancelButtonColor: "#878ca7",
      confirmButtonText: "Create Course Structure!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosHandler(e);
      }
    });
  };

  const handlegoback = () => {
    navigate(-1);
  };

  const handleimageUpload = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    if (Image) {
      formData.append("image", Image);

      console.log("vvalue in the formdata");
      console.log(formData.get("image"));
    }
    try {
      const response = await AdminAxiosInstance.put(
        `/api/structure/update-structure-image/${structureId}`,
        formData,
        {
          "Content-Type": "multipart/form-data",
        }
      );
      if (response.data.message === "Image Updated Successfully") {
        toast.success("Image Updated Successfully");
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  // const handleImageChange = async (e) => {
  //     setImage("");
  //     const file = e.target.files[0];

  //     setImage(file);
  //     if (file) {
  //         const reader = new FileReader();
  //         reader.onloadend = () => {
  //             setImageUrl(reader.result);
  //         };
  //         reader.readAsDataURL(file);
  //     }
  // };

  // function to check whether the image is correct size or not
  const handleImageChange = async (e) => {
    e.preventDefault();
    setImage("");
    const file = e.target.files[0];
    const fileType = file.type;

    const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (!allowedTypes.includes(fileType)) {
      img.current.value = null;
      toast.warning("File type should be .png, .jpg, or .jpeg.");
      return;
    }

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const image = new Image();
        image.onload = () => {
          const width = image.width;
          const height = image.height;

          if (width >= 300 && height >= 200) {
            setImage(file);
            setImageUrl(reader.result);
          } else {
            console.error("Image dimensions should be 300x200 pixels.");
            // Display an error message to the user
            toast.error("Image dimensions should be 300x200 pixels.");
          }
        };
        image.src = reader.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const deleteHandler = () => {
    axios
      .delete(`${baseURL}/api/structure/delete/${structureId}`, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.data.message === "Structure deleted successfully") {
          Swal.fire({
            timer: 2000,
            timerProgressBar: true,
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
          navigate("/admin/home/courseStructure");
        }
      })
      .catch((error) => {
        console.warn(error);
        console.warn(error.message);
        throw new Error(error.message);
      });
  };

  const handleDeleteCourse = (id) => {
    Swal.fire({
      title: "Are you sure, you want to delete ?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#eb5048",
      cancelButtonColor: "#878ca7",
      confirmButtonText: "Delete Course Structure!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Are you absolutely sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          timer: 2000,
          timerProgressBar: true,
          showCancelButton: true,
          confirmButtonColor: "#eb5048",
          cancelButtonColor: "#878ca7",
          confirmButtonText: "Yes, delete it!",
        }).then((result) => {
          if (result.isConfirmed) {
            deleteHandler();
          }
        });
      }
    });
  };

  const handleEdit = () => {
    Swal.fire({
      title: "Do you want to edit?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        SetView(false);
      }
    });
  };

  return (
    <div className="w-full pt-4 px-4 md:p-5 md:px-6 bg-slate-200 rounded-lg mt-2">
      {View && (
        <IoChevronBackCircleOutline
          className="text-4xl mb-4 cursor-pointer  hover:scale-105"
          onClick={() => handlegoback()}
        />
      )}

      {View ? (
        <div className="w-full flex justify-between">
          <h1 className="font-bold font-poppins text-xl md:text-2xl pb-6 flex items-center justify-between md:justify-start gap-x-4">
            View Course Structure
            {<TfiWrite className="md:text-2lg text-2xl " />}
          </h1>
          <div className="flex gap-x-4">
            <MdDelete
              onClick={() => handleDeleteCourse}
              className="text-3xl text-red-600 cursor-pointer "
            />{" "}
            <FaEdit
              onClick={handleEdit}
              className="text-3xl text-blue-700 cursor-pointer"
            />
          </div>
        </div>
      ) : (
        <h1 className="font-bold font-poppins text-xl md:text-2xl pb-6 flex items-center justify-between md:justify-start gap-x-4">
          <button onClick={() => navigate("/admin/home/courseStructure")}><IoChevronBackCircleOutline className="text-4xl"/></button>
          {structureId
            ? "Edit Course Structure"
            : "Create New Course Structure"}{" "}
          {<TfiWrite className="md:text-2lg text-2xl " />}
        </h1>
      )}

      <form className="space-y-6 ">
        <div className="flex flex-col relative">
          <label className="text-sm font-semibold">Course Image</label>

          {/* Display selected image */}

          <div className="pt-4 flex w-full h-auto gap-x-4">
            {imageUrl ? (
              <div className=" w-[300px] h-[200px] border-[1px] border-gray-700 bg-white  rounded-xl">
                <img
                  src={imageUrl}
                  alt="Select an image "
                  className="w-full h-full object-contain rounded shadow-lg"
                />
              </div>
            ) : (
              <div className=" w-[300px] h-[200px] border-[1px] border-gray-700 bg-white  rounded-xl">
                <img
                  src={Defaultcourseimage}
                  alt="Select an image "
                  className="w-full h-full object-cover border-[1px] rounded-xl shadow-lg"
                />
              </div>
            )}

            <label
              htmlFor="chooseimage"
              className="choose w-[110px]  h-max p-2 rounded-md flex justify-center items-center  bg-blue-600 text-white text-sm font-semibold"
            >
              Choose Image
            </label>
            {/* 
                        <button onClick={(event) => handleimageUpload(event)} className='bg-green-500 w-[110px]  h-[30px] flex justify-center items-center text-white text-sm font-semibold'>
                            Upload
                        </button> */}

            <input
              ref={img}
              id="chooseimage"
              type="file"
              onChange={handleImageChange}
              name="courseImage"
              accept="image/*"
              placeholder="choose Image"
              className=" w-[150px] hidden h-[30px] p-2  "
              disabled={View}
            />
          </div>
        </div>

        <div className="w-full  grid grid-flow-row md:grid-cols-2 grid-cols-1 gap-y-4 md:gap-y-0  gap-x-4">
          <div className="  flex gap-x-4">
            <div className="w-full md:w-full  relative">
              <label className="text-sm font-semibold">Course Name</label>
              <input
                onChange={handleInputChange}
                name="courseName"
                value={course.courseName}
                type="text"
                placeholder="Course Name"
                className="w-full h-10 bg-white text-sm border-[1px] border-gray-500 rounded shadow-lg px-3 mt-2 focus:outline-blue-900"
                disabled={View}
              />
              {errors.courseName && (
                <p className="absolute -bottom-4 text-red-500 text-[12px]">
                  {errors.courseName}
                </p>
              )}
            </div>

            <div className=" w-full md:w-full relative">
              <label className=" text-sm font-semibold">Package</label>
              <select
                disabled={View}
                onChange={handleInputChange}
                name="package"
                value={course.package}
                className="  w-full  h-10 bg-white text-sm rounded shadow-lg px-3 mt-2 focus:outline-blue-900 border-[1px] border-gray-500"
              >
                <option
                  value="Select a package"
                  defaultChecked
                  className="w-[100px] font-poppins opac text-slate-500"
                >
                  Select a package
                </option>

                {packages &&
                  packages.map((val, index) => {
                    return (
                      <option className="w-[100px]" key={index}>
                        {val.packageName}{" "}
                      </option>
                    );
                  })}
              </select>
              {errors.package && (
                <p className="absolute -bottom-4 text-red-500 text-[12px]">
                  {errors.package}
                </p>
              )}
            </div>
          </div>

          <div className="   flex items-end gap-x-4">
            <div className="w-1/2 h-10 rounded flex items-center px-4 justify-between focus:outline-blue-900 border-[1px] border-gray-500 bg-white">
              <label htmlFor="individual " className="font">
                Individual{" "}
              </label>
              <input
                disabled={View}
                name="individualCourse"
                className="rounded-xl"
                type="checkbox"
                onChange={handleInputChange}
                checked={course.individualCourse}
                id="individual"
              />
            </div>
            <div className="w-1/2 h-10 rounded flex items-center px-4 justify-between focus:outline-blue-900 border-[1px] border-gray-500 bg-white">
              <label htmlFor="groupCourse"> Group</label>
              <input
                disabled={View}
                type="checkbox"
                name="groupCourse"
                onChange={handleInputChange}
                checked={course.groupCourse}
                id="groupCourse"
              />
            </div>
          </div>
        </div>

        <div className="w-full  grid grid-flow-row md:grid-cols-2 grid-cols-1 gap-y-4 md:gap-y-0  gap-x-4">
          <div className="w-full flex flex-col justify-between  ">
            <label className="text-sm font-semibold">Training Duration</label>

            <div className="flex gap-x-4">
              <div className="w-1/2 relative">
                <input
                  min="0"
                  disabled={View}
                  // onInput={validity.valid||(value='')}
                  onChange={handleInputChange}
                  name="trainingDuration"
                  value={course.trainingDuration.split(" ")[0]}
                  type="number"
                  placeholder="Total Duration"
                  className="w-full h-10 border-[1px] border-gray-500 bg-white text-sm rounded shadow-lg px-3 mt-2 focus:outline-blue-900"
                />
                {errors.trainingDuration && (
                  <p className="absolute -bottom-4 text-red-500 text-[12px]">
                    {errors.trainingDuration}
                  </p>
                )}
              </div>

              <div className="w-1/2">
                <select
                  onChange={(e) => handleInputChange(e)}
                  disabled={View}
                  name="durationType"
                  value={durationType}
                  className="  w-full h-10 bg-white text-sm rounded shadow-lg px-3 mt-2 focus:outline-blue-900 border-[1px] border-gray-500"
                >
                  <option
                    value="select Duration"
                    defaultChecked
                    className=" font-poppins opac text-slate-500"
                  >
                    {" "}
                    Select duration{" "}
                  </option>
                  <option value="Hrs" className=" font-poppins opac ">
                    {" "}
                    Hrs{" "}
                  </option>
                  <option value="Days" className=" font-poppins opac ">
                    {" "}
                    Days{" "}
                  </option>
                  <option value="Months" className=" font-poppins opac ">
                    {" "}
                    Months{" "}
                  </option>
                  <option value="Year" className=" font-poppins opac ">
                    {" "}
                    Year{" "}
                  </option>
                </select>
              </div>
            </div>
          </div>

          <div className="w-full flex items-center gap-x-4 ">
            <div className="w-full md:w-1/2 relative">
              <label className="text-sm font-semibold">Hours Per Day</label>
              <input
                onChange={handleInputChange}
                name="hoursPerDay"
                disabled={View}
                type="number"
                value={course?.hoursPerDay}
                placeholder="Hours Per Day"
                className="w-full h-10 bg-white border-[1px] border-gray-500 text-sm rounded shadow-lg px-3 mt-2 focus:outline-blue-900"
              />
              {errors.hoursPerDay && (
                <p className="absolute -bottom-4 text-red-500 text-[12px]">
                  {errors.hoursPerDay}
                </p>
              )}
            </div>

            <div className="w-full md:w-1/2 relative">
              <label className="text-sm font-semibold">Price</label>
              <input
                onChange={handleInputChange}
                name="price"
                disabled={View}
                type="number"
                value={course.price}
                placeholder="Enter Price of the module"
                className="w-full h-10 bg-white border-[1px] border-gray-500 text-sm rounded shadow-lg px-3 mt-2 focus:outline-blue-900"
              />
              {errors.price && (
                <p className="absolute -bottom-4 text-red-500 text-[12px]">
                  {errors.price}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col relative ">
          <label className="text-sm font-semibold">Description</label>
        
         
          
          <TextEditor view={view} editorState={course.description}  onEditorStateChange={onEditorStateChange}  />
                   
        
          {/* <textarea
            disabled={View}
            onChange={handleInputChange}
            name="description"
            placeholder="Description"
            value={course.description}
            className="w-full md:h-20 rounded border-[1px] border-gray-500 mt-2 shadow-lg p-2"
          /> */}
          {errors.description && (
            <p className="absolute -bottom-4 text-red-500 text-[12px]">
              {errors.description}
            </p>
          )}
        </div>

        {/*________ ADD MODULE BUTTON_____________ */}
        <div className="border-b-[1px] border- ">
          <h1 className="text-xl font-semibold font-poppins">Modules</h1>
        </div>

        {!View && (
          <button
            type="button"
            onClick={(e) => addModule(e)}
            className="w-full  md:w-[100%] md:max-w-[150px] h-10 bg-blue-900 rounded-lg text-white font-poppins font-semibold flex  justify-center items-center"
          >
            Add Module
          </button>
        )}

        {course?.modules?.map((module, moduleIndex) => {
          return (
            <div className="w-full h-auto border-2 border-blue-900 bg-white rounded-lg p-4 flex flex-col shadow-lg space-y-4">
              <div className="w-full flex gap-x-6 justify-between items-center ">
                <h1 className=" font-poppins text-xl text-blue-900 font-semibold">
                  Module {moduleIndex + 1}
                </h1>
                {!View && (
                  <div className="  ">
                    <IoIosCloseCircle
                      className="font-black text-3xl  text-red-900 "
                      onClick={(e) => RemoveModule(moduleIndex, e)}
                    />
                  </div>
                )}
              </div>

              <div className="w-full flex flex-col md:flex-row md:gap-x-4 ">
                <div className="w-full md:w-1/2  relative">
                  <label className="text-sm font-semibold">Module Name</label>
                  <input
                    disabled={View}
                    name={`moduleName-${moduleIndex}`}
                    value={course.modules[moduleIndex].moduleName}
                    onChange={(e) => handleModuleChange(e, moduleIndex)}
                    placeholder="Module Name"
                    className="w-full h-10 bg-white border-[1px] border-gray-500 text-sm rounded shadow-[0_3px_10px_rgb(0,0,0,0.2)] px-3 mt-2 focus:outline-blue-900"
                  />
                  {errors[`modules[${moduleIndex}].moduleName`] && (
                    <p className="absolute -bottom-4 text-red-500 text-[12px]">
                      {errors[`modules[${moduleIndex}].moduleName`]}
                    </p>
                  )}
                </div>
                <div className="w-full md:w-1/2 relative">
                  <label className="text-sm font-semibold">
                    Module Description
                  </label>
                  <input
                    disabled={View}
                    name={`moduleDescription-${moduleIndex}`}
                    value={course.modules[moduleIndex].moduleDescription}
                    onChange={(e) => handleModuleChange(e, moduleIndex)}
                    placeholder="Module Description"
                    className="w-full h-10 bg-white border-[1px] border-gray-500 text-sm rounded shadow-[0_3px_10px_rgb(0,0,0,0.2)] px-3 mt-2 focus:outline-blue-900"
                  />
                  {errors[`modules[${moduleIndex}].moduleDescription`] && (
                    <p className="absolute -bottom-4 text-red-500 text-[12px]">
                      {errors[`modules[${moduleIndex}].moduleDescription`]}
                    </p>
                  )}
                </div>
              </div>

              <div className="w-full  flex flex-col md:flex-row md:gap-x-4 ">
                <div className="w-full  md:w-1/2">
                  <label className="text-sm font-semibold">
                    Module G-Meet Link
                  </label>
                  <input
                    disabled={View}
                    onChange={(e) =>
                      handleSessionChange(e, moduleIndex, sessionIndex)
                    }
                    placeholder="Session Link"
                    className="w-full h-10 bg-white text-sm border-[1px] border-gray-500 rounded shadow-lg px-3 mt-2 focus:outline-blue-900"
                  />
                </div>

                <div className="w-full md:w-1/2 pt-4 md:pt-0 flex justify-end items-end  ">
                  {!View && (
                    <button
                      type="button"
                      onClick={(e) => addSession(moduleIndex, e)}
                      className="px-5  h-8 bg-blue-900 rounded-md text-sm text-white flex justify-center items-center "
                    >
                      Add Session
                    </button>
                  )}
                </div>
              </div>

              {module?.sessions?.map((session, sessionIndex) => {
                return (
                  <div className="w-full  bg-gray-200 border-[1px] border-blue-700 rounded-lg p-4 py-6  flex flex-col shadow-lg space-y-4">
                    <div className="w-full flex gap-x-6 justify-between items-center ">
                      <h1 className="text-md font-semibold">
                        Session {sessionIndex + 1}
                      </h1>

                      {!View && (
                        <button
                          type="button"
                          onClick={(e) =>
                            RemoveSession(moduleIndex, sessionIndex, e)
                          }
                          className="px-2 h-8 bg-red-900 leading-3  rounded-md text-sm text-white flex items-center "
                        >
                          Remove Session
                        </button>
                      )}
                    </div>

                    <div className="w-full flex flex-col md:flex-row md:gap-x-4">
                      <div className="w-full md:w-1/2 relative">
                        <label className="text-sm font-semibold">
                          Session Name
                        </label>
                        <input
                          disabled={View}
                          name={`sessionName-${moduleIndex}-${sessionIndex}`}
                          value={
                            course.modules[moduleIndex].sessions[sessionIndex]
                              .sessionName
                          }
                          onChange={(e) =>
                            handleSessionChange(e, moduleIndex, sessionIndex)
                          }
                          placeholder="Session Name"
                          className="w-full h-10 bg-white  text-sm rounded shadow-lg px-3 mt-2 focus:outline-blue-900"
                        />

                        {errors[
                          `modules[${moduleIndex}].sessions[${sessionIndex}].sessionName`
                        ] && (
                          <p className="absolute -bottom-4 text-red-500 text-[12px]">
                            {
                              errors[
                                `modules[${moduleIndex}].sessions[${sessionIndex}].sessionName`
                              ]
                            }
                          </p>
                        )}
                      </div>
                      <div className="w-full md:w-1/2 relative">
                        <label className="text-sm font-semibold">
                          Session Description
                        </label>
                        <input
                          disabled={View}
                          name={`sessionDescription-${moduleIndex}-${sessionIndex}`}
                          value={
                            course.modules[moduleIndex].sessions[sessionIndex]
                              .sessionDescription
                          }
                          onChange={(e) =>
                            handleSessionChange(e, moduleIndex, sessionIndex)
                          }
                          placeholder="Session Description"
                          className="w-full h-10 bg-white text-sm rounded shadow-lg px-3 mt-2 focus:outline-blue-900"
                        />
                        {errors[
                          `modules[${moduleIndex}].sessions[${sessionIndex}].sessionDescription`
                        ] && (
                          <p className="absolute -bottom-4 text-red-500 text-[12px]">
                            {
                              errors[
                                `modules[${moduleIndex}].sessions[${sessionIndex}].sessionDescription`
                              ]
                            }
                          </p>
                        )}
                      </div>
                    </div>
                    {/* 
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
                    </div> */}
                  </div>
                );
              })}
            </div>
          );
        })}

        <div className="flex items-center justify-end ">
          {!View &&
            (structureId ? (
              <button
                onClick={(e) => submitHandler(e)}
                type="submit"
                className="px-8 py-2 bg-blue-700 hover:bg-blue-600 rounded-md text-white"
              >
                Update
              </button>
            ) : (
              <button
                onClick={(e) => submitHandler(e)}
                type="submit"
                className="px-8 py-2 bg-green-900 rounded-md text-white"
              >
                Submit
              </button>
            ))}
        </div>
      </form>
    </div>
  );
};

export default AddCourseStructure;
