import React, { useState } from 'react'
import Pdflogo from "./Pdflogo.jsx"
import { MdFileDownload } from "react-icons/md";
import sample from '/sample.pdf'





const Library = () => {
    
    const [Modal,setModal] = useState(false)
    
    
    const pdf = [1, 2, 3, 5, 4, 1, 2, 5, 5, 6, 6]


    const openModal=()=>{
        setModal(true)
        }

    return (
        <div onClick={()=>setModal(false)} className={`w-screen flex justify-center ${Modal ? " bg-gray-200":" "}`}>

        <div  className={`px-6  shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] bg-whiet max-w-[1200px] h-[90vh] flex flex-col relative `}  >
            {Modal && (
          <div className="w-full max-w-[80vw] h-[88vh]  absolute left-1/2 -translate-x-1/2">
                 <object data={sample} type="application/pdf" width="100%" height="100%">
                 <img src="broken.png" alt="PDF not found"/>
                    </object>
          </div>
        )}

            <h1 className='font-poppins text-3xl py-4 font-semibold text-black'>Library</h1>

            <div className='grid grid-flow-row grid-cols-6 gap-4  '>

                {pdf.map((valuem,index) => {
                    return (

                        <div key={index} onClick={(e) => { e.stopPropagation(); openModal(); }}>
                        <PdfCard />
                      </div>
                    )
                })}

            </div>

            </div>
        </div>
    )
}

export default Library





const PdfCard = () => {
    return (

        <div className='w-full bg-gray-300 h-full flex flex-col justify-center items-center px-1 py-4 rounded-md'>
            <div >
                <Pdflogo />
            </div>

            <div className='flex justify-between mt-4 gap-x-5 items-center'>
                <h1 className='font-plusjakartasans font-semibold text-xs line-clamp-1'> SAT Prep Book</h1>

           
                <a href={sample} target="_blank" download className='flex items-center'>
                    <MdFileDownload className='text-xl' />
                </a>

            </div>
        </div>
    )
}