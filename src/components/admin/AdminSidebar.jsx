import React, { useState } from "react";
// import "./SideBar.css";
// import SettingsIcon from "@mui/icons-material/Settings";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
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
// import Nav from "./Nav";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { HiArrowCircleLeft, HiArrowCircleRight } from "react-icons/hi";
import { HiArrowRightCircle } from "react-icons/hi2";




const AdminSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div>
      <div className="relative">
        {/* <Nav collapse={toggleCollapse} /> */}
        <div className="">

        <div className="w-full h-10   flex"> 
            {collapsed? <HiArrowCircleLeft  className="text-2xl z-30 absolute right-0 translate-x-1/2" onClick={toggleCollapse}  /> 
                      : <HiArrowCircleRight className="text-2xl z-30 absolute right-0 translate-x-1/2" onClick={toggleCollapse} />} 

                      </div>

        </div>

        <div className="sidebar-container">
          <Sidebar collapsed={collapsed} backgroundColor="#fff" width="220px">
            <Menu>
              <MenuItem
                onClick={() => {
                  navigate("/");
                }}
                className={`side-menu-item ${
                  isActive("/") ? "side-bar-active" : "side-menu-item"
                }`}
                icon={<InsightsIcon className="side-bar-icon" />}
              >
                {" "}
                Anayltics
              </MenuItem>
              <MenuItem
                onClick={() => {
                  navigate("/bookings");
                }}
                className={`side-menu-item ${
                  isActive("/bookings") ? "side-bar-active" : "side-menu-item"
                }`}
                icon={<AirplaneTicketIcon className="side-bar-icon" />}
              >
                {" "}
                Bookings
              </MenuItem>
              <MenuItem
                onClick={() => {
                  navigate("/customers");
                }}
                className={`side-menu-item ${
                  isActive("/customers") ? "side-bar-active" : "side-menu-item"
                }`}
                icon={<GroupIcon />}
              >
                {" "}
                Customers{" "}
              </MenuItem>
              <MenuItem
                className={`side-menu-item ${
                  isActive("/reviews") ? "side-bar-active" : "side-menu-item"
                }`}
                icon={<RateReviewIcon />}
                onClick={() => {
                  navigate("/reviews");
                }}
              >
                Reviews{" "}
              </MenuItem>
              <SubMenu
                className="side-menu-item"
                icon={<AccountCircleIcon />}
                label="Users"
              >
                <MenuItem
                  className={`side-bar-text ${
                    isActive("/add-user") ? "side-bar-active" : "side-menu-item"
                  }`}
                  icon={<PersonAddIcon />}
                  onClick={() => {
                    navigate("/add-user");
                  }}
                >
                  {" "}
                  Add User{" "}
                </MenuItem>
                <MenuItem
                  className={`side-bar-text ${
                    isActive("/view-user")
                      ? "side-bar-active"
                      : "side-menu-item"
                  }`}
                  icon={<PeopleIcon />}
                  onClick={() => {
                    navigate("/view-user");
                  }}
                >
                  {" "}
                  View Users{" "}
                </MenuItem>
              </SubMenu>
              <SubMenu
                className="side-menu-item"
                icon={<FlightIcon />}
                label="Flight Data"
              >
                <MenuItem
                  icon={<FlightLandIcon />}
                  className={`side-bar-text ${
                    isActive("/airports") ? "side-bar-active" : "side-menu-item"
                  }`}
                  onClick={() => {
                    navigate("/airports");
                  }}
                >
                  {" "}
                  Airports{" "}
                </MenuItem>
                <MenuItem
                  icon={<AirlinesIcon />}
                  className={`side-bar-text ${
                    isActive("/airlines") ? "side-bar-active" : "side-menu-item"
                  }`}
                  onClick={() => {
                    navigate("/airlines");
                  }}
                >
                  {" "}
                  Airlines{" "}
                </MenuItem>
              </SubMenu>

              <MenuItem
                icon={<CurrencyRupeeIcon />}
                className={`side-bar-text ${
                  isActive("/mark-up") ? "side-bar-active" : "side-menu-item"
                }`}
                onClick={() => {
                  navigate("/mark-up");
                }}
              >
                Mark Up
              </MenuItem>

              <MenuItem
                icon={<AdminPanelSettingsIcon />}
                className={`side-bar-text ${
                  isActive("/profile") ? "side-bar-active" : "side-menu-item"
                }`}
                onClick={() => {
                  navigate("/profile");
                }}
              >
                Profile
              </MenuItem>
            </Menu>
          </Sidebar>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;