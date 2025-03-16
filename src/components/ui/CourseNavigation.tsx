// ui/CourseNavigation.tsx
"use client"

import React from "react"
import { useParams } from "next/navigation"

interface CourseSection {
    sectionId: string
    sectionTitle: string
    sectionContent: string
}

interface CourseNavigationProps {
    sections: CourseSection[]
    onSectionSelect: (sectionId: string) => void
}

const CourseNavigation: React.FC<CourseNavigationProps> = ({
    sections,
    onSectionSelect,
}) => {
    const { course_id } = useParams()

    return (
        <div className="p-4 w-full">
            <h2 className="text-lg font-bold mb-4 border-b-2 border-blue">
                Course Sections
            </h2>
            <ul>
                {sections.map((section, index) => (
                    <li key={section.sectionId} className="mb-2">
                        <button
                            onClick={() => onSectionSelect(section.sectionId)}
                            className="text-blue-600 hover:text-gray-500  font-semibold"
                        >
                            {section.sectionTitle}
                        </button>
                        {index < sections.length - 1 ? (
                            <hr className="border-gray-800" />
                        ) : null}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default CourseNavigation
