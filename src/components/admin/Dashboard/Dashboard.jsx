import React from 'react'
import Dashboard_Overview from './Dashboard_Overview'
import Dashboard_UpcomingClasses from './Dashboard_UpcomingClasses'
import Dashboard_Calculations from './Dashboard_Calculations'
import Dashboard_StudentReview from './Dashboard_StudentReview'
import Dashboard_TopSellingCourses from './Dashboard_TopSellingCourses'
import Dashboard_TopStudents from './Dashboard_TopStudents'

const Dashboard = () => {
  return (
    <div className='w-screen lg:w-full justify-center items-center h-screen overflow-y-scroll no-scrollbar pt-4 p-2  '>
     
      <div className='w-full  justify-start items-start  flex md:h-[250px] flex-wrap md:flex-nowrap gap-2 '>
        <div className='w-full md:h-full h-max p-2'><Dashboard_Overview/></div>
        <div className='w-full md:h-full h-max flex  items-center'><Dashboard_Calculations/></div>
      </div>

      <div className='w-full justify-start items-start flex flex-wrap h-max gap-4 mt-4'>
        <div className='w-full lg:w-[55%] h-max '><Dashboard_UpcomingClasses/></div>
        <div className='w-full lg:w-[43%] h-max'><Dashboard_StudentReview/></div>
      </div>
      <div className='w-full mt-4'><Dashboard_TopSellingCourses/></div>
      <div className='w-full my-4'><Dashboard_TopStudents/></div>
    </div>
  )
}

export default Dashboard
