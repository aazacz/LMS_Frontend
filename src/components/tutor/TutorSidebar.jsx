import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { useLocation, useNavigate } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { IoIosSettings, IoIosPerson, IoIosKey } from "react-icons/io";
import { IoLogOut } from "react-icons/io5";
import Tooltip from "@mui/material/Tooltip";
// import { FaPencilAlt } from "react-icons/fa";
import { IoLibrarySharp } from "react-icons/io5";
import { MdGrading } from "react-icons/md";
import { CgInsights } from "react-icons/cg";
import { clearTutorDetails } from "../../store/reducers/TutorloginSlice";
import { MdContentPaste } from "react-icons/md";
import { FaClipboardQuestion } from "react-icons/fa6";
import { PiStudentFill } from "react-icons/pi";
import { RxHamburgerMenu } from "react-icons/rx";

const TutorSideBar = ({ isOpen, isSidebarOpen, setIsSidebarOpen }) => {
  
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

  const handlecollapse = () => {
    if (collapsed === true) {
      return;
    } else {
      setCollapsed(true);
      setTimeout(() => {
        setCollapsed(false);
      }, 1000);
    }
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
        dispatch(clearTutorDetails());
        navigate("/tutor");
      }
    });
  };

  const navLinks = [
    {
      title: "Dashboard",
      path: "/tutor/home/dashboard",
      icon: <MdDashboard className="text-xl text-black" />,
    },
    {
      title: "Content",
      path: "/tutor/home/content",
      icon: <MdContentPaste className="text-xl text-black" />,
    },
    {
      title: "Test",
      path: "/tutor/home/questionbank",
      icon: <FaClipboardQuestion className="text-xl text-black" />,
    },
    {
      title: "Students",
      path: "/tutor/home/students",
      icon: <PiStudentFill className="text-xl text-black" />,
    },
    {
      title: "Grading",
      path: "/tutor/home/grading",
      icon: <MdGrading className="text-xl text-black" />,
    },
    {
      title: "Materials",
      path: "/tutor/home/allmaterials",
      icon: <IoLibrarySharp className="text-xl text-black" />,
    },
    // {
    //     title: 'Insights',
    //     path: '/tutor/home/insights',
    //     icon: <CgInsights className="text-xl text-black" />,
    // },
    {
      title: "Settings",
      icon: <IoIosSettings className="text-xl text-black" />,
      subLinks: [
        {
          title: "Profile",
          path: "/tutor/home/settings/",
          icon: <IoIosPerson className="text-xl text-black" />,
        },
        {
          title: "Account",
          path: "/tutor/home/settings/accountsettings",
          icon: <IoIosKey className="text-xl text-black" />,
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
      className={`h-full bg-white overflow-y-auto no-scrollbar absolute md:sticky z-50 ${
        isSidebarOpen ? "" : "-translate-x-full md:translate-x-0"
      }
         transition-all duration-500  font-poppins text-sm font-medium `}
    >
      <Sidebar collapsed={collapsed} backgroundColor="#fff" width="210px ">
        <Menu className="" menuItemStyles={{ icon: { fontSize: "20px" } }}>
          {/* Menu Logo */}
          <MenuItem
            onClick={toggleCollapse}
            className={`side-menu-item h-12 ${
              isActive("/") ? "bg-blue-500 text-white " : "side-menu-item"
            }`}
            icon={
              <>
                <RxHamburgerMenu />
              </>
            }
          ></MenuItem>

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
                    onClick={() => {
                      setIsSidebarOpen();
                      navigate(subLink.path);
                    }}
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
              
                <MenuItem
                  className={`relative side-menu-item menu ${
                    isActive(link.path)
                      ? "bg-blue-500 text-black"
                      : "side-menu-item"
                  }`}
                  icon={link.icon}
                  onClick={() => {
                    setIsSidebarOpen(false);
                    navigate(link.path);
                  }}
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
            )
          )}
          <Tooltip title="Logout" arrow placement="right">
            <button
              onClick={handleLogout}
              href="#"
              className="flex w-full items-center p-2 mt-2 text-red-600 hover:bg-gray-200"
            >
              <IoLogOut className="text-xl mx-5 h-10" />
              {collapsed ? "" : "Logout"}
            </button>
          </Tooltip>
        </Menu>
      </Sidebar>
    </div>
  );
};

export default TutorSideBar;
