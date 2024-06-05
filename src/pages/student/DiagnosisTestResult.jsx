import React from 'react'
import DoughnutChart from './DoughnutChart'


const DiagnosisTestResult = () => {


    return (

        <div className='Test w-screen h-screen overflow-y-scroll p-24 '>


            <div className='w-full h-[400px] rounded-[35px] bg-white border-[#0066DE]  border-2 flex flex-col justify-center items-center'>

                <h1 className='text-center font-poppins font-semibold py-4'>Thankyou for your patience. <br />
                    we’ve analysed your test and profile. The courses suggested will be on your dashboard.<br />
                    you can also choose tutor of your choice for your interested course
                </h1>

                <h1 className='font-bold text-2xl'>Your Score : 35/40</h1>

                {/*  Button  */}
                <div className='mt-5'>
                    <div className='w-full flex gap-x-8'>
                        <button className='text-[#0066DE] rounded-md  border-[1px] border-[#0066DE] px-5 py-1 text-lg font-poppins font-semibold'> Go to Dashboard</button>
                        <button className='bg-[#0066DE] rounded-md px-5 py-1 text-white font-semibold font-poppins'> View Solutions</button>
                    </div>
                </div>
            </div>


            <div className='w-full py-8 -200 mt-10'>

                <h1 className='font-poppins font-bold text-lg'>Overall Analysis</h1>

                <div className='w-full px-4 rounded-[35px] bg-white border-[#0066DE]  border-2 py-10'>
                    <div className='flex justify-around '>

                        <div className='w-[170px] h-[170px] relative flex items-center justify-center'>

                            <div className='w-full h-full  flex justify-center items-center'>
                                <DoughnutChart />
                            </div>

                            <h1 className='font-poppins font-bold text-xs border  absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 '>10 Questions</h1>
                        </div>

                        <span className='flex items-center gap-x-2'>     <span className='w-6 h-6 rounded-full bg-[#444444]'></span>
                            <h2> 10 Questions</h2>
                        </span>

                        <span className='flex items-center gap-x-2'>     <span className='w-6 h-6 rounded-full bg-[#67FE4E]'></span>
                            <h2> 10 Questions</h2>
                        </span>
                        <span className='flex items-center gap-x-2'>     <span className='w-6 h-6 rounded-full bg-[#FE4E4E]'></span>
                            <h2> 10 Questions</h2>
                        </span>
                        <span className='flex items-center gap-x-2'>     <span className='w-6 h-6 rounded-full bg-[#FB4EFE]'></span>
                            <h2> 10 Questions</h2>
                        </span>

                    </div>

                </div>

            </div>



            <div className='w-full  mt-10'>

                <div className='w-full p-8 rounded-[35px] bg-white border-[#0066DE]  border-2 py-10'>
                    <h1 className='font-poppins font-semibold text-xl'>Explanation</h1>
                    <div className='flex  mt-2' >
                        <div className='flex items-center gap-x-5 '>

                            <div className='w-8 h-8 bg-black rounded-full text-white font-semibold font-poppins flex justify-center items-center'>1</div>
                            <h1 className='font-poppins font-semibold'>If Surya has 5 apples and surya ate 5 apples. How many apples does surya have now?</h1>
                        </div>

                    </div>

                    <div className='w-full'>
<div>
    <span className='flex gap-x-2 items-center'> <div className='w-1 h-1 rounded-full bg-black'></div> Office ipsum you must be muted.</span> 
    <span className='flex gap-x-2 items-center'> <div className='w-1 h-1 rounded-full bg-black'></div> Office ipsum you must be muted.</span> 
    <span className='flex gap-x-2 items-center'> <div className='w-1 h-1 rounded-full bg-black'></div> Office ipsum you must be muted.</span> 
    <span className='flex gap-x-2 items-center'> <div className='w-1 h-1 rounded-full bg-black'></div> Office ipsum you must be muted.</span> 
</div>
                    </div>

                </div>

            </div>




        </div>




    )
}

export default DiagnosisTestResult