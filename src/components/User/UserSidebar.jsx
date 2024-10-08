import React, { useState } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { MdDashboard, MdDensitySmall } from "react-icons/md";
import { FaBookReader } from "react-icons/fa";
import { PiChalkboardTeacherFill, PiExamFill } from "react-icons/pi";
import { IoIosKey, IoIosPerson, IoIosSettings } from "react-icons/io";
import { IoLibrary, IoLogOut } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { GiBookmarklet, GiChecklist } from "react-icons/gi";
import { PiTreeStructureFill } from "react-icons/pi";
import { clearStudentDetails } from "../../store/reducers/StudentloginSlice";
import { FaListCheck } from "react-icons/fa6";

const UserSideBar = ({ isOpen, isSidebarOpen, setIsSidebarOpen }) => {
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
        dispatch(clearStudentDetails());
        navigate("/");
      }
    });
  };

  const navLinks = [
    {
      title: "Dashboard",
      path: "/student/dashboard",
      icon: <MdDashboard className="text-xl text-gray-900" />,
    },
    {
      title: "Courses",
      path: "/student/courses",
      icon: <GiBookmarklet className="text-xl text-gray-900" />,
      subLinks: [
        {
          title: "All Courses",
          path: "/student/courses/allcourses",
          icon: <MdDensitySmall className="text-xl text-gray-700" />,
        },
        {
          title: "Enrolled courses",
          path: "/student/courses/enrolledcourses",
          icon: <FaListCheck className="text-xl text-gray-700" />,
        },
      ],
    },
    {
      title: "Assignments",
      path: "/student/assignments",
      icon: <FaBookReader className="text-xl text-gray-900" />,
    },
    {
      title: "Tests",
      path: "/student/tests",
      icon: <PiExamFill className="text-xl text-gray-900" />,
    },
    // {
    //   title: "Tutors",
    //   path: "/student/tutors",
    //   icon: <PiChalkboardTeacherFill className="text-xl text-gray-900" />,
    // },
    {
      title: "Library",
      path: "/student/library",
      icon: <IoLibrary className="text-xl text-gray-900" />,
    },
    {
      title: "Settings",
      icon: <IoIosSettings className="text-xl text-gray-900" />,
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
      className={` h-full bg-white bg-red-30 overflow-y-auto  no-scrollbar absolute  md:sticky  z-50
                       ${
                         isSidebarOpen
                           ? ""
                           : " -translate-x-full md:translate-x-0"
                       }
                        transition-all duration-500  font-poppins text-sm font-medium shadow-[5px_2px_9px_0px_#00000024]`}
    >
      <Sidebar
        // className="h-screen"
        collapsed={collapsed}
        backgroundColor="#fff"
        width="210px"
        height='100%'
      >
        <Menu
          className=""
          menuItemStyles={{
            icon: { fontSize: "20px" },
          }}
        >
          {/* Menu Logo */}
          <MenuItem
            onClick={toggleCollapse}
            className={` side-menu-item   h-12    ${
              isActive("/") ? "bg-blue-500 text-white " : "side-menu-item"
            }`}
            icon={
              <>
                {" "}
                <RxHamburgerMenu />
              </>
            }
          ></MenuItem>

          {navLinks.map((link, index) =>
            link.subLinks ? (
              <SubMenu
                key={index}
                label={link.title}
                icon={link.icon}
                className={`relative side-menu-item  ${
                  isActive(link.path)
                    ? "bg-blue-500 text-gray-500"
                    : "side-menu-item "
                }`}
              >
                {link.subLinks.map((subLink, index) => (
                  <MenuItem
                    key={index}
                    className={`relative side-menu-item  ${
                      isActive(subLink.path)
                        ? "bg-blue-500 "
                        : "side-menu-item text-gray-400"
                    }`}
                    onClick={() => {
                      setIsSidebarOpen();
                      navigate(subLink.path);
                    }}
                  >
                    <div className="flex  ">
                      {" "}
                      {subLink.icon}{" "}
                      <span className="ml-2 ">{subLink.title}</span>{" "}
                    </div>
                  </MenuItem>
                ))}
              </SubMenu>
            ) : (
              <MenuItem
                className={`relative side-menu-item menu  ${
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
            ),
          )}

          <button
            onClick={handleLogout}
            href="#"
            className="flex w-full items-center p-2 mt-2 text-red-600 hover:bg-gray-200"
          >
            <IoLogOut className="text-xl mx-5 h-10" />
            {collapsed ? "" : "Logout"}
          </button>
        </Menu>
      </Sidebar>
    </div>
  );
};

export default UserSideBar;
