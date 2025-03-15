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
