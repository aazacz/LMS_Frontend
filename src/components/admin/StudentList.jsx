import React from "react";
import { useState, useEffect} from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SearchIcon from "@mui/icons-material/Search";
import Pagination from "@mui/material/Pagination";
import CloseIcon from "@mui/icons-material/Close";
import Check from "@mui/icons-material/Check";
import axios from "axios";
// import "./StudentList.css" 

const CustomTooltip = ({ title, children }) => {
  const [tooltipOpen, setTooltipOpen] = useState(false);

  return (
    <Tooltip
      title={title}
      placement="right"
      open={tooltipOpen}
      onClose={() => setTooltipOpen(false)}
      onOpen={() => setTooltipOpen(true)}
    >
      <div
        onMouseEnter={() => setTooltipOpen(true)}
        onMouseLeave={() => setTooltipOpen(false)}
      >
        {children}
      </div>
    </Tooltip>
  );
};

const StudentList = () => {
  const apiURL = process.env.REACT_APP_API_URL;
  

  const params = new URLSearchParams(window.location.search);
  const initialPage = parseInt(params.get("page"), 10) || 1;
  const initialSize = parseInt(params.get("pageSize"), 10) || 10;

 
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialSize);
  const [totalRows, setTotalRows] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");




  const updateUrl = ({ page, pageSize }) => {
    const newUrl = `?page=${page}&pageSize=${pageSize}`;
    window.history.pushState({}, "", newUrl);
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
    updateUrl({ page: 1, pageSize });
  };

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
    updateUrl({ page: newPage, pageSize });
  };

  const handlePageSizeSelectChange = (event) => {
    const newPageSize = parseInt(event.target.value, 10);
    setPageSize(newPageSize);
    setCurrentPage(1); // Reset to page 1 when changing page size
    updateUrl({ page: 1, pageSize: newPageSize });
  };

  const columns = [
    {
      field: "packageName",
      headerName: "Package",

    },
    // {
    //   field: "user.phone",
    //   headerName: "Phone",
    // },
    // {
    //   field: "user.name",
    //   headerName: "Name",

    // },
    // {
    //   field: "productDetails.name",
    //   headerName: "Product",
    // },
    // {
    //   field: "totalPrice",
    //   headerName: "Price",

    // },
    // {
    //   field: "pickUpDetails.date",
    //   headerName: "Pick Up Date",
    // },
    // {
    //   field: "pickUpDetails.time",
    //   headerName: "Pick Up Time",

    // },
    // {
    //   field: "partner.partnerName",
    //   headerName: "Partner Name",

    // },
    // {
    //   field: "partner.partnerPhone",
    //   headerName: "Partner Phone",
    // },
    {
      field: "createdAt",
      headerName: "Created Date",
    },
    {
      field: "actions",
      headerName: "Actions",

    },
  ];
  const getCategoryData = async () => {
    await axios
      .get(
        `${apiURL}api/package/get-all-package?page=${currentPage}&pageSize=${pageSize}&search=${searchQuery}`
      ) // replace with your actual API endpoint
      .then((response) => {
        console.log(response.data.data);
        setData(response.data.data);
        setTotalRows(response.data.totalRows);
      })
      .catch((error) => {
        toast.error(error.response.data.error);
      });
  };

  useEffect(() => {
    // Read pagination data from URL on component mount
    const params = new URLSearchParams(window.location.search);
    const page = parseInt(params.get("page"), 10) || 1;
    const size = parseInt(params.get("pageSize"), 10) || 10;

    setCurrentPage(page);
    setPageSize(size);
  }, []);

  useEffect(() => {
    getCategoryData();
  }, [currentPage, pageSize, searchQuery]);

  return (
    <div>
    
      <div className="main-container">
        <div>
          <div className="heading-column-toggle-container">
            <h1>Order</h1>
           
          </div>
          <div className="header-container">
            {" "}
            <div className="search-container">
              <SearchIcon />{" "}
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={handleSearchInputChange}
              />
            </div>
            <div>
            </div>
          </div>
        </div>

        <div className="table-container">
          <table className="responsive-table">
            <thead>
              {columns
                .map((column) => (
                  <th key={column.field}>{column.headerName}</th>
                ))}
            </thead>
            <tbody>
              {data.map((row) => (
                <tr key={row._id}>
                  {columns.map((column) => (
                      <td key={column.field}>
                        {column.field === "actions" ? (
                          // Render actions column content
                          <div className="action-container">
                                      <Check/>
                                  <CloseIcon
                                    onClick={() => {
                                      setCategoryID(row._id);
                                      setOrderName(row.orderId);
                                      openCancelModal();
                                    }}
                                  />
                      
                            
                          </div>
                        ) : // Render other columns content
                        column.field.includes(".") ? (
                          row[column.field.split(".")[0]][
                            column.field.split(".")[1]
                          ]
                        ) : (
                          row[column.field]
                        )}
                      </td>
                    ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="select-container">
          <div>
            <select value={pageSize} onChange={handlePageSizeSelectChange}>
            <option value="2">2</option>
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="100">100</option>
            </select>
          </div>
          <div>Total Items : {totalRows}</div>
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
    </div>
  );
};

export default StudentList;