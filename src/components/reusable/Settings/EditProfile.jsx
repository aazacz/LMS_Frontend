import React, { useEffect, useState, useRef } from "react";
import { GrCloudUpload } from "react-icons/gr";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { axiosInstanceStudent } from "../../../routes/UserRoutes";
import Settings1 from "../../../assets/SettingsPage/Settings1.jpg";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditProfile = () => {
  const input = useRef();
  const [details, setDetails] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [isEditable, setIsEditable] = useState(false);

  // Function to fetch student details
  const fetchStudentDetails = async () => {
    try {
      const response = await axiosInstanceStudent.get(
        "api/settings/student-details",
      );
      const { studentDetails } = response.data;
      setDetails(studentDetails);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch student details.");
    }
  };

  useEffect(() => {
    fetchStudentDetails();
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
        "Invalid image format. Please upload PNG, JPEG, or JPG files only.",
      );
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error(
        "Image size exceeds the maximum limit of 2mb. Please upload a smaller image.",
      );
      return;
    }

    setSelectedImage(file);
  };

  const uploadProfilePhoto = async () => {
    if (selectedImage) {
      const formData = new FormData();
      formData.append("profilePhoto", selectedImage);

      try {
        const response = await axiosInstanceStudent.post(
          "api/settings/upload-profile-photo",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
        );

        if (response.status === 200) {
          toast.success("Profile photo uploaded successfully!");
          fetchStudentDetails();
        } else {
          toast.error("Unexpected response from server.");
        }
      } catch (error) {
        console.error("Upload Error:", error.response);
        toast.error(
          error.response?.data?.error || "Failed to upload profile photo",
        );
      }
    }
  };

  const toggleEditMode = async () => {
    if (isEditable) {
      try {
        const response = await axiosInstanceStudent.put(
          "api/settings/edit-profile",
          details,
        );
        if (response.status === 200) {
          if (selectedImage) {
            await uploadProfilePhoto();
          } else {
            toast.success("Profile updated successfully!");
            fetchStudentDetails();
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
    <div className="w-full p-2 flex flex-col justify-center items-start gap-4 font-poppins">
      <p className="font-semibold text-sm md:text-lg">Edit Profile</p>
      <div className="w-full h-max flex flex-wrap justify-start items-center">
        <div className="relative">
          <div className="rounded-full overflow-hidden w-28 h-28 md:w-32 md:h-32 lg:w-32 lg:h-32">
            {selectedImage ? (
              <img
                data-tooltip-id="my-tooltip"
                src={URL.createObjectURL(selectedImage)}
                alt="Uploaded profile picture"
              />
            ) : (
              <img
                src={details.studentImg || Settings1}
                alt="Profile picture"
              />
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
            className="w-full h-10 border-2 border-gray-300 px-2 rounded-lg text-sm outline-none mb-4"
            type="text"
            name="name"
            value={details.name || ""}
            readOnly={!isEditable}
            onChange={handleInputChange}
          />
        </div>
        <div className="w-full">
          <label className="block font-medium text-sm mb-1">
            Student Phone Number
          </label>
          <input
            className="w-full h-10 border-2 border-gray-300 px-2 rounded-lg text-sm outline-none mb-4"
            type="number"
            name="number"
            value={details.number || ""}
            readOnly={!isEditable}
            onChange={handleInputChange}
          />
        </div>
        <div className="w-full">
          <label className="block font-medium text-sm mb-1">
            Parent Phone Number
          </label>
          <input
            className="w-full h-10 border-2 border-gray-300 px-2 rounded-lg text-sm outline-none mb-4"
            type="number"
            name="parentNumber"
            value={details.parentNumber || ""}
            readOnly={!isEditable}
            onChange={handleInputChange}
          />
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
