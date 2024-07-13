import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Checkout = () => {
    const [state, setState] = useState('')
    const [states, setStates] = useState([])

    const handleStateChange = (e) => setState(e.target.value)

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
                setStates(response.data)
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
            amount: 449 * 100,
            currency: 'INR',
            name: 'MindSAT',
            description: 'MindDAT Payment',
            handler: async function (response) {},
        }
        var pay = new window.Razorpay(options)
        pay.open()
    }

    return (
        <div className="max-w-[1200px] h-screen w-screen flex mx-auto p-6 bg-white rounded gap-x-20 shadow-md">
            <div className="w-[70%] max-w-[700px]">
                <h2 className="text-2xl font-bold mb-6">Checkout</h2>

                <h1></h1>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                        Country
                    </label>
                    <select
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        disabled
                    >
                        <option>India</option>
                    </select>
                </div>
                <div className="mb-6">
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
                </div>
                <div className="mb-6">
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
                </div>
            </div>

            <div className="w-[30%] max-w-[400px] bg-gray-100 p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-2">Summary</h3>

                <div className="flex justify-between">
                    <p className="mb-2">Original Price:</p>{' '}
                    <span className="font-semibold">₹3,099</span>
                </div>

                <div className="flex justify-between border-b-2">
                    <p className="mb-2">Discounts:</p>
                    <span className="font-semibold">-₹2,650</span>
                </div>

                <div className="flex justify-between border-b-2">
                    <p className="mb-2">Discounts:</p>
                    <span className="font-semibold">-₹2,650</span>
                </div>

                <div className="flex justify-between border-b-2">
                    <p className="mb-2 text-xl font-bold">Total: </p>
                    <span className="text-indigo-600 mb-2 text-xl font-bold">
                        ₹449
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
    )
}

export default Checkout
