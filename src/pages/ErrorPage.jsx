import React from 'react'
import error from "../assets/Common/404.png"
import { Link } from 'react-router-dom'
import Logo from "../assets/Common/Logoo.png"
const ErrorPage = () => {
  return (
    <div className='flex flex-col justify-center  min-h-screen bg-cyan-200'>
        
       {/* Logo */}
      <div className='flex justify-center'>
        <img src={Logo} className='max-w-44' alt="" />
      </div>

      <div className=" grid md:grid-flow-row md:grid-cols-2 px-8   items-center justify-center ">
       
       {/* Left */}
        <div className='p-8 '>
          <h1 className='w-full text-center animate-pulse md:text-6xl font-bold  bg-clip-text text-orange-400 mb-4'> Oops!</h1>
          <h1 className="md:text-4xl text-center font-bold text-transparent bg-clip-text  bg-gradient-to-b from-gray-900 to-gray-600 mb-4 ">
            Looks like you took a wrong turn. Don’t worry, even the best explorers get lost sometimes.
          </h1>

        </div>

        {/* Right */}
        <div className=" p-4 flex items-center justify-center" >
          <img src={error} className='max-w-[450px] drop-shadow-2xl' alt="" />
        </div>
      </div>

      {/* Middle Button */}
      <div className='flex justify-center'>

        <Link to="/" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-300">Go to Homepage</Link>
      </div>
    </div>
  )
}

export default ErrorPage