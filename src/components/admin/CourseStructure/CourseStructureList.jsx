import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaCirclePlus, FaList } from "react-icons/fa6";
import Loader from "../../reusable/Loader";
import { BsFillGrid1X2Fill } from "react-icons/bs";
import CourseCard from "../CourseCard";
import CourseStructureListTable from "./CourseStructureListTable";
import ReusablePagination from "../../reusable/ReusablePagination";
import { TbCategory } from "react-icons/tb";
import SearchIcon from "@mui/icons-material/Search";
import { CgSortAz } from "react-icons/cg";
import { AdminAxiosInstance } from "../../../routes/AdminRoutes";

const CourseStructureList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const [totalRows, setTotalRows] = useState(0);
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [ListModal, setListModal] = useState(false);
  const [GridModal, setGridModal] = useState(true);
  const [counts, setCounts] = useState({
    all: 0,
    individual: 0,
    group: 0,
    both: 0,
  });

  const getdata = async () => {
    try {
      setLoading(true);
      const response = await AdminAxiosInstance.get(
        `api/structure/all-structure?page=${currentPage}&pageSize=${pageSize}&search=${search}&category=${category}&sortBy=${sortBy}`
      );
      setType(response.data.type);
      setCourses(response.data.data);
      setTotalRows(response.data.totalRows);
      setCounts(response.data.counts);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    getdata();
  }, [currentPage, pageSize, category, sortBy]);

  useEffect(() => {
    const debounce = setTimeout(() => {
      getdata();
    }, 300);
    return () => clearTimeout(debounce);
  }, [search]);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (event) => {
    setPageSize(parseInt(event.target.value));
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (selectedCategory) => {
    setCategory(selectedCategory);
    setCurrentPage(1);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    setCurrentPage(1);
  };

  const CategoryDropdown = () => {
    return (
      <div className="relative">
        <select
          className="px-2 py-2 appearance-none outline-none bg-transparent border-[1.5px] border-[#F4EFEF] rounded-md text-sm font-poppins"
          onChange={(e) => handleCategoryChange(e.target.value)}
          value={category}
        >
          <option value="">All Courses </option>
          <option value="individual">Individual Courses </option>
          <option value="group">Group Courses </option>
          <option value="both">Both Individual and Group</option>
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center p-2 mt-[2px] h-8 pointer-events-none  rounded-lg text-gray-700">
          <TbCategory />
        </div>
      </div>
    );
  };

  const SortDropdown = () => {
    return (
      <div className="relative">
        <select
          className="w-full  px-2 py-2 appearance-none outline-none bg-transparent border-[1.5px] border-[#F4EFEF] rounded-md text-sm font-poppins"
          onChange={handleSortChange}
          value={sortBy}
        >
          <option value="newest">Sort by Newest</option>
          <option value="oldest">Sort by Oldest</option>
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center p-2 mt-[2px] h-8 pointer-events-none rounded-lg text-gray-700">
          <CgSortAz />
        </div>
      </div>
    );
  };

  return (
    <div className="pl-3 pt-2 font-poppins w-full h-max mb-3 pr-4">
      <div className="flex justify-between pb-5">
        <h1 className="font-poppins font-semibold text-xl">Course Structure</h1>
      </div>

      {/* Heading Section  */}
      <div className="flex mg:flex-row md:justify-between gap-4 border-2 border-red-800">
        <div className="w-full mg:w-[50%] h-fit rounded-md ">
          <div className="w-full flex items-center bg-transparent border-[1.5px] border-[#F4EFEF] rounded-lg">
            <input
              type="text"
              placeholder="Search For Course Structure"
              value={search}
              onChange={handleSearchChange}
              className="w-full outline-none px-2 h-12 bg-transparent placeholder:text-black text-sm font-normal"
            />
            <button className="text-sm w-[20px] pr-5 p-2 h-10 flex items-center justify-center text-white rounded-lg mr-1">
              <SearchIcon className="text-black h-full" />
            </button>
          </div>
        </div>
        <div className="w-full flex flex-col dm:flex-row gap-4 mt-[5px]">
          <CategoryDropdown />
          <SortDropdown />
          <div className="flex justify-end md:ml-auto">
            <Link
              to={`/admin/home/courseStructure/addcoursestructure`}
              className="pr-2"
            >
              <button className="w-full mt-1 bg-transparent bg-[#F4F5FB] border-[1.5px] border-[#F4EFEF] px-2 h-fit p-1 justify-center cursor-pointer items-center rounded-lg text-sm font-poppins gap-2 flex">
                <FaCirclePlus className="text-slate-600" />
                Add Course Structure
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* List or Grid Mode */}
      <div className="w-full pt-4 flex justify-end pr-3">
        <div className="w-[80px] flex items-center">
          <div
            onClick={() => {
              setListModal(true);
              setGridModal(false);
            }}
            className={`${
              ListModal ? "text-blue-700" : "text-gray-500"
            } cursor-pointer w-1/2 h-full flex justify-center border-r-[2px] border-gray-600`}
          >
            <FaList className="text-lg" />
          </div>

          <div
            onClick={() => {
              setListModal(false);
              setGridModal(true);
            }}
            className={`${
              GridModal ? "text-blue-700" : "text-gray-500"
            } cursor-pointer w-1/2 h-full flex justify-center`}
          >
            <BsFillGrid1X2Fill />
          </div>
        </div>
      </div>

      {/* Course Structure Cards or Table */}
      {loading ? (
        <div className="w-full h-screen flex flex-1 bg-white justify-center items-center">
          <Loader />
        </div>
      ) : (
        <>
          {GridModal && (
            <div className="relative w-full mt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {courses.map((course, index) => (
                  <Link
                    key={index}
                    to={`/admin/home/coursestructure/viewcoursestructure/${course._id}`}
                  >
                    <CourseCard type={type} course={course} />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {ListModal && (
            <div className="w-full flex flex-col justify-center mt-4">
              <CourseStructureListTable 
                data={courses} 
                isPending={loading} 
                currentPage={currentPage}
                pageSize={pageSize}
              />
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

export default CourseStructureList;
