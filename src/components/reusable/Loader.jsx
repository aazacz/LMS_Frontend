import React from 'react'
import mindsatLoader from '/mindsatLoader.gif'

const Loader = () => {
    return (
        <div className="w-full h-full absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2  flex justify-center items-center  bg-opacity-25 z-10">
            <img src={mindsatLoader} className='w-[300px]' alt="Loading..." />
        </div>
    )
}

export default Loader