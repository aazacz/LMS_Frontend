import React, { useEffect, useState } from 'react'
import { BiSpreadsheet } from 'react-icons/bi'
import { LuTimer } from 'react-icons/lu'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import 'react-tooltip/dist/react-tooltip.css'
import { useSelector } from 'react-redux'
import Loader from '../../reusable/Loader'
import { IoIosCloseCircle } from 'react-icons/io'
import { AdminAxiosInstance } from '../../../routes/AdminRoutes'
import Asidebar from './AsideBar'

const Coursedetails = () => {
    const baseUrl = process.env.REACT_APP_API_URL
    const token = useSelector((state) => state.AdminDetails.token)
    const [Course, SetCourse] = useState()
    const [Loading, SetLoading] = useState(false)
    const [activeTab, setActiveTab] = useState('about')
    const [slideDirection, setSlideDirection] = useState('left')
    const [Modal, setModal] = useState(false)
    const [StudentDrop, setStudentDrop] = useState(false)
    const [TutorDrop, setTutorDrop] = useState(false)
    const [DropDownList, SetDropDownList] = useState()
    
    const { courseId } = useParams()


    const handleTabClick = (tab) => {
        setSlideDirection(
            activeTab === 'about' && tab === 'module' ? 'left' : 'right'
        )
        setActiveTab(tab)
    }

    useEffect(() => {
        axios
            .get(`${baseUrl}api/course/get-course/${courseId}`, {
                headers: { authorization: `Bearer ${token}` },
            })
            .then((response) => {
         
                SetCourse(response.data)
            })
    }, [baseUrl, courseId, token])



    useEffect(()=>{
       
        const getTutorList = async ()=>{
            console.log("courseId")
            console.log(courseId)
           const response = await AdminAxiosInstance.get(`api/course/tutor-not-added/${courseId}`);
             console.log("tutor list")
             console.log(response.data)
             SetDropDownList(response.data)
                                       }
        
        const getStudentList = async ()=>{
           
             const response = await AdminAxiosInstance.get("api/students/getAll-students");
             console.log("Student list")
             console.log(response.data.data)
             SetDropDownList(response.data.data)
                                               }

     try {
        if(Modal === true)
        {
            if(StudentDrop===true){
                getStudentList()
            }
            if(TutorDrop===true){
                getTutorList()
            }
            
        }
        
     } catch (error) {
        console.log(error)
     }
             
    },[Modal,StudentDrop,TutorDrop])

 
 //function to close the modal
    const HandleModalClose=()=>{
        setTutorDrop(false)
        setStudentDrop(false)
        setModal(false)
        SetDropDownList(null)

    }
 
    
 //function to add a student or tutor
 const handleAdd = ()=>{


 }  


    return (
        <>
            {Loading ? (
                <div className="w-full bg-gray-300 h-max flex justify-center items-center">
                    <Loader />
                </div>
            ) : (

                <>
                    {Modal ? (<div  className='w-full  fixed flex justify-center items-center  h-full bg-black bg-opacity-60  top-0 left-0 z-[99999] '>


                        <div className='w-2/4 h-[300px] p-8 bg-white relative rounded-xl'>

                            <IoIosCloseCircle
                                onClick={HandleModalClose}
                                className='absolute right-3 top-3 text-3xl  ' />

                            <div className='w-full flex  h-[40px] gap-x-4  mt-5'>

                                <select  className='w-full max-h-11  border-[1px] border-black rounded-[3px]  ' name="" id="">
                                    <option defaultValue="select a tutor from the list" >select to add to course</option>
                                  
                                { 
                                DropDownList && DropDownList?.map((value,index)=>(

                                        <option key={index} value={value.id}>
                                        {value.name}
                                    </option>
                                 
                                    )
                            )
                                  }
                                  
                                </select>

                                <button onClick={()=>handleAdd} className='bg-blue-700 w-[90px] rounded-lg text-white'> Add</button>
                            </div>
                   
                   
                   
                            <div className='w-full flex  h-[40px] gap-x-4  mt-5'>

                                <select  className='w-full max-h-11  border-[1px] border-black rounded-[3px]  ' name="" id="">
                                    <option defaultValue="select a tutor from the list" >select to remove from course</option>
                                  
                                { 
                                DropDownList && DropDownList?.map((value,index)=>(

                                        <option key={index} value={value.id}>
                                        {value.name}
                                    </option>
                                 
                                    )
                            )
                                  }
                                  
                                </select>

                                <button onClick={()=>handleAdd} className='bg-red-700 w-[90px] rounded-lg text-white'> Remove</button>
                            </div>





                        </div>



                    </div>
                
                
                ) : null}
                    <div className="flex  flex-col lg:flex-row h-screen overflow-y-scroll ">




                        <div className="lg:w-[70%] w-full   p-4 flex flex-col">
                            <div className="w-full h-[200px]  md:h-[300px] bg-gray-800 flex items-center justify-center text-white font-semibold font-plusjakartasans text-2xl md:text-3xl">
                                Introduction to SAT & DSAT
                            </div>

                            <div className="w-full  mt-4">
                                <h1 className="font-bold text-lg md:text-xl font-plusjakartasans">
                                    Introduction to Basic SAT & DSAT
                                </h1>
                                <div className="flex items-center gap-x-6 mt-2">
                                    <span className="flex items-center gap-x-1 text-sm font-plusjakartasans">
                                        <BiSpreadsheet className="text-gray-400" />
                                        {Course ? Course.modules.length : 0} Modules
                                    </span>
                                    <span className="flex items-center gap-x-1 text-sm font-plusjakartasans">
                                        <LuTimer className="text-gray-400" />
                                        {Course && Course.trainingDuration}Hrs
                                    </span>
                                </div>
                            </div>

                            <div className="w-full bg-blue-400 mt-4">
                                <div className="flex w-full gap-x-4">
                                    {['about', 'module', 'tests', 'review'].map(
                                        (tab, index) => (
                                            <button
                                                key={index}
                                                className={`relative py-2 ${activeTab === tab
                                                    ? 'border-b-4 border-amber-500'
                                                    : ''
                                                    }`}
                                                onClick={() => handleTabClick(tab)}
                                            >
                                                {tab.charAt(0).toUpperCase() +
                                                    tab.slice(1)}
                                            </button>
                                        )
                                    )}
                                </div>
                            </div>

                            <div className="relative mt-4 overflow-hidden h-64">
                                <div className={`slide-content ${slideDirection}`}>
                                    {activeTab === 'about' && <AboutContent />}
                                    {activeTab === 'module' && (
                                        <ModuleContent course={Course} />
                                    )}
                                    {activeTab === 'tests' && <TestsContent />}
                                    {activeTab === 'review' && <ReviewContent />}
                                </div>
                            </div>
                        </div>
                        <Asidebar course={Course} Modal={Modal} setModal={setModal} setStudentDrop={setStudentDrop} setTutorDrop={setTutorDrop} />
                    </div>
                </>
            )}
        </>
    )
}

export default Coursedetails


        //about component
        const AboutContent = () => {
            return <div className="bg-red-300">About Content</div>
        }

        //module component
        const ModuleContent = ({ Course }) => {
            const [modules, setModules] = useState([])
            console.log('course')

            useEffect(() => {
                if (Course && Course.modules) {
                    setModules(Course.modules)
                }
            }, [Course])

            return (
                <div className="bg-green-300 w-full h-full border-2">
                    <h1>Modules</h1>
                    {modules.map((module, index) => (
                        <div key={index}>{module.moduleName}</div>
                    ))}
                </div>
            )
        }

        //Test component
        const TestsContent = () => {
            return <div className="bg-blue-300">Tests Content</div>
        }



        //Review component
        const ReviewContent = () => {
            return <div className="bg-yellow-300">Review Content</div>
        }









