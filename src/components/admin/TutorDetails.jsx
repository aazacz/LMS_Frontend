import axios from "axios";
import React, { useState, useEffect } from "react";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { useParams } from "react-router-dom";
import profile from "/profile.jpeg";
import { LuPhone } from "react-icons/lu";
import { CiMail } from "react-icons/ci";
import { IoTrashOutline, IoAdd } from "react-icons/io5";

const SideBar = ({ link, title }) => {
  const sideDetails = [
    "ABOUT ME",
    "FILE UPLOADS",
    "MY COURSES",
    "WORK EXPERIENCES",
    "Education Details",
    "SKILLS",
    "PROJECTS",
    "AWARDS & RECOGNITIONS",
  ];

  return (
    <div className="w-full mx-auto px-5 py-8  ">
      {sideDetails.map((value, index) => {
        return (
          <div className="flex justify-between py-3" key={index}>
            <div className="flex items-center gap-3">
              <a
                className="font-poppins uppercase text-sm text-gray-500 "
                href="#"
              >
                {value}
              </a>
            </div>
            <span className="icon">
              <FaArrowAltCircleRight className=" text-black" />
            </span>
          </div>
        );
      })}
    </div>
  );
};

const TutorDetails = () => {
  const baseURL = process.env.REACT_APP_API_URL;
  const [editMode, setEditMode] = useState(false);
  const { tutorId } = useParams();
  const [tutor, setTutor] = useState();

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
  }, [tutorId]);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleInputChange = (e, field) => {
    const value = e.target.value;
    if (field.includes(".")) {
      const fields = field.split(".");
      setTutor((prevTutor) => ({
        ...prevTutor,
        [fields[0]]: {
          ...prevTutor[fields[0]],
          [fields[1]]: value,
        },
      }));
    } else {
      setTutor({ ...tutor, [field]: value });
    }
  };

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    setTutor((prevTutor) => ({
      ...prevTutor,
      [field]: file,
    }));
  };

  const handleSaveChanges = () => {
    // Implement saving changes logic here
    setEditMode(false);
  };

  const handleAddEducation = () => {
    setTutor((prevTutor) => ({
      ...prevTutor,
      educations: [...prevTutor.educations, { title: "", path: "" }],
    }));
  };

  const handleAddAward = () => {
    setTutor((prevTutor) => ({
      ...prevTutor,
      awards: [...prevTutor.awards, { title: "", path: "" }],
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here
  };

  return (
    <div className="px-5 w-full flex flex-col overflow-y-hidden">
      <div className="w-full h-30 p-3 flex m-2 bg-[#F4F6F7]">
        <div className="w-[10%] ">
          <img
            src={profile}
            className="border-2 rounded-full w-20 h-20"
            alt=""
          />
        </div>
        <div className="w-[90%]">
          <h1 className="text-2xl font-poppins capitalize">
            {tutor ? tutor.name : ""}
          </h1>
          <h1 className="text-sm text-[#999999] font-poppins capitalize">
            {tutor?.tutorAddress?.city}, {tutor?.tutorAddress?.country}
          </h1>
          <div className="flex gap-6">
            <span className="text-sm text-[#454545] font-poppins capitalize flex items-center gap-x-2">
              <LuPhone /> {tutor?.number}
            </span>
          </div>
          <span className="text-sm text-[#454545] font-poppins capitalize flex items-center gap-x-2">
            <CiMail /> {tutor ? tutor.email : ""}
          </span>
        </div>
        <button
          className="h-10 px-6 rounded-lg bg-blue-800 text-white"
          onClick={handleEditClick}
        >
          Edit
        </button>
      </div>

      <div className="w-full flex flex-1">
        <div className="w-[25%] ">
          <SideBar />
        </div>

        <div className="flex-1 w-[90%] h-full">
          <form onSubmit={handleSubmit} className="flex flex-col gap-y-4 overflow-y-scroll no-scrollbar">
            <div className="p-5 rounded-md bg-blue-100">
              <h1 className="text-lg font-semibold text-[#333333] font-poppins">
                About Tutor
              </h1>
              <div className="mt-5">
                {editMode ? (
                  <textarea
                    className="w-full font-poppins text-[#454545] text-xs bg-white px-3 py-2 rounded-md border border-gray-300 focus:outline-none"
                    value={tutor ? tutor.about : ""}
                    onChange={(e) => handleInputChange(e, "about")}
                  />
                ) : (
                  <p className="font-poppins text-[#454545] text-xs">
                    {tutor?.about ||
                      "Passionate about teaching and have the expertise in your subject knowledge, then look no further. Invensis Learning invites trainers and SMEs with relevant domain expertise and certifications to meet our training requirements worldwide. By joining as a trainer with Invensis Learning, you will be able to share your knowledge, connect with professionals across various backgrounds, enrich careers, and embark on a rewarding training journey."}
                  </p>
                )}
              </div>
            </div>

            <div className="p-5 bg-blue-100">
              <h1 className="text-lg font-semibold text-[#333333] font-poppins">
                File Uploads
              </h1>

              <div className="mt-4">
                <h1 className="text-[14px] text-[#333333] font-poppins">
                  Upload Resume / CV *
                </h1>

                <div className="w-full px-3 bg-white h-8 mt-2 flex justify-between items-center">
                  {editMode ? (
                    <input
                      type="file"
                      className="w-full px-3 py-2 bg-white rounded-md border border-gray-300 focus:outline-none"
                      onChange={(e) => handleFileChange(e, "cv")}
                    />
                  ) : (
                    <h1 className="text-[#333333] text-xs font-poppins font-semibold">
                      {tutor && tutor.cv ? tutor.cv.name : "No File Uploaded"}
                    </h1>
                  )}
                  <div className="w-7 h-7 flex items-center justify-center bg-red-200 text-red-700">
                    <IoTrashOutline className="text-red-600" />
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <h1 className="text-[14px] text-[#333333] font-poppins">
                  Skills *
                </h1>

                <div className="w-full px-3 bg-white h-8 mt-2 flex justify-between items-center">
                  {editMode ? (
                    <input
                      type="text"
                      className="w-full px-3 py-2 bg-white rounded-md border border-gray-300 focus:outline-none"
                      value={
                        tutor && Array.isArray(tutor.skills)
                          ? tutor.skills.join(", ")
                          : ""
                      }
                      onChange={(e) => handleInputChange(e, "skills")}
                    />
                  ) : (
                    <h1 className="text-[#333333] text-xs font-poppins font-semibold">
                      {tutor && Array.isArray(tutor.skills) && tutor.skills.length > 0
                        ? tutor.skills.join(", ")
                        : "No Skills Uploaded"}
                    </h1>
                  )}
                  <div className="w-7 h-7 flex items-center justify-center bg-red-200 text-red-700">
                    <IoTrashOutline className="cursor-pointer text-red-600" />
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <h1 className="text-[14px] text-[#333333] font-poppins">
                  Education
                </h1>

                {editMode ? (
                  <div>
                    {tutor?.educations?.map((education, index) => (
                      <div
                        key={index}
                        className="w-full px-3 bg-white h-8 mt-2 flex justify-between items-center"
                      >
                        <input
                          type="file"
                          className="w-full px-3 py-2 bg-white rounded-md border border-gray-300 focus:outline-none"
                          onChange={(e) =>
                            handleFileChange(e, `educations.${index}.path`)
                          }
                        />
                        <input
                          type="text"
                          className="w-full px-3 py-2 bg-white rounded-md border border-gray-300 focus:outline-none"
                          value={education.title}
                          onChange={(e) =>
                            handleInputChange(e, `educations.${index}.title`)
                          }
                        />
                        <div className="w-7 h-7 flex items-center justify-center bg-red-200 text-red-700">
                          <IoTrashOutline className="text-red-600" />
                        </div>
                      </div>
                    ))}
                    <button
                      type="button"
                      className="h-10 px-6 mt-4 rounded-lg bg-blue-800 text-white flex items-center justify-center"
                      onClick={handleAddEducation}
                    >
                      <IoAdd className="text-white" />
                    </button>
                  </div>
                ) : (
                  <div>
                    {tutor?.educations?.length > 0 ? (
                      tutor.educations.map((education, index) => (
                        <div
                          key={index}
                          className="w-full px-3 bg-white h-8 mt-2 flex justify-between items-center"
                        >
                          <h1 className="text-[#333333] text-xs font-poppins font-semibold">
                            {education.title} - {education.path}
                          </h1>
                          <div className="w-7 h-7 flex items-center justify-center bg-red-200 text-red-700">
                            <IoTrashOutline className="cursor-pointer text-red-600" />
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-[#333333] text-xs font-poppins font-semibold">
                        No Education Uploaded
                      </p>
                    )}
                  </div>
                )}
              </div>

              <div className="mt-4">
                <h1 className="text-[14px] text-[#333333] font-poppins">
                  Awards
                </h1>

                {editMode ? (
                  <div>
                    {tutor?.awards?.map((award, index) => (
                      <div
                        key={index}
                        className="w-full px-3 bg-white h-8 mt-2 flex justify-between items-center"
                      >
                        <input
                          type="text"
                          className="w-full px-3 py-2 bg-white rounded-md border border-gray-300 focus:outline-none"
                          value={award.title}
                          onChange={(e) =>
                            handleInputChange(e, `awards.${index}.title`)
                          }
                        />
                        <div className="w-7 h-7 flex items-center justify-center bg-red-200 text-red-700">
                          <IoTrashOutline className="text-red-600" />
                        </div>
                      </div>
                    ))}
                    <button
                      type="button"
                      className="h-10 px-6 mt-4 rounded-lg bg-blue-800 text-white flex items-center justify-center"
                      onClick={handleAddAward}
                    >
                      <IoAdd className="text-white" />
                    </button>
                  </div>
                ) : (
                  <div>
                    {tutor?.awards?.length > 0 ? (
                      tutor.awards.map((award, index) => (
                        <div
                          key={index}
                          className="w-full px-3 bg-white h-8 mt-2 flex justify-between items-center"
                        >
                          <h1 className="text-[#333333] text-xs font-poppins font-semibold">
                            {award.title} - {award.path}
                          </h1>
                          <div className="w-7 h-7 flex items-center justify-center bg-red-200 text-red-700">
                            <IoTrashOutline className="cursor-pointer text-red-600" />
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-[#333333] text-xs font-poppins font-semibold">
                        No Awards Uploaded
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="p-5 bg-blue-100">
              <h1 className="text-lg font-semibold text-[#333333] font-poppins">
                Skills
              </h1>
              <div className="text-[#333333] text-xs font-poppins font-semibold">
                {editMode ? (
                  <input
                    type="text"
                    className="w-full px-3 py-2 bg-white rounded-md border border-gray-300 focus:outline-none"
                    value={
                      tutor && Array.isArray(tutor.skills)
                        ? tutor.skills.join(", ")
                        : ""
                    }
                    onChange={(e) => handleInputChange(e, "skills")}
                  />
                ) : (
                  <h1 className="text-[#333333] text-xs font-poppins font-semibold">
                    {tutor && Array.isArray(tutor.skills) && tutor.skills.length > 0
                      ? tutor.skills.join(", ")
                      : "No Skills Uploaded"}
                  </h1>
                )}
              </div>
            </div>

            <div className="p-5 bg-blue-100">
              <h1 className="text-lg font-semibold text-[#333333] font-poppins">
                Projects
              </h1>
              <div className="text-[#333333] text-xs font-poppins font-semibold">
                {editMode ? (
                  <input
                    type="text"
                    className="w-full px-3 py-2 bg-white rounded-md border border-gray-300 focus:outline-none"
                    value={
                      tutor && Array.isArray(tutor.projects)
                        ? tutor.projects.join(", ")
                        : ""
                    }
                    onChange={(e) => handleInputChange(e, "projects")}
                  />
                ) : (
                  <h1 className="text-[#333333] text-xs font-poppins font-semibold">
                    {tutor && Array.isArray(tutor.projects) && tutor.projects.length > 0
                      ? tutor.projects.join(", ")
                      : "No Projects Uploaded"}
                  </h1>
                )}
              </div>
            </div>

            {editMode && (
              <button
                type="submit"
                className="h-10 px-6 rounded-lg mt-4 bg-green-800 text-white"
                onClick={handleSaveChanges}
              >
                Save Changes
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default TutorDetails;
