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

const CourseList = () => {
  const [Search, setSearch] = useState("");
  const [ListModal, setListModal] = useState(false);
  const [GridModal, setGridModal] = useState(true);

  //   useEffect(() => {
  //         const debounce = setTimeout(() => {
  //             refetch()
  //         }, 1000)
  //         return () => clearTimeout(debounce)
  //     }, [Search, refetch])

  //     useEffect(()=>{
  //             console.log(Search)
  //     },[Search])

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
    <div className="p-4 w-full h-max">
      {/* Add Button */}
      <div className="flex justify-between py-4">
        <h1 className="font-poppins font-semibold md:text-2xl text-xl ">
          Courses
        </h1>

        <Link
          replace
          to={`/admin/home/courses/addcourse`}
          className="bg-[#F5F1F1]"
        >
          <button className="flex items-center gap-4 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] p-1 rounded-lg border-slate-600 px-2 font-poppins text-sm">
            <FaCirclePlus className="text-slate-600" />
            Add Course
          </button>
        </Link>
      </div>
      <div className="flex justify-between gap-x-4">
        <div className="w-full h-8 flex items-center bg-white rounded-lg  gap-x-3 border-[1px]  border-black">
          <IoSearch className=" ml-1 text-2xl" />

          <input
            type="search"
            name=""
            onChange={(e) => handleSearchChange(e.target.value)}
            className="outline-none w-[60%] md:w-[80%] lg:w-[90%] h-full"
            id=""
          />
        </div>
        <div className='bg-gray-100 px-2 justify-center items-center rounded-md text-sm font-poppins gap-2 flex'><TbCategory/>Category</div>
      </div>
      <div className="w-full  pt-4  flex justify-end ">
        <div className="w-[80px]  flex  items-center ">
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
            <div className="grid grid-cols-1 mt-4 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
