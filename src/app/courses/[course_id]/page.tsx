"use client"

import { useParams } from "next/navigation"
import React, { useEffect, useState } from "react"
import { useRecoilValue } from "recoil"

import {
    checkPurchased,
    purchaseCourse,
    verifyPayment,
} from "@/actions/purchase"
import { getCourseDetails } from "@/actions/getActions"
import { getComments } from "@/actions/comments"
import CourseNavigation from "@/components/ui/CourseNavigation"
import CommentSection from "@/components/ui/CommentSection"
import CommentInput from "@/components/ui/CommentInputSection"
import { userSessionAtom } from "@/recoil/Atoms/userSession"

const Page = () => {
    const { course_id } = useParams()
    const user = useRecoilValue(userSessionAtom)
    const [course, setCourse] = useState<any>(null)
    const [isPurchased, setIsPurchased] = useState<boolean | null>(null)
    const [selectedSection, setSelectedSection] = useState<string | null>(null)
    const [comments, setComments] = useState<any[]>([])
    const [razorpayLoaded, setRazorpayLoaded] = useState(false)

    useEffect(() => {
        const fetchCourseData = async () => {
            const courseData = await getCourseDetails(course_id as string)
            setCourse(courseData)
        }

        const checkPurchaseStatus = async () => {
            const purchased = await checkPurchased(course_id as string)
            setIsPurchased(purchased)
        }

        if (course_id) {
            fetchCourseData()
            checkPurchaseStatus()
        }
    }, [course_id])

    useEffect(() => {
        if (selectedSection) {
            const fetchComments = async () => {
                const fetchedComments = await getComments(selectedSection)
                setComments(fetchedComments)
            }
            fetchComments()
        }
    }, [selectedSection])

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

    const handleSectionSelect = (sectionId: string) => {
        setSelectedSection(sectionId)
    }

    const handleCommentAdded = (newComment: string) => {
        setComments((prevComments) => [
            ...prevComments,
            { user: user?.user?.name, content: newComment },
        ])
    }

    const handlePayment = async () => {
        if (!razorpayLoaded) return alert("Payment gateway not loaded yet")

        const { success, order } = await purchaseCourse(
            course_id as string,
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
                    course_id as string,
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

    const selectedSectionData = course?.sections.find(
        (section: any) => section.sectionId === selectedSection
    )
    const selectedSectionContent = selectedSectionData
        ? selectedSectionData.sectionContent
        : ""

    return (
        <div className="flex pt-28 pb-16 px-20 w-full max-h-150">
            <div className="sticky top-28 w-1/4 max-h-96 overflow-y-auto border  bg-gray-100 rounded-xl">
                <CourseNavigation
                    sections={course?.sections || []}
                    onSectionSelect={handleSectionSelect}
                />
            </div>
            <div className="w-3/4 pl-8 max-h-120 overflow-y-auto overflow-x-hidden">
                <span className="text-2xl">
                    courseId: <span className="text-xl">{course_id}</span>
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

                {selectedSectionContent ? (
                    <div className="mt-8 ">
                        <h3 className="text-xl font-semibold">
                            Section Content
                        </h3>
                        <div className="mt-4">
                            {typeof selectedSectionContent === "string" ? (
                                <p>{selectedSectionContent}</p>
                            ) : (
                                <pre className="text-wrap">
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

                {selectedSection && (
                    <>
                        <CommentSection
                            comments={comments}
                            userID={user?.user?.id as string}
                        />
                        <CommentInput
                            sectionId={selectedSection}
                            // onCommentAdded={handleCommentAdded}
                        />
                    </>
                )}
            </div>
        </div>
    )
}

export default Page
