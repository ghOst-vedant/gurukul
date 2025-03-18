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
import { VideoComponent } from "@/components/ui/VideoComponent"
import { Test } from "@/app/addnewcourse/page"

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
            {isPurchased && (
                <div className="sticky top-28 w-1/4 h-fit overflow-y-auto border  bg-gray-100 rounded-xl">
                    <CourseNavigation
                        sections={course?.sections || []}
                        onSectionSelect={handleSectionSelect}
                    />
                </div>
            )}
            <div className="w-3/4 pl-8 max-h-120 overflow-y-auto overflow-x-hidden">
                {isPurchased === null ? (
                    <p className="mt-4 text-gray-500">
                        Checking purchase status...
                    </p>
                ) : isPurchased && selectedSection === null ? (
                    <div className="mt-4">
                        <h2 className="text-2xl font-bold">
                            Welcome to the {course.title}🎉
                        </h2>
                        <p className="text-gray-600">{course.description}</p>
                    </div>
                ) : selectedSection === null ? (
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
                ) : null}

                {isPurchased && selectedSectionContent ? (
                    <div className="">
                        <div className="">
                            {typeof selectedSectionContent === "string" ? (
                                <p>{selectedSectionContent}</p>
                            ) : selectedSectionContent[0].type.toLowerCase() ===
                              "lecture" ? (
                                <div className="flex flex-col gap-6">
                                    <h2 className="text-2xl font-semibold">
                                        {selectedSectionData?.sectionTitle}
                                        {" > "}
                                        {
                                            selectedSectionContent[0].data
                                                .lectureTitle
                                        }
                                    </h2>
                                    {/* <pre>{JSON.stringify(selectedSectionContent, null, 2)}</pre> */}
                                    <VideoComponent
                                        VideoContent={selectedSectionContent}
                                    />
                                </div>
                            ) : selectedSectionContent[0].type.toLowerCase() ===
                              "test" ? (
                                <div className="flex flex-col gap-6">
                                    <h2 className="text-2xl font-semibold">
                                        {selectedSectionData?.sectionTitle}
                                        {" > "}
                                        {selectedSectionContent[0].data.title}
                                    </h2>
                                    {selectedSectionContent[0].data.questions.map(
                                        (question: any, index: number) => (
                                            <div key={question.questionId}>
                                                {question.questionType ===
                                                    "mcq" && (
                                                    <div className="flex flex-col gap-2">
                                                        <p className="text-lg font-semibold">
                                                            {index + 1} :{" "}
                                                            {
                                                                question
                                                                    .question
                                                                    .title
                                                            }
                                                        </p>
                                                        <ul className="flex flex-col gap-2">
                                                            {question.question.options.map(
                                                                (
                                                                    option: String,
                                                                    index: number
                                                                ) => (
                                                                    <span
                                                                        key={
                                                                            index
                                                                        }
                                                                        className="flex gap-2 items-center"
                                                                    >
                                                                        <input
                                                                            type="radio"
                                                                            name={`${question.questionId}`}
                                                                            id={`${question.questionId}${index}`}
                                                                            className="w-4 h-4"
                                                                        />
                                                                        <p>
                                                                            {
                                                                                option
                                                                            }
                                                                        </p>
                                                                    </span>
                                                                )
                                                            )}
                                                        </ul>
                                                    </div>
                                                )}
                                                {question.questionType ===
                                                    "descriptive" && (
                                                    <div className="flex flex-col gap-4">
                                                        <p className="text-lg font-semibold">
                                                            {index + 1} :{" "}
                                                            {
                                                                question
                                                                    .question
                                                                    .title
                                                            }
                                                        </p>
                                                        <textarea
                                                            name="answer"
                                                            id={
                                                                question.questionId
                                                            }
                                                            placeholder="Write your answer here"
                                                            cols={3}
                                                            className="border-[1px] border-black/60 rounded-lg px-4 py-3 outline-none"
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        )
                                    )}
                                    {/* <pre>{JSON.stringify(selectedSectionContent, null, 2)}</pre> */}
                                    <button className="my-4 bg-yellow text-black w-fit py-2 px-6 rounded">
                                        Submit test
                                    </button>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-6">
                                    <h2 className="text-2xl font-semibold">
                                        {selectedSectionData?.sectionTitle}
                                        {" > "}
                                        {
                                            selectedSectionContent[0].data
                                                .assignmentTitle
                                        }
                                    </h2>
                                    <pre>
                                        {JSON.stringify(
                                            selectedSectionContent,
                                            null,
                                            2
                                        )}
                                    </pre>
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="mt-8 text-gray-500">
                        Please select a section to view its content.
                    </div>
                )}

                {isPurchased && selectedSection && (
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
