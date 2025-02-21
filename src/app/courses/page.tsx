"use client"
import { getCourses, getSignedInUser } from "@/actions/getActions"
import React, { useEffect, useState } from "react"
import { fetchSession } from "@/actions/auth"
import Link from "next/link"

const page = () => {
    const [first, setfirst] = useState<any>(null)
    const [user, setUser] = useState<any>(null)
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const data = await getCourses()
                setfirst(data)
            } catch (error) {
                console.error("Failed to fetch courses:", error)
            }
        }
        const getSession = async () => {
            const session = await fetchSession()
            const data = await getSignedInUser(session?.user?.id!)
            setUser(data)
        }
        fetchCourses()
        getSession()
    }, [])

    return (
        <div className="pt-40">
            <h1 className="text-2xl font-bold text-center">
                Welcome to the course page
            </h1>
            <div className="text-center mt-5">
                <h2 className="text-xl font-bold">Courses</h2>
                <div className="grid grid-cols-3 gap-4  px-10">
                    {first?.map((course: any) => (
                        <Link
                            href={`/courses/${course.id}`}
                            key={course.id}
                            className="border p-2 rounded-lg"
                        >
                            <img
                                src={course.courseImage}
                                alt=""
                                className=" rounded-lg"
                            />
                            <h3 className="text-lg font-bold">
                                {course.title}
                            </h3>
                            <p>{course.description}</p>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default page
