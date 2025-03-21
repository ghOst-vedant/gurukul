// ui/CourseNavigation.tsx
"use client"

import React, { useState } from "react"
import { useParams } from "next/navigation"
import { FaChevronDown, FaChevronUp } from "react-icons/fa6"

// interface CourseSection {
//     sectionId: string
//     sectionTitle: string
//     sectionContent: string
// }

interface CourseNavigationProps {
    sections: any[]
    onSectionSelect: (sectionId: string) => void
}

const CourseNavigation: React.FC<CourseNavigationProps> = ({
    sections,
    onSectionSelect,
}) => {
    const [expandedSection, setExpandedSection] = useState<string | null>(null)

    return (
        <div className="p-4 w-full">
            <h2 className="text-lg font-bold mb-4 border-b-2 border-blue">
                Course Sections
            </h2>
            <ul>
                {sections.map((section) => (
                    <li key={section.sectionId} className="mb-2">
                        <button
                            className="w-full flex justify-between items-center text-left font-medium py-2 px-3 bg-gray-200  rounded-lg hover:bg-gray-300 transition"
                            onClick={() =>
                                setExpandedSection(
                                    expandedSection === section?.sectionId
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
                                {section?.sectionContent?.map((item: any) => (
                                    <div
                                        key={item?.id}
                                        onClick={() =>
                                            onSectionSelect(section?.sectionId)
                                        }
                                        className="flex cursor-pointer items-center gap-2 py-1"
                                    >
                                        {item?.type === "lecture" && (
                                            <>
                                                <span className="text-sm font-medium">
                                                    📖 Lecture:
                                                </span>
                                                <span className="text-gray-700">
                                                    {item?.data.lectureTitle}
                                                </span>
                                            </>
                                        )}
                                        {item.type === "test" && (
                                            <>
                                                <span className="text-sm font-medium">
                                                    📝 Test:
                                                </span>
                                                <span className="text-gray-700">
                                                    {item?.data.title}
                                                </span>
                                            </>
                                        )}
                                        {item?.type === "assignment" && (
                                            <>
                                                <span className="text-sm font-medium">
                                                    📌 Assignment
                                                </span>
                                            </>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                        {/* {index < sections.length - 1 ? (
                            <hr className="border-gray-800" />
                        ) : null} */}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default CourseNavigation
