import { React, useState } from 'react'
import SettingsSideBar from './SettingsSideBar'
import { Routes, Route } from 'react-router-dom'
import EditProfile from './EditProfile'
import AccountSettings from './AccountSettings'
import About from './About'
import Notifications from './Notifications'

const Settings = () => {
    return (
        <div className="w-full h-max  flex">
            {/* <div className="w-[20%] h-max p-2 flex justify-center items-center">
        <SettingsSideBar />
        </div> */}
            <div className="w-full h-64 p-2">
                <Routes>
                    <Route path="/" element={<EditProfile />} />
                    <Route
                        path="/accountsettings"
                        element={<AccountSettings />}
                    />
                    <Route path="/about" element={<About />} />
                    <Route path="/notifications" element={<Notifications />} />
                </Routes>
            </div>
        </div>
    )
}

export default Settings
