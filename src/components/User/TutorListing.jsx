import React, { useEffect } from 'react';
import profile from "/profile.jpeg"
import { FaStar } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { FaCirclePlus } from "react-icons/fa6";
import axios from "axios"
import { useState } from 'react';


const baseURL = process.env.REACT_APP_API_URL;


const TutorCard = ({ tutor }) => {
    
    return (
        <Link to={`/admin/home/tutors/${tutor._id}`}>
            <div className="bg-[#F5F1F1] rounded-md border-[1px] shadow-lg border-gray-500  px-3 py-2 m-4 flex flex-row  cursor-pointer">

                <div className='w-[90%] '>
                    <div className="flex items-center ">

                        <div className="w-10 h-10  rounded-full overflow-hidden">
                            {/* Placeholder for tutor image */}
                            <img src={profile} className='object-' alt="tutor-image" />
                        </div>

                        <div className="ml-4">
                            <h3 className="font-bold text-sm line-clamp-1 w-full font-plusjakartasans">{tutor?.name} </h3>
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
                                <span className=" font-semibold pr-2">{1}</span>
                                <span className="text-xs text-gray-600">
                                    ({1} Review)
                                </span>
                            </div>
                        </div>

                    </div>

                </div >
                <div className='  w-[10%] flex justify-center items-center'> <FaAngleRight /> </div>
            </div >
        </Link>
    )
};

const TutorListing = () => {

const [TutorList,setTutorList] = useState([])

    useEffect( () => {
      axios.get(`${baseURL}api/tutor/tutors?page=1&pageSize=5&search=`,
            {
                "user-agent": navigator.userAgent,
            }
        ).then((res) => {
            console.log(res.data.data)
            setTutorList(res.data.data)

        }).catch((error) => {
            console.error("Error fetching tutors:", error);
        });
    
    
    }, [])
    

    return (
        <div className=" m-4 ">

        {/*Add Button */}
            <div className='flex justify-end mx-4'>
                <Link replace to={`/admin/home/tutors/addtutor`} className='bg-[#F5F1F1]' >
                    <button className='flex items-center gap-4 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]
                                    p-1 rounded-lg border-slate-600 px-2  font-plusjakartasans text-sm'>
                        <FaCirclePlus className='text-slate-600 ' />
                        Add Tutor
                    </button>
                </Link>
            </div>


            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4  gap-x-2 ">
                {TutorList.map((tutor,index) => {
                    return(

                        <TutorCard key={index}  tutor={tutor}  />
                    )
                    }
                    
                )}
            </div>
        </div>
    );
};

export default TutorListing;