import React,{useState, useEffect, useCallback} from 'react'
import coursephoto from '../../assets/Admin/coursephoto.jpeg'
import { BiSpreadsheet } from 'react-icons/bi'
import { LuTimer } from 'react-icons/lu'
import { Link } from 'react-router-dom'
import { FaCirclePlus, FaList } from 'react-icons/fa6'
import { AdminAxiosInstance } from '../../../routes/AdminRoutes'
import Loader from '../../reusable/Loader' 
import { useQuery } from '@tanstack/react-query'
import { IoSearch } from 'react-icons/io5'
import { FaThList } from 'react-icons/fa'
import { BsFillGrid1X2Fill } from 'react-icons/bs'
import CourseCard from '../CourseCard'

const CourseList = ({ name }) => {
    
    
    const [Search, setSearch] = useState("")
    const [ListModal,setListModal] = useState(false)
    const [GridModal,setGridModal] = useState(true)
    
    const getdata = useCallback(async () => {
        try {
            const response = await AdminAxiosInstance.get(
                `api/course/get-all-course?page=1&pageSize=0&search=${Search}`
            )
            return response.data.data
        } catch (err) {
            console.log(err)
        }
    }, [Search])
    
    const {  data: courses,isLoading, isError, error, refetch } = useQuery({
        queryKey: ['AdminCourseList'],
        queryFn: getdata,
        staleTime: 1000,
        refetchInterval: 600000,
    })

  useEffect(() => {
        const debounce = setTimeout(() => {
            refetch()
        }, 1000)
        return () => clearTimeout(debounce)
    }, [Search, refetch])

    useEffect(()=>{
            console.log(Search)
    },[Search])
    


    return (
        <div className="p-4 w-full h-max">
        {/* Add Button */}
        <div className="flex justify-between py-4">
          
        <h1 className="font-poppins font-semibold md:text-2xl text-xl ">
                            Courses
                        </h1>
          
            <Link replace to={`/admin/home/courses/addcourse`} className="bg-[#F5F1F1]">
                <button className="flex items-center gap-4 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] p-1 rounded-lg border-slate-600 px-2 font-plusjakartasans text-sm">
                    <FaCirclePlus className="text-slate-600" />
                    Add Course
                </button>
            </Link>
        </div>

        
        <div className='w-full h-8 flex items-center bg-white rounded-lg  gap-x-3 border-[1px] border-black'>
                            <IoSearch className='text-2xl' />

                            <input type="search" name="" onChange={(e) => setSearch(e.target.value)} className='outline-none w-[90%] h-full' id="" />
                         </div>

                         <div className='w-full  py-2 flex justify-end '> 
                            
                     <div className='w-[80px]  flex  items-center '> 
                        
                        <div onClick={()=>{
                            setListModal(true);
                            setGridModal(false)
                             }} 
                        className={`${ListModal?"text-blue-700":"text-gray-500"} cursor-pointer w-1/2 h-full flex justify-center border-r-[2px] border-gray-600 `}> <FaList className='text-lg '/>  </div>
                      
                        <div onClick={()=>{
                            setListModal(false);
                            setGridModal(true)
                             }}
                         className={`${GridModal?"text-blue-700":"text-gray-500"} cursor-pointer w-1/2 h-full flex justify-center `}> <BsFillGrid1X2Fill   /></div>
                             </div>


                             </div>


        {isLoading ? (
            <div className="w-full h-screen flex flex-1 bg-gray-200 justify-center items-center">
                <Loader />
            </div>
        ) : isError ? (
            <div className="w-full h-screen flex flex-1 bg-gray-200 justify-center items-center">
                <p>Error loading courses: {error.message}</p>
            </div>
        ) : (
          
          <>
            {GridModal
               &&
             <div className="grid grid-cols-2 mt-4 md:grid-cols-3 lg:grid-cols-4 gap-4">
           
                {courses.map((course, index) => (
               <Link key={index} to={`/admin/home/courses/${course._id}`}>
                   <CourseCard course={course} />
               </Link>
           ))}
       </div> }


       {ListModal 
       && 
       
       <h1>List Model</h1>}
        </>

           
        )}
    </div>
    )
    
}

export default CourseList



