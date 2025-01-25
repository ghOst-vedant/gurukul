"use server"

import { db } from "@/lib/prisma"

export const getCourses = async () => {
    try {
        const data = await db.course.findMany()
        return data
    } catch (error) {
        throw new Error("Error Fetching")
    }
}
export const getCourseDetails = async (id: string) => {
    try {
        const course = await db.course.findFirst({
            where: {
                id,
            },
        })
        return course
    } catch (error) {
        console.error(error)
    }
}
