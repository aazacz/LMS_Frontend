import React, { memo } from "react";
import { BiSpreadsheet } from "react-icons/bi";
import { LuTimer } from "react-icons/lu";
import coursephoto from "../../assets/Admin/coursephoto.jpeg";
import { PiChalkboardTeacherBold } from "react-icons/pi";

const CourseCard = ({ course, type }) => {
  return (
    <div className="bg-[#F4F5FB] md:p-4 h-[280px] rounded-2xl flex flex-col items-center overflow-hidden p-3 ">
      <div className="w-full h-[150px] flex justify-center items-center rounded-xl overflow-hidden">
        {course?.imageUrl ? (
          <img
            src={course?.imageUrl}
            className="object-cover w-full h-full"
            alt="Course"
          />
        ) : (
          <img
            src={coursephoto}
            className="object-cover w-full h-full"
            alt="Course"
          />
        )}
      </div>
      <div className="w-full mt-4">
        <div className="h-[25px]">
          <h1 className="font-poppins font-semibold text-base line-clamp-2">
            {course.courseName}
          </h1>
        </div>
        <div className="flex flex-col md:flex-row md:items-center gap-x-2">
          <span className="flex font-poppins font-normal items-center gap-x-1 text-sm text-gray-600">
            Rs. {course.price}
          </span>
        </div>
        <div className="flex flex-col md:flex-row md:items-center gap-x-2">
          <span className="flex font-poppins font-normal items-center gap-x-1 text-sm text-gray-600">
            {course.courseType}
          </span>
        </div>
        {/* <div className="flex flex-col md:flex-row md:items-center gap-x-2">
          {type !== "courseStructure" && (
            <span className="flex font-poppins font-normal items-center gap-x-1 text-sm text-gray-600 line-clamp-1">
              <PiChalkboardTeacherBold />
              {course.tutors?.map((tutor) => tutor.id.name).join(", ") ||
                "No Tutor Assigned"}
            </span>
          )}
        </div> */}
        {/* <div className="flex flex-col md:flex-row md:items-center gap-x-2">
          {type !== "courseStructure" && (
            <span className="flex font-poppins font-normal items-center gap-x-1 text-sm text-gray-600 line-clamp-1">
              <PiChalkboardTeacherBold />
              {course.students?.map((student) => student.id.name).join(", ") ||
                "No Student Assigned"}
            </span>
          )}
        </div> */}
        <div className="flex items-center gap-x-6 mt-2">
          <span className="flex items-center gap-x-1 text-sm font-poppins">
            <BiSpreadsheet className="text-gray-400" /> {course.modules.length}{" "}
            Modules
          </span>
          <span className="flex items-center gap-x-1 text-sm font-poppins">
            <LuTimer className="text-gray-400" /> {course.trainingDuration}
          </span>
        </div>
      </div>
    </div>
  );
};

export default memo(CourseCard);
