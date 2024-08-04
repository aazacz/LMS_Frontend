import React, {lazy, Suspense} from "react";
import "./App.css";
import {Route, BrowserRouter as Router, Routes} from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import Loader from "./components/reusable/Loader";
import AdminRoutes from "./routes/AdminRoutes";
import TutorRoutes from "./routes/TutorRoutes";
import UserRoutes from "./routes/UserRoutes";
import ViewAllCourses from "./components/User/ViewAllCourses";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import Coursedetails from "./components/User/Coursedetails";

// const AdminRoutes = lazy(() => import('./routes/AdminRoutes'));
// const TutorRoutes = lazy(() => import('./routes/TutorRoutes'));
// const UserRoutes = lazy(() => import('./routes/UserRoutes'));

function App() {
  const queryClient = new QueryClient();
  return (
    // <Suspense fallback={<div className='w-screen h-screen flex justify-center items-center '><Loader/></div>}>

    <Router>
      <Routes>
        <Route path="/admin/*" element={<AdminRoutes />} />
        <Route path="/tutor/*" element={<TutorRoutes />} />
        <Route path="/*" element={<UserRoutes />} />
        <Route path="/error" element={<ErrorPage />} />

        <Route
          path="/allcourses"
          element={
            <QueryClientProvider client={queryClient}>
              <ViewAllCourses />
            </QueryClientProvider>
          }
        />
        <Route
          path="/allcourses/courses/:courseId/:courseType"
          element={
            <QueryClientProvider client={queryClient}>
              <Coursedetails />
            </QueryClientProvider>
          }
        />

        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>

    // </Suspense>
  );
}

export default App;
