import React, { useEffect, useState }   from "react";
import { useDispatch, useSelector }     from "react-redux";
import { FaBars }                       from "react-icons/fa";
import logo                             from "../../assets/mindsatlogo.webp";
import { Link, useNavigate }            from "react-router-dom";
import { motion, AnimatePresence }      from "framer-motion";
import { LiaSignOutAltSolid }           from "react-icons/lia";
import { clearStudentDetails }          from "../../store/reducers/StudentloginSlice";

const UserNavbar = ({ toggleSidebar, isSidebarOpen, User }) => {
  const [Showsidebar, setShowsidebar] = useState(false);
  const [show, setShow] = useState(false);

  const user = useSelector((state) => state.StudentDetails.token);
  const student = useSelector((state) => state.StudentDetails);
  const userName = useSelector((state) => state.StudentDetails.userName);
  const navigate = useNavigate();
  
  console.log(userName)
  // console.log(userName[0])
  const [NameLetter, SetNameLetter] = useState(userName ? userName[0] : "");

  const handleToggle = () => {
    setShow(!show);
  };

  useEffect(() => {
    console.log(Showsidebar);
  }, [Showsidebar]);

  const dispatch = useDispatch();

  const handleLogout = () => {
    setShowsidebar(false);
    dispatch(clearStudentDetails());
    navigate("/");
  };

  return (
    <div
      className="Test  px-8 justify-between w-full h-[12vh]
                  border-b-[1px] flex items-center  relative 
                 transition-all duration-500"
    >
      <div className="w-[140px] lg:w-[200px] text-5xl h-full font-poppins flex justify-center items-center">
        <Link to="/">
          <img src={logo} className="w-full cursor-pointer" alt="logo" />
        </Link>
      </div>

      <AnimatePresence>
        {Showsidebar && (
          <motion.div
            onMouseOver={() => setShowsidebar(true)}
            onMouseOut={() => setShowsidebar(false)}
            initial={{ opacity: 0, y: "20px" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "20px" }}
            className="absolute top-[8vh] right-0 w-[200px] cursor-pointer z-[9] bg-transparent h-max"
          >
            <div className="relative top-[25px] shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-  w-full h-full">
              <Link to={"/student/courses"}>
                <div
                  onClick={() => setShowsidebar(false)}
                  className="w-full h-[50px] bg-gray-100 hover:bg-gray-200  flex justify-center border-b-2 items-center px-5 text-xl font-Roboto font-medium text-blue-700"  >
                  Courses
                </div>
              </Link>
            
              <Link to={"/student/assignments"}>
                <div
                  onClick={() => setShowsidebar(false)}
                  className="w-full h-[50px] bg-gray-100 hover:bg-gray-200  flex justify-center border-b-2 items-center px-5 text-xl font-Roboto font-medium text-blue-700" >
                  Assignment
                </div>
              </Link>
              <Link to={"/student/settings"}>
                <div
                  onClick={() => setShowsidebar(false)}
                  className="w-full h-[50px] bg-gray-100 hover:bg-gray-200  flex justify-center border-b-2 items-center px-5 text-xl font-Roboto font-medium text-blue-700"
                >
                  Settings
                </div>
              </Link>
              <div
                onClick={() => handleLogout()}
                className="w-full h-[50px] bg-gray-100 hover:bg-gray-200  flex justify-center border-b-2 items-center px-5 text-xl font-Roboto font-medium text-red-700"
              >
                <LiaSignOutAltSolid className="text-xl mr-2" />
                Signout
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex-1 flex justify-end items-center">
        {user ? (
          <div className="flex items-center gap-4">
            {/* <div className="w-16 flex h-9 justify-start px-2">
              <div className="rounded-lg h-8 w-8 flex justify-center items-center text-black border-[1px] border-black mr-1">
                <FaBell />
              </div>
              <div className="rounded-[4px] h-4 w-4 flex justify-center items-center bg-red-700 relative">
                <div className="absolute rotate-45 -translate-x-1/2 -translate-y-1/2 w-[6px] h-[6px] top-1/2 left-[1px]"></div>
                <p className="text-xs text-white">8</p>
              </div>
            </div> */}
            <div className="relative flex items-center">
              {student.userImg ? (
                <img
                  onClick={() => setShowsidebar(!Showsidebar)}
                  className="rounded-full object-cover cursor-pointer w-[42px] h-[42px]"
                  src={student.userImg}
                  alt="profile"
                />
              ) : (
                <div
                  onClick={() => setShowsidebar(!Showsidebar)}
                  className="rounded-full cursor-pointer mt-2 w-[42px] h-[42px] bg-gray-600 flex items-center justify-center text-white font-bold text-2xl"
                >
                  {userName.charAt(0).toUpperCase()}
                </div>
              )}
              <div className="ml-3 mt-2 font-semibold text-lg">{userName}</div>
            </div>
          </div>
        ) : (
          <>
            <button className="xl:hidden ml-auto mr-4" onClick={handleToggle}>
              <FaBars
                className={`text-lg ${
                  show ? "rotate-90" : ""
                } transition-all duration-700`}
              />
            </button>
            <div
              className={`${
                !show ? "-translate-y-[1280px]" : ""
              } xl:hidden fixed top-[12vh] right-0 w-full bg-white h-max transition-transform duration-700 ease-in-out flex flex-col items-center`}
            >
              <Link to={"/login"}>
                <div
                  onClick={() => setShow(false)}
                  className="text-left px-3 text-[16px] h-[35px] text-blue-700 font-poppins font-bold"
                >
                  Courses
                </div>
              </Link>
              <Link to={"/login"}>
                <div
                  onClick={() => setShow(false)}
                  className="px-3 text-[16px] h-[35px] text-blue-700 font-poppins font-bold"
                >
                  Tutors
                </div>
              </Link>
              <Link to={"/login"}>
                <div
                  onClick={() => setShow(false)}
                  className="px-3 text-[16px] h-[35px] text-blue-700 font-poppins font-bold"
                >
                  Pricing
                </div>
              </Link>
              <Link to={"/login"}>
                <div
                  onClick={() => setShow(false)}
                  className="px-3 text-[16px] h-[35px] text-blue-700 font-poppins font-bold"
                >
                  Diagnose Test
                </div>
              </Link>
              <Link to={"/login"}>
                <div
                  onClick={() => setShow(false)}
                  className="px-3 text-[16px] h-[35px] text-blue-700 font-poppins font-bold"
                >
                  Contact
                </div>
              </Link>
              <Link to={"/login"}>
                <div
                  onClick={() => setShow(false)}
                  className="px-3 text-[16px] h-[35px] text-blue-700 font-poppins font-bold"
                >
                  Sign in
                </div>
              </Link>
              <Link to={"/signup"}>
                <div
                  onClick={() => setShow(false)}
                  className="px-3 text-[16px] h-[35px] text-blue-700 font-poppins font-bold"
                >
                  Register
                </div>
              </Link>
            </div>
          </>
        )}
       
       
       {/*Show the profile image if the user is already logged in    */}
        {!user 
           &&
        (
          <div className="hidden xl:flex xl:w-[90%] justify-end items-center h-full">
            <div className="h-1/2 flex gap-8 justify-between">
              <div className="flex gap-5">
                <Link to={"/login"}>
                  <button className="px-3 text-[16px] h-[35px] text-blue-700 font-poppins font-bold">
                    Courses
                  </button>
                </Link>
                <Link to={"/login"}>
                  <button className="px-3 text-[16px] h-[35px] text-blue-700 font-poppins font-bold">
                    Tutors
                  </button>
                </Link>
                <Link to={"/login"}>
                  <button className="px-3 text-[16px] h-[35px] text-blue-700 font-poppins font-bold">
                    Team
                  </button>
                </Link>
                <Link to={"/login"}>
                  <button className="px-3 text-[16px] h-[35px] text-blue-700 font-poppins font-bold">
                    Pricing
                  </button>
                </Link>
                <Link to={"/login"}>
                  <button className="px-3 text-[16px] h-[35px] text-blue-700 font-poppins font-bold">
                    Diagnose Test
                  </button>
                </Link>
              </div>
              <div className="flex items-center gap-8 justify-center ">
                <Link to={"/login"}>
                  <button className="px-3 text-[16px]  h-[35px] text-blue-700 font-poppins rounded-lg font-bold">
                    Sign in
                  </button>
                </Link>
                <Link to={"/signup"}>
                  <button className="px-3 text-[14px] bg-blue-700 h-[35px] text-white font-poppins rounded-lg font-semibold">
                    Register
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserNavbar;




