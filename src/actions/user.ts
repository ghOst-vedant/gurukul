"use server"

import { db } from "@/lib/prisma" // Import your Prisma client instance

export async function updateUser(
    id: string,
    gender: string,
    name: string,
    age: number,
    mobile: string,
    about: string
) {
    try {
        return await db.user.update({
            where: { id },
            data: {
                gender: gender,
                name: name,
                about: about,
                age: age,
                mobile: mobile,
            },
        })
    } catch (error) {
        console.error("Error updating all users:", error)
    }
}
export async function getStudentCount(tid: string) {
    if (!tid) {
        throw new Error("No userId found!")
    }
    try {
        const result = await db.course.findMany({
            where: {
                userId: tid,
            },
        })
        const totalStudents = result.reduce((total, course) => {
            return total + (course.students?.length || 0) // Add the number of students in each course
        }, 0)
        console.log(totalStudents)

        return totalStudents
    } catch (error) {
        console.error("Error fetching user courses:", error)
    }
}
