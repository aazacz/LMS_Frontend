import React, { useState } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import {
  PiChalkboardTeacherFill,
  PiExamFill,
  PiStudentBold,
} from "react-icons/pi";
import { IoIosKey, IoIosPerson, IoIosSettings } from "react-icons/io";
import { IoLibrary, IoLogOut, IoNotifications } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { GiBookmarklet } from "react-icons/gi";
import { PiTreeStructureFill } from "react-icons/pi";
import { clearAdminDetails } from "../../store/reducers/AdminloginSlice";
import { HiDocumentReport } from "react-icons/hi";

const AdminSidebar = ({ isOpen, isSidebarOpen, setIsSidebarOpen }) => {
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

  // Handle logout function
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

  // Handle logout function
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
        dispatch(clearAdminDetails());
        navigate("/admin");
      }
    });
  };

  const navLinks = [
    {
      title: "Dashboard",
      path: "/admin/home/dashboard",
      icon: <MdDashboard className="text-xl text-gray-900" />,
    },
    {
      title: "Courses",
      path: "/admin/home/courses",
      icon: <GiBookmarklet className="text-xl text-gray-900" />,
    },
    {
      title: "Course Structure",
      path: "/admin/home/courseStructure",
      icon: <PiTreeStructureFill className="text-xl text-gray-900" />,
    },
    {
      title: "Package",
      path: "/admin/home/package",
      icon: <PiStudentBold className="text-xl text-gray-900" />,
    },

    {
      title: "Students",
      path: "/admin/home/students",
      icon: <PiStudentBold className="text-xl text-gray-900" />,
    },
    {
      title: "Tutors",
      path: "/admin/home/tutors",
      icon: <PiChalkboardTeacherFill className="text-xl text-gray-900" />,
    },
    {
      title: "Diagnosis Test",
      path: "/admin/home/diagnosistest",
      icon: <PiExamFill className="text-xl text-gray-900" />,
    },
    {
      title: "Sales Report",
      path: "/admin/home/report",
      icon: <HiDocumentReport className="text-xl text-gray-900" />,
    },
    { title: "Library", path: "/admin/home/library", icon: <IoLibrary /> },
    // { title: "Access Management", path: "/admin/home/accessmanagement", icon: <PiCirclesFourFill /> },

    {
      title: "Settings",
      icon: <IoIosSettings className="text-xl text-gray-900" />,
      subLinks: [
        {
          title: "Profile",
          path: "/admin/home/settings",
          icon: <IoIosPerson className="text-xl text-gray-700" />,
        },
        {
          title: "Account",
          path: "/admin/home/settings/accountsettings",
          icon: <IoIosKey className="text-xl text-gray-700" />,
        },
        // {
        //   title: "Notifications",
        //   path: "/admin/home/settings/notifications",
        //   icon: <IoNotifications className="text-xl text-gray-700" />,
        // },
      ],
    },
  ];

  return (
    <div
      className={`h-full bg-white no-scrollbar overflow-y-auto absolute  md:sticky  z-50
                       ${
                         isSidebarOpen
                           ? ""
                           : " -translate-x-full md:translate-x-0"
                       }
                         transition-all duration-500  font-poppins text-sm font-medium shadow-[5px_2px_9px_0px_#00000024]`}
    >
      <Sidebar collapsed={collapsed} backgroundColor="#fff" width="210px">
        <Menu
          menuItemStyles={{
            icon: { fontSize: "20px" },
          }}
        >
          {/* Menu Logo */}
          <MenuItem
            onClick={toggleCollapse}
            className={`side-menu-item   h-12    ${
              isActive("/") ? "bg-blue-500 text-white " : "side-menu-item"
            }`}
            icon={
              <>
                {" "}
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
                        : "side-menu-item text-gray-400"
                    }`}
                    onClick={() => {
                      setIsSidebarOpen(false);
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

export default AdminSidebar;
