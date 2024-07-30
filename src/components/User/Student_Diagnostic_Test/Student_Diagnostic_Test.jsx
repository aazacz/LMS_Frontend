import React, { useState, useEffect } from 'react'
import './Student_Diagnostic_test.css'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Loader from '../../reusable/Loader'
import { axiosInstanceStudent } from '../../../routes/UserRoutes'
const Student_Diagnostic_Test = () => {
    const baseURL = process.env.REACT_APP_API_URL
    const [testDetails, setTestDetails] = useState(null) // Initialize as null to handle loading state
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate() 


    const location = useLocation()
    const { course, courseType } = location.state || {}


    useEffect(() => {
        const fetchTestDetails = async () => {
            
            try {
              
                if (courseType === 'test') {
                        console.log("course")
                        console.log(course)
                        console.log(courseType)
                    setTestDetails(course);
                } else {
                    console.log("else execeuted")
                    const response = await axiosInstanceStudent.get(`api/test/diagnosis-test-active` )
                    console.log("response")
                    console.log(response)
                    if(response.data){
                        
                        setTestDetails(response.data);
                    }
                }
            } catch (error) {
                console.error('Error fetching test details:', error);
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
    
        fetchTestDetails();
    }, [ ]);


    useEffect(()=>{
    
    },[testDetails])


    const handleSubmit = () => {
        // Check if testDetails has loaded and contains necessary data
        if (testDetails) {
            navigate('/diagnosistest/test1', {
                state: { testId: testDetails._id },
            })
        } 
        else {
            console.error('Test details not loaded yet.')
        }
    }

    if (loading) {
        return <Loader /> // Render loading indicator while fetching data
    }

    return (
        <div className="w-full h-screen relative">
            <div className="student-diagnostic-test-rules-main-container">
                <div className="student-diagnostic-test-main-title text-base md:text-lg lg:text-xl">
                    Instructions:
                </div>
                <div className="text-base md:text-lg">
                    {testDetails ? (
                        <>
                            <li>
                                Total Number of Questions:{' '}
                                <span className="text-bold">
                                    {testDetails.questionCount}
                                </span>
                            </li>
                            <li>
                                Time Alloted:{' '}
                                <span className="text-bold">10 mins</span>
                            </li>
                            <li>
                                Each Question Carries:{' '}
                                <span className="text-bold">
                                    Positive: {testDetails.positiveMark} marks
                                    and Negative: {testDetails.negativeMark}{' '}
                                    marks
                                </span>
                            </li>
                            <li>Test should be taken in full screen only</li>
                            <li>Do not switch tabs </li>
                            <li>
                                If you are unable to complete the test within
                                the given time limit, do not panic. All answered
                                questions will be considered for the final
                                result.
                            </li>
                        </>
                    ) : (
                        <p>No test details available.</p>
                    )}
                </div>
                <div className="pt-8 student-diagnostic-test-main-title text-base md:text-lg lg:text-xl">
                    {testDetails && (
                        <>
                            Total {testDetails.questionCount} Questions Positive
                            Marks: +{testDetails.positiveMark} | Negative Marks:
                            - {testDetails.negativeMark}
                        </>
                    )}
                </div>
                <div className="student-diagnostic-test-sub-title text-base md:text-lg">
                    <li>
                        Click on submit button given at the bottom of the page
                        to submit your exam.
                    </li>
                    <li>
                        Test will be submitted automatically if the time
                        expires.
                    </li>
                    <li>Do not refresh the page during your test.</li>
                </div>
                <p className="text-red-600 text-base lg:text-xl mt-2 font-semibold">
                    Do not switch tabs or exit full screen. This will lead to
                    automatic submission.
                </p>
                <div
                    className="student-diagnostic-test-submit-button px-4 py-2 w-full md:w-[30%] lg:w-[15%]"
                    onClick={handleSubmit}
                >
                    <Link to={'/diagnosistest/test1'}>Continue</Link>
                </div>
            </div>
        </div>
    )
}

export default Student_Diagnostic_Test
