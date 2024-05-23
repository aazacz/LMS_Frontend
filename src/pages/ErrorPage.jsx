import React from 'react'
import error from "../assets/404notfound.png"

const ErrorPage = () => {
  return (
    <div className='w-full h-full flex justify-center items-center'>
        <img src={error} alt="" />
    </div>
  )
}

export default ErrorPage