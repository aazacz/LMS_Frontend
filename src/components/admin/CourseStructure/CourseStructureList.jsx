import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaCirclePlus } from "react-icons/fa6";
import { AdminAxiosInstance } from "../../../routes/AdminRoutes";
import { useSelector } from "react-redux";
import Loader from "../../reusable/Loader";
import { IoSearch } from "react-icons/io5";
import CourseCard from "../CourseCard";
import ReusablePagination from "../../reusable/ReusablePagination";
import { TbCategory } from "react-icons/tb";

const CourseStructureList = () => {
  const token = useSelector((state) => state.AdminDetails.token);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalRows, setTotalRows] = useState(0);

  // Getting data from backend
  const getdata = async () => {
    try {
      setLoading(true);
      const response = await AdminAxiosInstance.get(
        `api/structure/get-all-structure?page=${currentPage}&pageSize=${pageSize}&search=${search}`
      );
      console.log(response.data);
      setCourses(response.data.data);
      setTotalRows(response.data.totalRows); // Assuming the API response includes the total row count
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  // Initial data fetch on component mount
  useEffect(() => {
    getdata();
  }, [currentPage, pageSize]);

  // Debounce the search input changes
  useEffect(() => {
    const debounce = setTimeout(() => {
      getdata();
    }, 1000);
    return () => clearTimeout(debounce);
  }, [search]);

  // Handle page change
  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  // Handle page size change
  const handlePageSizeChange = (event) => {
    setPageSize(event.target.value);
    setCurrentPage(1); // Reset to first page on page size change
  };

  return (
    <>
      <div className="p-4">
        {/* Heading and button div */}
        <div className="flex justify-between py-2">
          <h1 className="font-poppins font-semibold md:text-2xl text-xl">
            Course Structure
          </h1>
          <Link
            replace
            to={`/admin/home/courseStructure/addcoursestructure`}
            className="bg-[#F5F1F1] hidden md:block"
          >
            <button className="flex items-center gap-4 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] p-1 rounded-lg px-2 font-poppins text-sm">
              <FaCirclePlus className="text-slate-600" /> Add Course Structure
            </button>
          </Link>
        </div>

        <div className="mt-2 w-full h-14">
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
        </div>

        <div className="w-full flex py-3 justify-end md:hidden">
          <Link
            replace
            to={`/admin/home/courseStructure/addcoursestructure`}
            className=""
          >
            <button className="flex items-center gap-4 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] bg-[#F5F1F1] p-1 rounded-lg border-slate-600 px-2 font-poppins text-sm">
              <FaCirclePlus className="text-slate-600" /> Add Course Structure
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 mt-4 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {loading ? (
            <div className="w-full flex justify-center">
              <Loader />
            </div>
          ) : (
            courses.map((course, index) => (
              <Link
                key={index}
                to={`/admin/home/coursestructure/viewcoursestructure/${course._id}`}
              >
                <CourseCard course={course} />
              </Link>
            ))
          )}
        </div>

        <div className="mt-4">
          <ReusablePagination
            currentPage={currentPage}
            pageSize={pageSize}
            totalRows={totalRows}
            handlePageChange={handlePageChange}
            handlePageSizeChange={handlePageSizeChange}
          />
        </div>
      </div>
    </>
  );
};

export default CourseStructureList;
