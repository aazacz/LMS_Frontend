import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import profile from "/profile.jpeg";
import { LuPhone } from "react-icons/lu";
import { CiMail } from "react-icons/ci";
import { IoTrashOutline, IoAddCircleOutline } from "react-icons/io5";
import { FaArrowCircleRight } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { FaSave } from "react-icons/fa";

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

  useEffect(() => {
    console.log(tutor)
    axios
      .get(`${baseURL}api/tutor/single-tutor/${tutorId}`)
      .then((res) => {
        setTutor({
          ...res.data,
          courses: res.data.courses || [],
          education: res.data.education || [],
          experience: res.data.experience || "",
          awards: res.data.awards || [],
          skills: res.data.skills || [],
          projects: res.data.projects || [],
        });
      })
      .catch((error) => {
        console.error("Error fetching tutor details:", error);
      });
  }, [baseURL, tutorId]);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
    // Save functionality can be added here if needed
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

  const handleDelete = (field, index) => {
    setTutor((prevTutor) => {
      if (field === "cv") return { ...prevTutor, cv: "" };
      if (field === "identityProof") return { ...prevTutor, identityProof: "" };

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
    <div className="p-2 w-full font-poppins">
      <div className="w-full  bg-[#F4F6F7] h-30 p-2 flex">
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
      <div className="w-full  items-end p-2">
        <div className="justify-end flex">
        <button
          className=" text-black px-6 py-2 md:text-lg rounded text-base"
          onClick={handleEditClick}
        >
          {isEditing ? <FaSave /> : <FaEdit />}
        </button>
        </div>
      </div>

      {/* About Section */}
      <div className="flex flex-col gap-y-4 overflow-y-scroll no-scrollbar w-full">
        <div className="flex w-full  justify-center items-center gap-2 flex-wrap">
          <div className="w-full  md:w-[20%] flex justify-between flex-wrap">
            <p className="text-[15px] text-[#666666] font-semibold">ABOUT ME</p>
            <FaArrowCircleRight className="text-xl" />
          </div>
          <div className="w-full  md:w-[75%] p-5 rounded-md bg-[#E5F0FC]">
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
          <div className="w-full  md:w-[20%] flex justify-between gap-2 flex-wrap">
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
                Upload National Identity Proof *
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

        {/* My Courses Section */}
        <div className="flex w-full justify-center items-center gap-2 flex-wrap">
          <div className="w-full  md:w-[20%] flex justify-between gap-2 flex-wrap">
            <p className="text-[15px] text-[#666666] font-semibold">
              MY COURSES
            </p>
            <FaArrowCircleRight className="text-xl" />
          </div>
          <div className="w-full md:w-[75%] p-5 rounded-lg bg-[#E5F0FC]">
            <h1 className="text-[20px] font-semibold text-[#333333] font-poppins border-b-2 border-[#DFE7EF]">
              Course Details
            </h1>
            <div className="mt-4">
              {isEditing ? (
                <div>
                  {tutor.courses.map((cour, index) => (
                    <div key={index} className="flex items-center gap-2 mb-2">
                      <input
                        type="text"
                        className="w-full bg-white text-xs outline-none p-2 rounded-lg"
                        name={`courses-${index}`}
                        value={cour}
                        onChange={(e) =>
                          setTutor((prevTutor) => {
                            const updatedCourses = [...prevTutor.courses];
                            updatedCourses[index] = e.target.value;
                            return { ...prevTutor, courses: updatedCourses };
                          })
                        }
                      />
                      <IoTrashOutline
                        className="text-red-600 cursor-pointer"
                        onClick={() => handleDelete("courses", index)}
                      />
                    </div>
                  ))}
                  <button
                    className="text-blue-500 text-xs mt-2 flex items-center gap-1"
                    onClick={() => handleAdd("courses")}
                  >
                    <IoAddCircleOutline /> Add Courses
                  </button>
                </div>
              ) : (
                <ul className="list-disc ml-5 text-xs text-[#454545] font-poppins">
                  {tutor.courses.length > 0 ? (
                    tutor.courses.map((cour, index) => (
                      <li key={index}>{cour}</li>
                    ))
                  ) : (
                    <li>No Course Details Provided.</li>
                  )}
                </ul>
              )}
            </div>
          </div>
        </div>


        {/* Experience Section */}
        {/* <div className="flex w-full justify-center items-center gap-2 flex-wrap">
          <div className="w-full border-2 border-pink-600 md:w-[20%] flex justify-between gap-2 flex-wrap">
            <p className="text-[15px] text-[#666666] font-semibold">WORK EXPERIENCE</p>
            <FaArrowAltCircleRight className="text-xl" />
          </div>
          <div className="w-full md:w-[75%] p-5 rounded-lg bg-[#E5F0FC]">
            <h1 className="text-[20px] font-semibold text-[#333333] font-poppins border-b-2 border-[#DFE7EF]">
              Experience Details
            </h1>
            <div className="mt-4">
              {isEditing ? (
                <div>
                  {tutor.experience.map((exp, index) => (
                    <div key={index} className="flex items-center gap-2 mb-2">
                      <input
                        type="text"
                        className="w-full bg-white text-xs outline-none p-2 rounded-lg"
                        name={`experience-${index}`}
                        value={exp}
                        onChange={(e) =>
                          setTutor((prevTutor) => {
                            const updatedExperience = [...prevTutor.experience];
                            updatedExperience[index] = e.target.value;
                            return { ...prevTutor, experiences: updatedExperience };
                          })
                        }
                      />
                      <IoTrashOutline
                        className="text-red-600 cursor-pointer"
                        onClick={() => handleDelete("experience", index)}
                      />
                    </div>
                  ))}
                  <button
                    className="text-blue-500 text-xs mt-2 flex items-center gap-1"
                    onClick={() => handleAdd("experience")}
                  >
                    <IoAddCircleOutline /> Add Experience
                  </button>
                </div>
              ) : (
                <ul className="list-disc ml-5 text-xs text-[#454545] font-poppins">
                  {tutor.experience.length > 0 ? (
                    tutor.experience.map((exp, index) => <li key={index}>{exp}</li>)
                  ) : (
                    <li>No Experience Details Provided.</li>
                  )}
                </ul>
              )}
            </div>
          </div>
        </div> */}

        {/* Education Section */}
        <div className="flex w-full justify-center items-center gap-2 flex-wrap">
          <div className="w-full  md:w-[20%] flex justify-between gap-2 flex-wrap">
            <p className="text-[15px] text-[#666666] font-semibold">
              EDUCATION
            </p>
            <FaArrowCircleRight className="text-xl" />
          </div>
          <div className="w-full md:w-[75%] p-5 rounded-lg bg-[#E5F0FC]">
            <h1 className="text-[20px] font-semibold text-[#333333] font-poppins border-b-2 border-[#DFE7EF]">
              Education Details
            </h1>
            <div className="mt-4">
              {isEditing ? (
                <div>
                  {tutor.education.map((edu, index) => (
                    <div key={index} className="flex items-center gap-2 mb-2">
                      <input
                        type="text"
                        className="w-full bg-white text-xs outline-none p-2 rounded-lg"
                        name={`education-${index}`}
                        value={edu}
                        onChange={(e) =>
                          setTutor((prevTutor) => {
                            const updatedEducation = [...prevTutor.education];
                            updatedEducation[index] = e.target.value;
                            return {
                              ...prevTutor,
                              education: updatedEducation,
                            };
                          })
                        }
                      />
                      <IoTrashOutline
                        className="text-red-600 cursor-pointer"
                        onClick={() => handleDelete("education", index)}
                      />
                    </div>
                  ))}
                  <button
                    className="text-blue-500 text-xs mt-2 flex items-center gap-1"
                    onClick={() => handleAdd("education")}
                  >
                    <IoAddCircleOutline /> Add Education
                  </button>
                </div>
              ) : (
                <ul className="list-disc ml-5 text-xs text-[#454545] font-poppins">
                  {tutor.education.length > 0 ? (
                    tutor.education.map((edu, index) => (
                      <li key={index}>{edu}</li>
                    ))
                  ) : (
                    <li>No Education Details Provided.</li>
                  )}
                </ul>
              )}
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="flex w-full justify-center items-center gap-2 flex-wrap">
          <div className="w-full  md:w-[20%] flex justify-between gap-2 flex-wrap">
            <p className="text-[15px] text-[#666666] font-semibold">SKILLS</p>
            <FaArrowCircleRight className="text-xl" />
          </div>
          <div className="w-full md:w-[75%] p-5 rounded-lg bg-[#E5F0FC]">
            <h1 className="text-[20px] font-semibold text-[#333333] font-poppins border-b-2 border-[#DFE7EF]">
              Skill Details
            </h1>
            <div className="mt-4">
              {isEditing ? (
                <div>
                  {tutor.skills.map((ski, index) => (
                    <div key={index} className="flex items-center gap-2 mb-2">
                      <input
                        type="text"
                        className="w-full bg-white text-xs outline-none p-2 rounded-lg"
                        name={`skills-${index}`}
                        value={ski}
                        onChange={(e) =>
                          setTutor((prevTutor) => {
                            const updatedSkills = [...prevTutor.skills];
                            updatedSkills[index] = e.target.value;
                            return { ...prevTutor, skills: updatedSkills };
                          })
                        }
                      />
                      <IoTrashOutline
                        className="text-red-600 cursor-pointer"
                        onClick={() => handleDelete("skills", index)}
                      />
                    </div>
                  ))}
                  <button
                    className="text-blue-500 text-xs mt-2 flex items-center gap-1"
                    onClick={() => handleAdd("skills")}
                  >
                    <IoAddCircleOutline /> Add Skills
                  </button>
                </div>
              ) : (
                <ul className="list-disc ml-5 text-xs text-[#454545] font-poppins">
                  {tutor.skills.length > 0 ? (
                    tutor.skills.map((ski, index) => <li key={index}>{ski}</li>)
                  ) : (
                    <li>No Skill Details Provided.</li>
                  )}
                </ul>
              )}
            </div>
          </div>
        </div>

        {/* Projects Section */}
        <div className="flex w-full justify-center items-center gap-2 flex-wrap">
          <div className="w-full  md:w-[20%] flex justify-between gap-2 flex-wrap">
            <p className="text-[15px] text-[#666666] font-semibold">PROJECTS</p>
            <FaArrowCircleRight className="text-xl" />
          </div>
          <div className="w-full md:w-[75%] p-5 rounded-lg bg-[#E5F0FC]">
            <h1 className="text-[20px] font-semibold text-[#333333] font-poppins border-b-2 border-[#DFE7EF]">
              Project Details
            </h1>
            <div className="mt-4">
              {isEditing ? (
                <div>
                  {tutor.projects.map((pro, index) => (
                    <div key={index} className="flex items-center gap-2 mb-2">
                      <input
                        type="text"
                        className="w-full bg-white text-xs outline-none p-2 rounded-lg"
                        name={`projects-${index}`}
                        value={pro}
                        onChange={(e) =>
                          setTutor((prevTutor) => {
                            const updatedProjects = [...prevTutor.projects];
                            updatedProjects[index] = e.target.value;
                            return { ...prevTutor, projects: updatedProjects };
                          })
                        }
                      />
                      <IoTrashOutline
                        className="text-red-600 cursor-pointer"
                        onClick={() => handleDelete("projects", index)}
                      />
                    </div>
                  ))}
                  <button
                    className="text-blue-500 text-xs mt-2 flex items-center gap-1"
                    onClick={() => handleAdd("projects")}
                  >
                    <IoAddCircleOutline /> Add Projects
                  </button>
                </div>
              ) : (
                <ul className="list-disc ml-5 text-xs text-[#454545] font-poppins">
                  {tutor.projects.length > 0 ? (
                    tutor.projects.map((pro, index) => (
                      <li key={index}>{pro}</li>
                    ))
                  ) : (
                    <li>No Project Details Provided.</li>
                  )}
                </ul>
              )}
            </div>
          </div>
        </div>

        {/* Awards Section */}
        <div className="flex w-full justify-center items-center gap-2 flex-wrap">
          <div className="w-full md:w-[20%] flex justify-between gap-2 flex-wrap">
            <p className="text-[15px] text-[#666666] font-semibold">AWARDS</p>
            <FaArrowCircleRight className="text-xl" />
          </div>
          <div className="w-full md:w-[75%] p-5 rounded-lg bg-[#E5F0FC]">
            <h1 className="text-[20px] font-semibold text-[#333333] font-poppins border-b-2 border-[#DFE7EF]">
              Award Details
            </h1>
            <div className="mt-4">
              {isEditing ? (
                <div>
                  {tutor.awards.map((awa, index) => (
                    <div key={index} className="flex items-center gap-2 mb-2">
                      <input
                        type="text"
                        className="w-full bg-white text-xs outline-none p-2 rounded-lg"
                        name={`awards-${index}`}
                        value={awa}
                        onChange={(e) =>
                          setTutor((prevTutor) => {
                            const updatedAwards = [...prevTutor.awards];
                            updatedAwards[index] = e.target.value;
                            return { ...prevTutor, projects: updatedAwards };
                          })
                        }
                      />
                      <IoTrashOutline
                        className="text-red-600 cursor-pointer"
                        onClick={() => handleDelete("awards", index)}
                      />
                    </div>
                  ))}
                  <button
                    className="text-blue-500 text-xs mt-2 flex items-center gap-1"
                    onClick={() => handleAdd("awards")}
                  >
                    <IoAddCircleOutline /> Add Awards
                  </button>
                </div>
              ) : (
                <ul className="list-disc ml-5 text-xs text-[#454545] font-poppins">
                  {tutor.awards.length > 0 ? (
                    tutor.awards.map((awa, index) => <li key={index}>{awa}</li>)
                  ) : (
                    <li>No Award Details Provided.</li>
                  )}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorDetails;
