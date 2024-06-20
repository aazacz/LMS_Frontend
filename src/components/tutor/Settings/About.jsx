import React, { useState } from "react";
import { VscEdit } from "react-icons/vsc";
import "./SettingsTutor.css"

const About = () => {
  const [isEditable, setIsEditable] = useState(false);
  const [aboutText, setAboutText] = useState(""); // State to store the About description

  // Function to handle the Edit button click
  const handleEditClick = () => {
    setIsEditable(!isEditable);
    // Pre-populate the textarea with the current aboutText
    setAboutText(document.querySelector('p.text-sm').textContent.trim()); // Assuming selector targets the paragraph
  };

  // Function to handle the Save button click
  const handleSaveClick = () => {
    setIsEditable(false); // Disable editing after saving
    // Implement logic to save the updated aboutText (e.g., API call, local storage)
    console.log("Saving About description:", aboutText); // Placeholder for actual saving
  };
  const trainingData = [
    {
      title: "Maths and SAT",
      description: "Instructor led Training",
      price: 2500,
    },
    {
      title: "Maths and SAT Advanced",
      description: "Instructor led Training",
      price: 2000,
    },
    {
      title: "Maths and SAT Advanced",
      description: "Instructor led Training",
      price: 2000,
    },
  ];

  return (
    <div className="w-full h-max flex flex-col justify-start items-start font-poppins gap-2 md:gap-3  p-1 leading-5">
 
      <div className="  bg-[#F7F7F7] flex flex-col p-2 justify-between w-full">
      <div className="flex justify-between items-center w-full">
        <p className="w-full text-sm md:text-lg font-semibold">About Tutor</p>
        <VscEdit className="w-6 cursor-pointer h-6" onClick={handleEditClick} />
      </div>
        {isEditable ? (
          <textarea
            className="text-sm w-full"
            defaultValue={aboutText} // Pre-populate the textarea
            onChange={(e) => setAboutText(e.target.value)} // Update aboutText on change
          />
        ) : (
          <p className="text-sm w-[90%]">{aboutText}</p> // Display current aboutText
        )}
        {isEditable && ( // Only show Save button when editing
          <button className=" bg-blue-900 text-white p-2 rounded-sm m-2 text-sm" onClick={handleSaveClick}>
            Save
          </button>
        )}
      </div>
      <div className=" bg-[#F7F7F7] p-2 w-full h-max flex flex-col justify-start items-start gap-2">
        <p className=" w-full text-sm md:text-lg  font-semibold">
          File Uploads
        </p>
        <p className="w-full text-sm font-medium p-2">Upload Resume / CV *</p>
        <input
          className="text-sm"
          type="file"
          name="file"
          accept=".pdf"
        ></input>
        <p className="w-full text-sm  font-medium p-2">Nationality ID Proof*</p>
        <input
          className="text-sm"
          type="file"
          name="file"
          accept=".pdf"
        ></input>
      </div>
      <div className="w-full h-max bg-[#F7F7F7] p-2">
        <p className=" w-full text-sm md:text-lg  font-semibold">Courses</p>
        <div className="w-full h-64 overflow-y-scroll no-scrollbar flex flex-col justify-start items-start ">
          <div className="flex text-sm flex-col gap-2 ">
            {trainingData.map((session, index) => (
              <div
                key={index}
                className="w-max flex flex-col justify-start gap-2 border-b-2 border-gray-300"
              >
                <div className="flex justify-center items-center">
                  <p className="w-full text-sm font-medium">{session.title}</p>
                  <VscEdit className="w-6 h-6 text-black cursor-pointer" />
                </div>
                <div className="w-max flex gap-8 justify-center items-center">
                  <p>
                    Classroom:{" "}
                    <span className="font-medium">{session.description}</span>
                    <p> &#8377;{session.price}</p>
                  </p>
                  <p>
                    Virtual:{" "}
                    <span className="font-medium">{session.description}</span>
                    <p> &#8377;{session.price}</p>
                  </p>
                </div>
                <p className=" w-max text-sm">
                  Training Since 2017 | Sessions 200 to 400 | Students 200 to
                  400
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
