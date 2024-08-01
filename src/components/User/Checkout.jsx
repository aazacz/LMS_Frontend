import React, { useEffect, useLayoutEffect, useState } from 'react'
import axios from 'axios'
import sat from '../../assets/Admin/sat.jpg'
import { useLocation, useNavigate } from 'react-router-dom'
import { axiosInstanceStudent } from '../../routes/UserRoutes'

const Checkout = () => {
    const [Course, setCourse] = useState()
    const navigate = useNavigate()
    const location = useLocation();




    const [Courseid, setCourseId] = useState("")
    const [coursetype, setcoursetype] = useState("")

    useEffect(()=>{
        console.log('location.state:', location.state);

        const { courseId, courseType } = location.state || {};
        setCourseId(courseId)
        setcoursetype(courseType)
    },[])

    


    useEffect(() => {
        const getCourseDetails = async () => {
            if (Courseid && coursetype) {
                if (coursetype === "individual") {
                    const response = await axiosInstanceStudent.get(`api/structure/get/${Courseid}`)
                    console.log('individual response.data')
                    console.log(response.data)
                    setCourse(response.data)
                } else {
                    const response = await axiosInstanceStudent.get(`api/course/get-course/${Courseid}`)
                    console.log('group response.data')
                    console.log(response.data)
                    setCourse(response.data)
                }
            }
        }
        getCourseDetails()
    }, [Courseid, coursetype])


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
        loadScript('https://checkout.razorpay.com/v1/checkout.js')
        // Cleanup to remove the script when the component unmounts
        return () => {
            const script = document.querySelector(`script[src="https://checkout.razorpay.com/v1/checkout.js"]`)
            if (script) script.remove()
        }
    }, [])

    // Get the states in India
    useEffect(() => {
        const config = {
            method: 'get',
            url: `https://api.countrystatecity.in/v1/countries/IN/states`,
            headers: {
                'X-CSCAPI-KEY': 'YnlUQ2Z5U3RqUHBnT3dwc2YwY2F4dGJRRW14aGF5d3NuM2xrejBNQw==',
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
            description: 'MindSAT Payment',
            handler: async function (response) {
                console.log(response);
    
                let responseData = {
                    "courseStructureId": courseId,
                    "paymentId": response.razorpay_payment_id,
                    "amount": Course.price
                };
    
                try {
                    let apiResponse;
                    if (courseType === "individual") {
                        console.log('Enrolling in individual course...');
                        apiResponse = await axiosInstanceStudent.post("api/student-course/enroll-individual-course", responseData);
                        console.log('API Response:', apiResponse.data);
                        console.log('Navigating to /student');
                        navigate("/student/a");

                    } else if (courseType === "group") {
                        responseData.courseId = courseId; // Ensure this key is set for group courses
                        console.log('Enrolling in group course...');
                        apiResponse = await axiosInstanceStudent.post("api/student-course/enroll-group-course", responseData);
                        console.log('API Response:', apiResponse.data);
                        console.log('Navigating to /student/a');
                        navigate("/student/a");
                    }
                } catch (error) {
                    console.error('Payment or enrollment failed:', error);
                    // Handle error appropriately, maybe show a toast or alert to the user
                }
            }
        };
        var pay = new window.Razorpay(options);
        pay.open();
    };
    


    return (
        <>
            {Courseid && coursetype ? (
                <div className="h-screen w-full flex flex-col md:flex-row justify-between mx-auto p-6 bg-white rounded gap-x-2 shadow-md">
                    <div className="w-full md:w-3/4">
                        <h2 className="text-2xl font-bold mb-6">Checkout</h2>

                        <div className="w-full bg-gray-200 rounded-lg">
                            <div className="flex items-center p-4 shadow-md">
                                <img
                                    src={sat}
                                    alt="Course"
                                    className="w-24 h-28 object-fill rounded-md mr-4"
                                />
                                <div className="flex-grow">
                                    <h2 className="text-xl font-bold line-clamp-1">
                                        {Course && Course.courseName}
                                    </h2>
                                    <p className="text-sm text-gray-600 line-clamp-1">
                                        By Dr. Angela Yu, Developer and Lead Instructor and 1 other
                                    </p>
                                    <div className="flex md:flex-row flex-col md:items-center mt-2">
                                   <span>

                                        <span className="bg-yellow-400 text-white text-xs font-bold px-2 py-1 rounded">
                                            Bestseller
                                        </span>
                                        <span className="ml-2 text-yellow-600 font-bold">
                                            4.7
                                        </span>
                                   </span>
                                        <span className=" text-gray-600">
                                            (300,947 ratings)
                                        </span>
                                    </div>
                                    <div className="text-sm text-gray-600 mt-1">
                                        <span>{Course && Course.trainingDuration}</span>
                                        <span className="ml-2">{Course && Course.modules.length} Modules</span>
                                        <span className="ml-2">• All Levels</span>
                                    </div>
                                    {/* <div className="flex items-center mt-4">
                                        <button className="text-purple-600 mr-4">
                                            Remove
                                        </button>
                                        <button className="text-purple-600 mr-4">
                                            Save for Later
                                        </button>
                                        <button className="text-purple-600">
                                            Move to Wishlist
                                        </button>
                                    </div> */}
                                </div>
                                <div className="text-right">
                                    <span className="text-xl font-bold">₹{Course && Course.price}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-full md:w-[30%] max-w-[400px] bg-gray-100 p-4 rounded-lg shadow-md mt-6 md:mt-0">
                        <h3 className="text-xl font-bold mb-2">Summary</h3>

                        <div className="flex justify-between">
                            <p className="mb-2">Original Price:</p>
                            <span className="font-semibold">₹3,099</span>
                        </div>

                        <div className="flex justify-between border-b-2 pb-2 mb-2">
                            <p className="mb-2">Discounts:</p>
                            <span className="font-semibold">-₹{Course && (3099 - Course.price)}</span>
                        </div>

                        <div className="flex justify-between border-b-2 pb-2 mb-2">
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
                </div>
            ) : null}
        </>
    )
}

export default Checkout
