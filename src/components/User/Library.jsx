import React from 'react'
import Pdflogo from "./Pdflogo.jsx"
import { MdFileDownload } from "react-icons/md";

const Library = () => {
    const pdf = [1, 2, 3, 5, 4, 1, 2, 5, 5, 6, 6]

    return (
        <div className='px-6  w-full h-[90vh]  '>

            <h1 className='font-poppins text-3xl py-4 font-semibold text-black'>Library</h1>

            <div className='grid grid-flow-row grid-cols-6 gap-4  '>

                {pdf.map(() => {
                    return (


                        <PdfCard />
                    )
                })}

            </div>

        </div>
    )
}

export default Library





const PdfCard = () => {
    return (

        <div className='w-full bg-gray-300 h-full flex flex-col justify-center items-center px-1 py-4 rounded-md'>
            <div>
                <Pdflogo />
            </div>

            <div className='flex justify-between mt-4 gap-x-5 items-center'>
                <h1 className='font-plusjakartasans font-semibold text-xs line-clamp-1'> SAT Prep Book</h1>

                <a href={'https://css4.pub/2015/icelandic/dictionary.pdf'} target="_blank" download className='flex items-center'>
                    <MdFileDownload className='text-xl' />
                </a>

            </div>
        </div>
    )
}