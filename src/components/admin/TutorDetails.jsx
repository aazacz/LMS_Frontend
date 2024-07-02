import axios from "axios";
import React, { useState, useEffect } from "react";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { useParams } from "react-router-dom";
import profile from "/profile.jpeg";
import { LuPhone } from "react-icons/lu";
import { CiMail } from "react-icons/ci";
import { IoTrashOutline, IoAddCircleOutline } from "react-icons/io5";

const TutorDetails = () => {
  const baseURL = process.env.REACT_APP_API_URL;
  const { tutorId } = useParams();
  const [tutor, setTutor] = useState({
    name: "",
    tutorAddress: { city: "", country: "" },
    number: "",
    email: "",
    about: "",
    cv: "",
    education: [],
    awards: [],
    skills: [],
    projects: [],
  });
  const [isEditing, setIsEditing] = useState(false);
  const [cvFile, setCvFile] = useState(); // State to store selected file

  useEffect(() => {
    axios
      .get(`${baseURL}api/tutor/single-tutor/${tutorId}`)
      .then((res) => {
        console.log(res.data);
        setTutor(res.data);
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
    const file = e.target.files[1];
    setCvFile(file);
  };

  const handleDelete = (field, index) => {
    setTutor((prevTutor) => {
      const updatedField = [...prevTutor[field]];
      updatedField.splice(index, 1);
      return {
        ...prevTutor,
        [field]: updatedField,
      };
    });
  };

  const handleAdd = (field) => {
    setTutor((prevTutor) => ({
      ...prevTutor,
      [field]: [...prevTutor[field], ""],
    }));
  };

  return (
    <>
      <div className="p-2 w-full font-poppins">
        <div className="w-full h-30 p-2 flex">
          <div className="w-[40%] md:w-[15%] lg:w-[10%] justify-center items-center flex">
            <img
              src={profile}
              className="border-2 rounded-full w-15 md:w-20  h-15 md:h-20 "
              alt=""
            />
          </div>
          <div className="w-[90%] ml-1">
            <h1 className="text-base md:text-lg lg:text-2xl font-poppins capitalize">{tutor.name}</h1>
            <h1 className="text-xs lg:text-sm text-[#999999] font-poppins capitalize">
              {tutor.tutorAddress.city}, {tutor.tutorAddress.country}
            </h1>
            <div className="flex gap-6">
              <span className="text-xs lg:text-sm text-[#454545] font-poppins flex items-center gap-x-2">
                <LuPhone /> {tutor.number}
              </span>
            </div>
            <span className="text-xs lg:text-sm text-[#454545] font-poppins flex items-center gap-x-2">
              <CiMail /> {tutor.email}
            </span>
          </div>
        </div>

        {/* Edit Button */}
        <div className="w-full flex justify-end p-5">
          <button
            className="bg-blue-500 text-white px-4 py-2 text-sm md:text-lg rounded"
            onClick={handleEditClick}
          >
            {isEditing ? "Save" : "Edit"}
          </button>
        </div>

        {/* Right Side */}
        <div className="flex flex-col gap-y-4 overflow-y-scroll no-scrollbar w-full">
          <div className="flex w-full justify-center items-center gap-2 flex-wrap">
            <div className="w-full md:w-[20%] flex justify-between p-2 gap-2 flex-wrap">
              <p className="text-base lg:text-lg font-semibold ">About</p>
              <FaArrowAltCircleRight className="text-xl lg:text-4xl" />
            </div>
            <div className="w-full md:w-[75%] p-5 rounded-md bg-[#E5F0FC]">
              <h1 className="text-base lg:text-lg font-semibold text-[#333333] font-poppins border-b-2 border-[#DFE7EF]">
                About Tutor
              </h1>
              <div className="mt-5">
                {isEditing ? (
                  <textarea
                    className="bg-[#E5F0FC] text-xs outline-none w-full p-2 "
                    name="about"
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
          <div className="flex w-full justify-center items-center gap-2 flex-wrap">
            <div className="w-full md:w-[20%] flex justify-between p-2 gap-2 flex-wrap">
              <p className="text-base lg:text-lg font-semibold">File Uploads</p>
              <FaArrowAltCircleRight className="text-xl lg:text-4xl" />
            </div>
            <div className="w-full md:w-[75%] p-5 rounded-lg bg-[#E5F0FC]">
              <h1 className="text-base lg:text-lg font-semibold text-[#333333]  border-b-2 border-[#DFE7EF]">
                File Uploads
              </h1>
              <div className="mt-4">
                <h1 className="text-[14px] text-[#333333] font-poppins">
                  Upload Resume / CV *
                </h1>
                <div className="flex justify-between items-center">
                  {isEditing ? (
                    <input
                      type="file"
                      className="block w-full text-sm rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-white "
                      name="cv"
                      // className="w-full px-3 bg-white rounded-lg h-8 mt-2 flex justify-between items-center"
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
                          onClick={() => handleDelete("cv", 0)}
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
          <div className="flex w-full justify-center items-center gap-2 flex-wrap">
            <div className="w-full md:w-[20%] flex justify-between p-2 gap-2 flex-wrap">
              <p className="text-base lg:text-lg font-semibold ">Experience</p>
              <FaArrowAltCircleRight className="text-xl lg:text-4xl" />
            </div>
            <div className="w-full md:w-[75%] p-5 rounded-lg bg-[#E5F0FC]">
              <h1 className="text-base lg:text-lg font-semibold text-[#333333] font-poppins  border-b-2 border-[#DFE7EF]">
                Experience
              </h1>
              <div className="mt-4">
                <div className="w-full px-3 bg-white rounded-lg h-8 mt-2 flex justify-between items-center">
                  {isEditing ? (
                    <input
                      type="text"
                      className="outline-none w-full"
                      name="experience"
                      value={tutor.experience}
                      onChange={handleChange}
                    />
                  ) : (
                    <h1 className="text-[#333333] text-xs font-poppins font-semibold">
                      {tutor.experience || "No Experience Uploaded"}
                    </h1>
                  )}
                  {isEditing && tutor.experience && (
                    <div
                      className="w-7 h-7 flex items-center justify-center bg-red-200 text-red-700 cursor-pointer"
                      onClick={() => handleDelete("experience", 0)}
                    >
                      <IoTrashOutline className="text-red-600" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="flex w-full justify-center items-center gap-2 flex-wrap">
            <div className="w-full md:w-[20%] flex justify-between p-2 gap-2 flex-wrap">
              <p className="text-base lg:text-lg font-semibold">Skills</p>
              <FaArrowAltCircleRight className="text-xl lg:text-4xl" />
            </div>
            <div className="w-full md:w-[75%] p-5 rounded-lg bg-[#E5F0FC]">
              <h1 className="text-base lg:text-lg font-semibold text-[#333333] font-poppins  border-b-2 border-[#DFE7EF]">
                Skills
              </h1>
              <div className="mt-4 flex flex-wrap gap-4">
                {tutor.skills.length > 0 ? (
                  tutor.skills.map((skill, index) => (
                    <div
                      key={index}
                      className="w-full md:w-[45%] lg:w-[48%] px-3 rounded-lg bg-white h-8 mt-2 flex justify-between items-center"
                    >
                      {isEditing ? (
                        <input
                          type="text"
                          className="outline-none w-full"
                          name="skills"
                          value={skill}
                          onChange={(e) => {
                            const updatedSkills = [...tutor.skills];
                            updatedSkills[index] = e.target.value;
                            setTutor((prevTutor) => ({
                              ...prevTutor,
                              skills: updatedSkills,
                            }));
                          }}
                        />
                      ) : (
                        <h1 className="text-[#333333] text-xs font-poppins font-semibold">
                          {skill}
                        </h1>
                      )}
                      {isEditing && (
                        <div
                          className="w-7 h-7 flex items-center justify-center bg-red-200 text-red-700 cursor-pointer"
                          onClick={() => handleDelete("skills", index)}
                        >
                          <IoTrashOutline className="text-red-600" />
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <h1 className="text-[#333333] text-xs font-poppins font-semibold">
                    No Skills Uploaded
                  </h1>
                )}
                {isEditing && (
                  <div
                    className="w-full md:w-[40%] lg:w-[45%] px-3 rounded-lg bg-white h-8 mt-2 flex justify-center items-center cursor-pointer"
                    onClick={() => handleAdd("skills")}
                  >
                    <IoAddCircleOutline className="text-green-500 mr-2" />
                    <span className="text-green-500">Add Skill</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex w-full justify-center items-center gap-2 flex-wrap">
            <div className="w-full md:w-[20%] flex justify-between p-2 gap-2 flex-wrap">
              <p className="text-base lg:text-lg font-semibold">Projects</p>
              <FaArrowAltCircleRight className="text-xl lg:text-4xl" />
            </div>
            <div className="p-5 w-full md:w-[75%] rounded-lg bg-[#E5F0FC]">
              <h1 className="text-base lg:text-lg font-semibold text-[#333333] font-poppins  border-b-2 border-[#DFE7EF]">
                Projects
              </h1>
              <div className="mt-4">
                {tutor.projects.length > 0 ? (
                  tutor.projects.map((project, index) => (
                    <div
                      key={index}
                      className="w-full px-3 rounded-lg bg-white h-8 mt-2 flex justify-between items-center"
                    >
                      {isEditing ? (
                        <input
                          type="text"
                          className="outline-none w-full"
                          name="projects"
                          value={project}
                          onChange={(e) => {
                            const updatedProjects = [...tutor.projects];
                            updatedProjects[index] = e.target.value;
                            setTutor((prevTutor) => ({
                              ...prevTutor,
                              projects: updatedProjects,
                            }));
                          }}
                        />
                      ) : (
                        <h1 className="text-[#333333] text-xs font-poppins font-semibold">
                          {project}
                        </h1>
                      )}
                      {isEditing && (
                        <div
                          className="w-7 h-7 flex items-center justify-center bg-red-200 text-red-700 cursor-pointer"
                          onClick={() => handleDelete("projects", index)}
                        >
                          <IoTrashOutline className="text-red-600" />
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <h1 className="text-[#333333] text-xs font-poppins font-semibold">
                    No Projects Uploaded
                  </h1>
                )}
                {isEditing && (
                  <div
                    className="w-full px-3 rounded-lg bg-white h-8 mt-2 flex justify-center items-center cursor-pointer"
                    onClick={() => handleAdd("projects")}
                  >
                    <IoAddCircleOutline className="text-green-500 mr-2" />
                    <span className="text-green-500">Add Project</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex w-full justify-center items-center gap-2 flex-wrap">
            <div className="w-full md:w-[20%] flex justify-between p-2 gap-2 flex-wrap">
              <p className="text-base lg:text-lg font-semibold">Awards</p>
              <FaArrowAltCircleRight className="text-xl lg:text-4xl" />
            </div>
            <div className="w-full md:w-[75%] p-5 rounded-lg bg-[#E5F0FC]">
              <h1 className="text-base lg:text-lg font-semibold text-[#333333] font-poppins  border-b-2 border-[#DFE7EF]">
                Awards
              </h1>
              <div className="mt-4">
                {tutor.awards.length > 0 ? (
                  tutor.awards.map((award, index) => (
                    <div
                      key={index}
                      className="w-full px-3 rounded-lg bg-white h-8 mt-2 flex justify-between items-center"
                    >
                      {isEditing ? (
                        <input
                          type="text"
                          className="outline-none w-full"
                          name="awards"
                          value={award}
                          onChange={(e) => {
                            const updatedAwards = [...tutor.awards];
                            updatedAwards[index] = e.target.value;
                            setTutor((prevTutor) => ({
                              ...prevTutor,
                              awards: updatedAwards,
                            }));
                          }}
                        />
                      ) : (
                        <h1 className="text-[#333333] text-xs font-poppins font-semibold">
                          {award}
                        </h1>
                      )}
                      {isEditing && (
                        <div
                          className="w-7 h-7 flex items-center justify-center bg-red-200 text-red-700 cursor-pointer"
                          onClick={() => handleDelete("awards", index)}
                        >
                          <IoTrashOutline className="text-red-600" />
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <h1 className="text-[#333333] text-xs font-poppins font-semibold">
                    No Awards Uploaded
                  </h1>
                )}
                {isEditing && (
                  <div
                    className="w-full px-3 rounded-lg bg-white h-8 mt-2 flex justify-center items-center cursor-pointer"
                    onClick={() => handleAdd("awards")}
                  >
                    <IoAddCircleOutline className="text-green-500 mr-2" />
                    <span className="text-green-500">Add Award</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TutorDetails;
