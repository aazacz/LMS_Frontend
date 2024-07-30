import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';

const PaymentSuccess = () => {
    return (
        <div className="flex items-center justify-center h-[calc(100vh-50px)] bg-gray-100">
            <div className="bg-white p-10 rounded-lg shadow-lg text-center">
                <div className="flex justify-center mb-4">
                    <FaCheckCircle className="text-green-500 animate__animated animate__flip " size={64} />
                </div>
                <h2 className="text-2xl font-bold mb-2">Payment Successful!</h2>
                <p className="text-gray-600">Thank you for your purchase. Your payment has been processed successfully.</p>
                <button
                    onClick={() => window.location.href = '/'}
                    className="mt-4 bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
                >
                    Go to Homepage
                </button>
            </div>
        </div>
    );
}

export default PaymentSuccess;
