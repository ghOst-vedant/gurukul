"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { FaChevronDown, FaChevronUp } from "react-icons/fa"
import Loader from "@/components/ui/Loader"
import { getCourseDetails } from "@/actions/getActions"

export function CourseContent({ id }: any) {
    const [expandedSection, setExpandedSection] = useState<string | null>(null)
    const [course, setCourse] = useState<any>()
    useEffect(() => {
        const fetchCourse = async () => {
            const course = await getCourseDetails(id)
            setCourse(course)
        }
        fetchCourse()
    }, [id])
    if (!course) {
        return <Loader />
    }
    return (
        <div className="border rounded-lg shadow-md p-4 w-full max-w-3xl">
            <div>
                {/* Sections */}
                <div>
                    <h3 className="text-lg font-semibold">Course Sections</h3>
                    <div className="mt-2">
                        {course?.sections.map((section: any) => (
                            <div key={section?.sectionId} className=" py-2">
                                <button
                                    className="w-full flex justify-between items-center text-left font-medium py-2 px-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
                                    onClick={() =>
                                        setExpandedSection(
                                            expandedSection ===
                                                section?.sectionId
                                                ? null
                                                : section?.sectionId
                                        )
                                    }
                                >
                                    {section?.sectionTitle}
                                    {expandedSection === section?.sectionId ? (
                                        <FaChevronUp />
                                    ) : (
                                        <FaChevronDown />
                                    )}
                                </button>

                                {expandedSection === section?.sectionId && (
                                    <div className="mt-2 px-4">
                                        {section?.sectionContent?.map(
                                            (item: any) => (
                                                <div
                                                    key={item?.id}
                                                    className="flex items-center gap-2 py-1"
                                                >
                                                    {item?.type ===
                                                        "lecture" && (
                                                        <>
                                                            <span className="text-sm font-medium">
                                                                📖 Lecture:
                                                            </span>
                                                            <span className="text-gray-700">
                                                                {
                                                                    item?.data
                                                                        .lectureTitle
                                                                }
                                                            </span>
                                                        </>
                                                    )}
                                                    {item.type === "test" && (
                                                        <>
                                                            <span className="text-sm font-medium">
                                                                📝 Test:
                                                            </span>
                                                            <span className="text-gray-700">
                                                                {
                                                                    item?.data
                                                                        .title
                                                                }
                                                            </span>
                                                        </>
                                                    )}
                                                    {item?.type ===
                                                        "assignment" && (
                                                        <>
                                                            <span className="text-sm font-medium">
                                                                📌 Assignment
                                                            </span>
                                                        </>
                                                    )}
                                                </div>
                                            )
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
