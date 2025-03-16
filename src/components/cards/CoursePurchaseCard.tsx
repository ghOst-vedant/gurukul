"use client"

import {
    checkPurchased,
    purchaseCourse,
    verifyPayment,
} from "@/actions/purchase"
import course_img from "@/assets/images/course_img.png"
import { userSessionAtom } from "@/recoil/Atoms/userSession"
import Image from "next/image"
import { useEffect, useState } from "react"
import { FaStar } from "react-icons/fa"
import { useRecoilValue } from "recoil"
import Loader from "../ui/Loader"
type CoursePurchaseCardProps = {
    course: any
}
const CoursePurchaseCard = ({ course }: CoursePurchaseCardProps) => {
    const [razorpayLoaded, setRazorpayLoaded] = useState(false)
    const [isPurchased, setIsPurchased] = useState<boolean | null>(null)
    const user = useRecoilValue(userSessionAtom)

    //
    useEffect(() => {
        const checkPurchaseStatus = async () => {
            const purchased = await checkPurchased(course.id as string)
            setIsPurchased(purchased)
        }

        if (course?.id) {
            checkPurchaseStatus()
        }
    }, [course?.id])

    useEffect(() => {
        const loadRazorpay = () => {
            const script = document.createElement("script")
            script.src = "https://checkout.razorpay.com/v1/checkout.js"
            script.onload = () => setRazorpayLoaded(true)
            script.onerror = (error) =>
                console.error("Failed to load Razorpay script:", error)
            document.body.appendChild(script)
        }
        loadRazorpay()
    }, [])
    const handlePayment = async () => {
        if (!razorpayLoaded) return alert("Payment gateway not loaded yet")

        const { success, order } = await purchaseCourse(
            course.id as string,
            course?.price
        )
        if (!success || !order) return alert("Failed to initiate payment")

        const options = {
            key: process.env.RAZORPAY_KEY_ID,
            amount: order.amount,
            currency: "INR",
            name: course.title,
            description: "Course Purchase",
            order_id: order.id,
            handler: async (response: any) => {
                const paymentResponse = await verifyPayment(
                    order.id,
                    response.razorpay_payment_id,
                    course?.id as string,
                    user?.user?.id as string
                )
                if (paymentResponse.success) {
                    alert("Payment successful")
                    setIsPurchased(true)
                } else {
                    alert("Payment verification failed")
                }
            },
            prefill: {
                name: user?.user?.name || "User Name",
                email: user?.user?.email || "user@example.com",
                contact: "1234567890",
            },
            notes: { address: "User's address" },
            theme: { color: "#F37254" },
        }

        const rzp1 = new window.Razorpay(options)
        rzp1.open()
    }

    return (
        <div className="w-full lg:w-[24vw] bg-white shadow p-3 lg:p-4 rounded-2xl flex flex-col sm:flex-row lg:flex-col gap-3 sm:gap-5 lg:gap-3">
            {isPurchased ? (
                <>
                    <div className="flex flex-col gap-3 sm:w-[40%] lg:w-full">
                        <Image
                            src={course_img}
                            alt="Course banner"
                            className="rounded-lg"
                        />
                        <div className="flex justify-between items-center">
                            <p className="text-2xl font-semibold text-black">
                                ₹{course?.price}
                                <span className="text-lg text-black/60 line-through font-normal">
                                    ₹{course?.price + 600}
                                </span>
                            </p>
                            <span className="bg-yellow flex items-center justify-center gap-2 px-2 py-[6px] rounded-lg">
                                <p>{course?.rating}</p>
                                <FaStar />
                            </span>
                        </div>
                        <span className="bg-gray-800 text-white px-5 py-2 rounded-full text-center">
                            Purchased
                        </span>
                    </div>
                </>
            ) : (
                <div className="flex flex-col gap-3 sm:w-[40%] lg:w-full">
                    <Image
                        src={course_img}
                        alt="Course banner"
                        className="rounded-lg"
                    />
                    <div className="flex justify-between items-center">
                        <p className="text-2xl font-semibold text-black">
                            ₹{course?.price}
                            <span className="text-lg text-black/60 line-through font-normal">
                                ₹{course?.price + 600}
                            </span>
                        </p>
                        <span className="bg-yellow flex items-center justify-center gap-2 px-2 py-[6px] rounded-lg">
                            <p>{course?.rating}</p>
                            <FaStar />
                        </span>
                    </div>
                    <button
                        className="rounded-full px-5 py-2 bg-blue text-white text-lg sm:px-7 sm:py-3 lg:px-5 lg:py-2 mt-3"
                        onClick={handlePayment}
                    >
                        Purchase Course
                    </button>
                </div>
            )}
            {/* <hr className="mt-3 border-[1px] sm:border-2 lg:border-[1px] sm:h-[95%]" />
            <div className="mt-2">
                <p className="text-lg font-semibold">This course includes</p>
                <ul style={{ listStyleType: "disc" }} className="ml-4 mt-2">
                    <li>65 hours on-demand video</li>
                    <li>49 downlodable resources</li>
                    <li>Access on mobile and TV</li>
                    <li>86 articles</li>
                    <li>8 coding excercises</li>
                    <li>Certificate of completion</li>
                </ul>
            </div> */}
        </div>
    )
}

export default CoursePurchaseCard
