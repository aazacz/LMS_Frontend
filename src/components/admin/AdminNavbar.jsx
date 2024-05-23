import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";



const AdminNavbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userDetails);

  console.log(user);
  return (
    <div className='flex-1 w-full h-10 border-b-[1px] flex '>
      <div className='w-[80%]  font-poppins'>
        <p className='text-sm'>   Welcome Back!</p>
        <p className='text-sm font-bold'>   {user.userName}</p>

      </div>
      <div className='w-[20%] bg-red-400 '>right side </div>
    </div>
  )
}

export default AdminNavbar