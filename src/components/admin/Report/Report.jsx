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
    refetch,
    error
     }            = usePaginationData()

     const [payStatus,setpayStatus] = useState("")
     const [studentId,setstudentId] = useState("")
     const [CourseId,setCourseId] = useState("")
     const [paymentpayload, setpaymentpayload] = useState({
                              payStatus: "Completed",
                              paymentMode: "",
                              paymentId: "",
                              amount: ""
});

     const handlePaymentStatus = async(StudentId, CourseId)=>{
          
            console.log("StudentId"+ StudentId )
            console.log("CourseId" + CourseId  )
         

            const response = await AdminAxiosInstance.put(`api/payment/payment?courseId=${CourseId}&studentId=${StudentId}`,paymentpayload)
            
            if(response.data.message === "Payment status updated successfully"){
            
              setpaymentpayload({
                payStatus: "Completed",
                paymentMode: "",
                paymentId: "",
                amount: ""
                                })

               refetch()

            }
    }
 
    
    const props = {
      handlePaymentStatus:handlePaymentStatus,
      data:courses,
      isPending:isPending,
      setstudentId:setstudentId,
      setCourseId:setCourseId,
      setpaymentpayload:setpaymentpayload,
      paymentpayload:paymentpayload
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