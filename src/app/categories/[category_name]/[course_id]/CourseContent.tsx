import CourseNavigation from "@/components/ui/CourseNavigation"
import { VideoComponent } from "@/components/ui/VideoComponent"
import React, { useState } from "react"

const CourseContent = ({ courseData, brought }: any) => {
    const [course, setCourse] = useState<any>(courseData)
    const [isPurchased, setIsPurchased] = useState<boolean | null>(brought)
    const [selectedSection, setSelectedSection] = useState<string | null>(null)
    const selectedSectionData = course?.sections.find(
        (section: any) => section.sectionId === selectedSection
    )
    const selectedSectionContent = selectedSectionData
        ? selectedSectionData.sectionContent
        : ""
    const handleSectionSelect = (sectionId: string) => {
        setSelectedSection(sectionId)
    }
    return (
        <div className="flex w-full gap-5 pt-28">
            {isPurchased && (
                <div className="w-[30%] sticky top-10 max-h-fit flex overflow-y-auto border bg-gray-100 rounded-xl">
                    <CourseNavigation
                        sections={course?.sections || []}
                        onSectionSelect={handleSectionSelect}
                    />
                </div>
            )}
            <div className="w-[70%] max-h-screen overflow-x-hidden overflow-y-auto">
                {isPurchased && selectedSectionContent ? (
                    <div className="">
                        <h3 className="text-xl font-semibold">
                            {selectedSectionData?.sectionTitle}
                        </h3>
                        <div className="mt-4">
                            {typeof selectedSectionContent === "string" ? (
                                <p>{selectedSectionContent}</p>
                            ) : selectedSectionContent[0].type.toLowerCase() ===
                              "lecture" ? (
                                <VideoComponent
                                    VideoContent={selectedSectionContent}
                                />
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
            </div>
        </div>
    )
}

export default CourseContent
