import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaCirclePlus, FaList } from "react-icons/fa6";
import Loader from "../../reusable/Loader";
import { IoSearch } from "react-icons/io5";
import { BsFillGrid1X2Fill } from "react-icons/bs";
import CourseCard from "../CourseCard";
import CourseListTable from "./CourseListTable";
import ReusablePagination from "../../reusable/ReusablePagination";
import usePaginationData from "./usePaginationData";
import { TbCategory } from "react-icons/tb";
import SearchIcon from "@mui/icons-material/Search";
import { CgSortAz } from "react-icons/cg";

const CourseList = () => {
  const [ListModal, setListModal] = useState(false);
  const [GridModal, setGridModal] = useState(true);
  const {
    courses,
    isPending,
    isError,
    currentPage,
    pageSize,
    totalRows,
    searchQuery,
    handlePageChange,
    handlePageSizeChange,
    handleSearchChange,
    error,
  } = usePaginationData();

  return (
    <div className="pl-3 pt-2 font-poppins w-full h-max mb-3">
      <div className="flex justify-between pb-5">
        <h1 className="font-poppins font-semibold text-xl ">Courses</h1>
      </div>

      {/* Search Button  */}
      <div className="flex flex-col dg:flex-row md:justify-between gap-4 pr-2">
        <div className="w-full md:w-[50%] h-fit rounded-md">
          <div className="w-full flex items-center bg-transparent border-[1.5px] border-[#F4EFEF] rounded-lg">
            <input
              type="text"
              placeholder="Search For Courses"
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full outline-none px-2 h-12 bg-transparent placeholder:text-black text-sm font-normal"
            />
            <button className="text-sm w-[20px] pr-5 p-2 h-10 flex items-center justify-center text-white rounded-lg mr-1">
              <SearchIcon className="text-black h-full" />
            </button>
          </div>
        </div>
        <div className="w-full flex flex-col justify-evenly sm:flex-row gap-4 mt-1">
          <div className="bg-transparent border-[1.5px] border-[#F4EFEF] h-fit p-2 px-2 justify-center cursor-pointer items-center rounded-lg text-sm font-poppins gap-2 flex">
            <TbCategory />
            Category
          </div>
          <div className="bg-transparent border-[1.5px] border-[#F4EFEF] px-2 h-fit p-2 justify-center cursor-pointer items-center rounded-lg text-sm font-poppins gap-2 flex">
            <CgSortAz />
            Sort By Recent
          </div>
          <div className="flex justify-end md:ml-auto">
            <Link replace to={`/admin/home/courses/addcourse`} className="pr-2">
              <button className="w-full bg-transparent border-[1.5px] border-[#F4EFEF] px-2 h-fit p-2 justify-center cursor-pointer items-center rounded-lg text-sm font-poppins gap-2 flex">
                <FaCirclePlus className="text-slate-600" />
                Add Course
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* List or Grid Model */}
      <div className="w-full pt-4 flex justify-end pr-3">
        <div className="w-[80px] flex items-center ">
          <div
            onClick={() => {
              setListModal(true);
              setGridModal(false);
            }}
            className={`${
              ListModal ? "text-blue-700" : "text-gray-500"
            } cursor-pointer w-1/2 h-full flex justify-center border-r-[2px] border-gray-600 `}
          >
            <FaList className="text-lg " />{" "}
          </div>

          <div
            onClick={() => {
              setListModal(false);
              setGridModal(true);
            }}
            className={`${
              GridModal ? "text-blue-700" : "text-gray-500"
            } cursor-pointer w-1/2 h-full flex justify-center `}
          >
            {" "}
            <BsFillGrid1X2Fill />
          </div>
        </div>
      </div>

      {isPending ? (
        <div className="w-full h-screen flex flex-1 bg-gray-200 justify-center items-center">
          <Loader />
        </div>
      ) : isError ? (
        <div className="w-full h-screen flex flex-1 bg-gray-200 justify-center items-center">
          <p>Error loading courses: {error.message} </p>
        </div>
      ) : (
        <>
          {GridModal && (
            <div className="pr-3 grid grid-cols-1 mt-4 sm:grid-cols-2 md:grid-cols-3 mg:grid-cols-4 2xl:grid-cols-6 gap-4 ">
              {courses?.map((course, index) => (
                <Link
                  key={index}
                  to={`/admin/home/courses/${course._id}/${course.courseType}/true/a`}
                >
                  <CourseCard course={course} />
                </Link>
              ))}
            </div>
          )}

          {ListModal && (
            <div className="w-full flex justify-center ">
              {" "}
              <CourseListTable data={courses} isPending={isPending} />{" "}
            </div>
          )}

          <ReusablePagination
            currentPage={currentPage}
            pageSize={pageSize}
            totalRows={totalRows}
            handlePageChange={handlePageChange}
            handlePageSizeChange={handlePageSizeChange}
          />
        </>
      )}
    </div>
  );
};

export default CourseList;
