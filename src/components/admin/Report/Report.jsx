import React,{useState} from 'react'
import StudentListTable from './StudentListTable'
import ReusablePagination from '../../reusable/ReusablePagination'
import usePaginationData from './usePaginationData'
import { AdminAxiosInstance } from '../../../routes/AdminRoutes'
import Swal from 'sweetalert2'

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

const [PaymentModal,setPaymentModal] = useState(false)



const handlePayment= (e,row)=>{
  
  e.preventDefault()
  console.log(row)

  setPaymentModal(true)



} 

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



    const handleUnPaidStatus= (e,row)=>{
      e.preventDefault()
      console.log(row)

      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
        }
      });

    }
 
    
    const props = {
      data:courses,
      isPending:isPending,
      paymentpayload:paymentpayload,
      handlePaymentStatus:handlePaymentStatus,
      setstudentId:setstudentId,
      setCourseId:setCourseId,
      setpaymentpayload:setpaymentpayload,
      handleUnPaidStatus:handleUnPaidStatus,
      handlePayment:handlePayment
    }




  return (

    <>
    <div className='relative w-full p-4 overflow-y-auto'>
    {PaymentModal
     && 
    <div className=' absolute z-[99] top-0 left-0 w-full h-full bg-black bg-opacity-70 flex justify-center items-center'>
      
      <div className='bg-white w-full max-w-[400px] h-[150px] p-4'>

        <div className='flex gap-x-4'>

          <div className='flex flex-col'>
            <h1 className='font-Roboto text-base'>Status</h1>
            <select name="" id="" >
              <option value="">Completed</option>
              <option value="">Pending</option>
            </select>
          </div>

          <div className='flex flex-col'>
          <h1 className='font-Roboto text-base'>Mode</h1>
          <select name="" id="" >
              <option value="">Online</option>
              <option value="">Bank Transfer</option>
              <option value="">Bank Transfer</option>
            </select>
          </div>



        </div>
      </div>
    
      </div>}


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