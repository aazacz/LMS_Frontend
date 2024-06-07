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
import Student_Diagnostic from "../components/User/Student_Diagnostic/Student_Diagnostic";
import Student_Diagnostic_Test from "../components/User/Student_Diagnostic_Test/Student_Diagnostic_Test";
import Aside_Section_Test_Page from "../components/User/Aside_Section_Test_Page/Aside_Section_Test_Page";
import HomePageContact from "../components/User/HomePageContact/HomePageContact";


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
          path="/diagnostic"
          element={user ? <Navigate to="/home " /> : <Student_Diagnostic />}
        />
          <Route
          path="/diagnostic_test"
          element={user ? <Navigate to="/home " /> : <Student_Diagnostic_Test />}
        />
         <Route
          path="/test_page_aside"
          element={user ? <Navigate to="/home " /> : <Aside_Section_Test_Page />}
        />
           <Route
          path="/HomePageContact"
          element={user ? <Navigate to="/home " /> : <HomePageContact />}
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
        {/* <Route path="/home/*" element={user ? <Homepage /> : <Navigate to="/admin" />} /> */}
      </Routes>
    );
  }

export default UserRoutes;
