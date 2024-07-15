import React, { useState } from 'react'
import Settings1 from '../../../assets/Settings1.jpg'
import { GrCloudUpload } from 'react-icons/gr'
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'

const EditProfile = () => {
    const [inputValue, setInputValue] = useState('')

    const handleInputChange = (event) => {
        const newValue = event.target.value.slice(0, 10) // Limit input display to 10 characters
        setInputValue(newValue)
    }
    const [selectedCountry, setSelectedCountry] = useState('0')
    const countries = [
        { code: 'US', name: 'United States' },
        { code: 'UK', name: 'United Kingdom' },
        { code: 'CA', name: 'Canada' },
        { code: 'IN', name: 'India' },
        // ... add more countries here
    ]
    const [selectedImage, setSelectedImage] = useState(null) // State to store the uploaded image file

    const handleImageUpload = (event) => {
        const file = event.target.files[0]

        // Validate file type (PNG, JPEG, JPG)
        const validImageTypes = ['image/png', 'image/jpeg', 'image/jpg']
        if (!validImageTypes.includes(file.type)) {
            alert(
                'Invalid image format. Please upload PNG, JPEG, or JPG files only.'
            )
            return
        }

        // Validate image size (300x300 and max 2mb)
        if (file.size > 2 * 1024 * 1024) {
            // Convert 2mb to bytes
            alert(
                'Image size exceeds the maximum limit of 2mb. Please upload a smaller image.'
            )
            setIsImageValid(false)
            return
        }

        // const reader = new FileReader();
        // reader.onload = (e) => {
        //   const img = new Image();
        //   img.onload = () => {
        //     const width = img.width;
        //     const height = img.height;

        //     if (width !== 300 || height !== 300) {
        //       alert(
        //         "Image dimensions must be 300x300 pixels. Please resize your image and try again."
        //       );
        //       setIsImageValid(false);
        //       return;
        //     }

        //     // Update state with the validated image file
        //     setSelectedImage(file);
        //   };
        //   img.src = e.target.result;
        // };

        reader.readAsDataURL(file)
    }
    return (
        <div className="w-full  p-2  overflow-y-scroll flex flex-col justify-center items-start gap-4 font-poppins">
            <p className="font-semibold text-sm md:text-lg ">Edit Profile</p>
            <div className="w-full h-max flex flex-wrap justify-start items-center">
                <div className="relative">
                    <div className=" rounded-full  bg-red-400 overflow-hidden w-28 h-28 md:w-32 md:h-32 lg:w-32 lg:h-32  ">
                        {selectedImage ? (
                            <img
                                data-tooltip-id="my-tooltip"
                                data-tooltip-content="Hello world!"
                                src={URL.createObjectURL(selectedImage)}
                                alt="Uploaded profile picture"
                            />
                        ) : (
                            <img
                                src={Settings1}
                                alt="Placeholder profile picture"
                            />
                        )}

                        <Tooltip id="my-tooltip">
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                }}
                            >
                                <span className="font-poppins font-semibold">
                                    Upload photo
                                </span>
                                <span className="text-[#84818A] font-light text-sm">
                                    300x300 and max 2 MB
                                </span>
                            </div>
                        </Tooltip>

                        {/* uploading the image */}
                        <div className=" absolute rounded-full border-[1px] border-gray-500 flex items-center justify-center shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] w-8 h-8 bg-white bottom-0 translate-y-1/2  left-1/2 -translate-x-1/2 text-xl text-black cursor-pointer">
                            <label htmlFor="profile-picture-upload">
                                <GrCloudUpload
                                    data-tooltip-id="my-tooltip"
                                    className="cursor-pointer"
                                />
                            </label>
                        </div>
                    </div>

                    <input
                        id="profile-picture-upload"
                        type="file"
                        accept="image/png, image/jpeg, image/jpg"
                        style={{ display: 'none' }}
                        onChange={handleImageUpload}
                    />
                </div>
                {/*Section for profile picture */}
            </div>
            {/*Details starts here*/}
            <p className="font-medium text-sm ">Full Name</p>
            <input
                className="w-11/12 h-10 border-2 border-gray-300 px-2 rounded-lg text-sm  outline-none"
                type="text"
            />
            <div class="flex flex-col gap-4">
                <p className="font-medium text-sm ">Location</p>
                <select
                    className="w-full py-2 border-2 border-gray-300 px-2 rounded-lg text-sm outline-none"
                    value={selectedCountry}
                    onChange={(event) => setSelectedCountry(event.target.value)}
                >
                    <option value="">Select Country</option>
                    {countries.map((country) => (
                        <option key={country.code} value={country.code}>
                            {country.name}
                        </option>
                    ))}
                </select>
            </div>
            <p className="font-medium text-sm ">Birthday</p>
            <input
                className="w-11/12 h-10 border-2 border-gray-300 px-2 rounded-lg text-sm  outline-none"
                type="date"
            />
            <p className="font-medium text-sm ">Phone</p>
            <input
                className="border-2 h-10 rounded-lg px-2 border-gray-300 w-11/12 outline-none py-2"
                type="number"
                value={inputValue}
                onChange={handleInputChange}
            />
            <button className="p-4 bg-blue-500 font-semibold text-sm rounded-md ">
                Save Changes
            </button>
        </div>
    )
}

export default EditProfile