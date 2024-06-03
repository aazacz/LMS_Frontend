import React from 'react'

const DiagnosisTestResult = () => {
    console.log("difgrifgruifgwdruif")
    return (

        <div className='w-screen h-screen p-20'>


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


            <div className='w-full'>
              
                <h1>Overall Analysis</h1>

                <div className='w-full px-8 rounded-md  border-[1px] border-[#0066DE] bg-white'>
                <div>
                    <h2> 10 Questions</h2>
                    <h2> 9 Correct</h2>
                    <h2> 9 Questions</h2>
                    <h2> 1 Wrong</h2>
                    <h2> 90% Accuracy</h2>
                </div>
            
                </div>


            </div>


        </div>




    )
}

export default DiagnosisTestResult