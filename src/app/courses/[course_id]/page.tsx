"use client"

import { useParams } from "next/navigation"
import React, { useEffect, useState } from "react"

import {
    checkPurchased,
    purchaseCourse,
    verifyPayment,
} from "@/actions/purchase"
import { getCourseDetails } from "@/actions/getActions"
import CourseNavigation from "@/components/ui/CourseNavigation"

const Page = () => {
    const { course_id } = useParams()
    const [course, setCourse] = useState<any>(null)
    const [isPurchased, setIsPurchased] = useState<boolean | null>(null)
    const [loading, setLoading] = useState(false)
    const [razorpayLoaded, setRazorpayLoaded] = useState(false)
    useEffect(() => {
        const fetchPurchaseStatus = async () => {
            const purchased = await checkPurchased(course_id as string)
            console.log("Purchased: ", purchased)
            setIsPurchased(purchased)
        }
        const fetchCourse = async () => {
            const data = await getCourseDetails(course_id as string)
            if (data) {
                setCourse(data)
            }
        }
        fetchCourse()

        if (course_id) fetchPurchaseStatus()
    }, [course_id])

    // Load Razorpay script
    useEffect(() => {
        const loadRazorpay = () => {
            const script = document.createElement("script")
            script.src = "https://checkout.razorpay.com/v1/checkout.js"
            script.onload = () => setRazorpayLoaded(true)
            script.onerror = (error) => {
                console.error("Failed to load Razorpay script:", error)
            }
            document.body.appendChild(script)
        }
        loadRazorpay()
    }, [])
    // Handle payment using Razorpay API
    const handlePayment = async () => {
        const { success, order } = await purchaseCourse(
            course_id as string,
            course.price
        )
        console.log("Succcess & Order", success, order)

        if (success && order) {
            const options = {
                key: process.env.RAZORPAY_KEY_ID,
                amount: order.amount, // Amount in paise
                currency: "INR",
                name: course.title,
                description: "Course Purchase",
                order_id: order.id,
                handler: async function (response: any) {
                    const paymentResponse = await verifyPayment(
                        order.id,
                        response.razorpay_payment_id
                    )

                    if (paymentResponse.success) {
                        alert("Payment successful")
                        setIsPurchased(true)
                    } else {
                        alert("Payment verification failed")
                        setIsPurchased(false)
                    }
                },
                prefill: {
                    name: "User Name",
                    email: "user@example.com",
                    contact: "1234567890",
                },
                notes: {
                    address: "User's address",
                },
                theme: {
                    color: "#F37254",
                },
            }
            const rzp1 = new window.Razorpay(options)
            rzp1.open()
        } else {
            alert("Failed to initiate payment")
        }
    }
    const [selectedSection, setSelectedSection] = useState<string | null>(null)
    const handleSectionSelect = (sectionId: string) => {
        setSelectedSection(sectionId)
    }

    const selectedSectionData = course?.sections.find(
        (section: any) => section.sectionId === selectedSection
    )

    const selectedSectionContent = selectedSectionData
        ? selectedSectionData.sectionContent
        : ""

    return (
        <div className="flex py-28 px-20 ">
            <CourseNavigation
                sections={course?.sections || []}
                onSectionSelect={handleSectionSelect}
            />
            <div className="w-3/4 pl-8">
                <span className="text-2xl">
                    courseId:<span className="text-xl">{course_id}</span>
                </span>
                {isPurchased === null ? (
                    <p className="mt-4 text-gray-500">
                        Checking purchase status...
                    </p>
                ) : isPurchased ? (
                    <div className="mt-4">
                        <h2 className="text-2xl font-bold">
                            Welcome to the Course! 🎉
                        </h2>
                        <p className="text-gray-600">
                            You have access to all course materials.
                        </p>
                    </div>
                ) : (
                    <div className="mt-4">
                        <h2 className="text-2xl font-bold">Course Locked 🔒</h2>
                        <p className="text-gray-600">
                            You need to purchase this course to access its
                            content.
                        </p>
                        <button
                            onClick={handlePayment}
                            className="bg-blue text-white px-4 py-2 rounded mt-2"
                        >
                            Buy Now
                        </button>
                    </div>
                )}
                {/* Render Section Content */}
                {selectedSectionContent ? (
                    <div className="mt-8">
                        <h3 className="text-xl font-semibold">
                            Section Content
                        </h3>
                        <div className="mt-4">
                            {typeof selectedSectionContent === "string" ? (
                                <p>{selectedSectionContent}</p>
                            ) : (
                                <pre>
                                    {JSON.stringify(
                                        selectedSectionContent,
                                        null,
                                        2
                                    )}
                                </pre>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="mt-8 text-gray-500">
                        Please select a section to view its content.
                    </div>
                )}
            </div>
        </div>
    )
}

export default Page
