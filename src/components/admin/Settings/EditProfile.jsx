import React, { useEffect, useState, useRef } from "react";
import { GrCloudUpload } from "react-icons/gr";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import Settings1 from "../../../assets/SettingsPage/Settings1.jpg";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../reusable/Loader";
import { AdminAxiosInstance } from "../../../routes/AdminRoutes";

const EditProfile = () => {
  const input = useRef();
  const [details, setDetails] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [isEditable, setIsEditable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Function to fetch student details
  const fetchAdminDetails = async () => {
    setLoading(true);
    try {
      const response = await AdminAxiosInstance.get(
        "api/adminsettings/admin-details",
      );
      const { adminDetails } = response.data;
      setDetails(adminDetails);
    } catch (error) {
      toast.error("Failed To Fetch Admin Details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminDetails();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];

    const validImageTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (!validImageTypes.includes(file.type)) {
      toast.error(
        "Invalid Image Format.Please Upload PNG,JPEG or JPG Files Only.",
      );
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image Size Should Be 2MB.");
      return;
    }

    setSelectedImage(file);
  };

  // Function to validate the form fields
  const validateForm = () => {
    const newErrors = {};
    const namePattern = /^[A-Za-z\s]+$/;
    const phonePattern = /^\d{10}$/;

    if (!namePattern.test(details.name)) {
      newErrors.name = "Name should contain only alphabets.";
    }

    if (!phonePattern.test(details.number)) {
      newErrors.number = "Phone number should be exactly 10 digits.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Function to upload profile photo
  const uploadProfilePhoto = async () => {
    if (selectedImage) {
      const formData = new FormData();
      formData.append("profilePhoto", selectedImage);
      try {
        const response = await AdminAxiosInstance.post(
          "api/adminsettings/upload-admin-profile-photo",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
        );

        if (response.status === 200) {
          toast.success("Profile Photo Uploaded Successfully.");
          fetchAdminDetails();
        } else {
          toast.error("Unexpected Response From Server.");
        }
      } catch (error) {
        console.error("Upload Error:", error.response);
        toast.error(
          error.response?.data?.error || "Failed To Upload Profile Photo",
        );
      }
    }
  };

  // Function to edit profile
  const toggleEditMode = async () => {
    if (isEditable) {
      if (!validateForm()) {
        return;
      }
      try {
        const response = await AdminAxiosInstance.put(
          "api/adminsettings/edit-admin-profile",
          details,
        );
        if (response.status === 200) {
          if (selectedImage) {
            await uploadProfilePhoto();
          } else {
            toast.success("Profile updated successfully!");
            fetchAdminDetails();
          }
        } else {
          toast.error("Unexpected response from server.");
        }
      } catch (error) {
        console.error("Update Error:", error.response);
        toast.error(error.response?.data?.error || "Failed to update profile");
      }
    }
    setIsEditable(!isEditable);
  };

  return (
    <div className="w-full p-2 flex flex-col justify-center items-start gap-4 font-poppins relative">
      <p className="font-semibold text-base md:text-lg">Edit Profile</p>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-100 z-50">
          <Loader />
        </div>
      )}
      <div className="w-full h-max flex flex-wrap justify-start items-center">
        <div className="relative">
          <div className="rounded-full overflow-hidden object-cover w-28 h-28 md:w-32 md:h-32 lg:w-32 lg:h-32">
            {selectedImage ? (
              <img
                data-tooltip-id="my-tooltip"
                src={URL.createObjectURL(selectedImage)}
                alt="Uploaded profile picture"
              />
            ) : (
              <img src={details.adminImg || Settings1} alt="Profile picture" />
            )}

            <Tooltip id="my-tooltip">
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span className="font-poppins font-semibold">Upload photo</span>
                <span className="text-[#84818A] font-light text-sm">
                  Max 2 MB
                </span>
              </div>
            </Tooltip>

            {isEditable && (
              <div className="absolute rounded-full border-[1px] border-gray-500 flex items-center justify-center shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] w-8 h-8 bg-white bottom-0 translate-y-1/2 left-1/2 -translate-x-1/2 text-xl text-black cursor-pointer">
                <label htmlFor="profile-picture-upload">
                  <GrCloudUpload
                    data-tooltip-id="my-tooltip"
                    className="cursor-pointer"
                  />
                </label>
              </div>
            )}
          </div>

          {isEditable && (
            <input
              ref={input}
              type="file"
              id="profile-picture-upload"
              accept="image/png, image/jpeg, image/jpg"
              style={{ display: "none" }}
              onChange={handleImageUpload}
            />
          )}
        </div>
      </div>

      <form className="w-full">
        <div className="w-full">
          <label className="block font-medium text-sm mb-1">Full Name</label>
          <input
            className="w-full h-10 border-2 border-gray-300 px-2 rounded-lg text-sm outline-none mb-1"
            type="text"
            name="username"
            value={details.username || ""}
            readOnly={!isEditable}
            onChange={handleInputChange}
          />
          {errors.username && (
            <p className="text-red-500 text-sm">{errors.username}</p>
          )}
        </div>
        <div className="w-full mb-5">
          <label className="block font-medium text-sm mb-1">Phone Number</label>
          <input
            className="w-full h-10 border-2 border-gray-300 px-2 rounded-lg text-sm outline-none mb-1"
            type="text"
            name="number"
            maxLength="10"
            value={details.number || ""}
            readOnly={!isEditable}
            onChange={handleInputChange}
          />
          {errors.number && (
            <p className="text-red-500 text-sm">{errors.number}</p>
          )}
        </div>
        <button
          type="button"
          className="w-full py-2 bg-blue-500 font-semibold text-sm text-white rounded-md"
          onClick={toggleEditMode}
        >
          {isEditable ? "Save Changes" : "Edit"}
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
