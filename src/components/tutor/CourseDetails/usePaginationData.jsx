// usePaginationData.js
import { useState, useEffect,useCallback } from "react";
import { AdminAxiosInstance } from "../../../routes/AdminRoutes";
import { TutorAxiosInstance } from "../../../routes/TutorRoutes";
import { useQuery } from '@tanstack/react-query'


const usePaginationData = (courseId, initialPage = 1, initialPageSize = 10, initialSearchQuery = "") => {

  const [currentPage, setCurrentPage]   = useState(initialPage);
  const [pageSize, setPageSize]         = useState(initialPageSize);
  const [totalRows, setTotalRows]       = useState(0);
  const [searchQuery, setSearchQuery]   = useState(initialSearchQuery);
  const [loading, setLoading]           = useState(true);
  const [error, setError]               = useState(null);

  const fetchData = useCallback( async () => {
    
    setLoading(true);
    try {
      console.log("courseId")
      console.log(courseId)
      const response = await TutorAxiosInstance.get(`api/assignments/view-assignments/${courseId}`  );
      
      console.log("response.data.data in pagination")
      console.log(response.data.assignments)
      setTotalRows(response.data.totalRows);
      setLoading(false);
      return response.data.assignments

    } catch (error) {

      setError(error);
      setLoading(false);
    }
    
  })

  const {data,isPending,isError,refetch} = useQuery({
                                            queryKey:["AssignmentList"],
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
  };
};

export default usePaginationData;
