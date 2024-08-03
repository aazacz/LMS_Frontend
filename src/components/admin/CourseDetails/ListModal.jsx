import React, { useEffect, useState } from 'react'
import { AdminAxiosInstance } from '../../../routes/AdminRoutes'
import { toast } from 'react-toastify'
import { IoIosCloseCircle } from 'react-icons/io'
import Loader from '../../reusable/Loader'
import StudentListTable from './StudentListTable'
import AdminListTable from './AdminListTable'
import StudentEnrolledListTable from './StudentEnrolledListTable'
import "./list.css"
const ListModal = ({ List, Role, HandleModalClose, courseId, Loader, setcount, List2 }) => {

    const [AddList, setAddList] = useState(null)
    const [RemoveList, setRemoveList] = useState(null)
    const [StudentModal, setStudentModal] = useState(false)
    const [StudentDropDownList, SetStudentDropDownList] = useState()
    const [EnrolledStudentDropDownList, SetEnrolledStudentDropDownList] = useState()
    // const [CourseId,setCourseId] = useState(courseId)

    console.log("List in the listmodal")
    console.log(List)

useEffect(()=>{
    console.log("List in the listmodal")
console.log(List)
},[])



// useEffect(()=>{
//     const getStudentList = async () => {
//         try {
//             const response = await AdminAxiosInstance.get(`api/course/student-not-added/${courseId}`);
//             console.log("response.data student not addeddddddddd");
//             console.log(response.data);
//             if (response.data) {
//                 SetStudentDropDownList(response.data);
//             }
//         } catch (error) {
//             if (error.response && error.response.status === 404) {
//                 console.log("Student not added list returned 404");
//             } else {
//                 console.log(error);
//             }
//         }
    
//         try {
//             const EnrolledStudents = await AdminAxiosInstance.get(`api/course/student-enrolled/${courseId}`);
//             console.log("EnrolledStudents.data student not addeddddddddd");
//             console.log(EnrolledStudents.data);
//             if (EnrolledStudents.data) {
//                 SetEnrolledStudentDropDownList(EnrolledStudents.data);
//             }
//         } catch (error) {
//             if (error.response && error.response.status === 404) {
//                 console.log("Enrolled student list returned 404");
//             } else {
//                 console.log(error);
//             }
//         }
//     };
    
//  try {
   
 
//         getStudentList()

    
//      } catch (error) {
//     console.log(error)
//     }
         
// },[])



    const handleInputChange = (event) => {
        const { name, value } = event.target

     
        if (name === 'addSelect') {
            setAddList(value)
        } else if (name === 'removeSelect') {
            setRemoveList(value)
        }
    }




    const handleAdd = async () => {
        event.preventDefault()

        try {
            if (Role === "Student") {

                const data = {
                    "studentId": AddList
                }
                const response = await AdminAxiosInstance.post(`api/course/add-student/${courseId}`, data)
             
                if (response.data.message === "Student added successfully") {
                    toast.success("Student added successfully")
                    setcount(prev => prev + 1)
                }
                else if (response.data.message === "Student already enrolled in the course") {
                    toast.error("Student already enrolled in the course")
                    toast.error(response.data.message)

                }
                else {
                    toast.error("Student already enrolled in the course")

                    return
                }

            }
            else if (Role === "Tutor") {

                const data = {
                    "teacherId": AddList
                }
                const response = await AdminAxiosInstance.post(`api/course/add-teacher/${courseId}`, data)
               
                if (response.data.message === "Teacher added successfully") {
                    toast.success("Teacher added successfully")
                    setcount(prev => prev + 1)
                } else if (response.data.message === "Teacher already assigned to the course") {
                    toast.error("Teacher already assigned to the course")
                }
                else {
                    return
                }

            }
            else {
                return
            }


        }
        catch (error) {
            console.log(error)
        }

    }


    return (


        <div className='w-full  fixed flex justify-center items-center  h-full bg-black bg-opacity-60  top-0 left-0 z-[99] '>


            <div className='w-2/4 max-h-[500px] overflow-y-auto p-8 bg-white relative rounded-xl'>

                <IoIosCloseCircle
                    onClick={HandleModalClose}
                    className='absolute right-3 top-3 text-3xl  ' />
                {Loader ? (
                    <Loader />
                ) : (

                    <>
                        {Role === "Student" ?
                         (
                            <div className='mb-4'>
                                <div className='w-full flex  h-[40px] gap-x-4  mt-5'>
                                    <select

                                        onChange={handleInputChange}
                                        name="addSelect"
                                        className='w-full max-h-11  border-[1px] border-black rounded-[3px]  ' id="">
                                        <option defaultValue="select a tutor from the list" >Select Student to add to course</option>
                                        {
                                            List && List?.map((value, index) => (

                                                <option key={index} value={value._id}>
                                                    {value.name}
                                                </option>
                                            )
                                            )
                                        }
                                    </select>

                                    <button onClick={handleAdd} className='bg-blue-700 w-[90px] rounded-lg text-white'> Add</button>
                                </div>



                                <div>
                                    <h1 className='mt-3 font-Roboto text-xl'>Student Enrolled</h1>
                                    <StudentEnrolledListTable courseId={courseId} />
                                </div>

                            </div>
                        ) : 
                        

                        <div className='mb-4'>
                        <div className='w-full flex  h-[40px] gap-x-4  mt-5'>
                            <select

                                onChange={handleInputChange}
                                name="addSelect"
                                className='w-full max-h-11  border-[1px] border-black rounded-[3px]  ' id="">
                                <option defaultValue="select a tutor from the list" >select Tutor to add to course</option>
                                {
                                    List && List?.map((value, index) => (

                                        <option key={index} value={value._id}>
                                            {value.name}
                                        </option>
                                    )
                                    )
                                }
                            </select>

                            <button onClick={handleAdd} className='bg-blue-700 w-[90px] rounded-lg text-white'> Add</button>
                        </div>



                        <div>
                            <h1 className='mt-3 font-Roboto text-xl'>Admin Enrolled</h1>
                            <AdminListTable courseId={courseId}/>
                        </div>

                    </div>



                         }
                                    
                    </>



                )}



            </div>

        </div>
    )


}

export default ListModal






// <>



// <div className='w-full flex  h-[40px] gap-x-4  mt-5'>

//     <select
//     name="removeSelect"
//     onChange={handleInputChange}
//     className='w-full max-h-11  border-[1px] border-black rounded-[3px]  '  id="">
//         <option defaultValue="select a tutor from the list" >select to remove from course</option>

//         {
//             List2 && List2?.map((value, index) => (

//                 <option key={index} value={value._id}>
//                     {value.name}
//                 </option>
//             )
//             )
//         }
//     </select>
//     <button onClick={handleDelete} className='bg-red-700 w-[90px] rounded-lg text-white'> Remove</button>
// </div>

// </>