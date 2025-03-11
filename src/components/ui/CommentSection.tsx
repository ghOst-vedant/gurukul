import React from "react"

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

const CommentSection = ({ comments, userID }: CommentSectionProps) => {
    const userComments = comments.filter(
        (comment) => comment?.user?.id === userID
    )
    console.log("User Comments: ", userComments)
    console.log(userID)

    return (
        // <div className="mt-8">
        //     <h3 className="text-2xl font-semibold">Comments</h3>
        //     <div className="mt-4 bg-gray-200 p-4 rounded-xl">
        //         {comments?.length > 0 ? (
        //             comments?.map((comment, index) => (
        //                 <div
        //                     key={index}
        //                     className="mb-4 bg-slate-400 w-fit rounded-xl px-4 py-2 overflow-scroll"
        //                 >
        //                     <div className="flex items-center mb-2">
        //                         <img
        //                             src={comment?.user?.image}
        //                             alt={comment?.user?.name}
        //                             className="w-8 h-8 rounded-full"
        //                         />
        //                         <span className="ml-2">
        //                             {comment?.user?.name}
        //                         </span>
        //                     </div>
        //                     <div className="ml-10">{comment.content}</div>
        //                 </div>
        //             ))
        //         ) : (
        //             <p>No comments yet.</p>
        //         )}
        //     </div>
        // </div>
        <div className="mt-8">
            <h3 className="text-2xl font-semibold">Comments</h3>
            <div className="mt-4 bg-gray-200 p-4 rounded-xl max-h-60 overflow-y-auto">
                {comments?.length > 0 ? (
                    comments.map((comment, index) => {
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
                                            : "bg-slate-400 text-black"
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
