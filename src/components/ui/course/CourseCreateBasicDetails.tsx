import React, { Dispatch, SetStateAction, useState } from "react"
import { IoCloudUploadOutline } from "react-icons/io5"
import { BasicDetails } from "@/app/addnewcourse/page"
import { computeSHA256 } from "@/lib/bcrypt"
import { getSecureUrl } from "@/actions/aws"
import { uploadFileToAWS } from "@/lib/awsUtil"
import { submitBasicDetails } from "@/actions/actions"

type CourseCreateBasicDetailsProps = {
    basicDetails: BasicDetails
    setBasicDetails: Dispatch<SetStateAction<BasicDetails>>
    setView: Dispatch<SetStateAction<string>>
}

const CourseCreateBasicDetails: React.FC<CourseCreateBasicDetailsProps> = ({
    basicDetails,
    setBasicDetails,
    setView,
}) => {
    const addTitleToBasicDetails = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBasicDetails((prev) => ({
            ...prev,
            title: e.target.value,
        }))
    }

    const addSubtitleToBasicDetails = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setBasicDetails((prev) => ({
            ...prev,
            subtitle: e.target.value,
        }))
    }

    const addDescriptionToBasicDetails = (
        e: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        setBasicDetails((prev) => ({
            ...prev,
            description: e.target.value,
        }))
    }

    const changeLanguageInBasicDetails = (
        e: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setBasicDetails((prev) => ({
            ...prev,
            language: e.target.value,
        }))
    }

    const changeDifficultyInBasicDetails = (
        e: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setBasicDetails((prev) => ({
            ...prev,
            difficulty: e.target.value,
        }))
    }

    const changeCategoryInBasicDetails = (
        e: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setBasicDetails((prev) => ({
            ...prev,
            category: e.target.value,
        }))
    }

    const [file, setFile] = useState<File | null>(null)
    const [video, setVideo] = useState<File | null>(null)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0])
        }
    }
    const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setVideo(e.target.files[0])
        }
    }
    const handleFileUpload = async () => {
        try {
            if (file) {
                const imageUrl = await uploadFileToAWS(file)
                setBasicDetails((prev) => ({
                    ...prev,
                    courseImage: imageUrl as string,
                }))
            }
            if (video) {
                const videoUrl = await uploadFileToAWS(video)
                setBasicDetails((prev) => ({
                    ...prev,
                    coursePromotionalVideo: videoUrl as string,
                }))
            }
        } catch (error) {
            console.error({ "Error Uploading files": error })
        }
    }
    const submitDetails = () => {
        try {
            setView("Curriculum")
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="w-full shadow flex flex-col h-fit rounded-lg">
            <h2 className="text-2xl font-medium p-8 border-b-2">
                Basic Details
            </h2>
            <div className="p-8 flex flex-col gap-8">
                <p>
                    Your course landing page is key to success. Make it
                    compelling, showcase your course's value, and highlight why
                    learners should enroll. A great page boosts visibility and
                    attracts learners.
                </p>
                <div className="flex flex-col gap-6">
                    <span className="flex flex-col w-full gap-2">
                        <label htmlFor="title" className="font-medium text-lg">
                            Title
                        </label>
                        <input
                            type="text"
                            name="title"
                            id="title"
                            value={basicDetails.title}
                            onChange={addTitleToBasicDetails}
                            placeholder="Eg:Full Stack Web Development Bootcamp"
                            className="border-[1px] border-black/60 rounded-lg px-4 py-3 outline-none"
                        />
                    </span>
                    <span className="flex flex-col w-full gap-2">
                        <label
                            htmlFor="subtitle"
                            className="font-medium text-lg"
                        >
                            Sub title
                        </label>
                        <input
                            type="text"
                            name="subtitle"
                            id="subtitle"
                            value={basicDetails.subtitle}
                            onChange={addSubtitleToBasicDetails}
                            placeholder="Eg:Master Frontend and Backend Development to Build Dynamic, Scalable Websites and Applications"
                            className="border-[1px] border-black/60 rounded-lg px-4 py-3 outline-none"
                        />
                    </span>
                    <span className="flex flex-col w-full gap-2">
                        <label
                            htmlFor="description"
                            className="font-medium text-lg"
                        >
                            Description
                        </label>
                        <textarea
                            name="description"
                            id="description"
                            rows={8}
                            value={basicDetails.description}
                            onChange={addDescriptionToBasicDetails}
                            placeholder="Description..."
                            className="border-[1px] border-black/60 rounded-lg px-4 py-3 outline-none"
                        />
                    </span>
                    <div className="grid grid-cols-12 gap-10">
                        <span className="flex flex-col col-span-3 gap-2">
                            <label
                                htmlFor="language"
                                className="font-medium text-lg"
                            >
                                Language
                            </label>
                            <select
                                name="language"
                                id="language"
                                className="border-[1px] border-black/60 rounded-lg px-4 py-3 outline-none"
                                value={basicDetails.language || "English"}
                                onChange={changeLanguageInBasicDetails}
                            >
                                <option value="English">English</option>
                                <option value="Hindi">Hindi</option>
                                <option value="Marathi">Marathi</option>
                            </select>
                        </span>
                        <span className="flex flex-col col-span-4 gap-2">
                            <label
                                htmlFor="difficulty"
                                className="font-medium text-lg"
                            >
                                Difficulty
                            </label>
                            <select
                                name="difficulty"
                                id="difficulty"
                                className="border-[1px] border-black/60 rounded-lg px-4 py-3 outline-none"
                                value={
                                    basicDetails.difficulty || "Beginner Level"
                                }
                                onChange={changeDifficultyInBasicDetails}
                            >
                                <option value="Begineer-level">
                                    Beginner Level
                                </option>
                                <option value="Intermediate-level">
                                    Intermediate Level
                                </option>
                                <option value="Expert-level">
                                    Expert Level
                                </option>
                                <option value="All-levels">All Levels</option>
                            </select>
                        </span>
                        <span className="flex flex-col col-span-5 gap-2">
                            <label
                                htmlFor="category"
                                className="font-medium text-lg"
                            >
                                Category
                            </label>
                            <select
                                name="category"
                                id="category"
                                className="border-[1px] border-black/60 rounded-lg px-4 py-3 outline-none"
                                value={
                                    basicDetails.category ||
                                    "Full Stack Web Development"
                                }
                                onChange={changeCategoryInBasicDetails}
                            >
                                <option value="Full Stack Web Development">
                                    Full Stack Web Development
                                </option>
                                <option value="Frontend Development">
                                    Frontend Development
                                </option>
                                <option value="Backend Development">
                                    Backend Development
                                </option>
                            </select>
                        </span>
                    </div>
                    <div className="grid grid-cols-12 gap-10">
                        <span className="flex flex-col col-span-6 gap-2">
                            <p className="font-medium text-lg">Course Image</p>
                            <label
                                htmlFor="courseImage"
                                className="font-medium text-lg bg-black/40 text-white/60 cursor-pointer rounded-lg h-40 flex flex-col gap-2 items-center justify-center"
                            >
                                <span>Course Image</span>
                                <IoCloudUploadOutline className="text-5xl" />
                            </label>
                            <input
                                type="file"
                                name="courseImage"
                                id="courseImage"
                                className="hidden"
                                onChange={handleFileChange}
                            />
                        </span>
                        <span className="flex flex-col col-span-6 gap-2">
                            <p className="font-medium text-lg">
                                Course Promotional Video
                            </p>
                            <label
                                htmlFor="courseVideo"
                                className="font-medium text-lg bg-black/40 text-white/60 cursor-pointer rounded-lg h-40 flex flex-col gap-2 items-center justify-center"
                            >
                                <span>Course Promotional Video</span>
                                <IoCloudUploadOutline className="text-5xl" />
                            </label>
                            <input
                                type="file"
                                name="courseVideo"
                                id="courseVideo"
                                className="hidden"
                                onChange={handleVideoChange}
                            />
                        </span>
                    </div>
                    <div className="flex justify-end mt-4">
                        <button
                            className="text-black hover:text-white hover:bg-blue border-2 border-blue rounded-full px-5 py-2 sm:px-4 sm:py-2 mx-auto"
                            onClick={submitDetails}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CourseCreateBasicDetails
