import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaStar, FaAngleRight } from 'react-icons/fa';
import Loader from '../reusable/Loader';
import profile from '/profile.jpeg'
import AssignmentImage from '/AssignmentImage.png'
import { FaArrowRight } from "react-icons/fa";

const Dashboard = () => {

    const [progress, setProgress] = useState(25);
    const [TutorList, setTutorList] = useState([]);
    const [loader, setLoader] = useState(true);
    const baseURL = process.env.REACT_APP_API_URL;

    useEffect(() => {

        axios.get(`${baseURL}api/tutor/tutors?page=1&pageSize=5&search`,
            { "user-agent": navigator.userAgent })
            .then((res) => {
                setTutorList(res.data.data);
                setLoader(false);//set Loader False
                setProgress(35); //Set the progress bar
            })
            .catch((error) => {

                console.error("Error fetching tutors:", error);
                setLoader(true);//If Error the loader stil works
            })


    }, [])





    return (
        <div className={`w-screen h-screen  px-7 flex   relative`}>

            {/* ternary Operation to get Tutor data */}



            <>
                <div className='w-[80%] p-5 '>

                    <h1 className='font-poppins font-semibold text-2xl' > Dashboard</h1>

                    {/* Card Showing div */}
                    <div className="w-full  h-[200px]  max-w-[1200px] flex justify-center relative border">
                        {loader ? (<Loader />) : (
                            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-2 relative'>

                                {TutorList.map((tutor, index) => (
                                    <TutorCard key={index} tutor={tutor} />
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Pending Assignments */}
                    <div className='w-full h-full py-4 '>
                        <h1 className='font-poppins font-semibold text-2xl' > Pending Assignment</h1>

                        <PendingAssignments/>

                    </div>



                </div>
                <div className=''></div>
            </>

        </div>
    )
}

export default Dashboard


const ProgressBar = ({ progress }) => {
    return (
        <div className="w-full  bg-white  rounded-full h-2 ">
            <div className="bg-[#F99406] h-2 rounded-full" style={{ width: `${progress}%` }}></div>
        </div>
    );
};



const TutorCard = ({ tutor }) => (
    <Link to={`/student/tutors/${tutor._id}`}>
        <div className="bg-[#F5F1F1] rounded-md border-[1px] shadow-lg border-gray-500 px-3 py-2 m-4 flex flex-row cursor-pointer">
            <div className='w-[90%] '>
                <div className="flex items-center ">
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                        <img src={profile} className='object-cover' alt="tutor-image" />
                    </div>
                    <div className="ml-4">
                        <h3 className="font-bold text-sm line-clamp-1 w-full font-plusjakartasans">{tutor?.name}</h3>
                        <p className="text-gray-600 text-xs font-plusjakartasans">
                            {2} Sessions attended
                        </p>
                    </div>
                </div>
                <div className="flex justify-between mt-4">
                    <div className="flex items-center">
                        <span className="text-xs text-gray-500">SAT adv</span>
                        <div className="ml-2 flex items-center ">
                            <FaStar className='text-xs text-[#FFBB54] mr-1' />
                            <span className="font-semibold pr-2">{1}</span>
                            <span className="text-xs text-gray-600">
                                ({1} Review)
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-[10%] flex justify-center items-center'>
                <FaAngleRight />
            </div>
        </div>
    </Link>
);


const PendingAssignments =()=>{

    return(

<>

<div className='w-full h-20 flex bg-[#f2eaea] bg-greeen-200 rounded-lg shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] ' >
                            <div className='w-[10%] h-full  rounded-s-lg'>
                                <img src={AssignmentImage} className='w-full h-full' alt="" />
                            </div>
                            <div className='w-[80%] h-full  flex justify-center items-center'>

                                <div className='flex items-end w-full justify-center  gap-x-24 '>

                                    <div className='w-[50%] pl-8'>
                                        <h1 className='font-poppins font-semibold text-xl '>SAT Asssignment</h1>
                                        <h1 className='font-poppins text-gray-500'>English & Writing Skills test</h1>
                                    </div>

                                    <div className='mb-1 w-[50%]'>
                                        <div className="w-full max-w-md flex flex-col ">
                                            <div className='flex justify-between'>

                                            <h2 className="text-xs text-left font-semibold text-gray-700">Progress</h2>
                                            <h2 className="text-sm text-left text-[#F99406] font-semibold"> {progress}%</h2>
                                            </div>
                                            <ProgressBar progress={progress} />
                                        </div>
                                    </div>
                                </div>


                            </div>
                            <div className='w-[10%] h-full flex justify-end px-2  items-center rounded-e-lg'>
                            <FaArrowRight  className='text-2xl text-gray-800'/>

                            </div>
                        </div>


</>



    )
}