import React, { useEffect, useLayoutEffect, useState } from 'react'
import axios from 'axios'
import sat from '/sat.jpg'
import { useLocation,useNavigate } from 'react-router-dom';
import { axiosInstanceStudent } from '../../routes/UserRoutes';

const Checkout = () => {
    const [Course, setCourse] = useState()
   
    const location = useLocation();
    const { courseId, courseType } = location.state || {};

 
    const navigate = useNavigate()

    useEffect(() => {
        console.log("courseType "+courseType)
         console.log("courseId "+courseId)

        const getCourseDetails = async()=>{
          
            if(courseType==="individual"){
                const response = await axiosInstanceStudent.get(`api/structure/get/${courseId}`);
                console.log('individual response.data');
                console.log(response.data);
                setCourse(response.data)
          }
            else{
                const response = await axiosInstanceStudent.get(`api/course/get-course/${courseId}`);
                console.log('group response.data');
                console.log(response.data);
                setCourse(response.data)
         }


        }
        getCourseDetails()
    }, [])
    


    const key = process.env.REACT_APP_KEY
    const key_secret = process.env.REACT_APP_KEY_SECRET

    const loadScript = (src) => {
        return new Promise((resolve) => {
            const script = document.createElement('script')
            script.src = src
            script.onload = () => {
                resolve(true)
            }
            script.onerror = () => {
                resolve(false)
            }
            document.body.appendChild(script)
        })
    }

    useEffect(() => {
        setTimeout(() => {
            loadScript('https://checkout.razorpay.com/v1/checkout.js')
        }, 4000)
        return clearTimeout()
    }, [])


    // get the states in India
    useEffect(() => {
        const config = {
            method: 'get',
            url: `https://api.countrystatecity.in/v1/countries/IN/states`,
            headers: {
                'X-CSCAPI-KEY':
                    'YnlUQ2Z5U3RqUHBnT3dwc2YwY2F4dGJRRW14aGF5d3NuM2xrejBNQw==',
            },
        }

        axios(config)
            .then(function (response) {
                // console.log(response.data);
            })
            .catch(function (error) {
                console.log(error)
            })
    }, [])

    const handlePayment = () => {
        var options = {
            key: key,
            key_secret: key_secret,
            amount: Course.price * 100,
            currency: 'INR',
            name: 'MindSAT',
            description: 'MindDAT Payment',
            handler: async function (response) {
                console.log(response)
                const responseData ={
                    "courseStructureId":courseId,
                    "paymentId":response.razorpay_payment_id,
                     "amount":Course.price
                }
                await axiosInstanceStudent.post("api/student-course/enroll-individual-course",responseData)
                .then((res)=>{
                    console.log(res.data)
                    navigate("/student")
                })
            },
        }
        var pay = new window.Razorpay(options)
        pay.open()
    }

    useLayoutEffect(() => {
        if(!courseId && !courseType){
            navigate("/error")
        }
    }, [])




    return (
<>
{courseId && courseType ? (  <div className=" h-screen w-full flex justify-between mx-auto p-6 bg-white rounded gap-x-2 shadow-md">
            <div className="w-3/4 ">
                <h2 className="text-2xl font-bold mb-6">Checkout</h2>

                <div className="w-full bg-gray-200 rounded-lg">
                    <div className="flex items-center  p-4  shadow-md">
                        <img
                            src={sat}
                            alt="Course"
                            className="w-24 h-24 object-cover rounded-md mr-4"
                        />
                        <div className="flex-grow ">
                            <h2 className="text-xl font-bold">
                               {Course && Course.courseName}
                            </h2>
                            <p className="text-sm text-gray-600">
                                By Dr. Angela Yu, Developer and Lead Instructor
                                and 1 other
                            </p>
                            <div className="flex items-center mt-2">
                                <span className="bg-yellow-400 text-white text-xs font-bold px-2 py-1 rounded">
                                    Bestseller
                                </span>
                                <span className="ml-2 text-yellow-600 font-bold">
                                    4.7
                                </span>
                                <span className="ml-2 text-gray-600">
                                    (300,947 ratings)
                                </span>
                            </div>
                            <div className="text-sm text-gray-600 mt-1">
                                <span>{Course &&  Course.trainingDuration}</span>
                                <span className="ml-2">{Course &&  Course.modules.length} Modules   </span>
                                <span className="ml-2">• All Levels</span>
                            </div>
                            <div className="flex items-center mt-4">
                                <button className="text-purple-600 mr-4">
                                    Remove
                                </button>
                                <button className="text-purple-600 mr-4">
                                    Save for Later
                                </button>
                                <button className="text-purple-600">
                                    Move to Wishlist
                                </button>
                            </div>
                        </div>
                        <div className="text-right ">
                            <span className="text-xl font-bold">₹{Course && Course.price}</span>
                            {/* <span className="text-sm line-through text-gray-500 block">
                                ₹3,099
                            </span>
                            <span className="text-sm text-green-500">
                                86% off
                            </span> */}
                        </div>
                    </div>
                </div>

                {/* <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                    Country
                    </label>
                    <select
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        disabled
                    >
                        <option>India</option>
                    </select>
                </div> */}
                {/* <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700">
                        State / Union Territory
                    </label>
                    <select
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        value={state}
                        onChange={handleStateChange}
                    >
                        <option value="">Please select...</option>

                        {states
                            .sort((a, b) => {
                                if (a.name < b.name) return -1
                                if (a.name > b.name) return 1
                                return 0
                            })
                            .map((value, index) => {
                                return (
                                    <option key={index} value={value.iso2}>
                                        {' '}
                                        {value.name}
                                    </option>
                                )
                            })}
                    </select>
                </div> */}
                {/* <div className="mb-6">
                    <h3 className="text-xl font-bold mb-4">Payment method</h3>
                    <div className="flex items-center mb-4">
                        <input
                            id="razorpay"
                            name="payment-method"
                            type="radio"
                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                        />
                        <label
                            htmlFor="razorpay"
                            className="ml-3 block text-sm font-medium text-gray-700"
                        >
                            Razorpay
                        </label>
                    </div>
                </div> */}
            </div>

            <div className="w-[30%] max-w-[400px] bg-gray-100 p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-2">Summary</h3>

                <div className="flex justify-between">
                    <p className="mb-2">Original Price:</p>{' '}
                    <span className="font-semibold">₹3,099</span>
                </div>

                <div className="flex justify-between border-b-2">
                    <p className="mb-2">Discounts:</p>
                    <span className="font-semibold">-₹{Course && (3099 - Course.price)}</span>
                    </div>

                {/* <div className="flex justify-between border-b-2">
                    <p className="mb-2">Discounts:</p>
                    <span className="font-semibold">-₹2,650</span>
                </div> */}

                <div className="flex justify-between border-b-2">
                    <p className="mb-2 text-xl font-bold">Total: </p>
                    <span className="text-indigo-600 mb-2 text-xl font-bold">
                        ₹{Course && Course.price}
                    </span>
                </div>

                <div className="flex flex-col items-center justify-center">
                    <button
                        className="mt-4 w-full bg-indigo-600 text-white py-2 px-4 rounded-lg"
                        onClick={handlePayment}
                    >
                        Complete Checkout
                    </button>
                    <p className="mt-2 text-xs text-gray-500">
                        30-Day Money-Back Guarantee
                    </p>
                </div>
            </div>
        </div>)
        :
        null}
    
                    </>
    )
}

export default Checkout
