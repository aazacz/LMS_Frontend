import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import usePaginationData from "../../hooks/usePaginationData";
import ReusableTable from "../reusable/ReusableTable";
import ReusablePagination from "../reusable/ReusablePagination";
import SearchIcon from "@mui/icons-material/Search";
import { FaCirclePlus } from "react-icons/fa6";
import useDebounce from "../../hooks/useDebounce";
import { AdminAxiosInstance } from "../../routes/AdminRoutes";
import { useQuery } from "@tanstack/react-query";

const apiURL =
  process.env.REACT_APP_API_URL +
  "api/diagnosis/get-diagnosis?page=1&pageSize=5&search";

const DiagnosisTest = () => {
  const {
    currentPage,
    pageSize,
    totalRows,
    searchQuery,
    handlePageChange,
    handlePageSizeChange,
    handleSearchChange,
  } = usePaginationData(apiURL);

  const [searchTerm, setSearchTerm] = useState(searchQuery);

  const link = "/admin/home/diagnosistest/";

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    handleSearchChange({ target: { value: debouncedSearchTerm } });
  }, [debouncedSearchTerm, handleSearchChange]);

  const columns = [
    { field: "packageName", headerName: "Name" },
    { field: "createdAt", headerName: "Test Attended" },
    { field: "questions", headerName: "Questions" },
    { field: "marks", headerName: "Marks" },
    { field: "actions", headerName: "Passed" },
    { field: "actions", headerName: "Failed" },
    { field: "button", headerName: "Reports" },
    { field: "status", headerName: "Status" },
  ];

  //function to fetch the data
  const fetchDiagnosisData = async () => {
    try {
      const response = await AdminAxiosInstance.get(
        `api/diagnosis/diagnosis-tests?page=1&pageSize=&search`
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const { data, isPending, refetch } = useQuery({
    queryKey: ["diagnosisiTestData"],
    queryFn: fetchDiagnosisData,
    staleTime: 1000,
    refetchInterval: 60000,
  });

  // useEffect(() => {
  //     refetch()
  // }, [])

  return (
    <div className="w-full h-full p-2">
      {/* Add Test Button */}
      <div className="flex justify-between items-center">
        {/* Search bar */}
        <div className="header-container">
          <div className="search-container border-[2px] border-gray-800 rounded-md">
            <SearchIcon />
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <Link
          replace
          to={`/admin/home/diagnosisTest/addiagnosistest`}
          className="bg-[#F5F1F1]"
        >
          <button
            className="flex items-center gap-4 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]
                         p-1 rounded-lg border-slate-600 px-2  font-poppins text-sm"
          >
            <FaCirclePlus className="text-slate-600 " /> Add Question
          </button>
        </Link>
      </div>

      {/* Table Starts Here */}
      <div>
        <div className="main-container">
          <div>
            <div className="heading-column-toggle-container"></div>
          </div>

          {/* imported the reusable table and the pagination component */}

          <ReusableTable
            columns={columns}
            data={data}
            link={link}
            isPending={isPending}
          />

          <ReusablePagination
            data={data}
            currentPage={currentPage}
            pageSize={pageSize}
            totalRows={totalRows}
            handlePageChange={handlePageChange}
            handlePageSizeChange={handlePageSizeChange}
          />
        </div>
      </div>
    </div>
  );
};

export default DiagnosisTest;
