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
        <div className="w-1/4 p-4 bg-gray-100 border-r">
            <h2 className="text-lg font-semibold mb-4">Course Sections</h2>
            <ul>
                {sections.map((section) => (
                    <li key={section.sectionId} className="mb-2">
                        <button
                            onClick={() => onSectionSelect(section.sectionId)}
                            className="text-blue-600 hover:text-blue-800"
                        >
                            {section.sectionTitle}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default CourseNavigation
