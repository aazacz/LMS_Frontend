import React, { useState, useEffect } from 'react'
import Dashboard_Training_Stats from './Dashboard_Training_Stats'
import Dashboard_Calendar from './Dashboard_Calendar'
import Dashboard_StudentRequest from './Dashboard_StudentRequest'
import Dashboard_Notifications from './Dashboard_Notifications'
import Dashboard_TrainingList from './Dashboard_TrainingList'
import { IoIosNotifications, IoIosListBox } from 'react-icons/io'

const Dashboard = () => {
    const [showStudentRequest, setShowStudentRequest] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (event.target.classList.contains('modal-overlay')) {
                setShowStudentRequest(false);
                setShowNotifications(false);
            }
        };

        window.addEventListener('click', handleClickOutside);
        return () => {
            window.removeEventListener('click', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (showStudentRequest || showNotifications) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }
    }, [showStudentRequest, showNotifications]);

    return (
        <div className="w-full h-max flex flex-col">
            {/* Icons for small and medium screens */}
            <div className='flex justify-between'>
            <h2 className='text-xl font-bold font-poppins p-4'>Dashboard</h2>
            <div className="lg:hidden flex gap-4 p-2 justify-end">
                
                <button onClick={() => setShowStudentRequest(true)}>
                    <IoIosListBox className='text-white bg-blue-600 p-2 rounded-full' size={40} />
                </button>
                <button onClick={() => setShowNotifications(true)}>
                    <IoIosNotifications className='text-white bg-blue-600 p-2 rounded-full' size={40} />
                </button>
            </div>
            </div>
            <div className="w-full h-max px-2">
                <Dashboard_Training_Stats />
            </div>
            <div className="w-full h-max flex">
                <div className="w-full lg:w-[75%] h-max flex flex-col p-2 gap-2">
                    <Dashboard_Calendar />
                    <Dashboard_TrainingList />
                </div>
                <div className="w-[25%] h-max flex-col p-2 hidden lg:block">
                    <Dashboard_StudentRequest />
                    <Dashboard_Notifications />
                </div>
            </div>

            {/* Modals for small and medium screens */}
            {showStudentRequest && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center  modal-overlay">
                    <div className="bg-white rounded-md p-4 w-11/12 h-5/6 overflow-y-auto relative backdrop-blur-sm z-50">
                        <button 
                            onClick={() => setShowStudentRequest(false)} 
                            className="absolute top-2 w-8 h-8 bg-red-600 text-center rounded-full right-4 text-2xl text-white"
                        >
                            &times;
                        </button>
                        <Dashboard_StudentRequest />
                    </div>
                </div>
            )}

            {showNotifications && (
                <div className="fixed inset-0 text-white bg-black bg-opacity-50 flex items-center justify-center  modal-overlay">
                    <div className="bg-white  rounded-md p-4 w-11/12 h-5/6 overflow-y-auto relative backdrop-blur-sm z-50">
                        <button 
                            onClick={() => setShowNotifications(false)} 
                            className="absolute top-2 w-8 h-8 bg-red-600 text-center rounded-full right-4 text-2xl text-white"
                        >
                            &times;
                        </button>
                        <Dashboard_Notifications />
                    </div>
                </div>
            )}
        </div>
    )
}

export default Dashboard
