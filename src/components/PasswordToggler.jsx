import React from 'react'

const PasswordToggler = () => {


    return (
        <div className="flex flex-row items-center gap-1 md:gap-4 bg-transparent">
           
            <div className="relative flex-grow bg-transparent">
                <input
                  
                    className="border focus:outline-blue-500 px-2 rounded-md h-10 bg-white w-full"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
           
            </div>
        </div>
    )
}

export default PasswordToggler