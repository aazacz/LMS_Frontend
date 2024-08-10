import React, { useState, useEffect } from "react";
import "./SignupEducation.css";
import personalDetailsImage from "../../../assets/SignupPersonalDetails/personal.svg";
import Loader from "../../reusable/Loader";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { MdOutlineFileUpload } from "react-icons/md";

const SignupEducation = () => {
  const baseUrl = process.env.REACT_APP_API_URL;
  const [englishSatMarkFile, setEnglishFile] = useState(null);
  const [englishSatMark, setEnglishMarks] = useState("");
  const [mathSatMarkFile, setMathFile] = useState(null);
  const [mathSatMark, setMathMarks] = useState("");
  const [totalSatMarkFile, setTotalFile] = useState(null);
  const [totalSatMark, setTotalMarks] = useState("");
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const storedDetails = sessionStorage.getItem("SignupPersonalDetails");
    if (!storedDetails) {
      navigate("/signup/signupPersonalDetails");
    }
  }, [navigate]);

  const handleConsentChange = () => {
    setConsent(!consent);
  };

  const handleEnglishFileChange = (e) => {
    setEnglishFile(e.target.value);
  };

  const handleEnglishMarksChange = (e) => {
    setEnglishMarks(e.target.value);
  };

  const handleMathFileChange = (e) => {
    setMathFile(e.target.value);
  };

  const handleMathMarksChange = (e) => {
    setMathMarks(e.target.value);
  };

  const handleTotalFileChange = (e) => {
    setTotalFile(e.target.value);
  };

  const handleTotalMarksChange = (e) => {
    setTotalMarks(e.target.value);
  };

  const registerUser = async (e) => {
    e.preventDefault();
    if (!consent) {
      Swal.fire({
        icon: "warning",
        text: "Please provide consent to proceed.",
      });
      return;
    }

    setLoading(true);

    const formDataToSend = new FormData();
    formDataToSend.append("englishSatMarkFile", englishSatMarkFile);
    formDataToSend.append("englishSatMark", englishSatMark);
    formDataToSend.append("mathSatMarkFile", mathSatMarkFile);
    formDataToSend.append("mathSatMark", mathSatMark);
    formDataToSend.append("totalSatMarkFile", totalSatMarkFile);
    formDataToSend.append("totalSatMark", totalSatMark);

    try {
      const storedDetails = JSON.parse(
        sessionStorage.getItem("SignupPersonalDetails")
      );

      for (const key in storedDetails) {
        formDataToSend.append(key, storedDetails[key]);
      }
      console.log(formDataToSend.get("englishSatMarkFile"));
      console.log(formDataToSend.get("mathSatMarkFile"));
      console.log(formDataToSend.get("totalSatMarkFile"));
      console.log(formDataToSend.get("englishSatMark"));
      console.log(formDataToSend.get("mathSatMark"));
      console.log(formDataToSend.get("totalSatMark"));
      console.log(formDataToSend.get("name"));
      console.log(formDataToSend.get("grade"));
      console.log("FormData contents:");
      formDataToSend.forEach((value, key) => {
        console.log(key, value);
      });

      const response = await axios.post(
        `${baseUrl}api/students/register`,
        formDataToSend,
        {
          "user-agent": navigator.userAgent,
          "Content-Type": "multipart/form-data",
        }
      );

      if (response.status === 200) {
        setLoading(false);
        Swal.fire({
          icon: "success",
          text: "User Registerd Successfully.",
        });
        sessionStorage.clear();
        navigate("/login");
      }
    } catch (error) {
      setLoading(false);
      console.error("Error:", error);
      toast.error(error.response.data.error);
    }
  };

  return (
    <>
        {loading && (
          <div className=" h-screen w-screen top-0 left-0 absolute z-[9999] flex justify-center items-center bg-black  bg-opacity-60">
            <Loader />
          </div>
        )}
      <div className="relative  h-full w-screen flex justify-center items-center">

<form
          onSubmit={registerUser}
          className="w-max h-1/2 p-6 border-2 bg-white bg-opacity-60 border-blue-500 rounded-[50px]"
        >          <div className="">
            <div className="flex">
              <img
                className=" educationphoto"
                src={personalDetailsImage}
                alt="Personal Details"
              />
              <div className="education-details-content-container">
                <p className="education-details-content">
                  Signup to get started
                </p>
                <p className="education-details-sub-content">
                  2,97,565 students and parents signed up to study <br />
                  abroad. Make an informed decision about your abroad education.
                </p>
              </div>
            </div>

            <div>
              <p className="font-poppins text-lg font-bold ">
                {" "}
                3. Current Details Education{" "}
              </p>
              <p className="font-poppins text-sm text-gray-600  ">
                {" "}
                Accurate details will help us show universities & scholarships
                that match your profile.{" "}
              </p>
            </div>

            {/*English Exam MArk and File  */}
            <p className="font-poppins text-lg font-bold pt-[1%]">
              {" "}
              English (Reading & Writing){" "}
            </p>

            <div className="grid grid-flow-row grid-cols-2 gap-x-6">
              <div className="w-full relative overflow-hidden h-10 border-black border-[1px]  bg-white text-sm rounded shadow-lg px-3  flex items-center">
                <input
                  value={englishSatMarkFile}
                  type="file"
                  className="choose focus:outline-blue-900 cursor-pointer"
                  id="file-upload-english"
                  onChange={handleEnglishFileChange}
                />
                <label
                  htmlFor="file-upload-english"
                  className="text-black  font-semibold text-sm cursor-pointer font-poppins absolute right-2 top-1/2 -translate-y-1/2"
                >
                  <MdOutlineFileUpload className="text-xl" />
                </label>
              </div>

              <div className="w-full relative overflow-hidden h-10 border-black border-[1px]  bg-white text-sm rounded shadow-lg px-3  flex items-center">
                <input
                  type="text"
                  className="w-full h-full outline-none"
                  name="grade"
                  placeholder="Enter English marks"
                  value={englishSatMark}
                  onChange={handleEnglishMarksChange}
                />
              </div>
            </div>
          </div>

          <p className="font-poppins text-lg font-bold pt-[1%]"> Math </p>

          {/*Maths Exam MArk and File  */}
          <div className="grid grid-flow-row grid-cols-2 gap-x-6">
            <div className="w-full relative overflow-hidden h-10 border-black border-[1px]  bg-white text-sm rounded shadow-lg px-3  flex items-center">
              <input
                value={mathSatMarkFile}
                type="file"
                className="choose focus:outline-blue-900 cursor-pointer"
                id="file-upload-math"
                onChange={handleMathFileChange}
              />
              <label
                htmlFor="file-upload-math"
                className="text-black font-semibold text-sm cursor-pointer font-poppins absolute right-2 top-1/2 -translate-y-1/2"
              >
                <MdOutlineFileUpload className="text-xl" />
              </label>
            </div>

            <div className="w-full relative overflow-hidden h-10 bg-white border-black border-[1px]  text-sm rounded shadow-lg px-3  flex items-center">
              <input
                type="text"
                className="w-full h-full outline-none"
                name="grade"
                placeholder="Enter Maths marks"
                value={mathSatMark}
                onChange={handleMathMarksChange}
              />
            </div>
          </div>

          <p className="font-poppins text-lg font-bold pt-[1%] ">
            {" "}
            Total Score{" "}
          </p>
          {/*Total MArk and File  */}
          <div className="grid grid-flow-row grid-cols-2 gap-x-6">
            <div className="w-full relative overflow-hidden h-10 border-black border-[1px]  bg-white text-sm rounded shadow-lg px-3  flex items-center">
              <input
                value={totalSatMarkFile}
                type="file"
                className="choose focus:outline-blue-900 cursor-pointer"
                id="file-upload-total"
                onChange={handleTotalFileChange}
              />
              <label
                htmlFor="file-upload-total"
                className="text-black  font-semibold text-sm cursor-pointer font-poppins absolute right-2 top-1/2 -translate-y-1/2"
              >
                <MdOutlineFileUpload className="text-xl" />
              </label>
            </div>

            <div className="w-full relative overflow-hidden h-10 border-black border-[1px]  bg-white text-sm rounded shadow-lg px-3  flex items-center">
              <input
                type="text"
                className="w-full h-full outline-none"
                name="grade"
                placeholder="Enter Maths marks"
                value={totalSatMark}
                onChange={handleTotalMarksChange}
              />
            </div>
          </div>

          <div className="w-full flex items-start gap-x-2 pt-[1%]">
            <input
              type="checkbox"
              value={consent}
              onChange={handleConsentChange}
              className="w-4 h-5 border-blue border-[1px]"
            />

            <p className="text-xs">
              I have read and provide consent for my data to be processed for
              purposes mentioned
              <br />
              in the{" "}
              <span className="text-blue-700"> Terms and Conditions </span> and
              agree to be contacted for Education related services & promotions.
            </p>
          </div>

          {/* signup button */}

          <div className="flex flex-col md:flex-row items-center w-full justify-center">
              <button
                type="submit"
                className="text-white font-poppins mt-2 font-bold text-lg w-[200px] h-max py-1 px-4 bg-blue-600"
              >
                Signup
              </button>
            </div>
          </form>
      </div>
    </>
  );
};

export default SignupEducation;
