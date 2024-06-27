import React, { useEffect, useState } from 'react';
import coursephoto from "/coursephoto.jpeg";
import { BiSpreadsheet } from "react-icons/bi";
import { LuTimer } from "react-icons/lu";
import { Link } from 'react-router-dom';
import { FaCirclePlus } from 'react-icons/fa6';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Loader from '../reusable/Loader';
import { RotatingLines } from 'react-loader-spinner';

const CourseStructureList = () => {
    const baseUrl = process.env.REACT_APP_API_URL;
    const token = useSelector((state) => state.AdminDetails.token);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getdata = async () => {
            try {
                setLoading(true)
                const response = await axios.get(`${baseUrl}api/structure/get-all-structure?page=1&pageSize=10&search=`, {
                    headers: { authorization: `Bearer ${token}` }
                });
                console.log(response.data.data);
                setCourses(response.data.data);
                setLoading(false)
            } catch (err) {
                console.log(err);
                setLoading(true);
            }
        };

        getdata();
    }, [baseUrl, token]);
    return (

        <>
            {loading ? (<div className='w-full h-screen origin-center  bg-gray-200 flex justify-center items-center'>

                <RotatingLines
                    visible={true}
                    height="96"
                    width="96"
                    strokeColor="#01729c"
                    strokeWidth="2"
                    animationDuration="0.75"
                    ariaLabel="rotating-lines-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                />

            </div>) : 
            (<div className=' p-4'>



                {/* heading and button div */}
                <div className=' flex justify-between py-2 border-b-2'>
                    <h1 className='font-poppins font-semibold text-2xl '>Course Structure</h1>

                    <Link replace to={`/admin/home/courses/addcourse`} className='bg-[#F5F1F1]'>
                        <button className='flex items-center gap-4 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] p-1 rounded-lg border-slate-600 px-2  font-plusjakartasans text-sm'>
                            <FaCirclePlus className='text-slate-600 ' />     Add Course          </button>
                    </Link>

                </div>

                <div className='grid grid-cols-1 mt-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                    {loading ? (
                        <Loader />
                    ) : (
                        courses.map((course, index) => (
                            <Link key={index} to={`/admin/home/coursestructure/${course._id}`}>
                                <CourseCard course={course} />
                            </Link>
                        ))
                    )}
                </div>
            </div>)}


        </>
    )
}

export default CourseStructureList






const CourseCard = ({ course }) => {
    return (
        <div className='bg-gray-200 p-4 rounded-2xl min-h-[16rem] h-auto'>
            <div className='w-full rounded-lg'>
                <img src={coursephoto} className='rounded-lg w-full object-contain' alt="Course" />
            </div>
            <div className='w-full mt-4'>
                <div className='min-h-[3rem]'>
                    <h1 className='font-plusjakartasans font-semibold text-base line-clamp-2'>{course.courseName}</h1>
                </div>
                <div className='flex items-center gap-x-6 mt-2'>
                    <span className='flex items-center gap-x-1 text-sm font-plusjakartasans'>
                        <BiSpreadsheet className='text-gray-400' /> {course.modules.length}  Modules
                    </span>
                    <span className='flex items-center gap-x-1 text-sm font-plusjakartasans'>
                        <LuTimer className='text-gray-400' /> {course.trainingDuration}
                    </span>
                </div>
            </div>
        </div>
    );
};
