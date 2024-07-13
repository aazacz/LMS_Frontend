import React, { useState } from 'react'
import { FaEyeSlash } from 'react-icons/fa'
import { FaEye } from 'react-icons/fa'

import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import { SlPencil } from 'react-icons/sl'
import Tooltip from '@mui/material/Tooltip'

const AccountSettings = () => {
    const [isChecked, setIsChecked] = useState(false)
    const [isEditable, setIsEditable] = useState(false) // New state for edit mode
    const navigate = useNavigate()

    const handleCheckboxChange = (event) => {
        setIsChecked(event.target.checked)
    }

    const handleDeleteAccount = () => {
        if (isChecked) {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!',
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire(
                        'Deleted!',
                        'Your account has been deleted.',
                        'success'
                    ).then(() => {
                        navigate('/') // Redirect to the home page
                    })
                }
            })
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please confirm that you want to delete your account by checking the checkbox.',
            })
        }
    }

    const [password, setPassword] = useState('user-password')
    const [username, setUsername] = useState('Username')
    const [email, setEmail] = useState('Email')
    const [timezone, setTimezone] = useState(
        '(UTC-6.00)Central Time (US and Canada)'
    )
    const [language, setLanguage] = useState('English')

    const [showPassword, setShowPassword] = useState(false)

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    const toggleEditMode = () => {
        setIsEditable(!isEditable)
    }

    return (
        <div className="w-full p-2 overflow-y-scroll no-scrollbar flex flex-col justify-center items-start gap-4 font-poppins">
            <div className="flex justify-between w-full">
                <p className="font-semibold text-sm md:text-lg">
                    Account Settings
                </p>
                <Tooltip title={isEditable ? 'Save' : 'Edit'}>
                    {' '}
                    <button
                        className="py-2 px-4 text-gray-500"
                        onClick={toggleEditMode}
                    >
                        {isEditable ? (
                            'Save'
                        ) : (
                            <SlPencil className=" text-xl" />
                        )}
                    </button>
                </Tooltip>
            </div>
            <div className="w-full h-max flex flex-wrap justify-start items-center">
                <div className="w-full h-max flex flex-col justify-center items-left gap-6">
                    <div className="flex flex-warp flex-col">
                        <label className="text-sm font-medium">
                            Password <br />{' '}
                        </label>
                        <div className="flex justify-between">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                className="p-2 text-sm w-full text-gray-400 outline-none"
                                readOnly={!isEditable}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Tooltip title={showPassword ? 'Hide' : 'Show'}>
                                {' '}
                                <button
                                    className="px-4 py-2 rounded-lg text-2xl text-gray-400"
                                    onClick={togglePasswordVisibility}
                                >
                                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                                </button>
                            </Tooltip>
                        </div>
                    </div>
                    <div>
                        <label className="text-sm font-medium">
                            Username <br />{' '}
                        </label>
                        <input
                            type="text"
                            value={username}
                            className="p-2 text-sm w-full text-gray-400 outline-none"
                            readOnly={!isEditable}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="text-sm font-medium">
                            Email <br />{' '}
                        </label>
                        <input
                            type="text"
                            value={email}
                            className="p-2 text-sm w-full text-gray-400 outline-none"
                            readOnly={!isEditable}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="text-sm font-medium">
                            Language <br />{' '}
                        </label>
                        <input
                            type="text"
                            value={language}
                            className="p-2 text-sm w-full text-gray-400 outline-none"
                            readOnly={!isEditable}
                            onChange={(e) => setLanguage(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="text-sm font-medium">
                            TimeZone <br />{' '}
                        </label>
                        <input
                            type="text"
                            value={timezone}
                            className="p-2 text-sm w-full text-gray-400 outline-none"
                            readOnly={!isEditable}
                            onChange={(e) => setTimezone(e.target.value)}
                        />
                    </div>
                    <div>
                        <h4 className="text-sm font-medium">
                            Delete Your Account
                        </h4>
                        <h5 className="text-sm w-4/5 text-gray-400">
                            When you delete your account, you lose access to
                            Front account services, and we permanently delete
                            your personal data. You can cancel the deletion for
                            14 days.
                        </h5>
                        <div className="text-sm text-red-600 flex gap-4">
                            <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={handleCheckboxChange}
                            />
                            <p className="py-4">
                                Confirm that I want to delete my account
                            </p>
                        </div>
                        <div className="flex gap-2 text-sm">
                            <button className="py-4 px-6 cursor-pointer font-semibold rounded-md">
                                Learn More
                            </button>
                            <button
                                className="py-4 px-6 bg-blue-500 font-semibold rounded-md text-white"
                                onClick={handleDeleteAccount}
                            >
                                Delete Account
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AccountSettings
