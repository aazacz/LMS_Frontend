import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const Assignments = () => {
    const [activeCourse, setActiveCourse] = useState('course1');

    const assignments = {
        course1: [
            { id: 1, title: 'Work on storytelling', course: 'SATD', page: 'Page 10', due: '2 days pending', status: 'Pending' },
            { id: 2, title: 'Work on writing skills', course: 'DSAT', page: 'Page 18', due: '2 days pending', status: 'Pending' },
        ],
        course2: [
            { id: 1, title: 'Prepare for math exam', course: 'MATH', page: 'Page 50', due: '3 days pending', status: 'Pending' },
            { id: 2, title: 'Science project', course: 'SCI', page: 'Page 22', due: '4 days pending', status: 'Pending' },
        ],
    };

    return (
        <>
            <div className="w-full flex-wrap h-screen bg-red-400 p-6 rounded-lg shadow-lg overflow-y-scroll no-scrollbar  flex flex-col">
                <div className='flex flex-wrap flex-grow '> 
                    <div className='w-full lg:w-[70%] bg-[#F3F3F3] p-5 h-max '>
                        <h1 className="text-2xl font-bold mb-4">Assignments</h1>
                        <div className="flex gap-x-4 mb-6">
                            <button
                                className={`px-4 py-2 rounded ${activeCourse === 'course1' ? 'bg-blue-100 text-blue-700' : 'bg-gray-200 text-gray-700'}`}
                                onClick={() => setActiveCourse('course1')}
                            >
                                Course 1
                            </button>
                            <button
                                className={`px-4 py-2 rounded ${activeCourse === 'course2' ? 'bg-blue-100 text-blue-700' : 'bg-gray-200 text-gray-700'}`}
                                onClick={() => setActiveCourse('course2')}
                            >
                                Course 2
                            </button>
                        </div>
                        <div className="flex space-x-4 mb-6">
                            <button className="bg-red-200 text-red-700 px-4 py-2 rounded">Pending</button>
                            <button className="bg-green-200 text-green-700 px-4 py-2 rounded">Completed</button>
                            <button className="bg-blue-200 text-blue-700 px-4 py-2 rounded">Archived</button>
                        </div>
                        <div className=''>
                            <h2 className="text-xl font-semibold mb-4">Pending Assignments</h2>
                            <table className="w-full border-spacing-y-4  border-separate ">
                                <thead>
                                    <tr>
                                        <th className="border-b px-4 py-2">Assignment</th>
                                        <th className="border-b px-4 py-2">Course</th>
                                        <th className="border-b px-4 py-2">Due date</th>
                                        <th className="border-b px-4 py-2">Status</th>
                                    </tr>
                                </thead>
                                <tbody className=''>
                                    {assignments[activeCourse].map((assignment) => (
                                        <tr key={assignment.id} className="shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]  bg-[#F5F1F1]">
                                            <td className="px-4 py-5">{assignment.title}</td>
                                            <td className="px-2 py-5">{assignment.course}</td>
                                            <td className="px-4 py-5">{assignment.due}</td>
                                            <td className="px-4 py-5 text-orange-500">{assignment.status}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className='w-full lg:w-[30%] p-5 bg-slate-200'>

                        <div>
                            <h1 className='font-poppins font-semibold text-xl py-2'>Assignment Calendar</h1>
                            < div className="rounded-md border-white" />
                        </div>

                        <div>
                            <h1 className='font-poppins font-semibold text-xl py-2'>Assignment Grading</h1>

                            <div className='flex flex-col '>

                                <div>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </>
    );
}

export default Assignments;
