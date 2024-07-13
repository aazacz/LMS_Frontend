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
import { IoLogOut } from "react-icons/io5";
import Tooltip from "@mui/material/Tooltip";
import { FaPencilAlt } from "react-icons/fa";
import { IoLibrarySharp } from "react-icons/io5";
import { MdGrading } from "react-icons/md";
import { CgInsights } from "react-icons/cg";
import { clearStudentDetails } from "../../store/reducers/StudentloginSlice";
import { MdContentPaste } from "react-icons/md";
import { FaClipboardQuestion } from "react-icons/fa6";
import { PiStudentFill } from "react-icons/pi";

const TutorSideBar = ({ isOpen }) => {
  console.log("isOpen from sidebar");
  console.log(isOpen);
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

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
      path: "/tutor/home/dashboard",
      icon: <MdDashboard className="text-xl text-gray-700" />,
    },
    {
      title: "Content",
      path: "/tutor/home/content",
      icon: <MdContentPaste className="text-xl text-gray-700" />,
    },
    {
      title: "Question Bank",
      path: "/tutor/home/questionbank",
      icon: <FaClipboardQuestion className="text-xl text-gray-700" />,
    },
    {
      title: "Students",
      path: "/tutor/home/students",
      icon: <PiStudentFill className="text-xl text-gray-700" />,
    },
    {
      title: "Grading",
      path: "/tutor/home/grading",
      icon: <MdGrading className="text-xl text-gray-700" />,
    },
    {
      title: "Materials",
      path: "/tutor/home/allmaterials",
      icon: <IoLibrarySharp className="text-xl text-gray-700" />,
    },
    {
      title: "Insights",
      path: "/tutor/home/insights",
      icon: <CgInsights className="text-xl text-gray-700" />,
    },
    {
      title: "Settings",
      icon: <IoIosSettings className="text-xl text-gray-700" />,
      subLinks: [
        {
          title: "Profile",
          path: "/tutor/home/settings",
          icon: <IoIosPerson className="text-xl text-gray-700" />,
        },
        {
          title: "Account",
          path: "/tutor/home/settings/accountsettings",
          icon: <IoIosKey className="text-xl text-gray-700" />,
        },
        // {
        //   title: "Notifications",
        //   path: "/student/settings/notifications",
        //   icon: <IoNotifications className="text-xl text-gray-700" />,
        // },
      ],
    },
  ];

  return (
    <div
      className={`${
        !isOpen ? "hidden md:block " : ""
      } h-screen   font-poppins text-sm font-medium `}
    >
      <Sidebar
        className="h-screen"
        collapsed={collapsed}
        backgroundColor="#fff"
        width="250px"
      >
        <Menu>
          {/* Menu Logo */}
          <MenuItem
            onClick={toggleCollapse}
            className={`side-menu-item md:py-[7px] py-[2px] border-b-[1px] ${
              isActive("/") ? "bg-blue-500 text-white " : "side-menu-item"
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
                className={`relative side-menu-item  ${
                  isActive(link.path)
                    ? "bg-blue-500 text-gray-500"
                    : "side-menu-item "
                }`}
              >
                {link.subLinks.map((subLink) => (
                  <MenuItem
                    key={subLink.title}
                    className={`relative side-menu-item  ${
                      isActive(subLink.path)
                        ? "bg-blue-500 "
                        : "side-menu-item text-gray-500"
                    }`}
                    onClick={() => navigate(subLink.path)}
                  >
                    <div className="flex">
                      {" "}
                      {subLink.icon}{" "}
                      <span className="ml-2  ">{subLink.title}</span>{" "}
                    </div>
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
                  className={`relative side-menu-item ${
                    isActive(link.path)
                      ? "bg-blue-500 text-black"
                      : "side-menu-item"
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
          <Tooltip title="Logout" arrow placement="right">
            <a
              onClick={handleLogout}
              href="#"
              className="flex items-center p-2 mt-2 text-red-600 hover:bg-gray-200"
            >
              <IoLogOut className="text-xl mx-5 h-10" />
              {collapsed ? "" : "Logout"}
            </a>
          </Tooltip>
        </Menu>
      </Sidebar>
    </div>
  );
};

export default TutorSideBar;
