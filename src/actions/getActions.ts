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

export const getSignedInUser = async (id: string) => {
    try {
        const user = await db.user.findFirst({
            where: {
                id,
            },
        })
        return user
    } catch (error) {
        console.error(error)
    }
}
