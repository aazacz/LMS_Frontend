import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import generator from 'generate-password-browser'
import { IoMdKey } from "react-icons/io";
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'
import usePasswordToggle from '../../hooks/usePasswordToggle';


const AddTutor = () => {

    const [PasswordInputType, ToggleIcon] = usePasswordToggle();


    const [tutor, setTutor] = useState({
        tutorAddress: {
            country: "",
            state: "",
            city: "",
            zipcode: "",
            address: ""
        },
        name: "",
        email: "",
        password: "",
        number: "",
        experience: "",
        skills: [],
        projects: [],
        status: "active",
        educations: [],
        awards: []
    });



    const passwordGenerator = () => {

        let password = generator.generate({
            length: 10,
            numbers: true
        });

        setTutor(prevState => ({
            ...prevState,
            password: password
        }));
        console.log(password);

    }

    useEffect(() => {
      console.log(tutor);
    
      
    }, [tutor])
    

    const navigate = useNavigate();
    const baseURL = process.env.REACT_APP_API_URL;

    const [isClicked, setIsClicked] = useState(false);
    const [errors, setErrors] = useState({});
 

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTutor(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        setTutor(prevState => ({
            ...prevState,
            tutorAddress: {
                ...prevState.tutorAddress,
                [name]: value
            }
        }));
    };
    const handleMouseDown = () => {
        setIsClicked(true);
    };

    const handleMouseUp = () => {
        setIsClicked(false);
    };



    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(tutor);
        try {
            // Perform validation here if necessary

            const response = await axios.post(`${baseURL}api/tutors/create`, tutor, {
                "user-agent": navigator.userAgent,
            });

            toast.success(response.data.message);
            setTimeout(() => {
                navigate("/");
            }, 2000);

        } catch (error) {
            console.log(error);
            if (error.response && error.response.data.errors) {
                setErrors(error.response.data.errors);
            } else {
                toast.error("An error occurred while creating the tutor.");
            }
        }
    };


    return (
        <div className='flex-1 h-full p-5 bg-slate-200 rounded-2xl mt-5'>
            <h1 className='text-2xl font-poppins font-semibold'>Tutor Form</h1>
            <form onSubmit={handleSubmit} className="grid grid-flow-row grid-cols-2 gap-4">
                {/* Tutor Name */}
                <div className="w-full">
                    <label className="text-sm font-semibold">Name</label>
                    <input
                        onChange={handleInputChange}
                        name="name"
                        value={tutor.name}
                        type="text"
                        placeholder="Name"
                        className="w-full h-10 bg-white text-sm rounded shadow-lg px-3 mt-2 focus:outline-blue-900" />
                    {errors.name && (
                        <p className="text-red-500 text-xs">
                            {errors.name}
                        </p>
                    )}
                </div>

                {/* Email */}
                <div className="w-full">
                    <label className="text-sm font-semibold">Email</label>
                    <input
                        onChange={handleInputChange}
                        name="email"
                        value={tutor.email}
                        type="email"
                        placeholder="Email"
                        className="w-full h-10 bg-white text-sm rounded shadow-lg px-3 mt-2 focus:outline-blue-900" />
                    {errors.email && (<p className="text-red-500 text-xs">{errors.email}</p>)}
                </div>

                {/* Password */}
                <div className="w-full">
                    <label className="text-sm font-semibold">Password</label>
                    <div className='flex items-center  gap-x-2 relative'>

                    <input
                        onChange={handleInputChange}
                        name="password"
                        value={tutor.password}
                        type={PasswordInputType}
                        placeholder="Password"
                        className="w-full h-10 bg-white text-sm rounded shadow-lg px-3 mt-2 focus:outline-blue-900" />

                         <span className="absolute top-1/2 -translate-x-1/2 bg-transparent  right-16  flex items-center text-sm leading-5">
                          {ToggleIcon}
                         </span>
                    <div
                        onClick={() => passwordGenerator()}
                        onMouseDown={handleMouseDown}
                        onMouseUp={handleMouseUp}
                        data-tooltip-id="my-tooltip" data-tooltip-content="Hello world!"
                        className={`p-2 px-3  bg-slate-400 h-10 mt-2 flex justify-center rounded-md items-center ${isClicked? "scale-95 bg-bg-slate-300":"" }`}>
                        <IoMdKey />
                    </div>
                    <Tooltip id="my-tooltip" place="top" type="dark" effect="solid" />

                            </div>

                    {errors.password && (
                        <p className="text-red-500 text-xs">
                            {errors.password}
                        </p>
                    )}
                </div>

                {/* Number */}
                <div className="w-full">
                    <label className="text-sm font-semibold">Number</label>
                    <input
                        onChange={handleInputChange}
                        name="number"
                        value={tutor.number}
                        type="text"
                        placeholder="Number"
                        className="w-full h-10 bg-white text-sm rounded shadow-lg px-3 mt-2 focus:outline-blue-900" />
                    {errors.number && (
                        <p className="text-red-500 text-xs">
                            {errors.number}
                        </p>
                    )}
                </div>

                {/* Experience */}
                <div className="w-full">
                    <label className="text-sm font-semibold">Experience</label>
                    <input
                        onChange={handleInputChange}
                        name="experience"
                        value={tutor.experience}
                        type="text"
                        placeholder="Experience"
                        className="w-full h-10 bg-white text-sm rounded shadow-lg px-3 mt-2 focus:outline-blue-900" />
                    {errors.experience && (
                        <p className="text-red-500 text-xs">
                            {errors.experience}
                        </p>
                    )}
                </div>

                {/* Address */}
                <div className="w-full">
                    <label className="text-sm font-semibold">Address</label>
                    <input
                        onChange={handleAddressChange}
                        name="address"
                        value={tutor.tutorAddress.address}
                        type="text"
                        placeholder="Address"
                        className="w-full h-10 bg-white text-sm rounded shadow-lg px-3 mt-2 focus:outline-blue-900" />
                    {errors['tutorAddress.address'] && (
                        <p className="text-red-500 text-xs">
                            {errors['tutorAddress.address']}
                        </p>
                    )}
                </div>

                {/* City */}
                <div className="w-full">
                    <label className="text-sm font-semibold">City</label>
                    <input
                        onChange={handleAddressChange}
                        name="city"
                        value={tutor.tutorAddress.city}
                        type="text"
                        placeholder="City"
                        className="w-full h-10 bg-white text-sm rounded shadow-lg px-3 mt-2 focus:outline-blue-900" />
                    {errors['tutorAddress.city'] && (
                        <p className="text-red-500 text-xs">
                            {errors['tutorAddress.city']}
                        </p>
                    )}
                </div>

                {/* State */}
                <div className="w-full">
                    <label className="text-sm font-semibold">State</label>
                    <input
                        onChange={handleAddressChange}
                        name="state"
                        value={tutor.tutorAddress.state}
                        type="text"
                        placeholder="State"
                        className="w-full h-10 bg-white text-sm rounded shadow-lg px-3 mt-2 focus:outline-blue-900" />
                    {errors['tutorAddress.state'] && (
                        <p className="text-red-500 text-xs">
                            {errors['tutorAddress.state']}
                        </p>
                    )}
                </div>

                {/* Country */}
                <div className="w-full">
                    <label className="text-sm font-semibold">Country</label>
                    <input
                        onChange={handleAddressChange}
                        name="country"
                        value={tutor.tutorAddress.country}
                        type="text"
                        placeholder="Country"
                        className="w-full h-10 bg-white text-sm rounded shadow-lg px-3 mt-2 focus:outline-blue-900" />
                    {errors['tutorAddress.country'] && (
                        <p className="text-red-500 text-xs">
                            {errors['tutorAddress.country']}
                        </p>
                    )}
                </div>

                {/* Zipcode */}
                <div className="w-full">
                    <label className="text-sm font-semibold">Zipcode</label>
                    <input
                        onChange={handleAddressChange}
                        name="zipcode"
                        value={tutor.tutorAddress.zipcode}
                        type="text"
                        placeholder="Zipcode"
                        className="w-full h-10 bg-white text-sm rounded shadow-lg px-3 mt-2 focus:outline-blue-900" />
                    {errors['tutorAddress.zipcode'] && (
                        <p className="text-red-500 text-xs">
                            {errors['tutorAddress.zipcode']}
                        </p>
                    )}
                </div>

                <div className='flex justify-center'>
                    <button className='px-20 py-2 bg-green-600 rounded-md text-white font-poppins' type="submit">Create Tutor</button>
                </div>
            </form>
        </div>
    )
}

export default AddTutor