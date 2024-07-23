import { React, useState } from 'react'
import SettingsSideBar from './SettingsSideBar'
import { Routes, Route } from 'react-router-dom'
import EditProfile from './EditProfile'
import AccountSettings from './AccountSettings'
import Notifications from './Notifications'

const Settings = () => {
    return (
        <div className="w-full h-max  flex">
            <div className="w-full h-64 p-2">
                
                <Routes>
                 
                    <Route path="/"                 element={<EditProfile />} />
                    <Route path="/accountsettings"  element={<AccountSettings />}  />
                    
                </Routes>
                
            </div>
        </div>
    )
}

export default Settings
