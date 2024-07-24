import React from "react";
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
  const user = useSelector((state) => state.AdminDetails.token);
  token = useSelector((state) => state.AdminDetails.token);

  return (
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
  );
};

export default AdminRoutes;
