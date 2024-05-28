import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { FaArrowAltCircleRight } from "react-icons/fa";
import { useParams } from 'react-router-dom';
import profile from '/profile.jpeg'
import { CiLocationOn } from "react-icons/ci";
import { LuPhone } from "react-icons/lu";
import { CiMail } from "react-icons/ci";
import { HiOutlineMail } from "react-icons/hi";
import { IoTrashOutline } from "react-icons/io5";

const SideBar = ({ link, title }) => {

  const sideDetails = ["ABOUT ME", "FILE UPLOADS", "MY COURSES", "WORK EXPERIENCES", "Education Details", "SKILLS", "PROJECTS", "AWARDS & RECOGNITIONS"]


  return (
    <div className="w-full mx-auto px-5 py-8  ">
      {sideDetails.map((value, index) => {
        return (
          <>
            <div className='flex justify-between py-3'>

              <div className='flex items-center gap-3'>
                <a className='font-poppins uppercase text-sm text-gray-500 ' href="#">{value}</a>
              </div>
              <span class="icon">
                <FaArrowAltCircleRight className='text-black' />
              </span>
            </div>

          </>

        )
      })}


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


  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here

  };

  return (
    <>

      <div className='px-5 w-full flex flex-col  overflow-y-hidden' > 

        <div className='w-full h-30 p-3 flex mt-2 bg-[#F4F6F7]' >
          <div className='w-[10%] '>

            <img src={profile} className='border-2 rounded-full w-20 h-20' alt="" />
          </div>
          <div className='w-[90%] '>
            <h1 className='text-2xl font-poppins capitalize '>Emerson Levin</h1>
            <h1 className='text-sm text-[#999999]  font-poppins capitalize '>Chennai, India</h1>
            <div className='flex gap-6'>
              <span className='text-sm text-[#454545]  font-poppins capitalize flex items-center gap-x-2'><LuPhone />
                +91 89392 13115</span>


            </div>
            <span className='text-sm text-[#454545]  font-poppins capitalize flex items-center gap-x-2'><CiMail />
              emersonever@gmail.com</span>
          </div>
        </div>

        {/* Left Side */}

        <div className='w-full flex flex-1 '>

          <div className='w-[25%] '>

            <SideBar />

          </div>



          {/* Right Side */}
          <div className='flex-1 w-[90%] h-full     '>
           
           
            <div className='flex flex-col gap-y-4 overflow-y-scroll' >

              <div className='p-5 bg-blue-100 '>
                <h1 className='text-lg font-semibold text-[#333333] font-poppins'>About Tutor</h1>
                <div className='mt-5'>

                  <p className='font-poppins text-[#454545] text-xs'>Passionate about teaching and have the expertise in your subject knowledge, then look no further. Invensis Learning invites trainers and SMEs with relevant domain expertise and certifications to meet our training requirements worldwide. By joining as a trainer with Invensis Learning, you will be able to share your knowledge, connect with professionals across various backgrounds, enrich careers, and embark on a rewarding training journey</p>
                </div>


              </div>



              <div className='p-5 bg-blue-100'>
                <h1 className='text-lg font-semibold text-[#333333] font-poppins'>File Uploads</h1>


                <div className='mt-4'>
                  <h1 className='text-[14px]  text-[#333333] font-poppins'>Upload Resume / CV *</h1>

                  <div className='w-full px-3 bg-white h-8 mt-2 flex justify-between items-center  '>

                    <h1 className='text-[#333333] text-xs font-poppins font-semibold'>Resume 01.pdf</h1>
                    <div className='w-7 h-7 flex items-center justify-center   bg-red-200 text-red-700'><IoTrashOutline /></div>
                  </div>

                </div>

                <div className='mt-4'>
                  <h1 className='text-[14px]  text-[#333333] font-poppins'>Education</h1>

                  <div className='w-full px-3 bg-white h-8 mt-2 flex justify-between items-center  '>

                    <h1 className='text-[#333333] text-xs font-poppins font-semibold'>Degree certficate</h1>
                    <div className='w-7 h-7 flex items-center justify-center   bg-red-200 text-red-700'><IoTrashOutline /></div>
                  </div>
                  <div className='w-full px-3 bg-white h-8 mt-2 flex justify-between items-center  '>

                    <h1 className='text-[#333333] text-xs font-poppins font-semibold'>Secondary Education certficate</h1>
                    <div className='w-7 h-7 flex items-center justify-center   bg-red-200 text-red-700'><IoTrashOutline /></div>
                  </div>

                </div>
              
              
                <div className='mt-4'>
                  <h1 className='text-[14px]  text-[#333333] font-poppins'>Awards</h1>

                  <div className='w-full px-3 bg-white h-8 mt-2 flex justify-between items-center  '>

                    <h1 className='text-[#333333] text-xs font-poppins font-semibold'>Guiness World Record</h1>
                    <div className='w-7 h-7 flex items-center justify-center   bg-red-200 text-red-700'><IoTrashOutline /></div>
                  </div>
                  <div className='w-full px-3 bg-white h-8 mt-2 flex justify-between items-center  '>

                    <h1 className='text-[#333333] text-xs font-poppins font-semibold'>Oscar Awards - Best Actor</h1>
                    <div className='w-7 h-7 flex items-center justify-center   bg-red-200 text-red-700'><IoTrashOutline /></div>
                  </div>

                </div>





              </div>
                <div className='p-5 bg-blue-100'>

                  vrg
                </div>



            </div>
          </div>


        </div>
      </div>
    </>
  )
};

export default TutorDetails
