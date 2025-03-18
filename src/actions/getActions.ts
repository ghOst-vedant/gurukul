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
export const getCategoryCourses = async (category: string) => {
    try {
        const courses = await db.course.findMany({
            where: {
                category,
            },
        })
        return courses
    } catch (error) {
        console.error(error)
    }
}

export async function getStudentCount(teacherId: string) {
    try {
        if (!teacherId) throw new Error("Teacher ID is required")
        const courses = await db.course.findMany({
            where: { userId: teacherId },
        })

        const totalStudents = courses.reduce(
            (acc, course) => acc + course.students.length,
            0
        )
        console.log(totalStudents)
        return totalStudents
    } catch (error) {
        console.error("Error fetching student count:", error)
        throw new Error("Failed to fetch student count")
    }
}
