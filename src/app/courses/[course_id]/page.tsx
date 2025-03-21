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
import Link from "next/link"
import { UserAtom } from "@/recoil/Atoms/UserAtom"
import {
    checkTest,
    submitAnswers,
    submitAssignment,
} from "@/actions/assessment"
import toast from "react-hot-toast"
import { uploadFileToAWS } from "@/lib/awsUtil"
import { IoCloudUploadOutline } from "react-icons/io5"

const Page = () => {
    const { course_id } = useParams()
    const user = useRecoilValue(UserAtom)
    const [isTestSubmitted, setIsTestSubmitted] = useState(false)
    const [course, setCourse] = useState<any>(null)
    const [isPurchased, setIsPurchased] = useState<boolean | null>(null)
    const [selectedSection, setSelectedSection] = useState<string | null>(null)
    const [comments, setComments] = useState<any[]>([])
    const [selectedAnswers, setSelectedAnswers] = useState<{
        [key: string]: number | null
    }>({})
    const [descriptiveAnswers, setDescriptiveAnswers] = useState<
        { questionId: string; question: string; userAnswer: string }[]
    >([])
    const [descriptiveResult, setDescriptiveResult] = useState<{
        model_answer: string
        question: string
        result: number
        similarity_score: number
        user_answer: string
    }>({
        model_answer: "",
        question: "",
        result: 0,
        similarity_score: 0,
        user_answer: "",
    })

    const handleAnswerChange = (questionId: string, optionIndex: number) => {
        setSelectedAnswers((prevState) => ({
            ...prevState,
            [questionId]: optionIndex, // Store index instead of string
        }))
    }

    const handleDescriptiveChange = (
        questionId: string,
        question: string,
        userAnswer: string
    ) => {
        setDescriptiveAnswers((prevAnswers) => {
            const updatedAnswers = prevAnswers.filter(
                (ans) => ans.questionId !== questionId
            )
            return [
                ...updatedAnswers,
                { questionId, question, userAnswer: userAnswer },
            ]
        })
    }

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

    const handleSectionSelect = (sectionId: string) => {
        setSelectedSection(sectionId)
    }

    const selectedSectionData = course?.sections.find(
        (section: any) => section.sectionId === selectedSection
    )
    const selectedSectionContent = selectedSectionData
        ? selectedSectionData.sectionContent
        : ""

    // handle mcq test posting
    const handleSubmit = async () => {
        if (!selectedSection || !course || !user?.id) {
            console.error("Missing required data for submission.")
            return
        }

        const selectedSectionData = course.sections.find(
            (section: any) => section.sectionId === selectedSection
        )

        if (!selectedSectionData) {
            console.error("Selected section not found in the course.")
            return
        }

        const questions =
            selectedSectionData?.sectionContent[0]?.data?.questions
        if (!questions) {
            console.error("No questions found in the selected section.")
            return
        }

        const results = Object.entries(selectedAnswers)
            .map(([questionId, selectedIndex]) => {
                const question = questions.find(
                    (q: any) => q.questionId === questionId
                )
                if (!question) {
                    console.warn(`Question with ID ${questionId} not found.`)
                    return null
                }

                const correctIndex = question?.question.correctAnswer
                const isCorrect = correctIndex === selectedIndex

                return {
                    studentId: user.id,
                    sectionId: selectedSection,
                    questionId,
                    answer:
                        selectedIndex !== null ? selectedIndex.toString() : "",
                    marks: isCorrect ? 1 : 0, // 1 for correct, 0 for incorrect
                }
            })
            .filter(Boolean)

        const response = await fetch(
            "http://127.0.0.1:8000/evaluate_question_answer",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    question: descriptiveAnswers[0].question,
                    user_answer: descriptiveAnswers[0].userAnswer,
                }),
            }
        )

        if (response.ok) {
            const data = await response.json()
            setDescriptiveResult(data)
        }

        if (results.length > 0) {
            try {
                await submitAnswers(results)
                setIsTestSubmitted(true)
                toast.success("Submission successful!")
            } catch (error) {
                console.error("Error submitting answers:", error)
            }
        } else {
            console.warn("No valid results to submit.")
        }
    }

    const [answers, setAnswers] = useState<any>([])
    useEffect(() => {
        const check = async () => {
            const answers = await checkTest(selectedSection as string, user?.id)
            setAnswers(answers)
            if (answers.length > 0) {
                setIsTestSubmitted(true)
                toast.success("Test already submitted!")
            }
        }
        if (selectedSection) {
            check()
        }
    }, [selectedSection])
    const [assignmentUrl, setAssignmentUrl] = useState<String | null>("")
    console.log(selectedSection)

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0]
            try {
                console.log(selectedFile)
                const assignment = await uploadFileToAWS(selectedFile)
                if (assignment) {
                    setAssignmentUrl(assignment)
                    await submitAssignment(
                        user.id as string,
                        course_id as string,
                        selectedSection as string,
                        assignment
                    )
                    toast.success("Assignment uploaded successfully!")
                }
            } catch (error) {
                console.error("Error uploading the image:", error)
            }
        }
    }

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
                    <div className="mt-4 flex flex-col gap-4">
                        <h2 className="text-2xl font-bold">Course Locked 🔒</h2>
                        <p className="text-gray-600">
                            You need to purchase this course to access its
                            content.
                        </p>
                        <Link
                            href={`/categories/${course?.category
                                .split(" ")
                                .join("-")
                                .toLowerCase()}/${course?.id}`}
                            className="bg-blue w-fit text-white  px-4 py-2 rounded "
                        >
                            Buy Now
                        </Link>
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
                                    {selectedSectionContent[0]?.data?.questions?.map(
                                        (question: any, index: number) => (
                                            <div key={question?.questionId}>
                                                {question?.questionType ===
                                                    "mcq" && (
                                                    <div className="flex flex-col gap-2">
                                                        <p className="text-lg font-semibold">
                                                            {index + 1} :{" "}
                                                            {
                                                                question
                                                                    ?.question
                                                                    .title
                                                            }
                                                        </p>
                                                        <ul className="flex flex-col gap-2">
                                                            {question?.question?.options.map(
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
                                                                            checked={
                                                                                isTestSubmitted
                                                                                    ? question
                                                                                          ?.question
                                                                                          .correctAnswer ===
                                                                                      index
                                                                                    : selectedAnswers[
                                                                                          question
                                                                                              .questionId
                                                                                      ] ===
                                                                                      index
                                                                            }
                                                                            onChange={() =>
                                                                                handleAnswerChange(
                                                                                    question.questionId,
                                                                                    index
                                                                                )
                                                                            }
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
                                                        {isTestSubmitted && (
                                                            <p className="text-sm">
                                                                {
                                                                    // Find the answer from the answers array
                                                                    answers.find(
                                                                        (
                                                                            ans: any
                                                                        ) =>
                                                                            ans.questionId ===
                                                                            question.questionId
                                                                    )?.marks ===
                                                                    1
                                                                        ? "Your Answer: Correct"
                                                                        : "Your Answer: Incorrect"
                                                                }
                                                            </p>
                                                        )}
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
                                                            onChange={(e) =>
                                                                handleDescriptiveChange(
                                                                    question.questionId,
                                                                    question
                                                                        .question
                                                                        .title,
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                        />
                                                        {isTestSubmitted && (
                                                            <p className="text-sm">
                                                                {descriptiveResult?.similarity_score <
                                                                0.4
                                                                    ? "Your Answer: Incorrect"
                                                                    : descriptiveResult?.similarity_score <
                                                                        0.7
                                                                      ? "Your Answer: Partially Correct"
                                                                      : "Your Answer: Correct"}
                                                            </p>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        )
                                    )}
                                    {/* <pre>{JSON.stringify(selectedSectionContent, null, 2)}</pre> */}
                                    {isTestSubmitted ? (
                                        <button className="my-4 bg-gray-500 text-white w-fit py-2 px-6 rounded-lg">
                                            Test submitted
                                        </button>
                                    ) : (
                                        <button
                                            onClick={handleSubmit}
                                            className="my-4 bg-yellow text-black w-fit py-2 px-6 rounded"
                                        >
                                            Submit test
                                        </button>
                                    )}
                                </div>
                            ) : (
                                <div className="flex flex-col gap-6">
                                    <h2 className="text-2xl font-semibold">
                                        {selectedSectionData?.sectionTitle}
                                        {" -> "}
                                        {
                                            selectedSectionContent[0].data
                                                .assignmentTitle
                                        }
                                    </h2>
                                    <div className="flex flex-col gap-4">
                                        <p
                                            className="text-lg font-semibold"
                                            dangerouslySetInnerHTML={{
                                                __html: selectedSectionContent[0]
                                                    .data.content,
                                            }}
                                        />
                                        {/* <textarea
                                            name="answer"
                                            placeholder="Write your answer here"
                                            cols={3}
                                            className="border-[1px] border-black/60 rounded-lg px-4 py-3 outline-none"
                                        /> */}
                                    </div>
                                    <label
                                        htmlFor="courseImage"
                                        className="font-medium text-lg bg-white text-blue cursor-pointer rounded-lg h-40 flex  gap-2 items-center justify-center border-black border"
                                    >
                                        <span>
                                            Upload Your Assignment here.
                                        </span>
                                        <IoCloudUploadOutline className="text-5xl" />
                                    </label>
                                    <input
                                        type="file"
                                        name="courseImage"
                                        id="courseImage"
                                        className="hidden"
                                        onChange={handleFileChange}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    isPurchased && (
                        <div className="mt-8 text-gray-500">
                            Please select a section to view its content.
                        </div>
                    )
                )}

                {isPurchased && selectedSection && (
                    <>
                        <CommentSection
                            comments={comments}
                            userID={user?.id as string}
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
