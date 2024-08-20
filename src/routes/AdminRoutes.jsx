import React, { useState } from "react";
import Homepage from "../pages/admin/Homepage";
import AdminLogin from "../pages/admin/Login";
import {
  Route,
  Routes,
  Navigate,
  BrowserRouter as Router,
} from "react-router-dom";
import { useSelector } from "react-redux";
import ErrorPage from "../pages/ErrorPage";
import axios from "axios";
import InfoModal from "./InfoModal";

const baseURL = process.env.REACT_APP_API_URL;
let token = null;

export const AdminAxiosInstance = axios.create();

AdminAxiosInstance.interceptors.request.use(
  function (config) {
    config.baseURL = baseURL;
    console.log(`authorization-key ${token}`);

    if (token) {
      config.headers.authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

AdminAxiosInstance.interceptors.response.use(
  function (response) {
    console.log("response received" + response.data.message);

    if (response.data.message === "TimedOut") {
    }
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

const AdminRoutes = () => {
  const [showModal, setShowModal] = useState(true);

  const handleClose = () => {
    setShowModal(false);
  };

  const user = useSelector((state) => state.AdminDetails.token);
  token = useSelector((state) => state.AdminDetails.token);

  return (
    <>
      {/* {showModal && (
        <InfoModal
          Line1="I added a text editor to the course structure and course, "
          Line2="Therefore you may face error with old course and courseSturuture datas"
          Line3="If error occurs create new COURSE AND COURSE STURUCTURE," 
          onClose={handleClose}
        />
      )} */}
      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="/admin/home" /> : <AdminLogin />}
        />
        <Route
          path="/home/*"
          element={user ? <Homepage /> : <Navigate to="/admin" />}
        />
        <Route path="/*" element={<ErrorPage />} />
      </Routes>
    </>
  );
};

export default AdminRoutes;
