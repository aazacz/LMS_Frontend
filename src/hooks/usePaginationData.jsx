// usePaginationData.js
import { useState, useEffect } from "react";
import axios from "axios";

const usePaginationData = (Data, initialPage = 1, initialPageSize = 10, initialSearchQuery = "") => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [totalRows, setTotalRows] = useState(0);
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // const fetchData = async () => {
  //   setLoading(true);
  //   try {
  //     const response = await axios.get(
  //       `${apiURL}?page=${currentPage}&pageSize=${pageSize}&search=${searchQuery}`
  //     );
      
  //     // 
  //     setData(response.data.data);
  //     setTotalRows(response.data.totalRows);
  //     setLoading(false);
  //   } catch (error) {
  //     setError(error);
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchData();
  // }, [currentPage, pageSize, searchQuery]);

  
  useEffect(()=>{
console.log("reuusable")
  },[])

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
    data,
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
