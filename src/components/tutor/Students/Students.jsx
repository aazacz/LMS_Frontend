// import React from "react";
// import { useState, useEffect } from "react";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import SearchIcon from "@mui/icons-material/Search";
// import Pagination from "@mui/material/Pagination";
// import CloseIcon from "@mui/icons-material/Close";
// import Check from "@mui/icons-material/Check";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";
// import "./StudentList1.css"

// const CustomTooltip = ({ title, children }) => {
//   const [tooltipOpen, setTooltipOpen] = useState(false);

//   return (
//     <Tooltip
//       title={title}
//       placement="right"
//       open={tooltipOpen}
//       onClose={() => setTooltipOpen(false)}
//       onOpen={() => setTooltipOpen(true)}
//     >
//       <div
//         onMouseEnter={() => setTooltipOpen(true)}
//         onMouseLeave={() => setTooltipOpen(false)}
//       >
//         {children}
//       </div>
//     </Tooltip>
//   );
// };

// const Students = () => {
//   const token = useSelector((state) => state.AdminDetails.token);

//   const apiURL = process.env.REACT_APP_API_URL;

//   const params = new URLSearchParams(window.location.search);
//   const initialPage = parseInt(params.get("page"), 10) || 1;
//   const initialSize = parseInt(params.get("pageSize"), 10) || 10;

//   const [data, setData] = useState([]);
//   const [currentPage, setCurrentPage] = useState(initialPage);
//   const [pageSize, setPageSize] = useState(initialSize);
//   const [totalRows, setTotalRows] = useState(0);
//   const [searchQuery, setSearchQuery] = useState("");

//   const updateUrl = ({ page, pageSize }) => {
//     const newUrl = `?page=${page}&pageSize=${pageSize}`;
//     window.history.pushState({}, "", newUrl);
//   };

//   const handleSearchInputChange = (event) => {
//     setSearchQuery(event.target.value);
//     setCurrentPage(1);
//     updateUrl({ page: 1, pageSize });
//   };

//   const handlePageChange = (event, newPage) => {
//     setCurrentPage(newPage);
//     updateUrl({ page: newPage, pageSize });
//   };

//   const handlePageSizeSelectChange = (event) => {
//     const newPageSize = parseInt(event.target.value, 10);
//     setPageSize(newPageSize);
//     setCurrentPage(1); // Reset to page 1 when changing page size
//     updateUrl({ page: 1, pageSize: newPageSize });
//   };

//   const formatDate = (date) => {
//     const options = {
//       timeZone: "Asia/Kolkata",
//       hour12: true,
//       hour: "numeric",
//       minute: "2-digit",
//       day: "2-digit",
//       month: "2-digit",
//       year: "numeric",
//     };

//     const formattedDate = new Date(date).toLocaleString("en-IN", options);
//     return formattedDate;
//   };

//   const [Active, SetActive] = useState(false);

//   const columns = [
//     {
//       field: "name",
//       headerName: "Name",
//     },
//     {
//       field: "grade",
//       headerName: "Grade",
//     },
//     {
//       field: "number",
//       headerName: "Phone",
//     },
//     {
//       field: "parentNumber",
//       headerName: "Parent Number",
//     },
//     // {
//     //   field: "productDetails.name",
//     //   headerName: "Product",
//     // },
//     // {
//     //   field: "totalPrice",
//     //   headerName: "Price",

//     // },
//     // {
//     //   field: "pickUpDetails.date",
//     //   headerName: "Pick Up Date",
//     // },
//     // {
//     //   field: "pickUpDetails.time",
//     //   headerName: "Pick Up Time",

//     // },
//     // {
//     //   field: "partner.partnerName",
//     //   headerName: "Partner Name",

//     // },
//     {
//       field: "createdAt",
//       headerName: "Created Date",
//     },
//     {
//       field: "comingSatExamDate",
//       headerName: "Next Exam Date",
//     },
//     {
//       field: "status",
//       headerName: "Status",
//     },
//     {
//       field: "actions",
//       headerName: "Actions",
//     },
//   ];
//   const getCategoryData = async () => {
//     await axios
//       .get(`${apiURL}api/students/getAll-students`, {
//         headers: { authorization: `Bearer ${token}` },
//       })
//       .then((response) => {
//         console.log(response.data.data);
//         setData(response.data.data);
//         setTotalRows(response.data.totalRows);
//       })
//       .catch((error) => {
//         toast.error(error.response.data.error);
//       });
//   };

//   useEffect(() => {
//     // Read pagination data from URL on component mount
//     const params = new URLSearchParams(window.location.search);
//     const page = parseInt(params.get("page"), 10) || 1;
//     const size = parseInt(params.get("pageSize"), 10) || 10;

//     setCurrentPage(page);
//     setPageSize(size);
//   }, []);

//   useEffect(() => {
//     getCategoryData();
//   }, [currentPage, pageSize, searchQuery]);

//   return (
//     <div className="px-9 ">
//       <div className="main-container">
//         <div>
//           <div className="heading-column-toggle-container py-2">
//             <h1 className="font-poppins text-xl font-semibold ">
//               Students List
//             </h1>
//           </div>
//           <div className="header-container ">
//             <div className="search-container border-2 border-[#03729b] p-1 flex rounded-md">
//               <SearchIcon className="text-[#03729b]" />
//               <input
//                 type="text"
//                 placeholder="Search"
//                 value={searchQuery}
//                 onChange={handleSearchInputChange}
//                 className="w-full outline-none px-2"
//               />
//             </div>
//             <div></div>
//           </div>
//         </div>
//         <div className="table-responsivee">
//           <table className="responsive-tablee">
//             <thead>
//               <tr>
//                 {columns.map((column) => (
//                   <th key={column.field}>{column.headerName}</th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody className="relative">
//               {data.map((row, indexrow) => (
//                 <tr key={row._id}>
//                   {columns.map((column, index) => (
//                     <td key={column.field}>
//                       {column.field === "actions" ? (
//                         <div className="action-container">
//                           <Check />
//                           <CloseIcon
//                             onClick={() => console.log("Action clicked")}
//                           />
//                         </div>
//                       ) : (
//                         <></>
//                       )}

//                       {column.field === "name" ? (
//                         <Link to={`/tutor/home/students/${row._id}`}>
//                           {console.log(row._id)}
//                           <span className="action-container text-blue-600 capitalize text-sm font-semibold ">
//                             {row[column.field]}
//                           </span>
//                         </Link>
//                       ) : (
//                         <></>
//                       )}

//                       {column.field === "grade" ? (
//                         <span className="action-container text-sm font-semibold">
//                           {row[column.field]}{" "}
//                         </span>
//                       ) : (
//                         <></>
//                       )}
//                       {column.field === "number" ? (
//                         <span className="action-container text-sm font-semibold">
//                           {row[column.field]}{" "}
//                         </span>
//                       ) : (
//                         <></>
//                       )}
//                       {column.field === "parentNumber" ? (
//                         <span className="action-container text-sm font-semibold">
//                           {row[column.field]}{" "}
//                         </span>
//                       ) : (
//                         <></>
//                       )}

//                       {column.field === "createdAt" ? (
//                         <span className="action-container text-sm font-semibold">
//                           {formatDate(row[column.field])}{" "}
//                         </span>
//                       ) : (
//                         <></>
//                       )}
//                       {column.field === "comingSatExamDate" ? (
//                         <span className="action-container text-sm font-semibold">
//                           {formatDate(row[column.field])}{" "}
//                         </span>
//                       ) : (
//                         <></>
//                       )}

//                       {column.field === "button" ? (
//                         <div className="action-container">
//                           <div className="font-poppins text-sm  border-[1px] border-gray-500 cursor-pointer hover:bg-slate-200   flex justify-center items-center">
//                             {" "}
//                             Review
//                           </div>
//                         </div>
//                       ) : (
//                         <></>
//                       )}
//                       {column.field === "status" ? (
//                         <div className="action-container">
//                           {Active ? (
//                             <div className="font-poppins text-sm  border-[1px] border-blue-700 bg-blue-700 text-white cursor-pointer hover:bg-slate-200   flex justify-center items-center">
//                               {" "}
//                               Active
//                             </div>
//                           ) : (
//                             <div className="font-poppins text-sm  border-[1px] border-blue-700  cursor-pointer text-blue-700 hover:bg-slate-200   flex justify-center items-center">
//                               {" "}
//                               Inactive
//                             </div>
//                           )}
//                         </div>
//                       ) : (
//                         <>{/* {row[column.field]}  */}</>
//                       )}
//                     </td>
//                   ))}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         <div className="select-container">
//           <div>
//             <select value={pageSize} onChange={handlePageSizeSelectChange}>
//               <option value="2">2</option>
//               <option value="10">10</option>
//               <option value="25">25</option>
//               <option value="100">100</option>
//             </select>
//           </div>
//           <div>Total Items : {totalRows}</div>
//         </div>

//         <Pagination
//           count={Math.ceil(totalRows / pageSize)}
//           page={currentPage}
//           onChange={handlePageChange}
//           variant="outlined"
//           color="primary"
//           shape="rounded"
//           showFirstButton
//           showLastButton
//           sx={{
//             display: "block",
//             width: "100%",
//             height: "max-content",
//             marginTop: "10px",
//             backgroundColor: "transparent",
//             zIndex: "0",
//           }}
//         />
//       </div>
//     </div>
//   );
// };

// export default Students;

import React from "react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SearchIcon from "@mui/icons-material/Search";
import Pagination from "@mui/material/Pagination";
import CloseIcon from "@mui/icons-material/Close";
import Check from "@mui/icons-material/Check";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
// import "./StudentList1.css"

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

const Students = () => {
  const token = useSelector((state) => state.AdminDetails.token);

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

  const formatDate = (date) => {
    const options = {
      timeZone: "Asia/Kolkata",
      hour12: true,
      hour: "numeric",
      minute: "2-digit",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    };

    const formattedDate = new Date(date).toLocaleString("en-IN", options);
    return formattedDate;
  };

  const [Active, SetActive] = useState(false);

  const columns = [
    {
      field: "name",
      headerName: "Name",
    },
    {
      field: "grade",
      headerName: "Grade",
    },
    {
      field: "number",
      headerName: "Phone",
    },
    {
      field: "parentNumber",
      headerName: "Parent Number",
    },
    {
      field: "createdAt",
      headerName: "Created Date",
    },
    {
      field: "comingSatExamDate",
      headerName: "Next Exam Date",
    },
    {
      field: "status",
      headerName: "Status",
    },
    {
      field: "actions",
      headerName: "Actions",
    },
  ];
  const getCategoryData = async () => {
    await axios
      .get(`${apiURL}api/students/getAll-students`, {
        headers: { authorization: `Bearer ${token}` },
      })
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
    <div className="px-9 ">
      <div className="main-container">
        <div>
          <div className="heading-column-toggle-container py-2">
            <h1 className="font-poppins text-xl font-semibold ">
              Students List
            </h1>
          </div>
          <div className="header-container ">
            <div className="search-container border-2 border-[#03729b] p-1 flex rounded-md">
              <SearchIcon className="text-[#03729b]" />
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={handleSearchInputChange}
                className="w-full outline-none px-2"
              />
            </div>
            <div></div>
          </div>
        </div>
        <div className="w-full overflow-x-auto responsive-table">
          <table className="table">
            <thead>
              <tr>
                {columns.map((column) => (
                  <th key={column.field}>{column.headerName}</th>
                ))}
              </tr>
            </thead>
            <tbody className="relative">
              {data.map((row) => (
                <tr key={row._id}>
                  {columns.map((column) => (
                    <td key={column.field}>
                      {column.field === "actions" ? (
                        <div className="action-container">
                          <Check />
                          <CloseIcon
                            onClick={() => console.log("Action clicked")}
                          />
                        </div>
                      ) : (
                        <>
                          {column.field === "name" ? (
                            <Link to={`/tutor/home/students/${row._id}`}>
                              <span className="action-container text-blue-600 capitalize text-sm font-semibold ">
                                {row[column.field]}
                              </span>
                            </Link>
                          ) : (
                            <span className="action-container text-sm font-semibold">
                              {row[column.field]}
                            </span>
                          )}
                        </>
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

export default Students;
