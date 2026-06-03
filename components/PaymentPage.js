"use client"
import React, { useEffect, useState } from 'react'
import Script from 'next/script'
import { useSession } from 'next-auth/react'
import { fetchuser, fetchpayments, initiate } from '@/actions/useractions'
import { useSearchParams } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify';
import { useRouter } from 'next/navigation'
import { notFound } from "next/navigation"

const PaymentPage = ({ username }) => {
    // const { data: session } = useSession()

    const [paymentform, setPaymentform] = useState({ name: "", message: "", amount: "" })
    const [currentUser, setcurrentUser] = useState({})
    const [payments, setPayments] = useState([])
    const searchParams = useSearchParams()
    const router = useRouter()

    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        if (searchParams.get("paymentdone") == "true") {
            toast('Thanks for your donation!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        }
        router.push(`/${username}`)

    }, [])


    const handleChange = (e) => {
        setPaymentform({ ...paymentform, [e.target.name]: e.target.value })
    }

    const getData = async () => {
        let u = await fetchuser(username)
        setcurrentUser(u)
        let dbpayments = await fetchpayments(username)
        setPayments(dbpayments)
    }


    const pay = async (amount) => {
        // Get the order Id 
        let a = await initiate(amount, username, paymentform)
        let orderId = a.id
        var options = {
            "key": currentUser.razorpayid, // Enter the Key ID generated from the Dashboard
            "amount": amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": "INR",
            "name": "Get Me A Chai", //your business name
            "description": "Test Transaction",
            "image": "https://example.com/your_logo",
            "order_id": orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "callback_url": `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
            "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
                "name": "Gaurav Kumar", //your customer's name
                "email": "gaurav.kumar@example.com",
                "contact": "9000090000" //Provide the customer's phone number for better conversion rates 
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        }

        var rzp1 = new Razorpay(options);
        rzp1.open();
    }


    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light" />
            {/* Same as */}
            <ToastContainer />
            <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>


            <div className='cover w-full bg-red-50 relative'>
                <img className='object-cover w-full h-48 md:h-[350px] shadow-blue-700 shadow-sm' src={currentUser.coverpic} alt="" />
                <div className='absolute -bottom-20 right-[33%] md:right-[46%] border-white overflow-hidden border-2 rounded-full size-36'>
                    <img className='rounded-full object-cover size-36' width={128} height={128} src={currentUser.profilepic} alt="" />
                </div>
            </div>
            <div className="info flex justify-center items-center my-24 mb-32 flex-col gap-2">
                <div className='font-bold text-lg'>

                    @{username}
                </div>
                <div className='text-slate-400'>
                    {currentUser.bio || `Let's help ${username} get a chai!`}
                </div>
                <div className='text-slate-400'>
                    {payments.length} Payments .   ₹{payments.reduce((a, b) => a + b.amount, 0)} raised
                </div>
                <div className="w-[80%] md:w-[50%] mt-4">
                    <div className="flex justify-between text-sm text-slate-400 mb-1">
                        <span>
                            ₹{payments.reduce((a, b) => a + b.amount, 0)}
                        </span>
                        <span>
                            ₹{currentUser.goal || 50000}
                        </span>
                    </div>

                    <div className="w-full bg-slate-700 rounded-full h-4">
                        <div
                            className="bg-green-500 h-4 rounded-full"
                            style={{
                                width: `${Math.min(
                                    (payments.reduce((a, b) => a + b.amount, 0) /
                                        (currentUser.goal || 50000)) * 100,
                                    100
                                )}%`
                            }}
                        />
                    </div>
                </div>
                <div className="payment flex gap-3 w-[80%] mt-11 flex-col md:flex-row">
                    <div className="supporters w-full md:w-1/2 bg-slate-900/70 backdrop-blur-md border border-slate-800 rounded-2xl text-white p-6">

                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold">
                                🏆 Top Supporters
                            </h2>

                            <span className="text-sm text-slate-400">
                                {payments.length} supporters
                            </span>
                        </div>

                        <ul className="space-y-4">

                            {payments.length === 0 && (
                                <div className="text-center text-slate-400 py-8">
                                    No supporters yet. Be the first one 🚀
                                </div>
                            )}

                            {payments
                                .sort((a, b) => b.amount - a.amount)
                                .slice(0, 10)
                                .map((p, i) => (
                                    <li
                                        key={i}
                                        className="flex items-center gap-4 bg-slate-800/50 rounded-xl p-3 hover:bg-slate-800 transition"
                                    >

                                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center font-bold">
                                            {p.name?.charAt(0).toUpperCase()}
                                        </div>

                                        <div className="flex-1">
                                            <div className="font-semibold">
                                                {p.name}
                                            </div>

                                            <div className="text-sm text-slate-400">
                                                {p.message || "Supported the creator"}
                                            </div>
                                        </div>

                                        <div className="font-bold text-green-400">
                                            ₹{p.amount}
                                        </div>

                                    </li>
                                ))}
                        </ul>
                    </div>

                    <div className="makePayment w-full md:w-1/2 bg-slate-900 rounded-lg text-white px-2 md:p-10">
                        <h2 className='text-2xl font-bold my-5'>Make a Payment</h2>
                        <div className='flex gap-2 flex-col'>
                            {/* input for name and message   */}
                            <div>

                                <input onChange={handleChange} value={paymentform.name} name='name' type="text" className='w-full p-3 rounded-lg bg-slate-800' placeholder='Enter Name' />
                            </div>
                            <input onChange={handleChange} value={paymentform.message} name='message' type="text" className='w-full p-3 rounded-lg bg-slate-800' placeholder='Enter Message' />


                            <input onChange={handleChange} value={paymentform.amount} name="amount" type="text" className='w-full p-3 rounded-lg bg-slate-800' placeholder='Enter Amount' />


                            <button onClick={() => pay(Number.parseInt(paymentform.amount) * 100)} type="button" className="text-white bg-gradient-to-br from-purple-900 to-blue-900 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 disabled:bg-slate-600 disabled:from-purple-100" disabled={paymentform.name?.length < 3 || paymentform.message?.length < 4 || paymentform.amount?.length < 1}>Pay</button>

                        </div>
                        {/* Or choose from these amounts  */}
                        <div className='grid grid-cols-2 md:grid-cols-4 gap-3 mt-6'>

                            <button
                                className='bg-slate-800 hover:bg-slate-700 transition-all p-3 rounded-xl font-semibold'
                                onClick={() => pay(5000)}
                            >
                                ☕ ₹50
                            </button>

                            <button
                                className='bg-slate-800 hover:bg-slate-700 transition-all p-3 rounded-xl font-semibold'
                                onClick={() => pay(10000)}
                            >
                                ☕☕ ₹100
                            </button>

                            <button
                                className='bg-slate-800 hover:bg-slate-700 transition-all p-3 rounded-xl font-semibold'
                                onClick={() => pay(25000)}
                            >
                                🚀 ₹250
                            </button>

                            <button
                                className='bg-gradient-to-r from-purple-600 to-blue-600 hover:scale-105 transition-all p-3 rounded-xl font-bold'
                                onClick={() => pay(50000)}
                            >
                                ⭐ ₹500
                            </button>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PaymentPage
