import React, { useEffect, useState } from 'react';

const InfoModal = ({ Line1,Line2,Line3, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000); // Closes the modal after 5 seconds

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative bg-white text-red-700 font-plusjakartasans font-semibold text-2xl rounded-lg shadow-lg p-6 max-w-sm w-full">
       
       <div className='absolute left-1/2 -translate-x-1/2 top-3  rounded-full border-4 border-red-700 flex justify-center animate__animated animate__flash items-center w-10 h-10'>

       <p className='text-3xl  '>!</p>
       </div>
       <div className='mt-8'>

        <p>{Line1}</p>
        <br/>
        <p>{Line2}</p>
        
        <br/>
        <p>{Line3}</p>
       </div>
      </div>
    </div>
  );
};

export default InfoModal;
