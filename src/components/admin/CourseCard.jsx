import React, { useState,memo } from 'react'
import { BiSpreadsheet } from "react-icons/bi"
import { LuTimer } from "react-icons/lu"
import coursephoto from '../../assets/Admin/coursephoto.jpeg'

const CourseCard = ({ course }) => {
    return (
        <div className="bg-gray-200 md:p-4 p-1 rounded-2xl min-h-[12rem] h-auto">
            <div className="w-full rounded-lg">
                <img
                    src={coursephoto}
                    className="rounded-lg w-full object-contain"
                    alt="Course"
                />
            </div>

            <div className="w-full md:mt-4 mt-2 pb-2 px-2 md:px-0">
                <div className=" md:min-h-[3rem]">
                    <h1 className="font-plusjakartasans font-semibold text-base line-clamp-1 md:line-clamp-2">
                        {course.courseName}
                    </h1>
                </div>

                <div className="flex md:flex-row flex-col md:items-center gap-x-6 mt-2">
                    <span className="flex items-center gap-x-1 text-sm font-plusjakartasans">
                        <BiSpreadsheet className="text-gray-400" />{' '}
                        {course.modules.length} Modules
                    </span>
                    <span className="flex items-center gap-x-1 text-sm font-plusjakartasans">
                        <LuTimer className="text-gray-400" />{' '}
                        {course.trainingDuration} Hrs
                    </span>
                </div>
            </div>
        </div>
    )
}


export default memo(CourseCard)