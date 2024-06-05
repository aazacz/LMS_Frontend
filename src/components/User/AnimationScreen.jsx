import React from 'react';
import kidLeft1 from '/Group1.png';
import kidLeft2 from '/Group2.png';

const AnimationScreen = () => {
    return (
        <div className='w-screen h-[87vh] flex flex-col justify-center items-center bg-slate-400'>
            <div className='w-[70%] h-2/3 flex flex-col gap-4 justify-center'>
                <div className='w-full flex gap-x-4 px-12'>
                    <h1 className='text-left text-6xl font-poppins font-black text-[#0066de] '>1600/1600  </h1><span className='animate-SlidefromRight text-left text-6xl font-poppins font-black text-[#0066de]'> Can Be Achieved</span>
                </div>
                <div className='w-full flex px-12'>
                    <h1 className='text-2xl font-poppins font-bold animate-diagonalSlide text-[#0066de]'>Do Not Compromise Choose Whats Best For You!</h1>
                </div>
            </div>

            <div className='h-1/3 w-full flex-1 bg-slate-400 relative'>

              {/* left image */}
                <div className='absolute bottom-0 left-0 animate-appear'>
                    <img src={kidLeft1} className='w-[350px]' alt="kidLeft1" />
                </div>

              {/* right image */}
                <div className='absolute bottom-0 right-0 animate-appear '>
                    <img src={kidLeft2} className='w-[350px]  ' alt="kidLeft2" />
                </div>

                <div className='absolute bottom-0 left-0 right-0 mb-10 flex justify-center z-20'>
                    <div className='w-[100%] grid grid-cols-5 gap-2'>
                      
                        <div className='backdrop-blur-md  h-20 flex justify-center items-center animate-SlidefromLeft'>
                            <div className='px-8 py-2  bg-[#0066de] text-white font-plusjakartasans font-bold'>Without mind SAT</div>
                        </div>

                        <div className=' h-20'></div>
                        <div className=' h-20'></div>
                        <div className=' h-20'></div>
                        <div className='backdrop-blur-md  h-20 flex justify-center items-center'>
                            <div className='px-8 py-2  bg-[#0066de] text-white font-plusjakartasans font-bold animate-SlidefromRight'>With mind SAT</div>
                        </div>
                    </div>
                </div>
            </div>
        </div> 
    );
}

export default AnimationScreen;
