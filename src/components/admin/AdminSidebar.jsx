import React, { useState } from "react";
import Logohalf from "/Logohalf.png";
import Logohalf2 from "/Logohalf2.png";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";




import AirplaneTicketIcon from "@mui/icons-material/AirplaneTicket";
import GroupIcon from "@mui/icons-material/Group";
import RateReviewIcon from "@mui/icons-material/RateReview";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PeopleIcon from "@mui/icons-material/People";
import FlightIcon from "@mui/icons-material/Flight";
import AirlinesIcon from "@mui/icons-material/Airlines";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import InsightsIcon from "@mui/icons-material/Insights";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { HiArrowCircleLeft, HiArrowCircleRight } from "react-icons/hi";
import { HiArrowRightCircle } from "react-icons/hi2";
import { MdDashboard } from "react-icons/md";
import { FaBookAtlas } from "react-icons/fa6";
import { FaBookReader } from "react-icons/fa";
import { PiCirclesFourFill } from "react-icons/pi";
import { IoIosKey, IoIosPerson, IoIosSettings } from "react-icons/io";
import { IoLogOut, IoNotifications } from "react-icons/io5";
import { Tooltip } from "react-tooltip";
import { RxHamburgerMenu } from "react-icons/rx";




const AdminSidebar = ({ isOpen }) => {

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
      return
    }
    else {
      setCollapsed(true)
      setTimeout(() => {

        setCollapsed(false)
      }, 1000)

    }
  }
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
      icon: <PiCirclesFourFill className="text-xl text-gray-700" />,
    },
    {
      title: "Courses",
      path: "/admin/home/courses",
      icon: <PiCirclesFourFill className="text-xl text-gray-700" />,
    },
    {
      title: "Course Structure",
      path: "/admin/home/courseStructure",
      icon: <PiCirclesFourFill className="text-xl text-gray-700" />,
    },

    { title: "Students", path: "/admin/home/students", icon: <PiCirclesFourFill /> },
    { title: "Tutors", path: "/admin/home/tutors", icon: <PiCirclesFourFill /> },
    { title: "Diagnosis Test", path: "/admin/home/diagnosistest", icon: <PiCirclesFourFill /> },
    { title: "Library", path: "/admin/home/library", icon: <PiCirclesFourFill /> },
    // { title: "Access Management", path: "/admin/home/accessmanagement", icon: <PiCirclesFourFill /> },

    {
      title: "Settings",
      icon: <IoIosSettings className="text-xl text-gray-700" />,
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
        {
          title: "Notifications",
          path: "/admin/home/settings/notifications",
          icon: <IoNotifications className="text-xl text-gray-700" />,
        },
      ],
    },
  ];






  return (
    <div className={`relative ${!false ? " " : "fixed md:relative z-50"} h-screen transition-all duration-500  font-poppins text-sm font-medium `}>
      <Sidebar className="h-screen" collapsed={collapsed} backgroundColor="#fff" width="210px">
        <Menu
          className=""
          menuItemStyles={{
            icon: { fontSize: '20px' },
          }}
        >


          {/* Menu Logo */}
          <MenuItem
            onClick={toggleCollapse}
            className={`side-menu-item   h-12    ${isActive("/") ? "bg-blue-500 text-white " : "side-menu-item"
              }`}
            icon={<> <RxHamburgerMenu /></>}

          >
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
                    <div className="flex ">      {subLink.icon}     <span className="ml-2 ">{subLink.title}</span>       </div>
                  </MenuItem>
                ))}
              </SubMenu>
            ) : (

              <MenuItem className={`relative side-menu-item menu  ${isActive(link.path) ? "bg-blue-500 text-black" : "side-menu-item"}`}
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

export default AdminSidebar;