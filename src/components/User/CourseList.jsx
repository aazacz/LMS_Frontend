import React from 'react';
import coursephoto from "/coursephoto.jpeg";
import { BiSpreadsheet } from "react-icons/bi";
import { LuTimer } from "react-icons/lu";
import { Link } from 'react-router-dom';
import { FaCirclePlus } from 'react-icons/fa6';

const CourseList = () => {
   
    const courses = [
        { title: "Introduction Basic SAT & DSAT" },
        { title: "Introduction Basic SAT & DSAT" },
        { title: "Introduction Basic SAT & DSAT" },
        { title: "Introduction Basic SAT & DSAT" },
       ]
    
    const bestinmarket = [
        { title: "Introduction Basic SAT & DSAT" },
        { title: "Introduction Basic SAT & DSAT" },
        { title: "Introduction Basic SAT & DSAT" },
        { title: "Introduction Basic SAT & DSAT" },
       ]

    return (
        <div className='p-4 w-full max-w-[1200px]  '>

            {/*Add Button */}
            <div className='flex justify-end'>
                <Link replace to={`/admin/home/courses/addcourse`} className='bg-[#F5F1F1]' >
                    <button className='flex items-center gap-4 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]
                                    p-1 rounded-lg border-slate-600 px-2  font-plusjakartasans text-sm'>
                        <FaCirclePlus className='text-slate-600 ' />
                        Add Course
                    </button>
                </Link>
            </div>

            <h1 className='font-poppins font-semibold text-lg py-2'>Recomended Course</h1>

            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                {courses.map((course, index) => (
                    <Link key={index} to={`/admin/home/courses/1`}>
                        <CourseCard title={course.title} />
                    </Link>
                ))}
            </div>

            <div className='mt-5'>

                <h1 className='font-poppins font-semibold text-lg py-2'>Best In Market</h1>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                    {bestinmarket.map((course, index) => (
                        <Link key={index} to={`/admin/home/courses/1`}>
                            <CourseCard title={course.title} />
                        </Link>
                    ))}
                </div>

            </div>


        </div>
    );
};

export default CourseList;

const CourseCard = ({ title }) => {
    return (
        <div className='bg-[#F4F5FB] p-4 rounded-2xl min-h-[16rem] h-auto'>
            <div className='w-full rounded-lg'>
                <img src={coursephoto} className='rounded-lg w-full object-contain' alt="Course" />
            </div>
            <div className='w-full mt-4'>
                <div className='min-h-[3rem]'>
                    <h1 className='font-plusjakartasans font-semibold text-base line-clamp-2'>{title}</h1>
                </div>
                <div className='flex items-center gap-x-6 mt-2'>
                    <span className='flex items-center gap-x-1 text-sm font-plusjakartasans'>
                        <BiSpreadsheet className='text-gray-400' /> 5 Modules
                    </span>
                    <span className='flex items-center gap-x-1 text-sm font-plusjakartasans'>
                        <LuTimer className='text-gray-400' /> 60Hrs
                    </span>
                </div>
            </div>
        </div>
    );
};
