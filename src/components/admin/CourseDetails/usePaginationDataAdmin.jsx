import { useState, useEffect, useCallback } from "react";
import { AdminAxiosInstance } from "../../../routes/AdminRoutes";
import { useQuery } from "@tanstack/react-query";

const usePaginationDataAdmin = (
  courseId,
  initialPage = 1,
  initialPageSize = 10,
  initialSearchQuery = ""
) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [totalRows, setTotalRows] = useState(0);
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    console.log("courseId:", courseId);
    setLoading(true);
    try {
      const response = await AdminAxiosInstance.get(
        `api/course/tutor-enrolled/${courseId}`,
        {
          params: {
            page: currentPage,
            pageSize,
            search: searchQuery,
          },
        }
      );
      console.log("API Response:", response.data);
      setTotalRows(response.data.totalRows);
      setLoading(false);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch data:", error);
      setError(error);
      setLoading(false);
      return [];
    }
  }, [courseId, currentPage, pageSize, searchQuery]);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: [
      "AdminEnrolledcourseList",
      courseId,
      currentPage,
      pageSize,
      searchQuery,
    ],
    queryFn: fetchData,
    staleTime: 1000,
    refetchInterval: 600000,
  });

  useEffect(() => {
    refetch();
  }, [currentPage, pageSize, searchQuery, refetch]);

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handlePageSizeChange = (event) => {
    setPageSize(parseInt(event.target.value, 10));
    setCurrentPage(1);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  return {
    courses: data ? data.data : [],
    isLoading,
    isError,
    currentPage,
    pageSize,
    totalRows,
    searchQuery,
    loading,
    error,
    handlePageChange,
    handlePageSizeChange,
    handleSearchChange,
    refetch,
  };
};

export default usePaginationDataAdmin;
