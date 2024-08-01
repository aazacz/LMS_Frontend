import React,{useEffect}                from 'react'
import usePaginationDataAdmin from './usePaginationDataAdmin'
import ReusablePagination   from '../../reusable/ReusablePagination'
import { Link }             from 'react-router-dom'
import { useQuery }         from '@tanstack/react-query'
import Loader               from '../../reusable/Loader'


const AdminListTable = ({courseId}) => {

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
         }         = usePaginationDataAdmin(courseId)

        
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
                                       
                                            <span className="action-container text-sm font-semibold">
                                               {row.name}
                                            </span>
                                      
                                    ) : null}
                                 
                                    {column.field === 'email' ? (
                                       
                                            <span className="action-container text-sm font-semibold">
                                               {row.email}
                                            </span>
                                      
                                    ) : null}

                                                                   

                                
                         
                                    {column.field === 'Action' ? (
                                        <div className="action-container">
                                            <div className="font-poppins text-sm  cursor-pointer hover:bg-slate-200 flex justify-center items-center">
                                          <button className='text-white  bg-red-500 px-2'>Remove </button>
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

export default AdminListTable