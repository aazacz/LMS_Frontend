import React from "react";
import { useSelector } from "react-redux";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import SignupPersonalDetails from "../components/User/SignupPersonalDetails/SignupPersonalDetails";
import SignupOtp from "../components/User/SignupOtp/SignupOtp";
import SignupSat from "../components/User/SignupSat/SignupSat";
import SignupEducation from "../components/User/SignupEducation/SignupEducation";
import UserNavbar from "../components/User/UserNavbar";

const pageVariants = {
  initial: {
    opacity: 0,
    x: "-5vw",
  },
  in: {
    opacity: 1,
    x: 0,
  },
  out: {
    opacity: 0,
    x: "5vw",
  },
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.5,
};

const SignupRoute = () => {
  const user = useSelector((state) => state.user); // Replace with your actual state selector
  const location = useLocation();

  return (
    <>
      <UserNavbar />
      <div className="w-screen h-[88vh] flex-1  flex justify-center items-center ">

      <AnimatePresence mode="wait" >
        <Routes location={location} key={location.pathname}>
          <Route
            path="/*"
            element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <SignupPersonalDetails />
              </motion.div>
            }
          />
          <Route
            path="/signupotpverify"
            element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <SignupOtp />
              </motion.div>
            }
          />
          <Route
            path="/signupSat"
            element={
                <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <SignupSat />
              </motion.div>
            }
          />
          <Route
          
            path="/signupEducation"
            element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <SignupEducation />
              </motion.div>
            }
            />
        </Routes>
      </AnimatePresence>
            </div>
    </>
  );
};

export default SignupRoute;
