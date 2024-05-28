import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { FaArrowAltCircleRight } from "react-icons/fa";
import { useParams } from 'react-router-dom';
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


const TutorDetails = () => {
  const baseURL = process.env.REACT_APP_API_URL;

  const { tutorId } = useParams();
  const [tutor, setTutor] = useState(null);
  console.log(tutorId);

  useEffect(() => {
    axios.get(`${baseURL}api/tutor/single-tutor/${tutorId}`)
      .then((res) => {
        console.log(res.data);
        setTutor(res.data);
      })
      .catch((error) => {
        console.error("Error fetching tutor details:", error);
      });
  }, [tutorId]);


  // const [aboutMe, setAboutMe] = useState('');
  // const [fileUploads, setFileUploads] = useState('');
  // const [myCourses, setMyCourses] = useState('');
  // const [workExperience, setWorkExperience] = useState('');
  // const [educationDetails, setEducationDetails] = useState('');
  // const [skills, setSkills] = useState('');
  // const [projects, setProjects] = useState('');
  // const [awardsAndRecognitions, setAwardsAndRecognitions] = useState('');
  // const [aboutTutor, setAboutTutor] = useState('');
  // const [resume, setResume] = useState('');
  // const [nationalityIdProof, setNationalityIdProof] = useState('');
  // const [courses, setCourses] = useState('');
  // const [courseName, setCourseName] = useState('');
  // const [courseCertificate, setCourseCertificate] = useState('');
  // const [classroomPrice, setClassroomPrice] = useState('');
  // const [virtualPrice, setVirtualPrice] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here

  };

  return (
    <>

<div className='px-5'>

      <div className='w-full h-20 flex mt-2 bg-[#F4F6F7]' >
        <div className='w-[10%] '>

          <img src=""  alt="" />
        </div>
        <div className='w-[90%] '></div>



      </div>


      <div className='w-full flex '>

        <div className='w-[20%] '>

          <SideBar />
          htyhthtyhtyhtyh
        </div>

        <div className='flex-1 w-[90%] p-4 h-auto '>


        </div>
      </div>


</div>
    </>
  )
};

export default TutorDetails
