import React, { lazy, Suspense } from 'react';
import './App.css';
import { Route, Routes } from "react-router-dom";
import ErrorPage from './pages/ErrorPage';
import Loader from './components/reusable/Loader';
// import AdminRoutes from './routes/AdminRoutes';
// import TutorRoutes from './routes/TutorRoutes';
// import UserRoutes from './routes/UserRoutes';

const AdminRoutes = lazy(() => import('./routes/AdminRoutes'));
const TutorRoutes = lazy(() => import('./routes/TutorRoutes'));
const UserRoutes = lazy(() => import('./routes/UserRoutes'));


function App() {
  return (
   
      <Suspense fallback={<div className='w-screen h-screen flex justify-center items-center '><Loader/></div>}>
        <Routes>
          <Route path='/admin/*' element={<AdminRoutes />} />
          <Route path='/tutor/*' element={<TutorRoutes />} />
          <Route path='/*' element={<UserRoutes />} />
          <Route path="/error" element={<ErrorPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Suspense>

  );
}

export default App;
