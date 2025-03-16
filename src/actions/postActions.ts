"use server"

import {
    BasicDetails,
    CurriculumSection,
    Pricing,
} from "@/app/addnewcourse/page"
import { db } from "@/lib/prisma"
import { getSession } from "next-auth/react"
import { auth } from "../../auth"

type Course = {
    basicDetails: BasicDetails
    curriculum: CurriculumSection[]
    pricing: Pricing
}
// Publish course
export const PublishCourse = async ({
    basicDetails,
    curriculum,
    pricing,
}: Course) => {
    const session = await auth()
    if (!session?.user) {
        throw new Error("Not authorised")
    }
    const {
        title,
        courseImage,
        coursePromotionalVideo,
        category,
        description,
        subtitle,
        difficulty,
        language,
    } = basicDetails
    if (!basicDetails && pricing && curriculum) {
        return
    }
    try {
        const Course = await db.course.create({
            data: {
                title,
                courseImage,
                coursePromotionalVideo,
                category,
                description,
                subtitle,
                difficulty,
                language,
                sections: curriculum,
                isCourseFree: pricing.isCourseFree,
                price: pricing.price,
                published: true,
            },
        })
        return Course
    } catch (error) {
        return { error: error }
    }
}
