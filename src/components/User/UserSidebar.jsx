import React, { useState } from "react";
import Logohalf from "/Logohalf.png";
import Logohalf2 from "/Logohalf2.png";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { IoIosSettings, IoIosPerson, IoIosKey } from "react-icons/io";
import { FaChalkboardTeacher } from "react-icons/fa";
import { FaBookReader } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import Tooltip from "@mui/material/Tooltip";
import { IoNotifications } from "react-icons/io5";
import { FaPencilAlt } from "react-icons/fa";
import { IoLibrarySharp } from "react-icons/io5";
import { FaBookAtlas } from "react-icons/fa6";
import { clearStudentDetails } from "../../store/reducers/StudentloginSlice"; // Import the clearStudentDetails action

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
      icon: <FaBookAtlas className="text-xl text-gray-700" />,
    },
    {
      title: "Assignments",
      path: "/student/assignments",
      icon: <FaBookReader className="text-xl text-gray-700" />,
    },
    {
      title: "Tests",
      path: "/student/tests",
      icon: <FaPencilAlt className="text-xl text-gray-700" />,
    },
    {
      title: "Tutors",
      path: "/student/tutors",
      icon: <FaChalkboardTeacher className="text-xl text-gray-700" />,
    },
    {
      title: "Library",
      path: "/student/library",
      icon: <IoLibrarySharp className="text-xl text-gray-700" />,
    },
    {
      title: "Settings",
      icon: <IoIosSettings className="text-xl text-gray-700" />,
      subLinks: [
        {
          title: "Profile",
          path: "/student/settings/",
          icon: <IoIosPerson className="text-xl text-gray-700" />,
        },
        {
          title: "Account",
          path: "/student/settings/accountsettings",
          icon: <IoIosKey className="text-xl text-gray-700" />,
        },
        {
          title: "Notifications",
          path: "/student/settings/notifications",
          icon: <IoNotifications className="text-xl text-gray-700" />,
        },
      ],
    },
  ];

  return (

    <div className="h-screen   font-poppins text-sm font-medium ">
      <Sidebar className="h-screen" collapsed={collapsed} backgroundColor="#fff" width="250px">
        <Menu>
        
        {/* Menu Logo */}
          <MenuItem
            onClick={toggleCollapse}
            className={`side-menu-item ${isActive("/") ? "bg-blue-500 text-white" : "side-menu-item"
              }`}
            icon={<img src={Logohalf} alt="" />}
          // onClick={() => navigate('/')}
          >
            <img src={Logohalf2} className="w-[120px]" alt="" />
          </MenuItem>
         
         
         
          {navLinks.map((link) =>
            link.subLinks ? (
            
            
              <SubMenu
                key={link.title}
                label={link.title}
                icon={link.icon}
                className={`relative side-menu-item  ${isActive(link.path) ? "bg-blue-500 text-gray-500" : "side-menu-item "
                  }`}
              >
                {link.subLinks.map((subLink) => (
                  <MenuItem
                    key={subLink.title}
                    className={`relative side-menu-item  ${isActive(subLink.path) ? "bg-blue-500 " : "side-menu-item text-gray-500"
                      }`} onClick={() => navigate(subLink.path)}
                  >
                    <div className="flex">      {subLink.icon}     <span className="ml-2 ">{subLink.title}</span>       </div>
                  </MenuItem>
                ))}
              </SubMenu>
            ) : (
              <Tooltip
                title={link.title}
                key={link.title}
                arrow
                placement="right"
              >
                <MenuItem
                  className={`relative side-menu-item ${isActive(link.path) ? "bg-blue-500 text-black" : "side-menu-item"
                    }`}
                  icon={link.icon}
                  onClick={() => navigate(link.path)}
                >
                  {collapsed ? (
                    <div className="group">
                      <span className="absolute left-full ml-2 w-full p-2 bg-gray-800 text-white text-sm rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {link.title}
                      </span>
                    </div>
                  ) : (
                    link.title
                  )}
                </MenuItem>
              </Tooltip>
            )
          )}
          <a
            onClick={handleLogout}
            href="#"
            className="flex items-center p-2 mt-2 text-red-600 hover:bg-gray-200"
          >
            <IoLogOut className="text-xl mx-5 h-10" />
            {collapsed ? "" : "Logout"}
          </a>
        </Menu>
      </Sidebar>
    </div>

  );
};

export default SideBar;
