"use server"
import { db } from "@/lib/prisma"
export const submitAnswers = async (ans: any[]) => {
    try {
        // Create an array of answer records to store in the database
        const answerRecords = ans.map((answer) => ({
            studentId: answer.studentId,
            sectionId: answer.sectionId,
            questionId: answer.questionId,
            answer: answer.answer,
            marks: answer.marks,
        }))

        // Batch insert the answers into the database
        await db.studentAnswer.createMany({
            data: answerRecords,
        })

        console.log("Answers successfully submitted!")
    } catch (error) {
        console.error("Error submitting answers:", error)
        throw new Error("Failed to submit answers")
    }
}

export const checkTest = async (sectionId: string, studentId: string) => {
    try {
        const answers = await db.studentAnswer.findMany({
            where: {
                sectionId,
                studentId,
            },
        })
        return answers
    } catch (error) {
        console.error("Error checking test:", error)
        throw new Error("Failed to check test")
    }
}
