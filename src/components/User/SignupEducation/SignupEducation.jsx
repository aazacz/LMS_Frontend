import React, { useState, useEffect } from "react";
import "./SignupEducation.css";
import personalDetailsImage from "../../../assets/SignupPersonalDetails/personaldetails.png";
import Loader from "../../reusable/Loader";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignupEducation = () => {
 
  const baseUrl = process.env.REACT_APP_API_URL;
  const [englishSatMarkFile, setEnglishFile] = useState(null); //file
  const [englishSatMark, setEnglishMarks] = useState("");
  const [mathSatMarkFile, setMathFile] = useState(null); //file
  const [mathSatMark, setMathMarks] = useState("");
  const [totalSatMarkFile, setTotalFile] = useState(null); //file
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

  const handleFileChange = (event, setFile) => {
    setFile(event.target.files[0]);
  };

  const handleMarksChange = (event, setMarks) => {
    setMarks(event.target.value);
  };

  const registerUser = async (event) => {
    event.preventDefault();
    if (!consent) {
      alert("Please provide consent to proceed.");
      return;
    }

    setLoading(true);

    const formDataToSend = new FormData();
    formDataToSend.append("englishSatMarkFile", englishSatMarkFile,"englishSatMarkFile");
    formDataToSend.append("englishSatMark", englishSatMark);
    formDataToSend.append("mathSatMarkFile", mathSatMarkFile,"mathSatMarkFile");
    formDataToSend.append("mathSatMark", mathSatMark);
    formDataToSend.append("totalSatMarkFile", totalSatMarkFile,"totalSatMarkFile");
    formDataToSend.append("totalSatMark", totalSatMark);

  

    try {
      const storedDetails = JSON.parse(
        sessionStorage.getItem("SignupPersonalDetails")
      );

      for (const key in storedDetails) {
        formDataToSend.append(key, storedDetails[key]);
       
          // console.log(storedDetails[key]);
          // console.log(formDataToSend.get(key));
          console.log(key)
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
        `${baseUrl}api/students/register`,formDataToSend,
        {
          headers: {
            "User-Agent": navigator.userAgent,
            "Content-Type": "multipart/form-data",
            authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NTAyYWE4YTE0ZTdiNTM1N2UwNjhlYyIsInJvbGUiOiJ0dXRvciIsImlhdCI6MTcxNzEzMDgxOH0.yQ2kisu7irJUvntqfjK-e95yys_VCbMzriFZEcv2Dks",
          },
        }
      );

      if (response.status === 200) {
        setLoading(false);
        sessionStorage.clear();
        navigate("/diagnosistest");
      } 
    } catch (error) {
      setLoading(false);
      console.error("Error:?", error?.message);
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
              <div className="education-row-heading">
                <p>English (Reading & Writing)</p>
              </div>
              <div className="education-boxes">
                <div className="upload-box">
                  <input
                    type="file"
                    className="file-input"
                    onChange={(e) => handleFileChange(e, setEnglishFile)}
                  />
                </div>
                <div className="marks-box">
                  <input
                    type="text"
                    className="marks-input"
                    placeholder="Enter marks"
                    value={englishSatMark}
                    onChange={(e) => handleMarksChange(e, setEnglishMarks)}
                  />
                </div>
              </div>
            </div>

            <div className="education-row">
              <div className="education-row-heading">
                <p>Math</p>
              </div>
              <div className="education-boxes">
                <div className="upload-box">
                  <input
                    type="file"
                    className="file-input"
                    onChange={(e) => handleFileChange(e, setMathFile)}
                  />
                </div>
                <div className="marks-box">
                  <input
                    type="text"
                    className="marks-input"
                    placeholder="Enter marks"
                    value={mathSatMark}
                    onChange={(e) => handleMarksChange(e, setMathMarks)}
                  />
                </div>
              </div>
            </div>

            <div className="education-row">
              <div className="education-row-heading">
                <p>Total Score</p>
              </div>
              <div className="education-boxes">
                <div className="upload-box">
                  <input
                    type="file"
                    className="file-input"
                    onChange={(e) => handleFileChange(e, setTotalFile)}
                  />
                </div>
                <div className="marks-box">
                  <input
                    type="text"
                    className="marks-input"
                    placeholder="Enter marks"
                    value={totalSatMark}
                    onChange={(e) => handleMarksChange(e, setTotalMarks)}
                  />
                </div>
              </div>
            </div>

            <div className="consent-container">
              <label className="consent-label">
                <input
                  type="checkbox"
                  checked={consent}
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
