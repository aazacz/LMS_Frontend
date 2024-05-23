import React from 'react'
import { FaBars } from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";
import { PiCirclesFourFill } from "react-icons/pi";
import { clearUserDetails } from '../../store/reducers/loginSlice';
import { persistor } from "../../store/index"
import { useDispatch } from 'react-redux';
import mindsatlogo from "../../assets/mindsatlogo.webp"
const Sidebar = () => {

    const location = useLocation();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(clearUserDetails());

    };


    const navLinks = [
        {
            title: "Dashboard",
            path: "/",
            icon: <PiCirclesFourFill />

        },
        {
            title: "Courses",
            path: "/courses",
            icon: <PiCirclesFourFill />
        },
        {
            title: "Course Structure",
            path: "/courseStructure",
            icon: <PiCirclesFourFill />
        },
        {
            title: "Students",
            path: "/students",
            icon: <PiCirclesFourFill />
        },
        {
            title: "Tutors",
            path: "/tutors",
            icon: <PiCirclesFourFill />
        },
        {
            title: "Diagnosis Test",
            path: "/diagnosistest",
            icon: <PiCirclesFourFill />
        },
        {
            title: "Library",
            path: "/library",
            icon: <PiCirclesFourFill />
        },
        {
            title: "Settings",
            path: "/settings",
            icon: <PiCirclesFourFill />
        },
    ];

    return (

        <div className="bg-white w-64 h-screen shadow-[rgba(0,0,15,0.5)_5px_0px_10px_-5px]  px-2">

            {/*LOGO*/}
            <div className='md:h-10  flex border-b-2 py-8 relative mb-4'>
                <img src={mindsatlogo} className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  w-40' alt="" />
            </div>


            {navLinks.map((link, index) => {
                return (

                    <Link key={link.title}
                        to={link.path}
                        className={`flex items-center px-3 mb-3 rounded-lg font-poppins p-2 text-gray-700 hover:bg-gray-200  
                        ${location.pathname === link.path
                                ? "bg-blue-200 text-blue-900"
                                : "bg-transparent text-gray-500"
                            }`}>
                        <PiCirclesFourFill className={`mr-2 text-xl   ${location.pathname === link.path
                            ? " text-white"
                            : " text-gray-300"
                        }`} /> 
                        <p className='text-black text-sm font-poppins font-medium'>{link.title}</p>
                    </Link>
                )


            })}


            <a onClick={handleLogout} href="#" className="flex items-center p-2 mt-2 text-red-600 hover:bg-gray-200">  Logout    </a>

        </div>

    )
}

export default Sidebar