import React from 'react'
import './Student_Diagnostic.css'
import ImageStudent1 from '../../../assets/Animation_Tutor/MainImage1.png'
import { Link } from 'react-router-dom'
import Background from '../../reusable/Background'

const Student_Diagnostic = () => {
    return (
        <div className="w-screen h-[100vh] relative px-10">
            <div className="absolute top-0 left-0 -z-10">
                <Background />
            </div>
            <div className="h-max flex-wrap-reverse student-diagnostic-main-container">
                <div className="gap-5 justify-center items-start flex flex-col p-4 w-full  md:w-[50%]">
                    <div className="student-diagnostic-sub-title flex items-start text-2xl md:text-4xl lg:text-6xl   ">
                        &#x275D; Get Your Diagnostic Test Report With Detailed
                        Analysis.You Will Get A Customized Study Plan Based On
                        Your Assessment &#x275E;
                    </div>
                    <Link to={'/diagnosistest/instructions'}>
                        <div className=" text-sm py-2 px-2 w-full my-4 md:text-lg lg:text-xl student-diagnostic-sub-button">
                            Get Diagnosis Test Results
                        </div>
                    </Link>
                </div>
                <div className="w-full md:w-[40%] m-4 ">
                    <img src={ImageStudent1}></img>
                </div>
            </div>
        </div>
    )
}

export default Student_Diagnostic
