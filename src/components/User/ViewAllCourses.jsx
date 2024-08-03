import React, { useState } from "react";
import usePaginationData from "./usePaginationData";
import { Link } from "react-router-dom";
import { FaCirclePlus, FaList } from "react-icons/fa6";
import Loader from "../reusable/Loader";
import { IoSearch } from "react-icons/io5";
import { BsFillGrid1X2Fill } from "react-icons/bs";
import CourseCard from "./CourseCard";
import CourseListTable from "./CourseListTable";
import ReusablePagination from "../reusable/ReusablePagination";
import UserNavbar from "./UserNavbar";

const ViewAllCourses = () => {
  const [search, setSearch] = useState("");
  const [listModal, setListModal] = useState(false);
  const [gridModal, setGridModal] = useState(true); // Default to grid view
  const [category, setCategory] = useState("Category");

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
    // Add any additional handling for category changes
  };

  const {
    courses,
    isPending,
    isError,
    currentPage,
    pageSize,
    totalRows,
    handlePageChange,
    handlePageSizeChange,
    handleSearchChange,
    error,
  } = usePaginationData();

  return (
    <>
      <UserNavbar />
      <div className="p-4 w-full h-max">
        {/* Add Button */}
        <div className="flex items-center gap-x-4">
          <div className="w-[40%] h-9 flex items-center bg-gray-200 rounded-lg gap-x-3">
            <input
              type="search"
              onChange={(e) => handleSearchChange(e.target.value)}
              className="outline-none w-[90%] h-full bg-gray-200 rounded-lg ml-2 font-poppins text-sm"
              placeholder="Search Course Name"
            />
            <IoSearch className="mr-2 text-2xl" />
          </div>
          <div className="w-[15%] h-9 flex items-center bg-white rounded-lg font-poppins text-sm ">
            <select
              value={category}
              onChange={handleCategoryChange}
              className="outline-none w-full h-full bg-gray-200 rounded-lg px-3 border-none mr-3"
            >
              <option value="Category" disabled>
                Category
              </option>
              <option value="Individual">Individual</option>
              <option value="Group">Group</option>
            </select>
          </div>
        </div>
        <div className="flex justify-between py-5">
          <h1 className="font-poppins font-semibold md:text-2xl text-xl">
            Recommended Courses
          </h1>
        </div>
        {isPending ? (
          <div className="w-full h-screen flex flex-1 bg-gray-200 justify-center items-center">
            <Loader />
          </div>
        ) : isError ? (
          <div className="w-full h-screen flex flex-1 bg-gray-200 justify-center items-center">
            <p>
              Error loading courses: {error ? error.message : "Unknown error"}
            </p>
          </div>
        ) : (
          <>
            {gridModal && (
              <div className="grid grid-cols-2 mt-4 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {courses?.map((course, index) => (
                  <Link
                    key={index}
                    to={`/allcourses/courses/${course._id}/${course.courseType}`}
                    // to={`/admin/home/courses/${course._id}/${course.courseType}/true/a`}
                  >
                    <CourseCard course={course} />
                  </Link>
                ))}
              </div>
            )}

            {listModal && (
              <div className="w-full flex justify-center">
                <CourseListTable data={courses} isPending={isPending} />
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
    </>
  );
};

export default ViewAllCourses;
