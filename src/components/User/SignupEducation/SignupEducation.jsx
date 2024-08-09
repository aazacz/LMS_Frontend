import React, { useState, useEffect } from 'react'
import './SignupEducation.css'
import personalDetailsImage from '../../../assets/SignupPersonalDetails/personal.svg'
import Loader from '../../reusable/Loader'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
import { toast } from 'react-toastify'

const SignupEducation = () => {
    const baseUrl = process.env.REACT_APP_API_URL
    const [englishSatMarkFile, setEnglishFile] = useState(null)
    const [englishSatMark, setEnglishMarks] = useState('')
    const [mathSatMarkFile, setMathFile] = useState(null)
    const [mathSatMark, setMathMarks] = useState('')
    const [totalSatMarkFile, setTotalFile] = useState(null)
    const [totalSatMark, setTotalMarks] = useState('')
    const [consent, setConsent] = useState(false)
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        const storedDetails = sessionStorage.getItem('SignupPersonalDetails')
        if (!storedDetails) {
            navigate('/signup/signupPersonalDetails')
        }
    }, [navigate])

    const handleConsentChange = () => {
        setConsent(!consent)
    }

    const handleEnglishFileChange = (e) => {
        setEnglishFile(e.target.value)
    }

    const handleEnglishMarksChange = (e) => {
        setEnglishMarks(e.target.value)
    }

    const handleMathFileChange = (e) => {
        setMathFile(e.target.value)
    }

    const handleMathMarksChange = (e) => {
        setMathMarks(e.target.value)
    }

    const handleTotalFileChange = (e) => {
        setTotalFile(e.target.value)
    }

    const handleTotalMarksChange = (e) => {
        setTotalMarks(e.target.value)
    }

    const registerUser = async (e) => {
        e.preventDefault()
        if (!consent) {
            Swal.fire({
                icon: 'warning',
                text: 'Please provide consent to proceed.',
            })
            return
        }

        setLoading(true)

        const formDataToSend = new FormData()
        formDataToSend.append('englishSatMarkFile', englishSatMarkFile)
        formDataToSend.append('englishSatMark', englishSatMark)
        formDataToSend.append('mathSatMarkFile', mathSatMarkFile)
        formDataToSend.append('mathSatMark', mathSatMark)
        formDataToSend.append('totalSatMarkFile', totalSatMarkFile)
        formDataToSend.append('totalSatMark', totalSatMark)

        try {
            const storedDetails = JSON.parse(
                sessionStorage.getItem('SignupPersonalDetails')
            )

            for (const key in storedDetails) {
                formDataToSend.append(key, storedDetails[key])
            }
            console.log(formDataToSend.get('englishSatMarkFile'))
            console.log(formDataToSend.get('mathSatMarkFile'))
            console.log(formDataToSend.get('totalSatMarkFile'))
            console.log(formDataToSend.get('englishSatMark'))
            console.log(formDataToSend.get('mathSatMark'))
            console.log(formDataToSend.get('totalSatMark'))
            console.log(formDataToSend.get('name'))
            console.log(formDataToSend.get('grade'))
            console.log('FormData contents:')
            formDataToSend.forEach((value, key) => {
                console.log(key, value)
            })

            const response = await axios.post(
                `${baseUrl}api/students/register`,
                formDataToSend,
                {
                    'user-agent': navigator.userAgent,
                    'Content-Type': 'multipart/form-data',
                }
            )

            if (response.status === 200) {
                setLoading(false)
                Swal.fire({
                    icon: 'success',
                    text: 'User Registerd Successfully.',
                })
                sessionStorage.clear()
                navigate('/login')
            }
        } catch (error) {
            setLoading(false)
            console.error('Error:', error)
            toast.error(error.response.data.error)
        }
    }

    return (
        <div className="educationdetailscontainer">
            <form onSubmit={registerUser}>
                <div>
                    {loading && (
                        <div className="modal-overlay w-screen h-[88vh] absolute">
                            <Loader />
                        </div>
                    )}
                    <div
                        className={
                            loading
                                ? 'educationcontainer blurred'
                                : 'educationcontainer'
                        }
                    >
                        <div className="flex">
                            <div className="educationdetailsphoto">
                                <img
                                    className="educationphoto"
                                    src={personalDetailsImage}
                                    alt="Personal Details"
                                />
                                <div className="education-details-content-container">
                                    <p className="education-details-content">
                                        Signup to get started
                                    </p>
                                    <p className="education-details-sub-content">
                                        2,97,565 students and parents signed up
                                        to study <br />
                                        abroad. Make an informed decision about
                                        your abroad education.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="education-details-main-heading">
                            <div className="education-details-heading">
                                <p className="education-details-sub-heading">
                                    3. Current Details Education
                                </p>
                                <p className="education-details-sub-sub-heading">
                                    Accurate details will help us show
                                    universities & scholarships that match your
                                    profile.
                                </p>
                                <section className="education-detail-section">
                                    <div className="education-input-row">
                                        <input
                                            type="file"
                                            className="education-detail-input-file"
                                            value={englishSatMarkFile}
                                            onChange={handleEnglishFileChange}
                                        />
                                        <input
                                            type="text"
                                            className="education-detail-input"
                                            name="grade"
                                            placeholder="Enter English marks"
                                            value={englishSatMark}
                                            onChange={handleEnglishMarksChange}
                                        />
                                    </div>
                                    <div className="education-input-row">
                                        <input
                                            type="file"
                                            className="education-detail-input-file"
                                            value={mathSatMarkFile}
                                            onChange={handleMathFileChange}
                                        />
                                        <input
                                            type="text"
                                            className="education-detail-input"
                                            placeholder="Enter Math marks"
                                            value={mathSatMark}
                                            onChange={handleMathMarksChange}
                                        />
                                    </div>
                                    <div className="education-input-row">
                                        <input
                                            type="file"
                                            className="education-detail-input-file"
                                            value={totalSatMarkFile}
                                            onChange={handleTotalFileChange}
                                        />
                                        <input
                                            type="text"
                                            className="education-detail-input"
                                            placeholder="Enter Total marks"
                                            value={totalSatMark}
                                            onChange={handleTotalMarksChange}
                                        />
                                    </div>
                                    <div className="consent-container">
                                        <input
                                            type="checkbox"
                                            value={consent}
                                            onChange={handleConsentChange}
                                            className="consent-checkbox"
                                        />
                                        <p>
                                            I have read and provide consent for
                                            my data to be processed for purposes
                                            mentioned
                                            <br />
                                            in the Terms and Conditions and
                                            agree to be contacted for Education
                                            related services
                                            <br />& promotions.
                                        </p>
                                    </div>
                                    <div className="flex flex-col md:flex-row items-center w-full justify-center">
                                        <button
                                            type="submit"
                                            className="education-detail-submit"
                                        >
                                            Register
                                        </button>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default SignupEducation
