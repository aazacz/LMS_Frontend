import React from 'react'
import { FaTrashAlt } from 'react-icons/fa'
import sat from '../../assets/Student/sat.jpg'
import { Link } from 'react-router-dom'
const ShoppingCart = () => {
    return (
        <div className="mx-auto w-screen max-w-[1200px]   p-4 h-[88vh]">
            <h1 className="text-3xl py font-bold mb-4">Shopping Cart</h1>
            <div className="flex justify-between items-start gap-x-8">
                {/* Left side - Course details */}
                <div className="w-3/4">
                    <div className="flex items-center bg-white p-4 rounded-lg shadow-md">
                        <img
                            src={sat}
                            alt="Course"
                            className="w-24 h-24 object-cover rounded-md mr-4"
                        />
                        <div className="flex-grow ">
                            <h2 className="text-xl font-bold">
                                introduction to SAT & DSAT
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
                                <span>58.5 total hours</span>
                                <span className="ml-2">• 636 lectures</span>
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
                            <span className="text-xl font-bold">₹449</span>
                            <span className="text-sm line-through text-gray-500 block">
                                ₹3,099
                            </span>
                            <span className="text-sm text-green-500">
                                86% off
                            </span>
                        </div>
                    </div>
                </div>

                {/* Right side - Total and Checkout */}
                <div className="w-1/4 bg-gray-100 p-4 rounded-lg shadow-md ">
                    <div className="text-right">
                        <h2 className="text-xl font-bold">Total: ₹449</h2>
                        <p className="text-sm text-gray-600">₹3,099</p>
                        <p className="text-sm text-green-500">86% off</p>
                        <Link to={'/student/cart/checkout'}>
                            <button className="mt-4 w-full bg-purple-600 text-white py-2 rounded-md">
                                Checkout
                            </button>
                        </Link>
                    </div>
                    <div className="mt-4">
                        <h3 className="text-sm font-bold">Promotions</h3>
                        <div className="flex items-center mt-2">
                            <span className="bg-gray-200 text-gray-600 text-xs font-bold px-2 py-1 rounded mr-2">
                                ST21MT61124
                            </span>
                            <button className="text-gray-500 hover:text-gray-700">
                                <FaTrashAlt />
                            </button>
                        </div>
                        <input
                            type="text"
                            placeholder="Enter Coupon"
                            className="mt-2 w-full p-2 border border-gray-300 rounded-md"
                        />
                        <button className="mt-2 w-full bg-gray-200 text-gray-600 py-2 rounded-md">
                            Apply
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShoppingCart
