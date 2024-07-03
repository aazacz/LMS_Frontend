import React, { useState } from "react";
import { PiCirclesFourFill } from "react-icons/pi";
import Logohalf from "/Logohalf.png";
import Logohalf2 from "/Logohalf2.png";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { IoIosSettings } from "react-icons/io";
import { FaChalkboardTeacher } from "react-icons/fa";
import { FaBookReader } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { clearStudentDetails } from "../../store/reducers/StudentloginSlice"; // Import the clearStudentDetails action
import { clearToken } from "../../store/reducers/tokenSlice"; // Import the clearToken action

const SideBar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const dispatch = useDispatch();

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
        dispatch(clearStudentDetails());
        dispatch(clearToken());
        navigate("/");
      }
    });
  };

  const navLinks = [
    {
      title: "Dashboard",
      path: "/student/dashboard",
      icon: <MdDashboard className="text-xl text-gray-700" />,
    },
    {
      title: "Courses",
      path: "/student/courses",
      icon: <PiCirclesFourFill />,
    },
    {
      title: "Assignments",
      path: "/student/assignments",
      icon: <FaBookReader className="text-xl text-gray-700" />,
    },
    {
      title: "Tutors",
      path: "/student/tutors",
      icon: <FaChalkboardTeacher className="text-xl text-gray-700" />,
    },
    {
      title: "Settings",
      path: "/student/settings",
      icon: <IoIosSettings className="text-xl text-gray-700" />,
    },
  ];

  return (
    <div>
      <div>
        <div className=" h-screen font-poppins text-sm font-medium">
          <Sidebar collapsed={collapsed} backgroundColor="#fff" width="250px">
            <Menu className="h-screen">
              <MenuItem
                onClick={toggleCollapse}
                className={`side-menu-item ${
                  isActive("/") ? "side-bar-active" : "side-menu-item"
                }`}
                icon={<img src={Logohalf} alt="" />}
              >
                <img src={Logohalf2} className="w-[120px]" alt="" />
              </MenuItem>
              {navLinks.map((link) => (
                <MenuItem
                  key={link.title}
                  className={`relative side-menu-item ${
                    isActive(link.path) ? "side-bar-active" : "side-menu-item"
                  }`}
                  icon={link.icon}
                  onClick={() => navigate(link.path)}
                  data-tip={link.title} // Add data-tip attribute for tooltip content
                >
                  {collapsed ? (
                    <div className="group">
                      <span className="absolute left-full ml-2 w-max p-2 bg-gray-800 text-white text-sm rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {link.title}
                      </span>
                    </div>
                  ) : (
                    link.title
                  )}
                </MenuItem>
              ))}

              {/* <ReactTooltip effect="solid" /> Initialize ReactTooltip */}

              <a
                onClick={handleLogout}
                href="#"
                className="flex items-center p-2 mt-2 text-red-600 hover:bg-gray-200"
              >
                {" "}
                <IoLogOut className="text-xl mx-5 h-10" />{" "}
                {collapsed ? "" : "Logout"}{" "}
              </a>
            </Menu>
          </Sidebar>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
