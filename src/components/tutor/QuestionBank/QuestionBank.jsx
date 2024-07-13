import React, { useState } from 'react'
import { CiSearch } from 'react-icons/ci'

const QuestionBank = () => {
    const best = [
        { name: 'John Doe', email: 'john.doe@example.com' },
        { name: 'Jane Smith', email: 'jane.smith@example.com' },
        { name: 'Jane Smith', email: 'jane.smith@example.com' },
        { name: 'Jane Smith', email: 'jane.smith@example.com' },
        { name: 'Jane Smith', email: 'jane.smith@example.com' },
        { name: 'Jane Smith', email: 'jane.smith@example.com' },
        { name: 'Jane Smith', email: 'jane.smith@example.com' },
        // ... more items
    ]
    const least = [
        { name: 'John Doe', email: 'john.doe@example.com' },
        { name: 'Jane Smith', email: 'jane.smith@example.com' },
        { name: 'Jane Smith', email: 'jane.smith@example.com' },
        { name: 'Jane Smith', email: 'jane.smith@example.com' },
        { name: 'Jane Smith', email: 'jane.smith@example.com' },
        { name: 'Jane Smith', email: 'jane.smith@example.com' },
        { name: 'Jane Smith', email: 'jane.smith@example.com' },
        // ... more items
    ]
    const data = [
        {
            slno: 1,
            name: 'John Doe',
            attempts: 28,
            questions: 'john@example.com',
            negativemarks: '20',
            marks: '20',
        },
        {
            slno: 2,
            name: 'John Doe',
            attempts: 28,
            questions: 'john@example.com',
            negativemarks: '20',
            marks: '20',
        },
        {
            slno: 3,
            name: 'John Doe',
            attempts: 28,
            questions: 'john@example.com',
            negativemarks: '20',
            marks: '20',
        },
        {
            slno: 4,
            name: 'John Doe',
            attempts: 28,
            questions: 'john@example.com',
            negativemarks: '20',
            marks: '20',
        },
        {
            slno: 5,
            name: 'John Doe',
            attempts: 28,
            questions: 'john@example.com',
            negativemarks: '20',
            marks: '20',
        },
        {
            slno: 6,
            name: 'John Doe',
            attempts: 28,
            questions: 'john@example.com',
            negativemarks: '20',
            marks: '20',
        },
    ]

    const [searchTerm, setSearchTerm] = useState('')

    const handleSearch = (event) => {
        setSearchTerm(event.target.value.toLowerCase())
    }

    return (
        <div className="font-poppins w-full h-max flex flex-col justify-left items-left p-4 ">
            <p className="text-sm md:text-base lg:text-lg font-semibold p-2">
                Tests
            </p>

            <div className="w-full h-80 flex ">
                <div className="w-full lg:w-[70%] h-full   flex flex-col p-2">
                    <div className="w-full h-max bg-white  flex justify-between items-center text-xs md:text-[14px] rounded-lg p-2">
                        <input
                            type="text"
                            placeholder="Search For Student"
                            className="w-full p-2 outline-none"
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                        <button className="p-1 w-max text-[10px] md:text-xs bg-blue-600 text-white rounded-lg flex gap-2 justify-center items-center">
                            <CiSearch className="w-5 h-5 lg:w-8 lg:h-8" />
                            <p className="w-20">Show Results</p>
                        </button>
                    </div>
                    {/*Table Starts Here*/}
                    <div className="min-w-full sm:w-full">
                        <div className="overflow-x-auto w-full bg-yellow-400">
                            <table className="mx-auto min-w-44 w-full whitespace-nowrap  bg-white  overflow-x-scroll">
                                <thead className="bg-gray-50">
                                    <tr className="text-gray-600 text-left">
                                        <th className="font-semibold text-sm uppercase px-2 py-2">
                                            Sl No
                                        </th>
                                        <th className="font-semibold text-sm uppercase px-2 py-2">
                                            Name
                                        </th>
                                        <th className="font-semibold text-sm uppercase px-2 py-2">
                                            Attempts
                                        </th>
                                        <th className="font-semibold text-sm uppercase px-2 py-2">
                                            Questions
                                        </th>
                                        <th className="font-semibold text-sm uppercase px-2 py-2">
                                            Negative Marks
                                        </th>
                                        <th className="font-semibold text-sm uppercase px-2 py-2">
                                            Marks
                                        </th>
                                        <th className="font-semibold text-sm uppercase px-2 py-2">
                                            Reports
                                        </th>
                                        <th className="font-semibold text-sm uppercase px-2 py-2"></th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-gray-200">
                                    {data.map((item) => (
                                        <tr key={item.id}>
                                            <td className="px-2 py-2">
                                                {item.slno}
                                            </td>
                                            <td className="px-2 py-2">
                                                {item.name}
                                            </td>
                                            <td className="px-2 py-2">
                                                {item.attempts}
                                            </td>
                                            <td className="px-2 py-2">
                                                {item.questions}
                                            </td>
                                            <td className="px-2 py-2">
                                                {item.negativemarks}
                                            </td>
                                            <td className="px-2 py-2">
                                                {item.marks}
                                            </td>
                                            <td className="px-2 py-2">
                                                <button className="p-2 border-2 border-black rounded-md ">
                                                    Review
                                                </button>
                                            </td>
                                            <td className="px-2 py-2">
                                                <button className="p-2 bg-blue-600 rounded-md text-white">
                                                    Start
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Aside Bar Starts Here*/}
                <div className="w-[30%] h-max  flex-col justify-center items-center  gap-2 font-poppins border-l border-black hidden lg:block">
                    <div className="w-[90%] h-72 flex flex-col">
                        <p className="text-sm font-semibold p-2">
                            Top Performers in Tests
                        </p>

                        <div className="w-full h-64 overflow-y-scroll no-scrollbar bg-[#E5F0FC]">
                            {best.map((item, index) => (
                                <div
                                    key={index}
                                    className="w-[90%] h-max flex justify-start items-start p-2"
                                >
                                    <div className="w-10 h-10 rounded-full bg-black"></div>
                                    <div className="w-max flex flex-col ml-2 justify-start items-start text-xs">
                                        <p>{item.name}</p>{' '}
                                        <p className="text-gray-500">
                                            {item.email}
                                        </p>{' '}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="w-[90%] h-72 flex flex-col">
                        <p className="text-sm font-semibold p-2">
                            Least Performing
                        </p>
                        <div className="w-full h-64 overflow-y-scroll no-scrollbar bg-[#E5F0FC]">
                            {least.map((item, index) => (
                                <div
                                    key={index}
                                    className="w-[90%] h-max flex justify-start items-start p-2"
                                >
                                    <div className="w-10 h-10 rounded-full bg-black"></div>
                                    <div className="w-max flex flex-col ml-2 justify-start items-start text-xs">
                                        <p>{item.name}</p>{' '}
                                        <p className="text-gray-500">
                                            {item.email}
                                        </p>{' '}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default QuestionBank
