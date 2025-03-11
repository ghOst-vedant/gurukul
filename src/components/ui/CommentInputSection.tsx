"use client"

import React, { useState } from "react"
import { createComment } from "@/actions/comments"

const CommentInput = ({ sectionId }: { sectionId: string }) => {
    const [commentText, setCommentText] = useState("")

    const handleCommentSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!commentText.trim()) return
        try {
            const comment = await createComment(sectionId, commentText)
            console.log("Created Comment: ", comment)
            setCommentText("") // Clear input field
        } catch (error) {
            if (error instanceof Error) {
                alert(error.message || "Failed to add comment")
            } else {
                alert("Failed to add comment")
            }
            console.error("Error:", error)
        }
    }

    return (
        <form onSubmit={handleCommentSubmit} className="mt-4">
            <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Write a comment..."
                className="w-full p-2 border border-gray-300 rounded"
            />
            <button
                type="submit"
                className="mt-2 bg-blue text-white p-2 rounded"
            >
                Post Comment
            </button>
        </form>
    )
}

export default CommentInput
