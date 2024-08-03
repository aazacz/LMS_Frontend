import React, { useState, memo } from "react";
import { BiSpreadsheet } from "react-icons/bi";
import { LuTimer } from "react-icons/lu";
import coursephoto from "../../assets/Admin/coursephoto.jpeg";

const CourseCard = ({ course }) => {
  return (
    <div className="bg-gray-200 md:p-4 h-[230px] md:h-[300px] rounded-2xl flex flex-col items-center overflow-hidden p-3">
      <div className=" w-full flex justify-center object-cover items-center rounded-xl overflow-hidden">
        {course?.imageUrl ? (
          <img
            src={course?.imageUrl}
            className="w-full h-[300px] "
            alt="Course"
          />
        ) : (
          <img
            src={coursephoto}
            className="w-full h-[300px] "
            alt="Course"
          />
        )}
      </div>

      <div className="w-full m-2">
        <div className=" md:min-h-[3rem]">
          <h1 className="font-poppins font-semibold text-base line-clamp-1 md:line-clamp-2">
            {course.courseName}
          </h1>
        </div>

        <div className="flex flex-col md:flex-row md:items-center gap-x-2 ">
          <span className="flex items-center gap-x-1 text-sm">
            <BiSpreadsheet className="text-gray-400" /> {course.modules.length}{" "}
            Modules
          </span>
          <span className="flex items-center gap-x-1 text-sm">
            <LuTimer className="text-gray-400" /> {course.trainingDuration}hrs
          </span>
        </div>
      </div>
    </div>
  );
};

export default memo(CourseCard);
