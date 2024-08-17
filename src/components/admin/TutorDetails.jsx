import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import profile from "../../assets/Admin/profile.jpeg";
import { AdminAxiosInstance } from "../../routes/AdminRoutes";
import { LuPhone } from "react-icons/lu";
import { toast, ToastContainer } from "react-toastify";
import { CiMail } from "react-icons/ci";
import { IoTrashOutline, IoAddCircleOutline } from "react-icons/io5";
import { FaArrowCircleRight, FaEdit, FaSave } from "react-icons/fa";
import { IoChevronBackCircleOutline } from "react-icons/io5";

const TutorDetails = ({}) => {
  const baseURL = process.env.REACT_APP_API_URL;
  const { tutorId } = useParams();
  const [tutor, setTutor] = useState({
    name: "",
    tutorAddress: { city: "", country: "" },
    number: "",
    email: "",
    about: "",
    cv: "",
    identityProof: "",
    courses: [],
    educations: [],
    awards: [],
    skills: [],
    projects: [],
    experience: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [cvFile, setCvFile] = useState(null);
  const [identityFile, setIdentityFile] = useState(null);
  const navigate = useNavigate();
  const [isBlocked, setIsBlocked] = useState(false);

  const fetchTutorDetails = async () => {
    try {
      const res = await AdminAxiosInstance.get(
        `api/tutor/single-tutor/${tutorId}`,
      );
      const { status, ...tutorData } = res.data;

      // Set the state based on the tutor's status
      setIsBlocked(status === "blocked");
      setTutor({
        ...tutorData,
        courses: tutorData.courses || [],
        education: tutorData.education || [],
        experience: tutorData.experience || "",
        awards: tutorData.awards || [],
        skills: tutorData.skills || [],
        projects: tutorData.projects || [],
      });
    } catch (error) {
      console.error("Error fetching tutor details:", error);
      toast.error("Error fetching tutor details.");
    }
  };

  useEffect(() => {
    fetchTutorDetails();
  }, [baseURL, tutorId]);

  const handleToggleBlock = async () => {
    const action = isBlocked ? "unblock" : "block";
    const url = `${baseURL}api/tutor/${action}/${tutorId}`;

    try {
      const response = await AdminAxiosInstance.post(url);
      console.log("API response:", response.data);
      const message =
        response.data.message || "Operation completed successfully";
      await fetchTutorDetails();
      if (response.data.success) {
        // Refetch tutor details to get the latest status

        console.log("Status after refetch:", isBlocked);
        toast.success(message);
      } else {
        toast.error(message);
      }
    } catch (error) {
      console.error(
        `Error ${isBlocked ? "unblocking" : "blocking"} tutor:`,
        error,
      );
      toast.error(
        `An error occurred while ${isBlocked ? "unblocking" : "blocking"} the tutor`,
      );
    }
  };

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTutor((prevTutor) => ({
      ...prevTutor,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { name } = e.target;
    const file = e.target.files[0];
    setTutor((prevTutor) => ({
      ...prevTutor,
      [name]: file,
    }));
  };

  const handleDelete = (field) => {
    setTutor((prevTutor) => ({
      ...prevTutor,
      [field]: null,
    }));
  };

  const handleFieldAdd = () => {
    setTutor((prevTutor) => ({
      ...prevTutor,
      educations: [...prevTutor.educations, { _id: Date.now(), path: "" }],
    }));
  };
  const handleAdd = (field) => {
    setTutor((prevTutor) => ({
      ...prevTutor,
      [field]: [...prevTutor[field], { _id: Date.now(), path: "" }],
    }));
  };
  const handleFieldChange = (field, index, file) => {
    const updatedField = [...tutor[field]];
    if (file) {
      updatedField[index] = file;
    }
    setTutor((prevTutor) => ({
      ...prevTutor,
      [field]: updatedField,
    }));
  };

  const handleDeleteField = (field, index) => {
    const updatedField = [...tutor[field]];
    updatedField.splice(index, 1);
    setTutor((prevTutor) => ({
      ...prevTutor,
      [field]: updatedField,
    }));
  };

  return (
    <div className="p-2 w-full font-poppins">
      <button className="w-[50%]" onClick={() => navigate(-1)}>
        <IoChevronBackCircleOutline className="text-4xl mb-2 " />
      </button>
      <div className="w-full bg-[#F4F6F7] h-30 p-2 flex">
        <div className="w-[40%] md:w-[15%] lg:w-[10%] justify-center items-center flex">
          <img
            src={profile}
            className="border-2 rounded-full w-15 md:w-20 h-15 md:h-20"
            alt="Tutor Profile"
          />
        </div>
        <div className="w-[90%] ml-1">
          <h1 className="text-base md:text-lg lg:text-2xl font-poppins capitalize">
            {tutor.name}
          </h1>
          <h1 className="text-sm lg:text-sm text-[#999999] font-poppins capitalize">
            {tutor.tutorAddress.city}, {tutor.tutorAddress.country}
          </h1>
          <div className="flex gap-20">
            <span className="text-sm lg:text-sm text-[#454545] font-poppins flex items-center gap-x-2">
              <LuPhone /> {tutor.number}
            </span>
            <span className="text-sm lg:text-sm text-[#454545] font-poppins flex items-center gap-x-2">
              <CiMail /> {tutor.email}
            </span>
          </div>
        </div>
      </div>

      {/* Edit Button */}
      <div className="w-full flex justify-center items-center py-2 md:px-4 lg:px-8">
        <div className="justify-end w-[100%] md:-[97%] flex">
          <button
            className="text-black py-2 md:text-2xl rounded text-xl"
            onClick={handleEditClick}
          >
            {isEditing ? <FaSave /> : <FaEdit />}
          </button>
        </div>
      </div>

      {/* About Section */}
      <div className="flex flex-col gap-y-4 overflow-y-scroll no-scrollbar w-full">
        {/* <div className="flex w-full justify-center items-center gap-2 flex-wrap">
          <div className="w-full md:w-[20%] flex justify-between flex-wrap">
            <p className="text-[15px] text-[#666666] font-semibold">ABOUT ME</p>
            <FaArrowCircleRight className="text-xl" />
          </div>
          <div className="w-full md:w-[75%] p-5 rounded-md bg-[#E5F0FC]">
            <h1 className="text-[20px] font-semibold text-[#333333] font-poppins border-b-2 border-[#DFE7EF]">
              About Tutor
            </h1>
            <div className="mt-5">
              {isEditing ? (
                <textarea
                  className="bg-[white] text-sm outline-none w-full p-2 rounded-lg"
                  name="about"
                  rows={5}
                  value={tutor.about}
                  onChange={handleChange}
                />
              ) : (
                <p className="font-poppins text-[#454545] text-sm">
                  {tutor.about || "No information provided."}
                </p>
              )}
            </div>
          </div>
        </div> */}
        <button
          onClick={handleToggleBlock}
          className={`btn ${
            isBlocked ? "bg-red-500" : "bg-green-500"
          } text-white`}
        >
          {isBlocked ? "Unblock" : "Block"}
        </button>

        {/* File Uploads Section */}
        <div className="flex w-full justify-center items-center gap-2 flex-wrap">
          <div className="w-full md:w-[20%] flex justify-between gap-2 flex-wrap">
            <p className="text-[15px] text-[#666666] font-semibold">
              FILE UPLOADS
            </p>
            <FaArrowCircleRight className="text-xl" />
          </div>
          <div className="w-full md:w-[75%] p-5 rounded-lg bg-[#E5F0FC]">
            <h1 className="text-[20px] font-semibold text-[#333333] font-poppins border-b-2 border-[#DFE7EF]">
              File Uploads
            </h1>
            <div className="mt-4">
              <div className="flex justify-between items-center">
                {isEditing ? (
                  <input
                    type="file"
                    className="block w-full text-sm rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-white p-2"
                    name="cv"
                    onChange={handleFileChange}
                  />
                ) : (
                  <div className="flex items-center text-sm gap-2">
                    {tutor.cv ? (
                      <a
                        href={`${tutor.cv}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500"
                      >
                        View File
                      </a>
                    ) : (
                      <span className="text-[#333333] text-sm font-poppins font-semibold">
                        No File Uploaded
                      </span>
                    )}
                    {isEditing && tutor.cv && (
                      <div
                        className="w-7 h-7 flex items-center justify-center bg-red-200 text-red-700 cursor-pointer"
                        onClick={() => handleDelete("cv")}
                      >
                        <IoTrashOutline className="text-red-600" />
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* <h1 className="text-[14px] text-[#333333] font-poppins pb-2 mt-4">
                Upload Identity Proof *
              </h1>
              <div className="flex justify-between items-center">
                {isEditing ? (
                  <input
                    type="file"
                    className="block w-full text-sm rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-white p-2"
                    name="identityProof"
                    onChange={handleFileChange}
                  />
                ) : (
                  <div className="flex items-center gap-2">
                    {tutor.identityProof ? (
                      <a
                        href={`${baseURL}${tutor.identityProof}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#333333] text-sm font-poppins font-semibold hover:underline"
                      >
                        View Identity Proof
                      </a>
                    ) : (
                      <span className="text-[#333333] text-sm font-poppins font-semibold">
                        No File Uploaded
                      </span>
                    )}
                    {isEditing && tutor.identityProof && (
                      <div
                        className="w-7 h-7 flex items-center justify-center bg-red-200 text-red-700 cursor-pointer"
                        onClick={() => handleDelete("identityProof")}
                      >
                        <IoTrashOutline className="text-red-600" />
                      </div>
                    )}
                  </div>
                )}
              </div> */}
            </div>
          </div>
        </div>

        {/* Additional Details */}
        <div className="flex w-full justify-center items-center gap-2 flex-wrap">
          <div className="w-full md:w-[20%] flex justify-between gap-2 flex-wrap">
            <p className="text-[15px] text-[#666666] font-semibold">
              EDUCATION
            </p>
            <FaArrowCircleRight className="text-xl" />
          </div>
          <div className="w-full md:w-[75%] p-5 rounded-lg bg-[#E5F0FC]">
            <h1 className="text-[20px] font-semibold text-[#333333] font-poppins border-b-2 border-[#DFE7EF]">
              Education
            </h1>
            {isEditing ? (
              tutor.educations.map((edu, index) => (
                <div key={edu._id} className="flex items-center gap-2 mb-2">
                  <input
                    type="file"
                    className="bg-white text-sm outline-none w-full p-2 rounded-lg"
                    onChange={(e) => handleFileChange(index, e.target.files[0])}
                  />
                  <IoTrashOutline
                    className="text-red-600 cursor-pointer"
                    onClick={() => handleDeleteField(index)}
                  />
                </div>
              ))
            ) : (
              <ul className="list-disc pl-5 text-sm">
                {tutor.educations.length ? (
                  tutor.educations.map((edu) => (
                    <li key={edu._id} className="text-[#454545] mb-2">
                      {edu.path ? (
                        <a
                          href={edu.path}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline"
                        >
                          View File
                        </a>
                      ) : (
                        "No file available"
                      )}
                    </li>
                  ))
                ) : (
                  <li className="text-[#454545]">No information provided.</li>
                )}
              </ul>
            )}
            {isEditing && (
              <div className="mt-4 flex items-center gap-2">
                <button
                  className="text-green-600 text-sm flex items-center"
                  onClick={handleFieldAdd}
                >
                  <IoAddCircleOutline /> Add Education
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex w-full justify-center items-center gap-2 flex-wrap">
          <div className="w-full md:w-[20%] flex justify-between gap-2 flex-wrap">
            <p className="text-[15px] text-[#666666] font-semibold">SKILLS</p>
            <FaArrowCircleRight className="text-xl" />
          </div>
          <div className="w-full md:w-[75%] p-5 rounded-lg bg-[#E5F0FC]">
            <h1 className="text-[20px] font-semibold text-[#333333] font-poppins border-b-2 border-[#DFE7EF]">
              Skills
            </h1>
            {isEditing ? (
              tutor.skills.map((skill, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    className="bg-white text-sm my-2 outline-none w-full p-2 rounded-lg"
                    value={skill}
                    onChange={(e) =>
                      handleFieldChange("skills", index, e.target.value)
                    }
                  />
                  <IoTrashOutline
                    className="text-red-600 cursor-pointer"
                    onClick={() => handleDeleteField("skills", index)}
                  />
                </div>
              ))
            ) : (
              <ul className="list-disc pl-5 text-sm">
                {tutor.skills.length ? (
                  tutor.skills.map((skill, index) => (
                    <li key={index} className="text-[#454545]">
                      {skill}
                    </li>
                  ))
                ) : (
                  <li className="text-[#454545]">No information provided.</li>
                )}
              </ul>
            )}
            {isEditing && (
              <div className="mt-4 flex items-center gap-2">
                <button
                  className="text-green-600 text-sm flex items-center"
                  onClick={() => handleAdd("skills")}
                >
                  <IoAddCircleOutline /> Add Skill
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex w-full justify-center items-center gap-2 flex-wrap">
          <div className="w-full md:w-[20%] flex justify-between gap-2 flex-wrap">
            <p className="text-[15px] text-[#666666] font-semibold">PROJECTS</p>
            <FaArrowCircleRight className="text-xl" />
          </div>
          <div className="w-full md:w-[75%] p-5 rounded-lg bg-[#E5F0FC]">
            <h1 className="text-[20px] font-semibold text-[#333333] font-poppins border-b-2 border-[#DFE7EF]">
              Projects
            </h1>
            {isEditing ? (
              tutor.projects.map((project, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    className="bg-white text-sm my-2 outline-none w-full p-2 rounded-lg"
                    value={project}
                    onChange={(e) =>
                      handleFieldChange("projects", index, e.target.value)
                    }
                  />
                  <IoTrashOutline
                    className="text-red-600 cursor-pointer"
                    onClick={() => handleDeleteField("projects", index)}
                  />
                </div>
              ))
            ) : (
              <ul className="list-disc pl-5 text-sm">
                {tutor.projects.length ? (
                  tutor.projects.map((project, index) => (
                    <li key={index} className="text-[#454545]">
                      {project}
                    </li>
                  ))
                ) : (
                  <li className="text-[#454545]">No information provided.</li>
                )}
              </ul>
            )}
            {isEditing && (
              <div className="mt-4 flex items-center gap-2">
                <button
                  className="text-green-600 text-sm flex items-center"
                  onClick={() => handleAdd("projects")}
                >
                  <IoAddCircleOutline /> Add Project
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex w-full justify-center items-center gap-2 flex-wrap">
          <div className="w-full md:w-[20%] flex justify-between gap-2 flex-wrap">
            <p className="text-[15px] text-[#666666] font-semibold">AWARDS</p>
            <FaArrowCircleRight className="text-xl" />
          </div>
          <div className="w-full md:w-[75%] p-5 rounded-lg bg-[#E5F0FC]">
            <h1 className="text-[20px] font-semibold text-[#333333] font-poppins border-b-2 border-[#DFE7EF]">
              Awards
            </h1>
            {isEditing ? (
              tutor.awards.map((award, index) => (
                <div key={award._id} className="flex items-center gap-2">
                  <input
                    type="text"
                    className="bg-white text-xs  my-2 outline-none w-full p-2 rounded-lg"
                    value={award.title}
                    onChange={(e) =>
                      handleFieldChange("awards", index, e.target.value)
                    }
                  />
                  <IoTrashOutline
                    className="text-red-600 cursor-pointer"
                    onClick={() => handleDeleteField("awards", index)}
                  />
                </div>
              ))
            ) : (
              <ul className="list-disc pl-5 text-sm">
                {tutor.awards.length ? (
                  tutor.awards.map((award) => (
                    <li key={award._id} className="text-[#454545]">
                      {award.title}
                    </li>
                  ))
                ) : (
                  <li className="text-[#454545]">No information provided.</li>
                )}
              </ul>
            )}
            {isEditing && (
              <div className="mt-4 flex items-center gap-2">
                <button
                  className="text-green-600 text-sm flex items-center"
                  onClick={() => handleAdd("awards")}
                >
                  <IoAddCircleOutline /> Add Award
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex w-full justify-center items-center gap-2 flex-wrap">
          <div className="w-full md:w-[20%] flex justify-between gap-2 flex-wrap">
            <p className="text-[15px] text-[#666666] font-semibold">
              EXPERIENCE
            </p>
            <FaArrowCircleRight className="text-xl" />
          </div>
          <div className="w-full md:w-[75%] p-5 rounded-lg bg-[#E5F0FC]">
            <h1 className="text-[20px] font-semibold text-[#333333] font-poppins border-b-2 border-[#DFE7EF]">
              Experience
            </h1>
            {isEditing ? (
              <textarea
                className="bg-white text-sm outline-none w-full p-2 rounded-lg"
                rows={5}
                value={tutor.experience}
                onChange={(e) => handleChange(e)}
                name="experience"
              />
            ) : (
              <p className="text-sm text-[#454545]">
                {tutor.experience || "No information provided."}
              </p>
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default TutorDetails;
