import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import CustomAlert from "./CustomAlert";
import Modal from "./PasswordModal"; 
import { axiosInstanceStudent } from "../../../routes/UserRoutes";

const AccountSettings = () => {
  const [details, setDetails] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const navigate = useNavigate();

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
    setShowAlert(false);
    handleDeleteAccount();
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
      {showAlert && (
        <CustomAlert
          type="warning"
          message="Are you sure you want to delete your account? This action cannot be undone."
          onClose={() => setShowAlert(false)}
          onConfirm={confirmDeleteAccount}
        />
      )}
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          onConfirm={handleChangePassword}
        />
      )}
      <div className="flex justify-between w-full">
        <p className="font-semibold text-sm md:text-lg">Account Settings</p>
      </div>
      <div className="w-full h-max flex flex-wrap justify-start items-center">
        <div className="w-full h-max flex flex-col justify-center items-left gap-6">
          <div>
            <h3 className="text-lg font-medium">Username</h3>
            <p className="p-2 text-sm w-full text-gray-600">{details.name}</p>
          </div>
          <div>
            <h3 className="text-lg font-medium">Email</h3>
            <p className="p-2 text-sm w-full text-gray-600">{details.email}</p>
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
              className="py-2 px-4 text-red-600  rounded-md text-sm md:text-base"
              onClick={() => setShowAlert(true)}
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
