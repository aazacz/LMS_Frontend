import React from 'react'
import { SlOptions } from 'react-icons/sl'

const Dashboard_TopStudents = () => {
    return (
        <div className="w-full max-h-[300px] shadow-md bg-blue-100 rounded-lg flex flex-col justify-start items-start">
            <p className="w-full font-poppins font-semibold p-2 text-sm md:text-lg">
                Top Students
            </p>
            <div className="w-full p-2 h-[300px] overflow-auto rounded-lg">
                <table className="border-none w-full border-collapse font-poppins overflow-x-scroll">
                    <thead className="bg-[#E9F2FC] sticky top-0 z-10">
                        <tr>
                            <th className=" bg-[#E9F2FC] border-none text-left text-xs md:text-sm py-2 px-4 font-semibold">
                                ID
                            </th>
                            <th className=" bg-[#E9F2FC] border-none text-left text-xs md:text-sm py-2 px-4 font-semibold">
                                Name
                            </th>
                            <th className=" bg-[#E9F2FC] border-none  text-left text-xs md:text-sm py-2 px-4 font-semibold">
                                Course
                            </th>
                            <th className=" bg-[#E9F2FC] border-none text-left text-xs md:text-sm py-2 px-4 font-semibold">
                                Tutor
                            </th>
                            <th className=" bg-[#E9F2FC] border-none text-left text-xs md:text-sm py-2 px-4 font-semibold">
                                Email ID
                            </th>
                            <th className=" bg-[#E9F2FC] border-none text-left text-xs md:text-sm py-2 px-4 font-semibold">
                                Previous Marks
                            </th>
                            <th className=" bg-[#E9F2FC] border-none  text-left text-xs md:text-sm py-2 px-4 font-semibold"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.from({ length: 10 }).map((_, index) => (
                            <tr key={index}>
                                <td className=" border-none text-left text-xs md:text-sm py-2 px-4 bg-white">
                                    251
                                </td>
                                <td className=" border-none text-left text-xs md:text-sm py-2 px-4 bg-white">
                                    Amar
                                </td>
                                <td className=" border-none text-left text-xs md:text-sm py-2 px-4 bg-white">
                                    SAT Course
                                </td>
                                <td className=" border-none text-left text-xs md:text-sm py-2 px-4 bg-white">
                                    Lauren
                                </td>
                                <td className=" border-none text-left text-xs md:text-sm py-2 px-4 bg-white">
                                    amar@gmail.com
                                </td>
                                <td className=" border-none text-left text-xs md:text-sm py-2 px-4 bg-white">
                                    485
                                </td>
                                <td className=" border-none bg-white">
                                    <SlOptions />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Dashboard_TopStudents
