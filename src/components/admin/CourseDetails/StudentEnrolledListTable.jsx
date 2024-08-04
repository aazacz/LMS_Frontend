// import React,{useEffect, useState} from 'react'
// import usePaginationData from './usePaginationData'
// import { Link }             from 'react-router-dom'
// import Loader               from '../../reusable/Loader'
// import { AdminAxiosInstance } from '../../../routes/AdminRoutes'
// import { toast } from 'react-toastify'
// import Swal from 'sweetalert2'


const StudentEnrolledListTable = ({courseId}) => {

 
    const handleDelete = async (studentId) => {
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
    
      
      const confirmDelete = (studentId, event) => {
        event.preventDefault();
    
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes"
        }).then((result) => {
          if (result.isConfirmed) {
            handleDelete(studentId);
          }
        });
      };

        
    const columns = [
      
        { field: 'name', headerName: 'Name' },
        { field: 'email', headerName: 'Email' },
        { field: 'Action', headerName: 'Action' }
    
    ]

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
    return new Date(date).toLocaleString("en-IN", options);
  };

  return (
    <div className="w-full relative">
      {isPending && (
        <div className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-75 z-50">
          <Loader />
        </div>
      )}
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
            {courses?.map((row, indexrow) => (
              <tr key={indexrow}>
                {columns.map((column, index) => (
                  <td key={index}>
                    {column.field === "name" && (
                      <span className="action-container text-sm font-semibold">
                        {row.name}
                      </span>
                    )}
                    {column.field === "email" && (
                      <span className="action-container text-sm font-semibold">
                        {row.email}
                      </span>
                    )}
                    {column.field === "Action" && (
                      <div className="action-container">
                        <div className="font-poppins text-sm cursor-pointer hover:bg-slate-200 flex justify-center items-center">
                          <button
                            onClick={(event) => confirmDelete(row._id, event)}
                            className="text-white bg-red-500 px-2"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentEnrolledListTable;
