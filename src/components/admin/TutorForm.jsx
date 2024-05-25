import React, { useState } from 'react';
import { FaArrowAltCircleRight } from "react-icons/fa";


const SideBar = ({ link, title }) => {
  return (
    <div className="w-full mx-auto px-5 py-8 flex items-center justify-between">

      <div className='flex items-center gap-3'>
        <a className='font-poppins uppercase text-sm text-gray-500' href="#">ABOUT ME</a>
      </div>
      <span class="icon">
        <FaArrowAltCircleRight className='text-black' />
      </span>

    </div>
  )
}


const TutorForm = () => {
  const [aboutMe, setAboutMe] = useState('');
  const [fileUploads, setFileUploads] = useState('');
  const [myCourses, setMyCourses] = useState('');
  const [workExperience, setWorkExperience] = useState('');
  const [educationDetails, setEducationDetails] = useState('');
  const [skills, setSkills] = useState('');
  const [projects, setProjects] = useState('');
  const [awardsAndRecognitions, setAwardsAndRecognitions] = useState('');
  const [aboutTutor, setAboutTutor] = useState('');
  const [resume, setResume] = useState('');
  const [nationalityIdProof, setNationalityIdProof] = useState('');
  const [courses, setCourses] = useState('');
  const [courseName, setCourseName] = useState('');
  const [courseCertificate, setCourseCertificate] = useState('');
  const [classroomPrice, setClassroomPrice] = useState('');
  const [virtualPrice, setVirtualPrice] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here

  };

  return (
    <>

      <div className='w-full flex '>

        <div className='w-[20%] '>

          <SideBar />

        </div>

        <div className='flex-1 w-[90%] p-4 h-auto '> 


        </div>
      </div>

    </>
  )
};

export default TutorForm;
