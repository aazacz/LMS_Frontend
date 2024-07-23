import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaCirclePlus } from 'react-icons/fa6'
import { AdminAxiosInstance } from '../../../routes/AdminRoutes'
import { useSelector } from 'react-redux'
import Loader from '../../reusable/Loader'
import { IoSearch } from 'react-icons/io5'
import CourseCard from '../CourseCard'



const CourseStructureList = () => {
    const token = useSelector((state) => state.AdminDetails.token)
    const [courses, setCourses] = useState([])
    const [loading, setLoading] = useState(false)
    const [Search, setSearch] = useState("")

//getting Data from backend
    const getdata = async () => {
        try {
            setLoading(true)
            const response = await AdminAxiosInstance.get(
                `api/structure/get-all-structure?page=1&pageSize=10&search=${Search}`)
            setCourses(response.data.data)
            setLoading(false)
        } catch (err) {
            console.log(err)
            setLoading(true)
        }
    }

     // Initial data fetch on component mount
     useEffect(() => {
        getdata()
    }, [])

     // Debounce the search input changes
    useEffect(() => {
        const Debounce = setTimeout(() => {
            getdata()            
        }, 1000);
            return()=> clearTimeout(Debounce)
    }, [Search])





    return (
        <>
                <div className=" p-4">
                    {/* heading and button div */}
                    <div className=" flex justify-between py-2 border-b-2">
                        <h1 className="font-poppins font-semibold md:text-2xl text-xl ">
                            Course Structure
                        </h1>

                        <Link
                            replace
                            to={`/admin/home/courseStructure/addcoursestructure`}
                            className="bg-[#F5F1F1] hidden md:block "
                        >
                            <button className="flex items-center gap-4 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] p-1 rounded-lg border-slate-600 px-2  font-plusjakartasans text-sm">
                                <FaCirclePlus className="text-slate-600 " /> Add Course Structure
                            </button>
                        </Link>
                    </div>

                    <div className='w-full h-14 '>

                        <div className='w-full h-8 flex items-center bg-white rounded-lg  gap-x-3 border-[1px] border-black'>
                            <IoSearch className='text-2xl' />

                            <input type="search" name="" onChange={(e) => setSearch(e.target.value)} className='outline-none w-[90%] h-full' id="" />
                         </div>

                         
                    </div>
                    <div className="w-full flex py-3 justify-end md:hidden ">
                        <Link
                            replace
                            to={`/admin/home/courseStructure/addcoursestructure`}
                            className=" "
                        >
                            <button className="flex  items-center  gap-4 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] bg-[#F5F1F1] p-1 rounded-lg border-slate-600 px-2  font-plusjakartasans text-sm">
                                <FaCirclePlus className="text-slate-600 " /> Add
                                Course Structure{' '}
                            </button>
                        </Link>
                    </div>

                    <div className="grid grid-cols-2 mt-4  md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {loading ? (
                            <div className='w-full  flex justify-center'>   <Loader />   </div>
                            
                        ) : (
                            courses.map((course, index) => (
                                <Link
                                    key={index}
                                    to={`/admin/home/coursestructure/${course._id}`}
                                >
                                    <CourseCard course={course} />
                                </Link>
                            ))
                        )}
                    </div>
                </div>
            
        </>
    )
}

export default CourseStructureList


