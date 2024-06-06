import React from "react";
import {
  Route,
  Routes,
  Navigate,
  BrowserRouter as Router,
} from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "../pages/student/Login";
import Homepage from "../pages/student/HomePage";
import Signup from "../components/User/Signup";
import Animation_ReviewPage from "../components/User/Animation_ReviewPage/Animation_ReviewPage";
import Animation_Courses from "../components/User/Animation_Courses/Animation_Courses";
import Animation_Tutor from "../components/User/Animation_Tutor/Animation_Tutor";
import Animation_Methodolgy from "../components/User/Animation_Methodology/Animation_Methodolgy";
import SignupPersonalDetails from "../components/User/SignupPersonalDetails/SignupPersonalDetails";
import SignupOtp from "../components/User/SignupOtp/SignupOtp";
import SignupSat from "../components/User/SignupSat/SignupSat";
import SignupEducation from "../components/User/SignupEducation/SignupEducation";
import StudentHomepage from "../pages/student/StudentHomepage";
import HomePageTeam from "../components/User/HomePageTeam/HomePageTeam";
import HomePagePlans from "../components/User/HomePagePlans/HomePagePlans";
import HomePageDiagnosis from "../components/User/HomePageDiagnosis/HomePageDiagnosis";

const UserRoutes = () => {
  const user = useSelector((state) => state.token.user);
  console.log(user);

  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route
        path="/login"
        element={user ? <Navigate to="/home" /> : <Login />}
      />
      <Route
        path="/Signup"
        element={user ? <Navigate to="/home" /> : <Signup />}
      />
      <Route
        path="/review"
        element={user ? <Navigate to="/home" /> : <Animation_ReviewPage />}
      />
      <Route
        path="/courses"
        element={user ? <Navigate to="/home" /> : <Animation_Courses />}
      />
      <Route
        path="/tutor"
        element={user ? <Navigate to="/home " /> : <Animation_Tutor />}
      />
      <Route
        path="/methodology"
        element={user ? <Navigate to="/home " /> : <Animation_Methodolgy />}
      />
      <Route
        path="/HomePageTeam"
        element={user ? <Navigate to="/home " /> : <HomePageTeam />}
      />
      <Route
        path="/HomePagePlans"
        element={user ? <Navigate to="/home " /> : <HomePagePlans />}
      />
      <Route
        path="/HomePageDiagnosis"
        element={user ? <Navigate to="/home " /> : <HomePageDiagnosis />}
      />
      <Route path="/" element={<Homepage />} />
      <Route path="/student/*" element={<StudentHomepage />} />
      <Route
        path="/login"
        element={user ? <Navigate to="/home" /> : <Login />}
      />
      <Route
        path="/Signup"
        element={user ? <Navigate to="/home" /> : <Signup />}
      />
      {/* <Route path="/home/*" element={user ? <Homepage /> : <Navigate to="/admin" />} /> */}
      <Route
        path="/SignupPersonalDetails"
        element={<SignupPersonalDetails />}
      ></Route>
      <Route path="/SignupOtp" element={<SignupOtp />}></Route>
      <Route path="/SignupSat" element={<SignupSat />}></Route>
      <Route path="/SignupEducation" element={<SignupEducation />}></Route>
    </Routes>
  );
};

export default UserRoutes;
