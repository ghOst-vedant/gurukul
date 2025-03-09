// components/CommentInput.tsx
import React, { useState } from "react"

type CommentInputProps = {
    courseId: string
    sectionId: string
    onCommentAdded: (newComment: string) => void
}

const CommentInput = ({
    courseId,
    sectionId,
    onCommentAdded,
}: CommentInputProps) => {
    const [newComment, setNewComment] = useState("")

    const handleSubmit = async () => {
        if (newComment.trim()) {
            // Make API request to post comment
            const response = await fetch(
                `/api/comments/${courseId}/${sectionId}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ content: newComment }),
                }
            )

            if (response.ok) {
                const data = await response.json()
                onCommentAdded(data.comment) // Trigger parent update with new comment
                setNewComment("")
            } else {
                alert("Failed to add comment")
            }
        }
    }

    return (
        <div className="mt-4">
            <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment"
                className="w-full p-2 border rounded"
            />
            <button
                onClick={handleSubmit}
                className="bg-blue text-white px-4 py-2 rounded mt-2"
            >
                Post Comment
            </button>
        </div>
    )
}

export default CommentInput
