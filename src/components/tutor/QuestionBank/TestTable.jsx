import React, { useState } from "react";
import usePaginationData from "./usePaginationData";
import { Link } from "react-router-dom";
import Loader from "../../reusable/Loader";
import "./TestTable.css";
import { PiDotsThreeCircleVerticalDuotone } from "react-icons/pi";
import ReusablePagination from "../../reusable/ReusablePagination";

const TestTable = ({ handleView, handleReview }) => {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const {
    tests,
    isPending,
    currentPage,
    pageSize,
    totalRows,
    searchQuery,
    handlePageChange,
    handlePageSizeChange,
    handleSearchChange,
    error,
    refetch,
  } = usePaginationData();

  const columns = [
    { field: "slNo", headerName: "Sl No" },
    { field: "title", headerName: "Title" },
    { field: "positiveMark", headerName: "Positive Mark" },
    { field: "negativeMark", headerName: "Negative Mark" },
    { field: "totalQuestions", headerName: "Total Questions" },
    { field: "actions", headerName: "Actions" },
  ];

  const handleDropdownToggle = (index, event) => {
    event.stopPropagation();
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  return (
    <div className="w-full" onClick={() => setActiveDropdown(null)}>
      <div className="table-container">
        <table className="responsive-Testtable font-poppins">
          <thead>
            <tr>
              {columns.map((column, index) => (
                <th key={index}>{column.headerName} </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isPending ? (
              <tr className="">
                <td colSpan={columns.length} rowSpan={5}>
                  <div className="w-full flex justify-center items-center">
                    <Loader />
                  </div>
                </td>
              </tr>
            ) : (
              tests?.map((test, index) => (
                <tr key={test._id} className="text-gray-700 font-extralight ">
                  <td>{(currentPage - 1) * pageSize + index + 1}</td>
                  <td className="title-column">
                    <div className="title-text" title={test.title}>
                      {test.title}
                    </div>
                  </td>
                  <td className=" ">{test.positiveMark}</td>
                  <td className=" ">{test.negativeMark}</td>
                  <td className=" ">{test.questions.length}</td>
                  <td className="relative">
                    <div className="action-container">
                      <PiDotsThreeCircleVerticalDuotone
                        className="text-xl cursor-pointer"
                        onClick={(e) => handleDropdownToggle(index, e)}
                      />
                    </div>

                    {activeDropdown === index && (
                      <div className="absolute right-0 mt-2 w-[100px] bg-white shadow-lg  rounded-md overflow-hidden z-10">
                        <button
                          onClick={() => {
                            console.log("test._id", test._id);
                            console.log();
                            handleReview(test._id);
                          }}
                          className="w-full h-10 hover:bg-gray-100 text-[13px]  text-center border-b-2 border-gray-200 px-4"
                        >
                          Review
                        </button>
                        <button
                          onClick={() => handleView(test._id)}
                          className="w-full h-10 hover:bg-gray-100 text-[13px] text-center  px-4"
                        >
                          View
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <ReusablePagination
        currentPage={currentPage}
        pageSize={pageSize}
        totalRows={totalRows}
        handlePageChange={handlePageChange}
        handlePageSizeChange={handlePageSizeChange}
      />
    </div>
  );
};

export default TestTable;
