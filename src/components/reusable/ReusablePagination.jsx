// ReusablePagination.js
import React from "react";
import Pagination from "@mui/material/Pagination";

const ReusablePagination = ({ currentPage, pageSize, totalRows, handlePageChange, handlePageSizeChange }) => {
  return (
   
   <div className="pagination-container">
     
      <div className="select-container">
        <select value={pageSize} onChange={handlePageSizeChange}>
          <option value="2">2</option>
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="100">100</option>
        </select>
        <div>Total Items: {totalRows}</div>
      </div>

      <Pagination
        count={Math.ceil(totalRows / pageSize)}
        page={currentPage}
        onChange={handlePageChange}
        variant="outlined"
        color="primary"
        shape="rounded"
        showFirstButton
        showLastButton
        sx={{
          display: "block",
          width: "100%",
          height: "max-content",
          marginTop: "10px",
          backgroundColor: "transparent",
          zIndex: "0",
        }}
      />
    </div>
  );
};

export default ReusablePagination;
