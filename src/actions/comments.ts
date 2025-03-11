"use server"

import { db } from "@/lib/prisma"
import { auth } from "../../auth"

// Fetch comments for a course section
export async function getComments(sectionId: string) {
    try {
        return await db.comment.findMany({
            where: { sectionId },
            include: {
                user: {
                    select: {
                        name: true,
                        email: true,
                        image: true,
                        id: true,
                    },
                },
            },
            orderBy: { createdAt: "asc" },
        })
    } catch (error) {
        console.error("Error fetching comments:", error)
        return []
    }
}

// Add a new comment
export const createComment = async (sectionId: string, commentText: string) => {
    const session = await auth()
    if (!session) {
        throw new Error("Unauthorized")
    }

    const comment = await db.comment.create({
        data: {
            content: commentText,
            sectionId: sectionId as string,
            userId: session?.user?.id as string,
        },
    })
    return comment
}
