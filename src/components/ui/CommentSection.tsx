// components/CommentSection.tsx
import React from "react"

type Comment = {
    user: string
    content: string
}

type CommentSectionProps = {
    comments: Comment[]
}

const CommentSection = ({ comments }: CommentSectionProps) => {
    return (
        <div className="mt-8">
            <h3 className="text-2xl font-semibold">Comments</h3>
            <div className="mt-4">
                {comments.length > 0 ? (
                    comments.map((comment, index) => (
                        <div key={index} className="mb-4">
                            <p>
                                <strong>{comment.user}:</strong>{" "}
                                {comment.content}
                            </p>
                        </div>
                    ))
                ) : (
                    <p>No comments yet.</p>
                )}
            </div>
        </div>
    )
}

export default CommentSection
