import React, { useState, useEffect } from 'react';
import { FaGoogleScholar } from 'react-icons/fa6';
import { PiWarningOctagonDuotone } from 'react-icons/pi';
import { Hourglass } from 'react-loader-spinner';

const DiagnosisTest = () => {
    const [fontSize, setFontSize] = useState(15);
    const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds

    const handleFontSizeChange = (event) => {
        setFontSize(event.target.value);
    };

    const question = [
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
    ]

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

    const Question = 'Former astronaut Ellen Ochoa says that although she doesn’t have a definite idea of when it might happen, she _______ that humans will someday need to be able to live in other environments than those found on Earth. This conjecture informs her interest in future research missions to the moon.';

    return (
        <div className='Test w-screen h-screen flex overflow-y-scroll relative'>
            {/*BODY CONTENT  */}
            <div className='max-w-[1000px] w-full p-5 h-full'>
                {/* DIV 1 header component */}
                <div className='w-full'>
                    <h1 className='font-semibold font-poppins text-lg'>Diagnosis Test</h1>
                </div>

                {/* DIV 2 Sections */}
                {/* <div className='flex items-center gap-3 mt-4'>
                    <h1 className='text-gray-500 font-poppins font-semibold'>Sections :</h1>
                    <button className='bg-[#0056FC] text-white rounded-full font-poppins font-bold px-4 py-1'>reading & Writing</button>
                    <button className='bg-white border-[1px] rounded-full border-black text-black font-poppins font-bold px-4 py-1'>Maths</button>
                </div> */}

                {/* DIV 3 Question Number */}
                <div className='pl-5 mt-5'>
                    <div className='w-full bg-gray-200 h-10 relative flex justify-between pl-10 items-center pr-4
                            before:content-["5"] before:text-white before:w-10 before:h-10 before:flex before:items-center before:justify-center before:absolute before:left-0 before:z-10 before:top-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-full before:bg-black
                            after:content-[""] after:w-6 after:h-6 after:absolute after:left-3 after:top-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:rotate-45 after:rounded-[3px] after:bg-black'>
                        <h1 className='font-poppins font-semibold text-xs'>Single Answer :  Correct 4M Wrong -0.5M</h1>
                        <div className='flex gap-x-4 items-center border-2'>
                            <PiWarningOctagonDuotone />
                            <h1>Report Question</h1>
                        </div>
                    </div>
                </div>

                {/* DIV 4 Question Text */}
                <div className='w-full mt-4'>
                    <h1 className='font-semibold' style={{ fontSize: `${fontSize}px` }}>{Question}</h1>
                </div>

                {/* DIV 5 Question Options */}
                <div className='w-full mt-3 grid grid-flow-row grid-rows-4 gap-y-4'>
                    <div className='h-10 flex items-center border-[1px] w-full px-4 gap-x-5 font-poppins font-semibold text-sm'>
                        <input type='radio' name='answer' /> <h1>Demands</h1>
                    </div>
                    <div className='h-10 flex items-center border-[1px] w-full px-4 gap-x-5 font-poppins font-semibold text-sm'>
                        <input type='radio' name='answer' /> <h1>Speculates</h1>
                    </div>
                    <div className='h-10 flex items-center border-[1px] w-full px-4 gap-x-5 font-poppins font-semibold text-sm'>
                        <input type='radio' name='answer' /> <h1>Establishes</h1>
                    </div>
                    <div className='h-10 flex items-center border-[1px] w-full px-4 gap-x-5 font-poppins font-semibold text-sm'>
                        <input type='radio' name='answer' /> <h1>Doubts</h1>
                    </div>
                </div>

                {/* next and previous button  also font size slider */}
                <div className='w-full flex justify-between items-center mt-5'>
                    <div className='flex gap-x-5'>
                        <button className='px-6 font-semibold font-poppins text-sm border-[1px] border-black py-2 rounded-lg'>Previous</button>
                        <button className='px-6 font-semibold font-poppins text-sm border-[1px] border-black py-2 rounded-lg'>Next</button>
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
                        {question.map((value, index) => {
                            return (
                                <div key={index} className={`w-8 h-8 rounded-full  flex justify-center items-center text-white  ${getStatusClass(value.status)}`} > {value.number}</div>

                            )
                        })
                        }
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
                    <button className='px-12 font-semibold font-poppins text-sm bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg'>Submit</button>
                </div>
            </div>
        </div>
    );
}

export default DiagnosisTest;
