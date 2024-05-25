import React from 'react';
import profile from "/profile.jpeg"
import { FaStar } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { FaCirclePlus } from "react-icons/fa6";



const tutors = [
    {
        name: 'Emerson Levin',
        sessionsAttended: 5,
        rating: 4.5,
        reviews: 1200,
    },
    {
        name: 'Eleanor Pena',
        sessionsAttended: 5,
        rating: 4.5,
        reviews: 1200,
    },
    {
        name: 'Wade Warren',
        sessionsAttended: 5,
        rating: 4.5,
        reviews: 1200,
    },
    {
        name: 'Guy Hawkins',
        sessionsAttended: 5,
        rating: 4.5,
        reviews: 1200,
    },
    {
        name: 'Carter Dorwart',
        sessionsAttended: 5,
        rating: 4.5,
        reviews: 1200,
    },
    {
        name: 'Arlene McCoy',
        sessionsAttended: 5,
        rating: 4.5,
        reviews: 1200,
    },
    {
        name: 'Bessie Cooper',
        sessionsAttended: 5,
        rating: 4.5,
        reviews: 1200,
    },
    {
        name: 'Theresa Webb',
        sessionsAttended: 5,
        rating: 4.5,
        reviews: 1200,
    },
    {
        name: 'Savannah Nguyen',
        sessionsAttended: 5,
        rating: 4.5,
        reviews: 1200,
    },
    {
        name: 'Annette Black',
        sessionsAttended: 5,
        rating: 4.5,
        reviews: 1200,
    },
    {
        name: 'Kathryn Murphy',
        sessionsAttended: 5,
        rating: 4.5,
        reviews: 1200,
    },
    {
        name: 'Jenny Wilson',
        sessionsAttended: 5,
        rating: 4.5,
        reviews: 1200,
    },
    {
        name: 'Dianne Russell',
        sessionsAttended: 5,
        rating: 4.5,
        reviews: 1200,
    },
    {
        name: 'Darlene Robertson',
        sessionsAttended: 5,
        rating: 4.5,
        reviews: 1200,
    },
    {
        name: 'Brooklyn Simmons',
        sessionsAttended: 5,
        rating: 4.5,
        reviews: 1200,
    },
    {
        name: 'Cameron Williamson',
        sessionsAttended: 5,
        rating: 4.5,
        reviews: 1200,
    },
];

const TutorCard = ({ tutor }) => {
    return (
        <Link replace to={`/tutors/tutorform`}>
            <div className="bg-[#F5F1F1] rounded-md border-[1px] shadow-lg border-gray-500  px-3 py-2 m-4 flex flex-row  cursor-pointer">

                <div className='w-[90%] '>
                    <div className="flex items-center ">

                        <div className="w-10 h-10  rounded-full overflow-hidden">
                            {/* Placeholder for tutor image */}
                            <img src={profile} className='object-' alt={tutor.name} />
                        </div>

                        <div className="ml-4">
                            <h3 className="font-bold text-sm  font-plusjakartasans">{tutor.name}</h3>
                            <p className="text-gray-600 text-xs font-plusjakartasans">
                                {tutor.sessionsAttended} Sessions attended
                            </p>
                        </div>

                    </div>

                    <div className="flex justify-between mt-4">
                        <div className="flex items-center">
                            <span className="text-xs text-gray-500">SAT adv</span>
                            <div className="ml-2 flex items-center ">
                                <FaStar className='text-xs text-[#FFBB54] mr-1' />
                                <span className=" font-semibold pr-2">{tutor.rating}</span>
                                <span className="text-xs text-gray-600">
                                    ({tutor.reviews} Review)
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
    return (
        <div className=" m-4 ">
            <div className='flex justify-end mx-4'>
                
            <Link replace to={`/tutors/addtutor`} className='bg-[#F5F1F1]' >
                <button className='flex items-center gap-4 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]
                                    p-1 rounded-lg border-slate-600 px-2  font-plusjakartasans text-sm'>
                    <FaCirclePlus className='text-slate-600 ' />
                    Add Tutor
                </button>
            </Link>
                                        </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4  gap-x-2 ">
                {tutors.map((tutor) => (
                    <TutorCard key={tutor.name} tutor={tutor} />
                ))}
            </div>
        </div>
    );
};

export default TutorListing;