import React from 'react'
import kidLeft1 from '/Group1.png'
import kidLeft2 from '/Group2.png'
import Animation_ReviewPage1 from './Animation_ReviewPage/Animation_ReviewPage'
import Animation_Courses from './Animation_Courses/Animation_Courses'
import Animation_Tutor from './Animation_Tutor/Animation_Tutor'
import Animation_Methodolgy from './Animation_Methodology/Animation_Methodolgy'
import HomePageContact from './HomePageContact/HomePageContact'
import HomePageTeam from './HomePageTeam/HomePageTeam'
import HomePageDiagnosis from './HomePageDiagnosis/HomePageDiagnosis'
import HomePagePlans from './HomePagePlans/HomePagePlans'
import Background from '../reusable/Background'

const AnimationScreen = () => {
    return (
        <>
            <div className="w-[100%] h-screen relative  flex flex-col justify-center items-center  Test">
                <div className="fixed -z-20">
                    <Background />
                </div>
                <div className="w-[100%] h-screen ">
                    <div className="md:w-[70%] md:h-[50vh] h-[50%]   md:pt-0  flex flex-col gap-4 justify-center i ">
                        <div className="w-full flex flex-col md:flex-row gap-x-4 px-8 md:px-12">
                            <h1 className="text-left md:text-6xl text-[55px] font-poppins font-black text-[#0066de] ">
                                1600/1600{' '}
                            </h1>
                            <span className=" animate-SlidefromRight text-left md:text-6xl text-[40px] font-poppins font-black text-[#0066de]">
                                {' '}
                                Can Be Achieved
                            </span>
                        </div>
                        <div className="w-full flex  md:px-12 px-4">
                            <h1 className="text-2xl font-poppins font-bold animate-diagonalSlide text-[#0066de]">
                                Do Not Compromise Choose Whats Best For You!
                            </h1>
                        </div>
                    </div>

                    <div className="md:h-[40vh] h-[40%] w-full flex-1  relative">
                        {/* left image */}
                        <div className="absolute bottom-0 left-0 animate-appear">
                            <img
                                src={kidLeft1}
                                className="md:w-[350px] w-[200px]"
                                alt="kidLeft1"
                            />
                        </div>

                        {/* right image */}
                        <div className="absolute bottom-0  right-0 animate-appear ">
                            <img
                                src={kidLeft2}
                                className="md:w-[350px] w-[250px] "
                                alt="kidLeft2"
                            />
                        </div>

                        <div className="absolute bottom-0  left-0 right-0 md:mb-10 flex justify-center z-20">
                            <div className="w-[100%] grid md:grid-cols-5 grid-cols-3 gap-2">
                                <div className="backdrop-blur-md pr-2  h-20 flex justify-center items-center animate-SlidefromLeft">
                                    <div className="md:px-8 md:py-2 px-2 py-2 text-xs md:text-base bg-[#0066de] text-white font-plusjakartasans font-bold">
                                        Without mind SAT
                                    </div>
                                </div>

                                <div className="hidden md:block h-20"></div>
                                <div className="hidden md:block h-20"></div>
                                <div className=" h-20"></div>
                                <div className="backdrop-blur-md  h-20 flex justify-center items-center">
                                    <div className="md:px-8  py-2  bg-[#0066de] text-white font-plusjakartasans font-bold animate-SlidefromRight">
                                        With mind SAT
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <Animation_ReviewPage1 />
                        <Animation_Courses />
                        <Animation_Tutor />
                        <Animation_Methodolgy />
                        <HomePageTeam />
                        <HomePageDiagnosis />
                        <HomePagePlans />
                        <HomePageContact />
                    </div>
                </div>
            </div>
        </>
    )
}

export default AnimationScreen
