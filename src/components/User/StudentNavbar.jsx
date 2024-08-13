import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaBell } from "react-icons/fa6";
import { FiBookOpen, FiBook } from "react-icons/fi";
import { IoIosArrowForward } from "react-icons/io";
import "../User/StudentNavbar.css";
import logo from "../../assets/Student/Logo.png";

const StudentNavbar = ({ toggleSidebar, isSidebarOpen }) => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.StudentDetails);
  const [showNotification, setShowNotification] = useState(false);

  // Fake data for notifications
  const notifications = [
    { type: "test", title: "Math Test", date: "2024-08-15", time: "10:00 AM" },
    { type: "assignment", title: "History Essay", deadline: "2024-08-20" },
    {
      type: "test",
      title: "Science Quiz",
      date: "2024-08-18",
      time: "2:00 PM",
    },
    { type: "assignment", title: "English Project", deadline: "2024-08-25" },
  ];

  const handleNotificationCard = () => {
    setShowNotification(!showNotification);
  };

  return (
    <>
      <div className="navbar-container md:px-4 px-2 sticky top-0 w-full h-fit border-b-[1px] flex justify-between items-center bg-white">
        {/* Left side */}
        <div className="p-1 w-[60%] h-fit font-poppins relative">
          <img src={logo} className="mt-2 md:w-[100px] w-[90px]" alt="" />
          <p className="md:pl-0 text-sm z-10">Welcome Back!</p>
          <p className="md:pl-0 md:text-sm font-bold block md:hidden z-20">
            {user.userName}
          </p>
        </div>

        {/* Right side */}
        <div className="w-[40%] flex justify-end h-max">
          <div className="flex items-center">
            {/* Notification bell */}
            <div className="w-16 flex h-9 justify-start px-2 relative">
              <div
                className="rounded-lg h-8 w-8 flex justify-center items-center text-black border-[1px] border-black mr-1 cursor-pointer"
                onClick={handleNotificationCard}
              >
                <FaBell />
              </div>
              {/* Notification red icon */}
              <div className="rounded-[4px] h-4 w-4 flex justify-center items-center bg-red-700 relative">
                <div className="absolute rotate-45 -translate-x-1/2 -translate-y-1/2 bg-red-700 w-[6px] h-[6px] top-1/2 left-[1px]"></div>
                <p className="text-xs text-white">{notifications.length}</p>
              </div>

              {/* Notification Dropdown */}
              {showNotification && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-md shadow-lg z-50">
                  <div className="py-2 px-4 bg-gray-100 font-bold">
                    Notifications
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.map((notification, index) => (
                      <div
                        key={index}
                        className="py-2 px-4 border-b hover:bg-gray-50"
                      >
                        <p className="font-semibold">{notification.title}</p>
                        {notification.type === "test" ? (
                          <p className="text-sm text-gray-600">
                            Test on {notification.date} at {notification.time}
                          </p>
                        ) : (
                          <p className="text-sm text-gray-600">
                            Due on {notification.deadline}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Hamburger button */}
            {isSidebarOpen ? (
              <FiBookOpen
                onClick={() => toggleSidebar()}
                className="block md:hidden z-30 text-2xl"
              />
            ) : (
              <FiBook
                onClick={() => toggleSidebar()}
                className="block md:hidden z-30 text-2xl"
              />
            )}

            {/* Admin NAME EMAIL AND PROFILE PHOTO */}
            <div className="flex-1 h-auto md:flex md:flex-row items-center flex-col hidden">
              <div className="relative flex items-center">
                {user.userImg ? (
                  <img
                    className="rounded-full object-cover overflow-hidden md:w-[42px] md:h-[42px] w-[20px]"
                    src={user.userImg}
                    alt="Profile"
                  />
                ) : (
                  <div className="rounded-full bg-gray-600 flex items-center justify-center text-white font-bold text-xl md:w-[42px] md:h-[42px] w-[20px] h-[20px]">
                    {user.userName ? user.userName.charAt(0).toUpperCase() : ""}
                  </div>
                )}
              </div>
              <div className="flex items-center">
                <div className="md:px-3">
                  <p className="font-poppins">{user.userName}</p>
                  <p className="text-gray-500 font-poppins">{user.email}</p>
                </div>
                <IoIosArrowForward className="text-2xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentNavbar;
