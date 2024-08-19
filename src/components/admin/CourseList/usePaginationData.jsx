// usePaginationData.js
import { useState, useEffect, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { AdminAxiosInstance } from "../../../routes/AdminRoutes";

const usePaginationData = (
  initialPage = 1,
  initialPageSize = 12,
  initialSearchQuery = ""
) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      const response = await AdminAxiosInstance.get(
        `api/course/get-all-course?page=${currentPage}&pageSize=${pageSize}&search=${searchQuery}&category=${category}&sortBy=${sortBy}`
      );
      setType(response.data.type);

      return response.data;
    } catch (error) {
      setError(error);
    }
  }, [currentPage, pageSize, searchQuery]);

  const { data, isPending, isError, refetch } = useQuery({
    queryKey: ["courseList", currentPage, pageSize, searchQuery],
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
    console.log(event);
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  return {
    courses: data?.data || [],
    isPending,
    isError,
    currentPage,
    pageSize,
    totalRows: data?.totalRows || 0,
    searchQuery,
    error,
    handlePageChange,
    handlePageSizeChange,
    handleSearchChange,
  };
};

export default usePaginationData;
