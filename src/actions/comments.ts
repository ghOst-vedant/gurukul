"use server"

import { db } from "@/lib/prisma"
import { auth } from "../../auth"
import { getSession } from "./auth"

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
export async function addComment(sectionId: string, content: string) {
    const user = await getSession() // Get authenticated user
    if (!user) throw new Error("Unauthorized")

    try {
        return await db.comment.create({
            data: {
                commentText: content,
                sectionId,
                userId: user?.id as string,
            },
        })
    } catch (error) {
        console.error("Error adding comment:", error)
        throw new Error("Failed to add comment")
    }
}
