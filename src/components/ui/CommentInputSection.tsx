"use client"

import React, { useState } from "react"
import { createComment } from "@/actions/comments"
import io from "socket.io-client"
import { useRecoilValue } from "recoil"
import { userSessionAtom } from "@/recoil/Atoms/userSession"

const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL as string)

const CommentInput = ({ sectionId }: { sectionId: string }) => {
    const user = useRecoilValue(userSessionAtom)

    const [commentText, setCommentText] = useState("")
    const handleCommentSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!commentText.trim()) return
        try {
            await createComment(sectionId, commentText)
            const comment = {
                user: {
                    name: user?.user?.name,
                    id: user?.user?.id,
                    image: user?.user?.image,
                    email: user?.user?.email,
                },
                content: commentText,
            }
            socket.emit("new-comment", comment)
            setCommentText("")
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
