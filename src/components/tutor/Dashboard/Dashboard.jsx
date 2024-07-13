import React from 'react'

import Dashboard_Training_Stats from './Dashboard_Training_Stats'
import Dashboard_Calendar from './Dashboard_Calendar'
import Dashboard_StudentRequest from './Dashboard_StudentRequest'
import Dashboard_Notifications from './Dashboard_Notifications'
import Dashboard_TrainingList from './Dashboard_TrainingList'

const Dashboard = () => {
    return (
        <div className="w-full h-max flex flex-col">
            <div className="w-full h-max px-2">
                <Dashboard_Training_Stats />
            </div>
            <div className="w-full h-max flex ">
                <div className="w-full lg:w-[75%] h-max flex flex-col p-2 gap-2 ">
                    <Dashboard_Calendar />
                    <Dashboard_TrainingList />
                </div>
                <div className="w-[25%] h-max  flex-col p-2  hidden lg:block">
                    <Dashboard_StudentRequest />
                    <Dashboard_Notifications />
                </div>
            </div>
        </div>
    )
}

export default Dashboard
