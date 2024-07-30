import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { FaPenRuler } from 'react-icons/fa6'
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'
import { MdAssignmentAdd } from 'react-icons/md'
import { IoDocuments } from 'react-icons/io5'



const AsideBar = ({ courseId, course }) => {


    console.log(course)
    
    return (
        <div className="sticky overflow-y-scrol top-[10vh] bg-slate-200 w-[30%] z-[1] h- flex flex-col">
            <div className="p-6 ">
                <div className="flex justify-between">
                    <div className="flex justify-left py-">
                        <Link replace
                            to={`/tutor/home/content/${courseId}/newassignment`}
                            className=""
                        >
                            <button
                                data-tooltip-id="Assignment"
                                data-tooltip-content="Create Assignment"
                                data-tooltip-delay-show={700}
                                className="flex bg-white items-center gap-4 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] p-5 text-3xl hover:text-gray-800 hover:scale-105 rounded-full border-slate-600  font-plusjakartasans  sm:font-semibold"
                            >
                                <MdAssignmentAdd />
                            </button>
                        </Link>
                        <Tooltip
                            id="Assignment"
                            place="bottom"
                            type="dark"
                            effect="solid"
                            style={{
                                backgroundColor: '#595741',
                                color: '#FFFFFF',
                                fontSize: '11px',
                            }}
                        />
                    </div>

                    <div className="flex justify-left py-1">
                        <Link
                            replace
                            to={`/tutor/home/content/${courseId}/material`}
                            className=""
                        >
                            <button
                                data-tooltip-id="library"
                                data-tooltip-content="Create Assignment"
                                data-tooltip-delay-show={700}
                                className="flex items-center gap-4 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] p-5 text-3xl hover:text-gray-800 hover:scale-105 rounded-full bg-white border-slate-600  font-plusjakartasans  sm:font-semibold"
                            >
                                <IoDocuments />
                            </button>
                        </Link>
                        <Tooltip
                            id="library"
                            place="bottom"
                            type="dark"
                            effect="solid"
                            style={{
                                backgroundColor: '#595741',
                                color: '#FFFFFF',
                                fontSize: '11px',
                            }}
                        />
                    </div>

                    <div className="flex justify-left py-1">
                        <Link
                            replace
                            to={`/tutor/home/content/${courseId}/addtest`}
                        >
                            <button
                                data-tooltip-id="library"
                                data-tooltip-content="Add Test"
                                data-tooltip-delay-show={700}
                                className="flex items-center gap-4 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] p-5 text-3xl hover:text-gray-800 hover:scale-105 rounded-full bg-white border-slate-600  font-plusjakartasans  sm:font-semibold"
                            >
                                <FaPenRuler />
                            </button>
                        </Link>

                        <Tooltip
                            id="library"
                            place="bottom"
                            type="dark"
                            effect="solid"
                            style={{
                                backgroundColor: '#595741',
                                color: '#FFFFFF',
                                fontSize: '11px',
                            }}
                        />
                    </div>
                </div>

                <h1 className="font-plusjakartasans font-bold">Modules List</h1>

                <div className="rounded-lg flex flex-col items-center">
                    <div className="w-full h-max border-b-2 border-gray-300 p-3 text-center bg-white">
                        <h1 className="font-plusjakartasans font-bold line-clamp-2">
                            Course Modules
                        </h1>
                    </div>

                    <div className="flex flex-col w-full mt-3 gap-y-2">
                        {course?.length > 0 ? (
                            course.map((module, moduleIndex) => (
                                <div
                                    key={module._id}
                                    className="w-full px-4 py-2 flex flex-col rounded-lg bg-white shadow-[0px_6px_12px_0px_#00000024]"
                                >
                                    <div className="flex justify-between items-center">
                                        <div className="flex gap-x-3 items-center w-[65%]">
                                            <div className="px-2  bg-[#C75625] text-white rounded-[4px] text-x flex font justify-center items-center">
                                                {moduleIndex + 1}
                                            </div>
                                            <h1
                                                className="text-orange-600 text-[14px] line-clamp-1 cursor-default"
                                                data-tooltip-id="my-tooltip"
                                                data-tooltip-content={
                                                    module.moduleName
                                                }
                                                data-tooltip-delay-show={300}
                                            >
                                                {module.moduleName}
                                            </h1>
                                            <Tooltip
                                                id="my-tooltip"
                                                place="top"
                                                type="dark"
                                                effect="solid"
                                                style={{
                                                    backgroundColor: '#89877c',
                                                    color: '#FFFFFF',
                                                }}
                                            />
                                        </div>
                                        <h1 className="w-[35%] text-right text-xs text-gray-400">
                                            {module.sessions.length}{' '}
                                            {module.sessions.length === 1
                                                ? 'Session'
                                                : 'Sessions'}
                                        </h1>
                                    </div>

                                    <div className="flex flex-col ml-4">
                                        {module.sessions.map(
                                            (session, sessionIndex) => (
                                                <div
                                                    key={session._id}
                                                    className="flex justify-between items-center py-2"
                                                >
                                                    <div className="flex gap-x-3 items-center w-[65%]">
                                                        <div className="w-5 h-5 bg-[#FFBB54] text-white rounded-full text-sm flex justify-center items-center">
                                                            {sessionIndex + 1}
                                                        </div>
                                                        <h1
                                                            className="text-gray-600 text-[12px] line-clamp-1 cursor-default"
                                                            data-tooltip-id="Sessiontooltip"
                                                            data-tooltip-content={
                                                                session.sessionName
                                                            }
                                                            data-tooltip-delay-show={
                                                                700
                                                            }
                                                        >
                                                            {
                                                                session.sessionName
                                                            }
                                                        </h1>
                                                        <Tooltip
                                                            id="Sessiontooltip"
                                                            place="bottom"
                                                            type="dark"
                                                            effect="solid"
                                                            style={{
                                                                backgroundColor:
                                                                    '#CCCCCC',
                                                                color: '#141414',
                                                                fontSize:
                                                                    '10px',
                                                            }}
                                                        />
                                                    </div>
                                                    <h1 className="w-[35%] text-right text-xs text-gray-400">
                                                        {session.sessionDateTime ||
                                                            'No date'}
                                                    </h1>
                                                </div>
                                            )
                                        )}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No modules available.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}


export default AsideBar