import React from 'react'
import coursephoto from "/coursephoto.jpeg"
import { BiSpreadsheet } from 'react-icons/bi'
import { LuTimer } from 'react-icons/lu'
const Coursedetails = () => {
    return (
        <div className='px-6 py-2 h-full flex'>

            <div className='w-[80%] h-full p-4 flex flex-col'>


                <div className='w-full h-[300px] bg-gray-800 flex items-center justify-center text-white font-semibold font-plusjakartasans text-3xl'> Introduction to SAT & DSAT</div>

                <div className='w-full  '>
                   
                   {/* heading and Module line */}
                    <div>
                        <h1 className='font-bold text-xl font-plusjakartasans'>Introduction to Basic SAT & DSAT</h1>
                        <div className='flex items-center gap-x-6 mt-2'>
                            <span className='flex items-center gap-x-1 text-sm font-plusjakartasans'>
                                <BiSpreadsheet className='text-gray-400' /> 5 Modules
                            </span>
                            <span className='flex items-center gap-x-1 text-sm font-plusjakartasans'>
                                <LuTimer className='text-gray-400' /> 60Hrs
                            </span>
                        </div>
                    </div>

<div className='w-full'>
<div className='w-full grid grid-flow-row grid-cols-4'>

    <button className='border-b-4 border-amber-500'>About</button>
    <button className='border-b-4 border-amber-500'>About</button>
    <button className='border-b-4 border-amber-500'>About</button>
    <button className='border-b-4 border-amber-500'>About</button>
   
</div>




</div>


                </div>


            </div>
            <div className='w-[20%] h-full bg-red-700'>rgrfgr</div>
        </div>
    )
}

export default Coursedetails