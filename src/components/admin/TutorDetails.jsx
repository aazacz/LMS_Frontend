import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import profile from "../../assets/Admin/profile.jpeg";
import { LuPhone } from "react-icons/lu";
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
    education: [],
    awards: [],
    skills: [],
    projects: [],
    experience: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [cvFile, setCvFile] = useState(null);
  const [identityFile, setIdentityFile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${baseURL}api/tutor/single-tutor/${tutorId}`)
      .then((res) => {
        setTutor({
          name: res.data.name || "",
          email: res.data.email || "",
          role: res.data.role || "",
          password: res.data.password || "",
          number: res.data.number || "",
          experience: res.data.experience || "",
          cv: res.data.cv || "",
          education: res.data.educations || [],
          skills: res.data.skills || [],
          projects: res.data.projects || [],
          awards: res.data.awards || [],
          status: res.data.status || "",
          reviews: res.data.reviews || [],
        });
        console.log(res.data);
      })
      .catch((error) => {
        console.error("Error fetching tutor details:", error);
      });
  }, [baseURL, tutorId]);

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
    if (name === "cv") setCvFile(file);
    if (name === "identityProof") setIdentityFile(file);
  };

  const handleDelete = (field) => {
    setTutor((prevTutor) => ({
      ...prevTutor,
      [field]: "",
    }));
  };

  const handleAdd = (field) => {
    setTutor((prevTutor) => ({
      ...prevTutor,
      [field]: [...prevTutor[field], ""],
    }));
  };

  const handleFieldChange = (field, index, value) => {
    const updatedField = [...tutor[field]];
    updatedField[index] = value;
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
          <h1 className="text-xs lg:text-sm text-[#999999] font-poppins capitalize">
            {tutor.tutorAddress.city}, {tutor.tutorAddress.country}
          </h1>
          <div className="flex gap-20">
            <span className="text-xs lg:text-sm text-[#454545] font-poppins flex items-center gap-x-2">
              <LuPhone /> {tutor.number}
            </span>
            <span className="text-xs lg:text-sm text-[#454545] font-poppins flex items-center gap-x-2">
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
        <div className="flex w-full justify-center items-center gap-2 flex-wrap">
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
                  className="bg-[white] text-xs outline-none w-full p-2 rounded-lg"
                  name="about"
                  rows={5}
                  value={tutor.about}
                  onChange={handleChange}
                />
              ) : (
                <p className="font-poppins text-[#454545] text-xs">
                  {tutor.about || "No information provided."}
                </p>
              )}
            </div>
          </div>
        </div>

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
              <h1 className="text-[14px] text-[#333333] font-poppins pb-2">
                Upload Resume / CV *
              </h1>
              <div className="flex justify-between items-center">
                {isEditing ? (
                  <input
                    type="file"
                    className="block w-full text-sm rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-white p-2"
                    name="cv"
                    onChange={handleFileChange}
                  />
                ) : (
                  <div className="flex items-center gap-2">
                    {tutor.cv ? (
                      <a
                        href={`${baseURL}${tutor.cv}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#333333] text-xs font-poppins font-semibold hover:underline"
                      >
                        View CV
                      </a>
                    ) : (
                      <span className="text-[#333333] text-xs font-poppins font-semibold">
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

              <h1 className="text-[14px] text-[#333333] font-poppins pb-2 mt-4">
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
                        className="text-[#333333] text-xs font-poppins font-semibold hover:underline"
                      >
                        View Identity Proof
                      </a>
                    ) : (
                      <span className="text-[#333333] text-xs font-poppins font-semibold">
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
              </div>
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
              tutor.education.map((edu, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    className="bg-white text-xs outline-none w-full p-2 rounded-lg"
                    value={edu}
                    onChange={(e) =>
                      handleFieldChange("education", index, e.target.value)
                    }
                  />
                  <IoTrashOutline
                    className="text-red-600 cursor-pointer"
                    onClick={() => handleDeleteField("education", index)}
                  />
                </div>
              ))
            ) : (
              <ul className="list-disc pl-5 text-xs">
                {tutor.education.length ? (
                  tutor.education.map((education, index) => (
                    <li key={index} className="text-[#454545]">
                      {education}
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
                  onClick={() => handleAdd("education")}
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
                    className="bg-white text-xs outline-none w-full p-2 rounded-lg"
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
              <ul className="list-disc pl-5 text-xs">
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
                    className="bg-white text-xs outline-none w-full p-2 rounded-lg"
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
              <ul className="list-disc pl-5 text-xs">
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
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    className="bg-white text-xs outline-none w-full p-2 rounded-lg"
                    value={award}
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
              <ul className="list-disc pl-5 text-xs">
                {tutor.awards.length ? (
                  tutor.awards.map((award, index) => (
                    <li key={index} className="text-[#454545]">
                      {award}
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
                className="bg-white text-xs outline-none w-full p-2 rounded-lg"
                rows={5}
                value={tutor.experience}
                onChange={(e) => handleChange(e)}
                name="experience"
              />
            ) : (
              <p className="text-xs text-[#454545]">
                {tutor.experience || "No information provided."}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorDetails;
