import React from "react";
import { FaBars, FaBedPulse } from "react-icons/fa6";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { PiCirclesFourFill } from "react-icons/pi";
import { clearAdminDetails } from "../../store/reducers/AdminloginSlice";
import { useDispatch } from "react-redux";
import mindsatlogo from "../../assets/mindsatlogo.webp";
import Swal from "sweetalert2";

const Sidebar = ({ isOpen }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Hook for navigation

  const handleLogout = () => {
    Swal.fire({
      title: "Do you want to Logout?",
      showDenyButton: true,
      confirmButtonText: "Yes",
      denyButtonText: "No",
      customClass: {
        actions: "my-actions",
        confirmButton: "my-confirm-button",
        denyButton: "my-deny-button",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(clearAdminDetails()); // Clear admin details
        navigate("/"); // Navigate to login page
      }
    });
  };

  const navLinks = [
    {
      title: "Dashboard",
      path: "/admin/home/dashboard",
      icon: <PiCirclesFourFill />,
    },
    {
      title: "Courses",
      path: "/admin/home/courses",
      icon: <PiCirclesFourFill />,
    },
    {
      title: "Course Structure",
      path: "/admin/home/courseStructure",
      icon: <PiCirclesFourFill />,
    },
    {
      title: "Students",
      path: "/admin/home/students",
      icon: <PiCirclesFourFill />,
    },
    {
      title: "Tutors",
      path: "/admin/home/tutors",
      icon: <PiCirclesFourFill />,
    },
    {
      title: "Diagnosis Test",
      path: "/admin/home/diagnosistest",
      icon: <PiCirclesFourFill />,
    },
    {
      title: "Library",
      path: "/admin/home/library",
      icon: <PiCirclesFourFill />,
    },
    {
      title: "Access Management",
      path: "/admin/home/accessmanagement",
      icon: <PiCirclesFourFill />,
    },
    {
      title: "Settings",
      path: "/admin/home/settings",
      icon: <PiCirclesFourFill />,
    },
  ];

  return (
    <div
      className={`z-30 absolute md:sticky flex flex-col justify-between bottom-0 top-0 bg-white md:w-64 w-[50%] h-screen px-2 transition-transform duration-200 transform ${
        isOpen
          ? "translate-x-0 md:translate-x-0 shadow-[rgba(0,0,15,0.5)_5px_0px_10px_-5px]"
          : "-translate-x-full md:translate-x-0 shadow-none md:shadow-[rgba(0,0,15,0.5)_5px_0px_10px_-5px]"
      }`}
    >
      <div className="h- flex border-b-2 md:py-8 py-5  relative mb-4">
        <img
          src={mindsatlogo}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 md:w-40"
          alt=""
        />
      </div>
      <div>
        {navLinks.map((link, index) => (
          <Link
            key={link.title}
            to={link.path}
            className={`flex items-center px-3 my-4 mb:mb-3 rounded-lg font-poppins p-2 text-gray-700 hover:bg-gray-200 ${
              location.pathname === link.path
                ? "bg-blue-200 text-blue-900"
                : "bg-transparent text-gray-500"
            }`}
          >
            <PiCirclesFourFill
              className={`mr-2 text-xl ${
                location.pathname === link.path ? "text-white" : "text-gray-300"
              }`}
            />
            <p className="text-black text-xs md:text-sm font-poppins font-medium">
              {link.title}
            </p>
          </Link>
        ))}
      </div>
      <div>
        <a
          onClick={handleLogout}
          href="#"
          className="flex items-center p-2 mt-2 text-red-600 hover:bg-gray-200"
        >
          Logout
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
