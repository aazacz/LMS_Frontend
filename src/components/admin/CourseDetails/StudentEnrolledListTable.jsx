import React,{useEffect, useState} from 'react'
import usePaginationData from './usePaginationData'
import { Link }             from 'react-router-dom'
import Loader               from '../../reusable/Loader'
import { AdminAxiosInstance } from '../../../routes/AdminRoutes'
import { toast } from 'react-toastify'


const StudentEnrolledListTable = ({courseId}) => {

 
    const handleDelete = async (studentId, event) => {
        event.preventDefault();
    
        try {
          console.log("studentId");
          console.log(studentId);
          const response = await AdminAxiosInstance.delete(`api/course/remove-student/${courseId}/${studentId}`);
    
          if (response.data.message === "Student removed successfully") {
            toast.success("Student removed successfully");
            refetch();
          } else if (response.data.message === "Student not found in the course") {
            toast.error("Student not found in the course");
          } else {
            return;
          }
        } catch (error) {
          console.log(error);
        }
      };


        
    const columns = [
      
        { field: 'name', headerName: 'Name' },
        { field: 'email', headerName: 'Email' },
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
        error,
        refetch
         }         = usePaginationData(courseId)





    return (
        <div className='w-full'>
        <div className="table-container">
          <table className="responsive-table">
            <thead>
                <tr>
                    {columns.map((column, index) => (
                        <th key={index}>{column.headerName}</th>
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
                                    {column.field === 'name' ? (
                                        <div className="font-semibold text-left">
                                            {row.name}
                                        </div>
                                    ) : null}

                                  

                               

                                

                           
                         
                                    {column.field === 'email' ? (
                                        <div className="action-container text-left">
                                            <div className="font-poppins text-left text-sm  cursor-pointer hover:bg-slate-200 flex justify-center items-center">
                                                {row.email}
                                            </div>
                                        </div>
                                    ) : null}
                               
                                 
                                    
                                    
                                    {column.field === 'Action' ? (
                                        <div className="action-container">
                                            <div className="font-poppins text-sm  cursor-pointer hover:bg-slate-200 flex justify-center items-center">
                                                <button
                                                  onClick={(event) => handleDelete(row._id, event)}
                                                
                                                className='w-[80px] h-max bg-red-500 text-white'>  Remove</button>
                                            </div>
                                        </div>
                                    ) : null}

                                   
                                </td>
                            ))}
                        </tr>
                    ))
                )}
            </tbody>
        </table>

    </div>


                    </div>
    )
}

export default StudentEnrolledListTable