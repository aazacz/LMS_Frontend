import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import generator from 'generate-password-browser'
import { IoMdKey } from "react-icons/io";
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'
import usePasswordToggle from '../../hooks/usePasswordToggle';
import { FiPlusCircle } from "react-icons/fi";

const AddTutor = () => {

    const [PasswordInputType, ToggleIcon] = usePasswordToggle();

    const [states, setStates] = useState([])

    const [tutor, setTutor] = useState({
        tutorAddress: {
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
        educations: [
            {
                name: "",
                file: ""
            },
        ],
        awards: [
            {
                title: "",
                file: ""
            }
        ],
        status: "active"
    });



    useEffect(() => {
        const config = {
            method: 'get',
            url: `https://api.countrystatecity.in/v1/countries/IN/states`,
            headers: {
                'X-CSCAPI-KEY': 'YnlUQ2Z5U3RqUHBnT3dwc2YwY2F4dGJRRW14aGF5d3NuM2xrejBNQw=='
            }
        };

        axios(config).then(function (response) {
            setStates(response.data)
            console.log(response.data);

        })
            .catch(function (error) {
                console.log(error);
            });

    }, [])

    const [cities, setCities] = useState([])
    const [selectedState, setSelectedState] = useState("")




    const getCities = async () => {
        setCities([])
        console.log("getcities funciton called");


        const config = {
            method: 'get',
            url: `https://api.countrystatecity.in/v1/countries/IN/states/${selectedState}/cities`,
            headers: {
                'X-CSCAPI-KEY': 'YnlUQ2Z5U3RqUHBnT3dwc2YwY2F4dGJRRW14aGF5d3NuM2xrejBNQw=='
            }
        };

        await axios(config)
            .then(function (response) {
                console.log(response.data);
                const citieslist = response.data

                const names = citieslist.map(item => item.name);
                console.log(names);
                setCities(names);



            })
            .catch(function (error) {
                console.log(error);
            });

    }

    useEffect(() => {
        getCities()

    }, [selectedState])


    const handleUpload = (e) => {
        const file = e.target.files[0]; // Get the uploaded file
        const fileName = file.name; // Get the name of the file
    }





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

            const response = await axios.post(`${baseURL}api/tutor/create-tutor`, tutor, {
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


    useEffect(() => {
        console.log(selectedState + "selectedCity");
    }, [selectedState])

    //selecting the state
    const handleState = (e) => {
        console.log(e.target.value);
        setSelectedState(e.target.value)

    }

    return (
        <div className='flex-1 h-full p-5 bg-slate-200 rounded-2xl mt-5'>
            <h1 className='text-2xl font-poppins font-semibold'>Tutor Form</h1>
            <form onSubmit={handleSubmit} className="">
                <div className='grid grid-flow-row grid-cols-2 gap-4'>


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
                                className={`p-2 px-3  bg-slate-400 h-10 mt-2 flex justify-center rounded-md items-center ${isClicked ? "scale-95 bg-bg-slate-300" : ""}`}>
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

                    {/* Address */}
                    <div className="w-full">
                        <label className="text-sm font-semibold">Address</label>
                        <input
                            onChange={(e) => {
                                handleAddressChange
                            }}
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


                    {/* State */}
                    <div className="w-full">
                        <label className="text-sm font-semibold">State</label>
                        <select
                            onChange={(e) => handleState(e)}
                            name="state"
                            value={selectedState}
                            id=""
                            className="w-full h-10 bg-white text-sm rounded shadow-lg px-3 mt-2 focus:outline-blue-900">

                            <option defaultValue="Select a State" className='font-poppins opac text-slate-500'>Select State</option>

                            {
                                states.sort((a, b) => {
                                    if (a.name < b.name) return -1;
                                    if (a.name > b.name) return 1;
                                    return 0;
                                }).map((value, index) => {
                                    return (
                                        <option key={index} value={value.iso2}> {value.name}</option>
                                    );
                                })
                            }

                        </select>

                        {errors['tutorAddress.state'] && (
                            <p className="text-red-500 text-xs">
                                {errors['tutorAddress.state']}
                            </p>
                        )}
                    </div>

                    {/* City */}
                    <div className="w-full">
                        <label className="text-sm font-semibold">City</label>

                        <select name="city" id="" className='w-full h-10 bg-white text-sm rounded shadow-lg px-3 mt-2'>

                            <option value="">Select City</option>
                            {/* Mapping the cities */}
                            {cities.map((value, index) => (
                                <option key={index} value={value}>{value} </option>
                            ))}


                        </select>

                        {errors['tutorAddress.city'] && (
                            <p className="text-red-500 text-xs">
                                {errors['tutorAddress.city']}
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



                    {/*Experience  */}
                    <div className="w-full">
                        <label className="text-sm font-semibold">Experience</label>
                        <input
                            onChange={handleInputChange}
                            name="experience"
                            value={tutor.experience}
                            type="text"
                            placeholder="Experience in years"
                            className="w-full h-10 bg-white text-sm rounded shadow-lg px-3 mt-2 focus:outline-blue-900" />
                        {errors.experience && (
                            <p className="text-red-500 text-xs">
                                {errors.experience}
                            </p>
                        )}
                    </div>

                    <div className="w-full ">
                        <label className="text-sm font-semibold">CV/Resume</label>
                        <div className="w-full relative overflow-hidden h-10 bg-white text-sm rounded shadow-lg px-3 mt-2 flex items-center">

                            <input
                                onChange={handleUpload}
                                name="cv"
                                value={tutor.cv}
                                type="file"
                                className=" focus:outline-blue-900 cursor-pointer"
                                id="file-upload" />
                            <label htmlFor="file-upload" className="text-blue-500 text-sm cursor-pointer font-plusjakartasans absolute right-2 top-1/2 -translate-y-1/2">
                                Upload
                            </label>
                        </div>
                        {tutor.cv && (
                            <p className="text-gray-500 text-sm mt-1">Uploaded file: {tutor.cv}</p>
                        )}
                        {errors.experience && (<p className="text-red-500 text-xs">{errors.experience}</p>)}
                    </div>



                </div>




                {/*Education  */}
                <div className="w-full mt-5 border-[1px] rounded-md p-2 pt-2 relative  border-black  " >


                    <label className="text-sm font-semibold  ">Educational Qualificatons</label>

                    <button onClick={() => addEducation(moduleIndex)} type='button'
                        className='absolute right-3  top-3  flex gap-3  p-1 text-sm font-poppins content-center items-center rounded-[10px] px-3 bg-slate-600 text-white hover:bg-blue-800'><FiPlusCircle /> Add</button>
                    <div className='grid grid-flow-row grid-cols-2  mt-4 gap-4 border-2  relative'>



                        <div className=''>
                            <label className="text-sm font-semibold text-gray-500">Institute/University/Certification*</label>
                            <input
                                onChange={handleInputChange}
                                name="education"
                                value={tutor.experience}
                                type="text"
                                placeholder="Qualification"
                                className="w-full h-10 bg-white text-sm rounded shadow-lg px-3 mt-1 focus:outline-blue-900" />
                            {errors.experience && (
                                <p className="text-red-500 text-xs">
                                    {errors.experience}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="text-sm font-semibold text-gray-500">Add Supporting Document</label>
                            <div className="w-full relative overflow-hidden h-10 bg-white text-sm rounded shadow-lg px-3  mt-1 flex items-center">
                                <input
                                    onChange={handleUpload}
                                    name="cv"
                                    value={tutor.cv}
                                    type="file"
                                    className=" focus:outline-blue-900 cursor-pointer"
                                    id="file-upload" />
                                <label htmlFor="file-upload" className="text-blue-500 text-sm cursor-pointer font-plusjakartasans absolute right-2 top-1/2 -translate-y-1/2">
                                    Upload
                                </label>
                            </div>

                            {tutor.cv && (
                                <p className="text-gray-500 text-sm mt-1">Uploaded file: {tutor.cv}</p>
                            )}
                            {errors.experience && (<p className="text-red-500 text-xs">{errors.experience}</p>)}

                        </div>



                    </div>
                </div>


                <div className='w-full pt-4 '>

                    <label className="text-sm font-semibold bg">Skills</label>

                    <div className='w-full h-10 flex items-center gap-10 mt-2 '>

                        <input
                            value={tutor.experience}
                            onChange={handleInputChange}
                            type="text"
                            placeholder="Add Skill"
                            name="experience"
                            className="w-[90%] h-full bg-white text-sm rounded shadow-lg px-3  focus:outline-blue-900" />


                        <button onClick={() => addEducation(moduleIndex)} type='button'
                            className=' flex gap-x-3 h-full text-sm font-poppins  items-center 
                                            rounded-[10px] px-3 bg-slate-600 text-white hover:bg-blue-800'>
                            <FiPlusCircle />     Add
                        </button>

                    </div>



                    <div className="w-full mt-4 grid grid-flow-row grid-cols-4 gap-2">

                        {tutor.skills.map((value, index) => (
                            <div className='w-full h-10 bg-gray-400 rounded-md flex items-center text-sm font-plusjakartasans pl-2' value={value} key={index}>   {value}   </div>
                        )
                        )}

                        {errors.experience && (<p className="text-red-500 text-xs">{errors.experience}</p>)}

                    </div>



                </div>


                <div className='w-full pt-4 '>

                    <label className="text-sm font-semibold bg">Projects</label>

                    <div className='w-full h-10 flex items-center gap-10 mt-2 '>

                        <input
                            value={tutor.experience}
                            onChange={handleInputChange}
                            type="text"
                            placeholder="Add Projects"
                            name="experience"
                            className="w-[90%] h-full bg-white text-sm rounded shadow-lg px-3  focus:outline-blue-900" />


                        <button onClick={() => addEducation(moduleIndex)} type='button'
                            className=' flex gap-x-3 h-full text-sm font-poppins  items-center 
                        rounded-[10px] px-3 bg-slate-600 text-white hover:bg-blue-800'>
                            <FiPlusCircle />     Add
                        </button>

                    </div>



                    <div className="w-full mt-4 grid grid-flow-row grid-cols-4 gap-2">

                        {tutor.skills.map((value, index) => (
                            <div className='w-full h-10 bg-gray-400 rounded-md flex items-center text-sm font-plusjakartasans pl-2' value={value} key={index}>   {value}   </div>
                        )
                        )}

                        {errors.experience && (<p className="text-red-500 text-xs">{errors.experience}</p>)}

                    </div>



                </div>



                {/*Education  */}
                <div className="w-full mt-5 border-[1px] rounded-md p-2 pt-2 relative  shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]  " >


                    <label className="text-sm font-semibold  ">Awards</label>

                    <button onClick={() => addEducation(moduleIndex)} type='button'
                        className='absolute right-3  top-3  flex gap-3  p-1 text-sm font-poppins content-center items-center rounded-[10px] px-3 bg-slate-600 text-white hover:bg-blue-800'><FiPlusCircle /> Add</button>
                    <div className='grid grid-flow-row grid-cols-2  mt-4 gap-4 border-2  relative'>



                        <div className=''>
                            <label className="text-sm font-semibold text-gray-500">Title</label>
                            <input
                                onChange={handleInputChange}
                                name="title"
                                value={tutor.experience}
                                type="text"
                                placeholder="Title of Award"
                                className="w-full h-10 bg-white text-sm rounded shadow-lg px-3 mt-1 focus:outline-blue-900" />
                            {errors.experience && (
                                <p className="text-red-500 text-xs">
                                    {errors.experience}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="text-sm font-semibold text-gray-500">Add Supporting Document</label>
                            <div className="w-full relative overflow-hidden h-10 bg-white text-sm rounded shadow-lg px-3  mt-1 flex items-center">
                                <input
                                    onChange={handleUpload}
                                    name="cv"
                                    value={tutor.cv}
                                    type="file"
                                    className=" focus:outline-blue-900 cursor-pointer"
                                    id="file-upload" />
                                <label htmlFor="file-upload" className="text-blue-500 text-sm cursor-pointer font-plusjakartasans absolute right-2 top-1/2 -translate-y-1/2">
                                    Upload
                                </label>
                            </div>

                            {tutor.cv && (
                                <p className="text-gray-500 text-sm mt-1">Uploaded file: {tutor.cv}</p>
                            )}
                            {errors.experience && (<p className="text-red-500 text-xs">{errors.experience}</p>)}

                        </div>



                    </div>
                </div>










                <div className='flex justify-center mt-5'>
                    <button className='px-20 py-2 bg-green-600 rounded-md text-white font-poppins' type="submit">Create Tutor</button>
                </div>
            </form>
        </div>
    )
}

export default AddTutor