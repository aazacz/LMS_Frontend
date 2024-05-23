import React from 'react'
import AdminNavbar from '../../components/admin/AdminNavbar'
import Sidebar from '../../components/admin/Sidebar'
import { Route, Routes } from "react-router-dom";

const Homepage = () => {



    return (
        <>

            <div className='flex w-full '>
                <Sidebar />
                <div className='w-full px-2'>
                    <AdminNavbar />

                    <Routes>
                        <Route path="/" element={<div className='w-full h-10 bg-red-400'> hell hai da muthe</div>} />
                    </Routes>

                </div>
            </div>
        </>
    )
}

export default Homepage