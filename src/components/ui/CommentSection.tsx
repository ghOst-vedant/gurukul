"use client"
import React, { useEffect, useState } from "react"
import io from "socket.io-client"
type Comment = {
    user: {
        name: string
        image: string
        email: string
        id: string
    }
    content: string
}

type CommentSectionProps = {
    comments: Comment[]
    userID: string
}
const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL as string)

const CommentSection = ({ comments, userID }: CommentSectionProps) => {
    const [allComments, setAllComments] = useState<Comment[]>(comments)
    useEffect(() => {
        socket.on("broadcast-comment", (newComment: Comment) => {
            setAllComments((prevComments) => [...prevComments, newComment])
        })
        return () => {
            socket.off("broadcast-comment")
        }
    }, [])
    useEffect(() => {
        if (comments && comments.length > 0) setAllComments(comments)
    }, [comments])
    return (
        <div className="mt-8">
            <h3 className="text-2xl font-semibold">Comments</h3>
            <div className="mt-4 bg-gray-200 p-4 rounded-xl max-h-60 overflow-y-auto">
                {allComments?.length > 0 ? (
                    allComments.map((comment, index) => {
                        const isUserComment = comment?.user?.id === userID
                        return (
                            <div
                                key={index}
                                className={`flex ${
                                    isUserComment
                                        ? "justify-end"
                                        : "justify-start"
                                }`}
                            >
                                <div
                                    className={`mb-4 max-w-[75%] rounded-xl px-4 py-2 break-words ${
                                        isUserComment
                                            ? "bg-blue text-white"
                                            : "bg-white text-black"
                                    }`}
                                >
                                    <div className="flex items-center mb-2">
                                        <img
                                            src={comment?.user?.image}
                                            alt={comment?.user?.name}
                                            className="w-8 h-8 rounded-full"
                                        />
                                        <span className="ml-2">
                                            {comment?.user?.name}
                                        </span>
                                    </div>
                                    <div className="ml-10">
                                        {comment.content}
                                    </div>
                                </div>
                            </div>
                        )
                    })
                ) : (
                    <p>No comments yet.</p>
                )}
            </div>
        </div>
    )
}

export default CommentSection
