{
    /*This is the sidebar for settings*/
}

import React from 'react'
import { Link } from 'react-router-dom'
import { PiUserSquareLight } from 'react-icons/pi'
import { IoIosSettings } from 'react-icons/io'
import { IoNotifications } from 'react-icons/io5'
import { MdHelpOutline } from 'react-icons/md'

const SettingsSideBar = () => {
    return (
        <div className="w-full  h-max flex flex-col justify-left items-start gap-6 font-poppins">
            <p className="text-sm md:text-lg font-bold">
                Update and Manage
                <br /> Your Account
            </p>
            <Link to={''}>
                <button className="rounded-md text-sm">
                    <div className="flex justify-center items-center gap-2">
                        <PiUserSquareLight className="w-6 h-6 md:w-8 md:h-8 text-gray-500" />
                        Edit Profile
                    </div>
                </button>
            </Link>

            <Link to={'accountsettings'}>
                {' '}
                <button className=" rounded-md text-sm">
                    <div className="flex justify-center items-center gap-2">
                        <IoIosSettings className="w-6 h-6 md:w-8 md:h-8 text-gray-500" />
                        Account Settings
                    </div>
                </button>
            </Link>
            <Link to={'notifications'}>
                <button className=" rounded-md text-sm">
                    <div className="flex justify-center items-center gap-2">
                        <IoNotifications className="w-6 h-6 md:w-8 md:h-8 text-gray-500" />
                        Notifications
                    </div>
                </button>
            </Link>

            <Link to={'notifications'}>
                <button className=" rounded-md text-sm ">
                    <div className="flex justify-center items-center gap-2">
                        <MdHelpOutline className="w-6 h-6 md:w-8 md:h-8 text-gray-500" />
                        Help Desk
                    </div>
                </button>
            </Link>
        </div>
    )
}

export default SettingsSideBar
