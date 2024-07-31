import React, { useEffect, useState } from "react";
import usePaginationData from "./usePaginationData";
import ReusablePagination from "../../reusable/ReusablePagination";
import Loader from "../../reusable/Loader";
import { axiosInstanceStudent } from "../../../routes/UserRoutes";
import { useLocation, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Assignments =({courseId})=>{

    const navigate = useNavigate();

    const [Loading , setLoading] =  useState(false)


    const columns = [

        { field: 'slno', headerName: 'Sl No' },
        { field: 'assignmentName', headerName: 'Title' },
        { field: 'assignmentDescription', headerName: 'Description' },
        { field: 'timeSlot', headerName: 'Created At' },
        { field: 'Action', headerName: 'Action' }

    ]

    const formatDate = (date) => {
        const options = {
            timeZone: 'Asia/Kolkata',
            hour12: true,
            hour: 'numeric',
            minute: '2-digit',
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        }
        const formattedDate = new Date(date).toLocaleString('en-IN', options)
        return formattedDate
    }

    const {
        courses,
        isPending,
        isError,
        currentPage,
        pageSize,
        totalRows,
        searchQuery,
        handlePageChange,
        handlePageSizeChange,
        handleSearchChange,
        error
    } = usePaginationData(courseId)


    return (

<>
<div className="w-full  h-max">
           
           <div className="table-container">

               <table className="responsive-table">
                   <thead>
                       <tr>
                           {columns.map((column, index) => (
                               <th key={index} >{column.headerName}</th>
                           ))}
                       </tr>
                   </thead>
                   <tbody>
                       {isPending ? (
                           <div className="w-full h-full flex justify-center items-center">
                               <Loader />
                           </div>
                       ) : (
                           courses?.map((row, indexrow) => (

                               <tr key={indexrow}>
                                   {console.log(row)}
                                   {columns.map((column, index) => (
                                       <td key={index}>
                                           {column.field === 'slno' ? (
                                               <div className="font-semibold text-left">
                                                   {indexrow+1}
                                               </div>
                                           ) : null}

                                           {column.field === 'assignmentName' ? (
                                               <div className="font-semibold text-center">
                                                   {row.assignmentName}
                                               </div>
                                           ) : null}
                                        
                                           {column.field === 'assignmentDescription' ? (
                                               <div className="w-[150px] font-semibold text-center text-wrap line-clamp-1">
                                                   {row.assignmentDescription}
                                               </div>
                                           ) : null}

                                           {column.field === 'timeSlot' ? (
                                                   <span className="action-container text-sm font-semibold">
                                                       {formatDate(row.timestamp)}
                                                   </span>
                                            
                                           ) : null}
                                          
                                          
                                           {column.field === 'Action' ? (
                                               <span className="action-container text-sm font-semibold">
                                                   <button onClick={(e)=>{handleTestStart(e,row)}} className="w-[90%] h-[23px] bg-green-700 
                                                           text-sm text-white font-Roboto font-light "> 
                                                           Start 
                                                   </button>
                                               </span>
                                           ) : null}




                                       </td>
                                   ))}
                               </tr>
                           ))
                       )}
                   </tbody>
               </table>

           </div>
          
           <ReusablePagination
               currentPage={currentPage}
               pageSize={pageSize}
               totalRows={totalRows}
               handlePageChange={handlePageChange}
               handlePageSizeChange={handlePageSizeChange} />
       </div>


</>



    )
}

export default Assignments