import React from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom";
import { PiCirclesFourFill } from "react-icons/pi";
import { clearToken } from '../../store/reducers/tokenSlice';
import { persistor } from "../../store/index"
import { useDispatch } from 'react-redux';
import mindsatlogo from "../../assets/mindsatlogo.webp"
import Swal from 'sweetalert2';
import { clearTutorDetails } from '../../store/reducers/TutorloginSlice';


const Sidebar = ({ isOpen }) => {

    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate(); 


    const handleLogout = () => {
        Swal.fire({
            title: 'Do you want to Logout?',
            showDenyButton: true,
            confirmButtonText: 'Yes',
            denyButtonText: 'No',
            customClass: {
                actions: 'my-actions',
                confirmButton: 'my-confirm-button',
                denyButton: 'my-deny-button',
            },
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(clearTutorDetails()); // Clear admin details
                navigate("/tutor"); // Navigate to login page
            }
        });



        dispatch(clearToken());
    };

    const navLinks = [
        {
            title: "Dashboard",
            path: "/tutor/home/dashboard",
            icon: <PiCirclesFourFill />
        },
        {
            title: "Content",
            path: "/tutor/home/content",
            icon: <PiCirclesFourFill />
        },
        {
            title: "Question Bank",
            path: "/tutor/home/questionbank",
            icon: <PiCirclesFourFill />
        },
        {
            title: "Students",
            path: "/tutor/home/students",
            icon: <PiCirclesFourFill />
        },
        {
            title: "Grading",
            path: "/tutor/home/grading",
            icon: <PiCirclesFourFill />
        },
        {
            title: "Materials",
            path: "/tutor/home/allmaterials",
            icon: <PiCirclesFourFill />
        },
        {
            title: "Insights",
            path: "/tutor/home/insights",
            icon: <PiCirclesFourFill />
        },
        {
            title: "Settings",
            path: "/tutor/home/settings",
            icon: <PiCirclesFourFill />
        },
      
    ];

    return (

        <div className={`z-30  absolute  md:sticky bottom-0 top-0 bg-white md:w-64 w-[50%] h-screen  px-2   transition-transform duration-200 transform ${isOpen ? 'translate-x-0 md:translate-x-0 shadow-[rgba(0,0,15,0.5)_5px_0px_10px_-5px] ' : '-translate-x-full md:translate-x-0 shadow-none md:shadow-[rgba(0,0,15,0.5)_5px_0px_10px_-5px]'}`}>

            {/*LOGO*/}
            <div className='h-14   flex border-b-2 md:py-8 py-5 relative mb-4  '>

                <img src={mindsatlogo} className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  w-24 md:w-40' alt="" />
            </div>


            {navLinks.map((link, index) => {
                return (

                    <Link key={link.title}
                        to={link.path}
                        className={`flex items-center px-3 my-4 mb:mb-3 rounded-lg font-poppins p-2 text-gray-700 hover:bg-gray-200  
                        ${location.pathname === link.path
                                ? "bg-blue-200 text-blue-900"
                                : "bg-transparent text-gray-500"
                            }`}>
                        <PiCirclesFourFill className={`mr-2 text-xl   ${location.pathname === link.path
                            ? " text-white"
                            : " text-gray-300"
                            }`} />
                        <p className='text-black text-xs md:text-sm font-poppins font-medium'>{link.title}</p>
                    </Link>
                )


            })}


            <a onClick={handleLogout} href="#" className="flex items-center p-2 mt-2 text-red-600 hover:bg-gray-200">  Logout    </a>

        </div>

    )
}

export default Sidebar