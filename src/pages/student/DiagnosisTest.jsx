import React, { useState, useEffect } from 'react';
import { FaGoogleScholar } from 'react-icons/fa6';
import { PiWarningOctagonDuotone } from 'react-icons/pi';
import { Hourglass } from 'react-loader-spinner';
import Swal from 'sweetalert2'
import Loader from '../../components/reusable/Loader';
import { useNavigate } from 'react-router-dom';
import "./DiagnosisTest.css"



const DiagnosisTest = () => {
    const [fontSize, setFontSize] = useState(15);
    const [timeLeft, setTimeLeft] = useState(600); 
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate()

const handleSubmit= ()=>[
    
    Swal.fire({
        title: 'Do you want to submit the answers? You will not be able to continue this later.',
        showDenyButton: true,
        confirmButtonText: 'Yes',
        denyButtonText: 'No',
        customClass: {
            actions: 'my-actions',
            confirmButton: 'my-confirm-button',
            denyButton: 'my-deny-button',
        },
    }).then((result) => {
        if (result.isConfirmed) {
            setLoading(true)
            setTimeout(() => {
            setLoading(false)
            Swal.fire({
                icon: 'success',
                title: 'Submitted!',
                text: 'Your answers have been submitted successfully.',
                customClass: {
                    confirmButton: 'my-toast-confirm-button',
                },
            });
                setTimeout(() => {
                    navigate("/diagnosistest/result")
                }, 1500);
            }, 3000);
        }
        })
]


    const questions = [
        {
            text: 'Former astronaut Ellen Ochoa says that although she doesn’t have a definite idea of when it might happen, she _______ that humans will someday need to be able to live in other environments than those found on Earth. This conjecture informs her interest in future research missions to the moon.',
            options: ['Demands', 'Speculates', 'Establishes', 'Doubts']
        },
        {
            text: 'The book, which was published last year, offers a fascinating _______ into the life of a woman who overcame great odds to become a leader in her field.',
            options: ['insight', 'glimpse', 'view', 'look']
        },
        {
            text: 'Despite the challenges, the team managed to _______ the project on time and within budget, impressing the stakeholders.',
            options: ['complete', 'initiate', 'abandon', 'extend']
        },
        // Add more questions as needed
    ];

    const questionStatus = [
        { number: "1", status: "Answered" },
        { number: "2", status: "NotAnswered" },
        { number: "3", status: "Pending" },
        { number: "4", status: "AMFR" },
        { number: "5", status: "MFR" },
        { number: "6", status: "MFR" },
        { number: "7", status: "NotAnswered" },
        { number: "8", status: "Answered" },
        { number: "9", status: "Answered" },
        { number: "10", status: "Answered" },
    ];

    const handleFontSizeChange = (event) => {
        setFontSize(event.target.value);
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const getStatusClass = (status) => {
        switch (status) {
            case 'Answered':
                return 'bg-green-500';
            case 'NotAnswered':
                return 'bg-red-500';
            case 'Pending':
                return 'bg-yellow-500';
            case 'AMFR':
                return 'bg-purple-500';
            case 'MFR':
                return 'bg-blue-500';
            default:
                return 'bg-gray-500';
        }
    };

    useEffect(() => {
        if (timeLeft === 0) return;
        const intervalId = setInterval(() => {
            setTimeLeft(prevTime => prevTime - 1);
        }, 1000);
        return () => clearInterval(intervalId);
    }, [timeLeft]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <>
            {loading && <Loader />}
        <div className={`${loading ? "blur-md":""} Test w-screen h-screen flex overflow-y-scroll relative`}>


            {/*BODY CONTENT  */}
            <div className='max-w-[1000px] w-full p-5 h-full'>
                {/* DIV 1 header component */}
                <div className='w-full'>
                    <h1 className='font-semibold font-poppins text-lg'>Diagnosis Test</h1>
                </div>

                {/* DIV 3 Question Number */}
                <div className='pl-5 mt-5'>
                    <div className='w-full bg-gray-200 h-10 relative flex justify-between pl-10 items-center pr-4'>
                        <div className='absolute left-0 z-10 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center'>
                            <div className='w-10 h-10 rounded-full z-20 bg-black text-white flex items-center justify-center'>
                                {currentQuestionIndex + 1}
                            </div>
                            <div className='w-6 h-6 transform rotate-45 bg-black -ml-[22px] z-10'></div>
                        </div>
                        <h1 className='font-poppins font-semibold text-xs'>Single Answer :  Correct 4M Wrong -0.5M</h1>
                        <div className='flex gap-x-4 items-center border-2'>
                            <PiWarningOctagonDuotone />
                            <h1>Report Question</h1>
                        </div>
                    </div>
                </div>

                {/* DIV 4 Question Text */}
                <div className='w-full mt-4'>
                    <div className='h-32 overflow-y-auto'>
                        <h1 className='font-semibold' style={{ fontSize: `${fontSize}px` }}>{currentQuestion.text}</h1>
                    </div>
                </div>

                {/* DIV 5 Question Options */}
                <div className='w-full mt-3 grid grid-flow-row grid-rows-4 gap-y-4'>
                    {currentQuestion.options.map((option, index) => (
                        <div key={index} className='h-10 flex items-center border-[1px] w-full px-4 gap-x-5 font-poppins font-semibold text-sm'>
                            <input type='radio' name='answer' /> <h1>{option}</h1>
                        </div>
                    ))}
                </div>

                {/* next and previous button  also font size slider */}
                <div className='w-full flex justify-between items-center mt-5'>
                    <div className='flex gap-x-5'>
                        <button onClick={handlePreviousQuestion} className='px-6 font-semibold font-poppins text-sm border-[1px] border-black py-2 rounded-lg'>Previous</button>
                        <button onClick={handleNextQuestion} className='px-6 font-semibold font-poppins text-sm border-[1px] border-black py-2 rounded-lg'>Next</button>
                    </div>

                    <div className='flex items-center'>
                        <label htmlFor='fontSize' className='font-semibold mr-2'>Font Size</label>
                        <input
                            id='fontSize'
                            type='range'
                            min='12'
                            max='20'
                            value={fontSize}
                            step='1'
                            onChange={handleFontSizeChange}
                        />
                        <span className='ml-2'>{fontSize}px</span>
                    </div>
                </div>

                <div className='w-full '></div>
            </div>

            {/* ######################  ASIDE CONTENT  ######################*/}
            <div className='flex-1 border-l-2 '>

                {/* Timer Function */}
                <div className='flex gap-x-2 items-center h-10   relative p-4'>
                    <span className='font-semibold'>Time Left :</span>
                    <span className='font-semibold'>{formatTime(timeLeft)}</span>
                    <div className='flex items-center absolute left-28'>
                        <Hourglass
                            visible={true}
                            height="20"
                            ariaLabel="hourglass-loading"
                            wrapperStyle={{ margin: 0 }}
                            colors={['#306cce', '#72a1ed']}
                        />
                    </div>
                </div>

                {/* Name Div */}
                <div className='w-full p-4 bg-[#EDF8FF] flex items-center justify-between'>
                    <span className='uppercase font-semibold font-poppins text-black '>Christian Bale</span>
                    <span className='w-10 h-10 bg-[#0047FF] flex rounded-full items-center justify-center text-white'>
                        <FaGoogleScholar />      </span>
                </div>

                <div className='w-full h-[100%] bg-[#EDF8FF] flex  '>
                    <div className=' p-5 w-full h-max  justify-between grid grid-flow-row grid-cols-5 gap-5 '>
                        {questionStatus.map((value, index) => {
                            return (
                                <div key={index} className={`w-8 h-8 rounded-full  flex justify-center items-center text-white  ${getStatusClass(value.status)}`} > {value.number}</div>
                            )
                        })}
                    </div>
                </div>
            </div>

            <div className='fixed bottom-0 w-full h-14 px-8 bg-white shadow-[0px_0px_6px_8px_#00000024] flex justify-between items-center'>
                <div className='flex gap-x-5'>
                    <button className='px-6 font-semibold font-poppins text-sm border-[1px] border-black py-2 rounded-lg'>Mark for Review & Next</button>
                    <button className='px-6 font-semibold font-poppins text-sm border-[1px] border-black py-2 rounded-lg'>Clear Response</button>
                </div>

                <div className='flex gap-x-5'>
                    <button className='px-6 font-semibold font-poppins text-sm bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg'>Save & Exit</button>
                    <button onClick={handleSubmit} className='px-12 font-semibold font-poppins text-sm bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg'>Submit</button>
                </div>
            </div>
        </div>
                            </>
    );
}

export default DiagnosisTest;
