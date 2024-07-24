import React,{useState} from 'react'
import StudentListTable from './StudentListTable'
import ReusablePagination from '../../reusable/ReusablePagination'
import usePaginationData from './usePaginationData'
import { AdminAxiosInstance } from '../../../routes/AdminRoutes'

const Report = () => {


  
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
     }            = usePaginationData()

     const [studentId,setstudentId] = useState("")
     const [CourseId,setCourseId] = useState("")
     const [paymentpayload,setpaymentpayload] = useState([{
                                      payStatus:"",
                                      paymentMode:"",
                                      paymentId:"",
                                      amount:""
                                    }])

     const handlePaymentStatus = async(StudentId, CourseId)=>{
          
            console.log("StudentId"+ StudentId )
            console.log("CourseId" + CourseId  )

            // const response = await AdminAxiosInstance.put(`api/payment/payment?courseId=${CourseId}&studentId=${StudentId}`)
            // return response.data.data
    }
    
    const handleInput = ()=>{

    }
    
    const props = {
      handlePaymentStatus:handlePaymentStatus,
      data:courses,
      isPending:isPending,
      setstudentId:setstudentId,
      setCourseId:setCourseId,
    }




  return (

    <>
    <div className='w-full p-4'>

    <h1 className='font-poppins text-xl font-semibold'>Sales Report</h1>
    <StudentListTable  {...props}/>
    <ReusablePagination
                        currentPage={currentPage}
                        pageSize={pageSize}
                        totalRows={totalRows}
                        handlePageChange={handlePageChange}
                        handlePageSizeChange={handlePageSizeChange}  />
    </div>
    
    
    </>





  )
}

export default Report