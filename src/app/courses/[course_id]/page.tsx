"use client"
import { getCourses } from "@/actions/getActions"
import React, { useEffect, useState } from "react"

const page = () => {
    const [first, setfirst] = useState<any>(null)
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const data = await getCourses()
                console.log(data)
                setfirst(data)
            } catch (error) {
                console.error("Failed to fetch courses:", error)
            }
        }
        fetchCourses()
    }, [])
    console.log(first)

    return <div className="pt-40">page</div>
}

export default page
