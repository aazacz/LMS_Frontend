import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Pdflogo from './Pdflogo'
import { MdFileDownload, MdDelete } from 'react-icons/md'
import { useSelector } from 'react-redux'
import Swal from 'sweetalert2' // Import SweetAlert
import ReusablePagination from '../reusable/ReusablePagination'
import { Link } from 'react-router-dom'
import { BsFillFileEarmarkPdfFill } from 'react-icons/bs'
import { IoIosCloseCircleOutline, IoMdRemoveCircle } from 'react-icons/io'
import { FaCirclePlus } from 'react-icons/fa6'
import { AdminAxiosInstance } from '../../routes/AdminRoutes'


const baseURL = process.env.REACT_APP_API_URL

const Library = () => {
    const token = useSelector((state) => state.AdminDetails.token)

    const [courses, setCourses] = useState([])
    const [selectedCourse, setSelectedCourse] = useState('')
    const [materials, setMaterials] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize, setPageSize] = useState(10) // Default page size
    const [totalRows, setTotalRows] = useState(0) // Total rows for pagination
    const [Modal, setModal] = useState(false)

    // Fetch all courses on component mount
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await AdminAxiosInstance.get(`api/course/get-all-course?page=1&pageSize=&search`)
                setCourses(response.data.data)
            } catch (error) {
                console.log('Error fetching courses:', error)
            }
        }

        fetchCourses()
    }, [])

    // Fetch materials initially and when selectedCourse or pagination changes
    useEffect(() => {
        const fetchMaterials = async () => {
            try {
                let response
                if (selectedCourse !== '') {
                    response = await AdminAxiosInstance.get(`api/library/get-course/${selectedCourse}?page=${currentPage}&pageSize=${pageSize}`,
                      
                    )
                } else {
                    response = await AdminAxiosInstance.get(`api/library/get-all-assignment?page=${currentPage}&pageSize=${pageSize}`,
                                         )
                }
                setMaterials(response.data.data)
                setTotalRows(response.data.total)
            } catch (error) {
                console.log('Error fetching materials:', error)
            }
        }

        fetchMaterials()
    }, [selectedCourse, currentPage, pageSize])

    // Function to handle course selection
    const handleCourseChange = (event) => {
        setSelectedCourse(event.target.value)
        setCurrentPage(1)
    }


    // Deleting a Material
    const handleDeleteMaterial = async (materialId) => {
        try {
            const confirmDelete = await Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!',
            })

            if (confirmDelete.isConfirmed) {
                const response = await AdminAxiosInstance.delete(
                    `api/library/delete-material/${materialId}`)
                console.log('File deleted successfully:', response.data)

                // Update materials after deleting
                const updatedMaterials = materials.filter(
                    (material) => material._id !== materialId
                )
                setMaterials(updatedMaterials)

                Swal.fire('Deleted!', 'Your file has been deleted.', 'success')
            }
        } catch (error) {
            console.error('Error deleting file:', error)
            Swal.fire('Error!', 'Failed to delete file.', 'error')
        }
    }

    //Download Material
    const handleDownloadMaterial = async (materialId) => {
        try {
            await AdminAxiosInstance
                .get(`api/library/download-file//${materialId}`, {
                    responseType: 'blob',
                    headers: {
                        Accept: 'application/pdf',
                    },
                })
                .then((res) => {
                    console.log('res.data in then block')
                    console.log(res.data)
                })

            // // Create a blob URL for the file and trigger download
            // const url = window.URL.createObjectURL(new Blob([response.data]));
            // const link = document.createElement("a");
            // link.href = url;
            // link.setAttribute("download", `${materialId}.pdf`); // Adjust file name as needed
            // document.body.appendChild(link);
            // link.click();
            // link.remove();
        } catch (error) {
            console.error('Error downloading file:', error)
            Swal.fire('Error!', 'Failed to download file.', 'error')
        }
    }

    // Function to handle page change
    const handlePageChange = (event, page) => {
        setCurrentPage(page)
    }

    // Function to handle page size change
    const handlePageSizeChange = (event) => {
        setPageSize(parseInt(event.target.value, 10))
        setCurrentPage(1)
    }

    const [Material, setMaterial] = useState(null)
    // Function to open and close a modal
    const openModal = (material) => {
        console.log('https://mindsat.onrender.com/' + material.filePath)
        setMaterial('https://mindsat.onrender.com/' + material.filePath)
        setModal(true)
    }

    return (
        <div
            onClick={() => setModal(false)}
            className={`w-full h-[100dvh] bg-red-300 relative flex flex-col font-poppins ${Modal ? ' bg-gray-200' : ' '}`}
        >
            {Modal && (
                <div className="w-full z-[99] h-full flex justify-center items-center absolute  left-0 top-0  ">
                    
                    <div className='w-full h-full   '>

                    <object
                        data={Material}
                        type="application/pdf"
                        width="100%"
                        height="100%"
                        >
                        <img src="/broken.png" alt="PDF not found" />
                    </object>
                </div>
                        </div>
            )}

            <div className="w-full  flex md:flex-row px-6  flex-col justify-between items-start p-2">
                <div className="w-full md:w-auto   flex  justify-between items-center  ">
                    <div className="text-sm md:text-base">Choose Course</div>

                    <select
                        className="ml-2 text-sm p-1 h-max rounded"
                        onChange={handleCourseChange}
                        value={selectedCourse}
                    >
                        <option value="">All courses</option>
                        {courses.map((course) => (
                            <option key={course._id} value={course._id}>
                                {course.courseName}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="">
                    <Link to="uploadMaterial">
                        <button className="text-sm px-6 py-2 bg-[#f5f1f1] hover:bg-[#f5e3e3] shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] text-black rounded-md flex gap-x-2 items-center">
                            <FaCirclePlus /> Upload Material
                        </button>
                    </Link>
                </div>
            </div>

            <div className=" ">
                <div className="px-2 md:px-0 justify-center spac grid  grid-flow-row place-content-center grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-5  md:gap-x-4">
                    {materials.map((material, index) => (
                        <div
                            onClick={(e) => {
                                e.stopPropagation()
                                openModal(material)
                            }}
                            key={material._id}
                            className=" md:w-[180px] bg-gray-300 flex flex-col justify-center items-center px-2 py-2 m-4 rounded-md"
                        >
                            <div className="flex justify-end w-full  ">
                                <IoIosCloseCircleOutline
                                    className="text-xl cursor-pointer"
                                    onClick={() =>
                                        handleDeleteMaterial(material._id)
                                    }
                                />
                            </div>
                            <div className="">
                                {/* <Pdflogo  /> */}
                                <BsFillFileEarmarkPdfFill className="text-6xl text-red-700" />
                            </div>
                            <div className="flex justify-between mt-4 gap-5 px-2  items-center w-full relative">
                                <h1 className="w-[90%] text-center font-poppins font-semibold text-xs line-clamp-1 uppercase">
                                    {material.fileName.split('.pdf')}
                                </h1>
                                <div className="w-[10%]">
                                    <MdFileDownload
                                        className="text-2xl cursor-pointer  "
                                        onClick={() =>
                                            handleDownloadMaterial(material._id)
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <ReusablePagination
                    currentPage={currentPage}
                    pageSize={pageSize}
                    totalRows={totalRows}
                    handlePageChange={handlePageChange}
                    handlePageSizeChange={handlePageSizeChange}
                />
            </div>
        </div>
    )
}

export default Library
