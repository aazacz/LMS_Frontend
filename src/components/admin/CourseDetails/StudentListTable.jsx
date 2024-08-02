import React,{useEffect}                from 'react'
import usePaginationData from './usePaginationData'
import ReusablePagination   from '../../reusable/ReusablePagination'
import { Link }             from 'react-router-dom'
import { useQuery }         from '@tanstack/react-query'
import Loader               from '../../reusable/Loader'


const StudentListTable = ({data}) => {

useEffect(() => {
console.log("data")
console.log(data)
}, [data])


        
    const columns = [
      
        { field: 'Description', headerName: 'Description' },
        { field: 'createdAt', headerName: 'Created At' },
        { field: 'No of Modules', headerName: 'No of Modules' },
        { field: 'sessions', headerName: 'Sessions' },
        { field: 'Duration', headerName: 'Duration' },
        { field: 'Package', headerName: 'Package' }
    
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
         }         = usePaginationData(apiUrl)






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
                    data?.map((row, indexrow) => (
                        
                        <tr key={indexrow}>
                            {console.log(row)}
                            {columns.map((column, index) => (
                                <td key={index}>
                                    {column.field === 'Description' ? (
                                        <div className="font-semibold text-left">
                                            {row.courseName}
                                        </div>
                                    ) : null}

                                    {column.field === 'marks' ? (
                                        <div className="font-semibold text-center">
                                            {row.questions.length *
                                                row.positiveMark}
                                        </div>
                                    ) : null}

                                    {column.field === 'packageName' ? (
                                        <Link
                                            to={`/admin/home/diagnosistest/${row._id}`}
                                        >
                                            <span className="action-container text-sm font-semibold">
                                                Diagnose Test {indexrow + 1}
                                            </span>
                                        </Link>
                                    ) : null}

                                    {column.field === 'createdAt' ? (
                                        <span className="action-container text-sm font-semibold">
                                            {formatDate(row[column.field])}
                                        </span>
                                    ) : null}

                                    {column.field === 'No of Modules' ? (
                                        <div className="action-container">
                                            <div className="font-poppins text-sm  cursor-pointer hover:bg-slate-200 flex justify-center items-center">
                                                {row.modules.length}
                                            </div>
                                        </div>
                                    ) : null}

                                    {column.field === 'sessions' ? (
                                        <div className="action-container">
                                            <div className="font-poppins text-sm  cursor-pointer hover:bg-slate-200 flex justify-center items-center">
                                                {row.modules[indexrow]?.sessions?.length}
                                            </div>
                                        </div>
                                    ) : null}
                         
                                    {column.field === 'Duration' ? (
                                        <div className="action-container">
                                            <div className="font-poppins text-sm  cursor-pointer hover:bg-slate-200 flex justify-center items-center">
                                                {row.trainingDuration
                                                }
                                            </div>
                                        </div>
                                    ) : null}
                               
                                    {column.field === 'Package' ? (
                                        <div className="action-container">
                                            <div className="font-poppins text-sm  cursor-pointer hover:bg-slate-200 flex justify-center items-center">
                                                {row.package}
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

export default StudentListTable