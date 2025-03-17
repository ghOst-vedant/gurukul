"use client"

import course_img from "@/assets/images/course_img.png"
import { FaStar } from "react-icons/fa"
import { useEffect, useState } from "react"
import { getCourseDetails, getSignedInUser } from "@/actions/getActions"
type CourseCardProps = {
    course_id: string
}
export function CourseCard({ course_id }: CourseCardProps) {
    const [course, setCourse] = useState<any>()
    const [teacher, setTeacher] = useState<any>()
    useEffect(() => {
        const fetchCourse = async () => {
            const course = await getCourseDetails(course_id)
            setCourse(course)
        }
        const getTeacher = async () => {
            const teacher = await getSignedInUser(course?.teacher_id)
            setTeacher(teacher)
        }
        getTeacher()
        fetchCourse()
    }, [course_id])

    return (
        <div className="min-w-[75vw] sm:min-w-[40%] sm:max-w-[40%] lg:min-w-[20vw] lg:max-w-[20vw] p-2 border-2 rounded-2xl relative overflow-hidden flex flex-col gap-1 cursor-pointer custom-shadow z-0 max-h-72">
            <span className="absolute right-0 top-0 bg-yellow flex items-center justify-center gap-2 px-2 py-[6px] rounded-bl-xl">
                {course?.rating ? course?.rating : 0}
                <FaStar />
            </span>
            <img
                src={course?.courseImage || course_img}
                alt="Course Image"
                className="h-40 object-cover rounded-[10px]"
            />
            <h3 className="text-md font-medium text-wrap">
                {course?.title?.length > 30
                    ? `${course.title.substring(0, 30)}...`
                    : course?.title}
            </h3>
            <p className="font-semibold text-black/60">by {teacher?.name}</p>
            <p className="text-2xl font-semibold">₹{course?.price}</p>
        </div>
    )
}
