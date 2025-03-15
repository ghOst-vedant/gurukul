import { useEffect, useState } from "react"

interface LectureData {
    type: string
    id: string
    data: {
        lectureTitle: string
        content: string
    }
}

interface VideoContentProps {
    VideoContent: LectureData[]
}

export const VideoComponent: React.FC<VideoContentProps> = ({
    VideoContent,
}) => {
    const [videoUrl, setVideoUrl] = useState<string | null>(null)

    useEffect(() => {
        if (VideoContent.length > 0) {
            const lecture = VideoContent[0]
            if (
                lecture.type === "lecture" &&
                lecture.data.content.includes("https://")
            ) {
                setVideoUrl(lecture.data.content)
            }
        }
    }, [VideoContent])

    return (
        <div className="p-4 bg-gray-100 rounded-lg shadow border">
            {videoUrl ? (
                <>
                    <video controls className="w-full object-cover rounded-lg">
                        <source src={videoUrl} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    <div className="p-4 ">
                        <h3 className="text-xl font-semibold">
                            {VideoContent[0].data.lectureTitle}
                        </h3>
                    </div>
                </>
            ) : (
                <p className="text-gray-500">No video available</p>
            )}
        </div>
    )
}
