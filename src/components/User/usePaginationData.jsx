import { useState, useCallback, useEffect } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { axiosInstanceStudent } from "../../routes/UserRoutes";

const usePaginationData = (
  initialPage = 1,
  initialPageSize = 10,
  initialSearchQuery = "",
) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);

  const fetchData = useCallback(async () => {
    try {
      const response = await axiosInstanceStudent.get(
        `api/course/get-all-course?page=${currentPage}&pageSize=${pageSize}&search=${searchQuery}`,
      );
      if (response.data && response.data.data) {
        return response.data;
      } else {
        console.warn("Unexpected response structure:", response);
        return { data: [], totalRows: 0 };
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error; // Propagate error to react-query
    }
  }, [currentPage, pageSize, searchQuery]);

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["courseList", currentPage, pageSize, searchQuery],
    queryFn: fetchData,
    staleTime: 1000,
    refetchInterval: 600000,
    keepPreviousData: true,
  });

  useEffect(() => {
    refetch(); // Refetch data when currentPage, pageSize, or searchQuery change
  }, [currentPage, pageSize, searchQuery, refetch]);

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handlePageSizeChange = (event) => {
    setPageSize(parseInt(event.target.value, 10));
    setCurrentPage(1); // Reset to page 1 when page size changes
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  return {
    courses: data?.data || [],
    isLoading,
    isError,
    currentPage,
    pageSize,
    totalRows: data?.totalRows || 0,
    searchQuery,
    handlePageChange,
    handlePageSizeChange,
    handleSearchChange,
    error,
  };
};

export default usePaginationData;
