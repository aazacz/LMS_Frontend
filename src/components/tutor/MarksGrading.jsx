import React from 'react'
import { useParams, Link } from 'react-router-dom'

const MarksGrading = () => {
    const { assignmentId } = useParams()

    return (
        <div className="w-full h-max flex flex-col justify-start font-poppins p-2 gap-4">
            <p className="w-full h-max text-sm md:text-base font-semibold">
                Donald Duck
            </p>
            <div className="w-36 h-36 md:w-56 md:h-56 bg-red-400"></div>
            <p className="w-full text-sm md:text-base">
                Marks for the Assignment <span className="text-red-500">*</span>{' '}
            </p>
            <input
                type="text"
                className="w-full h-10 outline-none border-2 border-gray-300 p-2 text-sm"
            />
            <p className="w-full text-sm md:text-base">Remarks / Assignment </p>
            <input
                type="text"
                className="w-full h-10 outline-none border-2 border-gray-300 p-2 text-sm"
            />
            <div className="w-full flex gap-6 flex-wrap">
                <button className="py-3 px-8 bg-[#2525AD] text-white text-sm md:text-base">
                    Grade
                </button>
                <Link to="/grading">
                    <button className="py-3 px-8 bg-[#2525AD] text-white text-sm md:text-base">
                        Cancel
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default MarksGrading
