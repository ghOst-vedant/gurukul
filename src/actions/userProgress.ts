import { db } from "@/lib/prisma"

export const getProgress = async (
    courseId: string,
    userId: string
): Promise<number> => {
    try {
        // Fetch the total number of sections in the course
        const course = await db.course.findUnique({
            where: { id: courseId },
            select: { sections: true }, // Assuming `sections` is stored as JSON
        })
        if (!course || !course.sections) return 0
        const totalSections = Array.isArray(course.sections)
            ? course.sections.length
            : 0
        // Fetch user's progress for this course
        const userProgress = await db.userProgress.findUnique({
            where: { userId_courseId: { userId, courseId } },
            select: { completedSections: true },
        })
        if (!userProgress || !userProgress.completedSections) return 0

        const completedSections = userProgress.completedSections.length

        // Calculate progress percentage
        const progress = (completedSections / totalSections) * 100

        return Math.round(progress) // Return rounded progress percentage
    } catch (error) {
        console.error("Failed to fetch progress:", error)
        return 0
    }
}

export const updateProgress = async (
    courseId: string,
    userId: string,
    sectionId: string
): Promise<boolean> => {
    try {
        // Fetch the user's progress for this course
        let userProgress = await db.userProgress.findUnique({
            where: { userId_courseId: { userId, courseId } },
            select: { completedSections: true },
        })

        if (!userProgress) {
            // Create new progress entry if not found
            await db.userProgress.create({
                data: {
                    userId,
                    courseId,
                    completedSections: [sectionId], // Add first completed section
                },
            })
        } else {
            // Update progress by adding the sectionId if not already completed
            const updatedSections = new Set(userProgress.completedSections)
            updatedSections.add(sectionId)

            await db.userProgress.update({
                where: { userId_courseId: { userId, courseId } },
                data: { completedSections: Array.from(updatedSections) },
            })
        }

        return true
    } catch (error) {
        console.error("Failed to update progress:", error)
        return false
    }
}
