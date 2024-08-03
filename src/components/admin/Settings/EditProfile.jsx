import React, { useEffect, useState } from "react";
import Settings1 from "../../../assets/SettingsPage/Settings1.jpg";
import { GrCloudUpload } from "react-icons/gr";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { useForm } from "react-hook-form";
import { AdminAxiosInstance } from "../../../routes/AdminRoutes";
import { toast } from "react-toastify";
import Loader from "../../reusable/Loader";
import ChangePassword from "./ChangePassword";

const EditProfile = () => {
  const [currDetails, setCurrDetails] = useState(null);
  useEffect(() => {
    AdminAxiosInstance.get("api/admin/profile")
      .then((response) => {
        console.log(response.data);
        setCurrDetails(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return currDetails ? <Page currDetails={currDetails} /> : <Loader />;
};

const Page = ({ currDetails }) => {
  const [inputValue, setInputValue] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: currDetails.fullName,
      email: currDetails.email,
      country: currDetails.country,
    },
  });
  const handleInputChange = (event) => {
    const newValue = event.target.value.slice(0, 10); // Limit input display to 10 characters
    setInputValue(newValue);
  };
  const [selectedCountry, setSelectedCountry] = useState("0");
  const countries = [
    { code: "US", name: "United States" },
    { code: "UK", name: "United Kingdom" },
    { code: "CA", name: "Canada" },
    { code: "IN", name: "India" },
    // ... add more countries here
  ];
  const [selectedImage, setSelectedImage] = useState(null); // State to store the uploaded image file

  const handleImageUpload = (event) => {
    const file = event.target.files[0];

    // Validate file type (PNG, JPEG, JPG)
    const validImageTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (!validImageTypes.includes(file.type)) {
      alert(
        "Invalid image format. Please upload PNG, JPEG, or JPG files only."
      );
      return;
    }

    // Validate image size (300x300 and max 2mb)
    if (file.size > 2 * 1024 * 1024) {
      // Convert 2mb to bytes
      alert(
        "Image size exceeds the maximum limit of 2mb. Please upload a smaller image."
      );
      setIsImageValid(false);
      return;
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

    reader.readAsDataURL(file);
  };

  const submitEdit = async (values) => {
    try {
      console.log("submitted");
      // const formData = new FormData();
      // formData.append("fullName", values.fullName);
      // formData.append("country", values.country);
      // formData.append("email", values.email);
      // formData.append("image", selectedImage || "");
      const res = await AdminAxiosInstance.put("/api/admin/profile", {
        fullName: values.fullName,
        country: values.country,
        email: values.email,
      });
      console.log(res.data);
      toast.success("Profile successfully updated");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-full  p-2  overflow-y-scroll flex flex-col justify-center items-start gap-4 font-poppins">
      <p className="font-semibold text-sm md:text-lg ">Edit Profile</p>
      <div className="w-full h-max flex flex-wrap justify-start items-center">
        <div className="relative">
          <div className=" rounded-full  bg-red-400 overflow-hidden w-28 h-28 md:w-32 md:h-32 lg:w-32 lg:h-32  ">
            {selectedImage ? (
              <img
                data-tooltip-id="my-tooltip"
                src={URL.createObjectURL(selectedImage)}
                alt="Uploaded profile picture"
              />
            ) : (
              <img src={Settings1} alt="Placeholder profile picture" />
            )}

            <Tooltip id="my-tooltip">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <span className="font-poppins font-semibold">Upload photo</span>
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
            style={{ display: "none" }}
            onChange={handleImageUpload}
          />
        </div>

        {/*Section for profile picture */}
      </div>
      {/*Details starts here*/}

      <form
        onSubmit={handleSubmit(submitEdit)}
        action=""
        className="w-full"
        encType="multipart/form-data"
      >
        <div className="w-full">
          <label className="block font-medium text-sm mb-1">Full Name</label>
          <input
            {...register("fullName", {
              required: "Full name is required",
              minLength: { value: 3, message: "Minimum length is 3" },
              maxLength: { value: 20, message: "Maximum length is 20" },
            })}
            className="w-full h-10 border-2 border-gray-300 px-2 rounded-lg text-sm outline-none mb-4"
            type="text"
          />
          {errors.fullName && (
            <p className="text-red-500 -mt-2 mb-2">
              {errors.fullName?.message}
            </p>
          )}
        </div>

        <div className="w-full grid grid-flow-row grid-cols-2 gap-x-4">
          <div className="">
            <label className="block font-medium text-sm mb-1">Country</label>
            <select
              {...register("country", {
                required: "Country is required",
              })}
              className="w-full h-10 border-2 border-gray-300 px-2 rounded-lg text-sm outline-none mb-4"
              defaultValue={selectedCountry}
            >
              <option value="">Select Country</option>
              {countries.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.name}
                </option>
              ))}
            </select>
            {errors.country && (
              <p className="text-red-500 -mt-2 mb-2">
                {errors.country?.message}
              </p>
            )}
          </div>

          <div className="w-full">
            <label className="block font-medium text-sm mb-1">Email</label>

            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              className="w-full h-10 border-2 border-gray-300 px-2 rounded-lg text-sm outline-none mb-4"
            />
            {errors.email && (
              <p className="text-red-500 -mt-2 mb-2">{errors.email?.message}</p>
            )}
          </div>
        </div>

        {/* <div className="w-full grid grid-flow-row grid-cols-2 gap-x-4">
          <div>
            <label className="block font-medium text-sm mb-1">Password</label>
            <input
              {...register("password", {
                required: "Password is required",
                minLength: { value: 8, message: "Minimum length is 8" },
                maxLength: { value: 20, message: "Maximum length is 20" },
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message:
                    "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character",
                },
              })}
              className="w-full h-10 border-2 border-gray-300 px-2 rounded-lg text-sm outline-none mb-4"
              value={inputValue}
              onChange={handleInputChange}
            />
            {errors.phone && (
              <p className="text-red-500 -mt-2 mb-2">{errors.phone?.message}</p>
            )}
          </div>
        </div> */}
        <button
          type="submit"
          className="w-full py-2 bg-blue-500 font-semibold text-sm text-white rounded-md"
        >
          Save Changes
        </button>
      </form>
      <ChangePassword />
    </div>
  );
};

export default EditProfile;
