import React, { useState, useEffect } from "react";
import "./SignupEducation.css";
import personalDetailsImage from "../../../assets/SignupPersonalDetails/personaldetails.png";
import Loader from "../../reusable/Loader";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
      alert("Please provide consent to proceed.");
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

      const response = await axios.post(
        `${baseUrl}api/students/register`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        setLoading(false);
        alert("User registered successfully!");
        sessionStorage.clear();
        navigate("/diagnosistest");
      }
    } catch (error) {
      setLoading(false);
      console.error("Error:", error);
      alert("Failed to register. Please try again.");
    }
  };

  return (
    <>
      <div className="w-screen h-[88vh]relative flex items-center justify-center">
        {loading && (
          <div className="modal-overlay w-screen h-[88vh] absolute">
            <Loader />
          </div>
        )}

        <div
          className={
            loading ? "educationcontainer blurred" : "educationcontainer"
          }
        >
          <div className="educationphoto">
            <img
              className="educationimage"
              src={personalDetailsImage}
              alt="Personal Details"
            />
            <div className="education-content-container">
              <p className="education-content">Signup to get started </p>
              <p className="education-sub-content">
                2,97,565 students and parents signed up to study <br />
                abroad. Make an informed decision about your abroad education.
              </p>
            </div>
          </div>
          <div className="education-heading">
            <p className="education-sub-heading">
              3. Current education details
            </p>
            <p className="education-sub-sub-heading">
              Accurate details will help us show universities & scholarships
              that match your profile.
            </p>
          </div>

          <form className="education-form" onSubmit={registerUser}>
            <div className="education-row">
              <div className="education-boxes">
                <div className="upload-box">
                  <input
                    type="file"
                    className="file-input"
                    value={englishSatMarkFile}
                    onChange={handleEnglishFileChange}
                  />
                </div>
                <div className="marks-box">
                  <input
                    type="text"
                    className="marks-input"
                    placeholder="Enter English marks"
                    value={englishSatMark}
                    onChange={handleEnglishMarksChange}
                  />
                </div>
              </div>
              <div className="education-boxes">
                <div className="upload-box">
                  <input
                    type="file"
                    className="file-input"
                    value={mathSatMarkFile}
                    onChange={handleMathFileChange}
                  />
                </div>
                <div className="marks-box">
                  <input
                    type="text"
                    className="marks-input"
                    placeholder="Enter Math marks"
                    value={mathSatMark}
                    onChange={handleMathMarksChange}
                  />
                </div>
              </div>
            </div>
            <div className="education-row">
              <div className="education-boxes">
                <div className="upload-box">
                  <input
                    type="file"
                    className="file-input"
                    value={totalSatMarkFile}
                    onChange={handleTotalFileChange}
                  />
                </div>
                <div className="marks-box">
                  <input
                    type="text"
                    className="marks-input"
                    placeholder="Enter Total marks"
                    value={totalSatMark}
                    onChange={handleTotalMarksChange}
                  />
                </div>
              </div>
            </div>
            <div className="consent-container">
              <label className="consent-label">
                <input
                  type="checkbox"
                  value={consent}
                  onChange={handleConsentChange}
                  className="consent-checkbox"
                />
                I have read and provide consent for my data to be processed for
                purposes mentioned in the Terms and Conditions and agree to be
                contacted for Education related services & promotions.
              </label>
            </div>
            <section className="education-button-container">
              <button type="submit" className="education-request">
                Signup
              </button>
            </section>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignupEducation;
