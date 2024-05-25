import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios"
import usePasswordToggle from '../hooks/usePasswordToggle';


const AdminLogin = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [PasswordInputType, ToggleIcon] = usePasswordToggle();
    const baseURL = process.env.REACT_APP_API_URL;


    const onSubmit = async (data) => {

        try {
            axios.post(`${baseURL}api/admin/login`,
                {
                    "user-agent": navigator.userAgent,
                }
            ).then((res) => {
                console.log(res.data);
                toast.success('Login successful!');
            })
            console.log(data);
    
        } catch (error) {
            console.log(error);

        }



    };

    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400">
                <div className=" bg-white  rounded-lg shadow-lg w-full max-w-md">
                    <div className=' h-[20%] py-3 bg-rose-900 rounded-t-lg flex items-center justify-center' >
                        <h2 className="text-2xl font-plusjakartasans font-bold  text-white text-center">Admin Login</h2>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="p-10 space-y-6 h-[90%]">
                        <div className="relative">
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                {...register('email', {
                                    required: 'Email is required',
                                    pattern: {
                                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                        message: 'Invalid email address'
                                    }
                                })}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                        </div>
                        <div className="relative">
                            <label className="block text-sm font-medium text-gray-700">Password</label>
                            <div className='relative'>

                                <input
                                    type={PasswordInputType}
                                    {...register('password', {
                                        required: 'Password is required',
                                        minLength: {
                                            value: 6,
                                            message: 'Password must be at least 6 characters long'
                                        },
                                        pattern: {
                                            value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
                                            message: 'Password must contain at least one letter and one number'
                                        }
                                    })}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                />
                                <span className="absolute top-1/2 -translate-y-1/2 bg-transparent  right-2  flex items-center text-sm leading-5">
                                    {ToggleIcon}
                                </span>
                                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                            </div>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default AdminLogin;
