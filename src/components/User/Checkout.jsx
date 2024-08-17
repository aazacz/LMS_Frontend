import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import sat from "../../assets/Admin/sat.jpg";
import { axiosInstanceStudent } from "../../routes/UserRoutes";
import axios from "axios";

const Checkout = () => {
  const { courseType, courseId } = useParams();
  const [Course, setCourse] = useState(null);
  const navigate = useNavigate();

  const key = process.env.REACT_APP_KEY;
  const key_secret = process.env.REACT_APP_KEY_SECRET;

  useEffect(() => {
    const getCourseDetails = async () => {
      if (courseId && courseType) {
        if (courseType === "individual") {
          const response = await axiosInstanceStudent.get(
            `api/structure/get/${courseId}`,
          );
          console.log("individual response.data");
          console.log(response.data);
          setCourse(response.data);
        } else {
          const response = await axiosInstanceStudent.get(
            `api/course/get-course/${courseId}`,
          );
          console.log("group response.data");
          console.log(response.data);
          setCourse(response.data);
        }
      }
    };
    getCourseDetails();
  }, [courseId, courseType]);

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  useEffect(() => {
    const loadRazorpayScript = async () => {
      const result = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js",
      );
      if (!result) {
        console.error("Failed to load Razorpay script");
      }
    };

    loadRazorpayScript();

    return () => {
      const script = document.querySelector(
        'script[src="https://checkout.razorpay.com/v1/checkout.js"]',
      );
      if (script) {
        script.remove();
      }
    };
  }, []);

  const handlePayment = () => {
    const options = {
      key: key,
      key_secret: key_secret,
      amount: Course.price * 100,
      currency: "INR",
      name: "MindSAT",
      description: "MindSAT Payment",
      handler: async function (response) {
        let responseData = {
          courseStructureId: courseId,
          paymentId: response.razorpay_payment_id,
          amount: Course.price,
        };
        console.log(responseData);
        console.log(courseType);
        console.log("courseType");
        try {
          let apiResponse;
          if (courseType === "individual") {
            apiResponse = await axiosInstanceStudent.post(
              "api/student-course/enroll-individual-course",
              responseData,
            );

            console.log("individual course bought");
            navigate("/student/success");
          } else if (courseType === "group") {
            responseData.courseId = courseId;
            apiResponse = await axiosInstanceStudent.post(
              "api/student-course/enroll-group-course",
              responseData,
            );
            console.log("group course bought");
            navigate("/student/success");
          }
        } catch (error) {
          console.error("Payment or enrollment failed:", error);
        }
      },
    };
    const pay = new window.Razorpay(options);
    pay.open();
  };

  return (
    <>
      {courseId && courseType ? (
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
                    <span className=" text-gray-600">(300,947 ratings)</span>
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    <span>{Course && Course.trainingDuration}</span>
                    <span className="ml-2">
                      {Course && Course.modules.length} Modules
                    </span>
                    <span className="ml-2">• All Levels</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xl font-bold">
                    ₹{Course && Course.price}
                  </span>
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
              <span className="font-semibold">
                -₹{Course && 3099 - Course.price}
              </span>
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
  );
};

export default Checkout;
