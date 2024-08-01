import { useState, useEffect,useCallback } from "react";
import { AdminAxiosInstance } from "../../../routes/AdminRoutes";
import { useQuery } from '@tanstack/react-query'


const usePaginationData = (courseId, initialPage = 1, initialPageSize = 10, initialSearchQuery = "" ,) => {

  const [currentPage, setCurrentPage]   = useState(initialPage);
  const [pageSize, setPageSize]         = useState(initialPageSize);
  const [totalRows, setTotalRows]       = useState(0);
  const [searchQuery, setSearchQuery]   = useState(initialSearchQuery);
  const [loading, setLoading]           = useState(true);
  const [error, setError]               = useState(null);

  const fetchData = useCallback(async () => {
    console.log("courseId", courseId);
    setLoading(true);
    try {
      const response = await AdminAxiosInstance.get(`api/course/student-enrolled/${courseId}`);
        console.log("Student list")
      
      console.log(response.data)
      setTotalRows(response.data.totalRows);
      setLoading(false);
      return response.data

    } catch (error) {

      setError(error);
      setLoading(false);
    }
    
  })

  const {data,isPending,isError,refetch} = useQuery({
                                            queryKey:["EnrolledcourseList"],
                                            queryFn:fetchData,
                                            staleTime: 1000,
                                            refetchInterval: 600000,
                                                     })

  useEffect(() => {
    refetch()
  }, [currentPage, pageSize, searchQuery]);

  

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
    courses: data ? data : [],
    isPending,
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
    refetch
  };
};

export default usePaginationData;
