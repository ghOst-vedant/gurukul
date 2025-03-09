"use client"
import { PublishCourse } from "@/actions/postActions"
import {
    Assignment,
    BasicDetails,
    CurriculumSection,
    Lecture,
    Pricing,
    Test,
} from "@/app/addnewcourse/page"
import Image from "next/image"
import React, { useState } from "react"
import { IoIosArrowForward } from "react-icons/io"
import { MdOutlineOndemandVideo } from "react-icons/md"
import { MdOutlineArticle } from "react-icons/md"
import { FaRegQuestionCircle } from "react-icons/fa"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"

type CourseCreatePublishProps = {
    basicDetails: BasicDetails
    curriculum: CurriculumSection[]
    pricing: Pricing
}

const CourseCreatePublishCourse: React.FC<CourseCreatePublishProps> = ({
    basicDetails,
    curriculum,
    pricing,
}) => {
    const [expandSection, setExpandSection] = useState("")

    const router = useRouter()

    const publishCourse = async () => {
        const courseCreated = await PublishCourse({
            basicDetails,
            curriculum,
            pricing,
        })
        if (courseCreated) {
            toast.success("Course Published Successfully")
            router.push("/courses")
        }
    }

    return (
        <div className="w-full shadow flex flex-col h-fit rounded-lg">
            <h2 className="text-2xl font-medium p-8 border-b-2">
                Review and Publish Course
            </h2>
            <div className="p-8 flex flex-col gap-8">
                <h2 className="text-3xl font-medium">Basic Details</h2>
                <div className="flex flex-col gap-4">
                    <h2 className="text-2xl font-medium">
                        Title : {basicDetails.title}
                    </h2>
                    <h3 className="text-xl font-normal">
                        Subtitle : {basicDetails.subtitle}
                    </h3>
                    <p className="mt-2">
                        Description : {basicDetails.description}
                    </p>
                    <p className="mt-2">Language : {basicDetails.language}</p>
                    <p className="mt-2">
                        Difficulty Level : {basicDetails.difficulty}
                    </p>
                    <p className="mt-2">Category : {basicDetails.category}</p>
                    <div className="flex gap-10">
                        <span>
                            Course Banner :
                            <img
                                src={basicDetails.courseImage!}
                                alt="Course banner"
                                className="flex flex-col col-span-6 gap-2 min-h-40 min-w-40 object-cover bg-black/50"
                            />
                        </span>
                        <span>
                            Course Promotional Video :
                            <video
                                controls
                                src={basicDetails.coursePromotionalVideo}
                                className="flex flex-col col-span-6 gap-2 min-h-40 min-w-40 object-cover bg-black/50"
                            />
                        </span>
                    </div>
                </div>
                <h2 className="text-3xl font-medium">Curriculum Details</h2>
                <div className="flex flex-col shadow w-full rounded-lg overflow-hidden">
                    {curriculum.map((section) => (
                        <div
                            className={`flex flex-col overflow-hidden transition-all transition-max-height duration-700 ${
                                expandSection === section.sectionId
                                    ? "max-h-[10000px]"
                                    : "max-h-10"
                            }`}
                            style={{ transitionProperty: "max-height" }}
                            key={section.sectionId}
                        >
                            <h3
                                className="flex gap-3 items-center font-medium p-2 border-y-[1px] border-black/20 cursor-pointer"
                                onClick={() => {
                                    setExpandSection((prev) =>
                                        prev === section.sectionId
                                            ? ""
                                            : section.sectionId
                                    )
                                }}
                            >
                                <IoIosArrowForward
                                    className={`${
                                        expandSection === section.sectionId
                                            ? "-rotate-90"
                                            : "rotate-90"
                                    }`}
                                />
                                {section.sectionTitle}
                            </h3>
                            <div className={`flex flex-col gap-2 px-8 py-4`}>
                                {section.sectionContent.map((content) => (
                                    <>
                                        {content.type === "lecture" ? (
                                            <span className="flex gap-2 items-center">
                                                <MdOutlineOndemandVideo />
                                                {
                                                    (content.data as Lecture)
                                                        .lectureTitle
                                                }
                                            </span>
                                        ) : content.type === "assignment" ? (
                                            <span className="flex gap-2 items-center">
                                                <MdOutlineArticle />
                                                {
                                                    (content.data as Assignment)
                                                        .assignmentTitle
                                                }
                                            </span>
                                        ) : (
                                            //content.type === 'test'
                                            <span className="flex gap-2 items-center">
                                                <FaRegQuestionCircle />
                                                {(content.data as Test).title}
                                            </span>
                                        )}
                                    </>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                <h2 className="text-3xl font-medium">Pricing Details</h2>
                <div className="flex flex-col gap-4">
                    <p>
                        Course is paid : {pricing.isCourseFree ? "No" : "Yes"}
                    </p>
                    <p>Course Fees : {pricing.price}</p>
                </div>
                <button
                    className="text-black hover:text-white hover:bg-blue border-2 border-blue rounded-full px-5 py-2 sm:px-4 sm:py-2 mx-auto mt-4"
                    onClick={publishCourse}
                >
                    Publish Course
                </button>
            </div>
        </div>
    )
}

export default CourseCreatePublishCourse
