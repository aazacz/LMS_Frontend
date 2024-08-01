import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Modal from "./PasswordModal";
import { axiosInstanceStudent } from "../../../routes/UserRoutes";
import "./DeleteAccount.css"

const AccountSettings = () => {
  const [details, setDetails] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);

  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        const response = await axiosInstanceStudent.get(
          "api/settings/student-details"
        );
        console.log(response.data);
        const { studentDetails } = response.data;
        setDetails(studentDetails);
      } catch (error) {
        console.error(error);
      }
    };

    fetchStudentDetails();
  }, []);

  const handleDeleteAccount = async () => {
    try {
      const response = await axiosInstanceStudent.put(
        "/api/settings/change-status"
      );
      if (response.status === 200) {
        toast.success("Account deleted successfully!");
        navigate("/");
      } else {
        toast.error("Failed to delete account.");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "An error occurred. Please try again later."
      );
    }
  };

  const confirmDeleteAccount = () => {
    MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      customClass: {
        popup: "custom-swal-popup",
        title: "custom-swal-title",
        text: "custom-swal-text",
        actions: "custom-swal-button-container", // Apply custom class to the button container
        confirmButton: "custom-swal-confirm-button",
        cancelButton: "custom-swal-cancel-button",
      },
      buttonsStyling: false, // Disable default styling
    }).then((result) => {
      if (result.isConfirmed) {
        handleDeleteAccount();
      }
    });
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleChangePassword = (newPassword) => {
    // Handle password change logic here
    console.log("New Password:", newPassword);
  };

  return (
    <div className="w-full p-2 overflow-y-scroll no-scrollbar flex flex-col justify-center items-start gap-4 font-poppins">
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          onConfirm={handleChangePassword}
        />
      )}
      <div className="flex justify-between w-full">
        <p className="font-semibold text-base md:text-lg">Account Settings</p>
      </div>
      <div className="w-full h-max flex flex-wrap justify-start items-center">
        <div className="w-full h-max flex flex-col justify-center items-left gap-6">
          <div>
            <label className="block font-medium text-sm mb-1">Username</label>
            <input
              className="w-full h-10 border-2 border-gray-300 px-2 rounded-lg text-sm outline-none mb-4"
              type="text"
              value={details.name || ""}
              name="name"
              readOnly
            ></input>
          </div>
          <div>
            <label className="block font-medium text-sm mb-1">Email</label>
            <input
              className="w-full h-10 border-2 border-gray-300 px-2 rounded-lg text-sm outline-none mb-4"
              type="text"
              value={details.email || ""}
              name="email"
              readOnly
            ></input>
          </div>
          <div>
            <button
              className="py-2 px-4 bg-blue-600 text-white rounded-md text-sm md:text-base"
              onClick={openModal}
            >
              Change Password
            </button>
          </div>
          <div>
            <button
              className="py-2 text-red-600 rounded-md text-sm md:text-base"
              onClick={confirmDeleteAccount}
            >
              Delete your account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
