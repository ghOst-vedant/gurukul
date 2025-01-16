"use server";

import { BasicDetails, CurriculumSection, Pricing } from "@/app/addnewcourse/page";
import { db } from "@/lib/prisma";

export const submitCourseCurriculum = async (courseCurriculum:CurriculumSection[]) => {
    console.log("Action executed: ",courseCurriculum);
    try {
        const sections = await db.course.create({
            data:{
                sections:courseCurriculum
            }
        })
        return sections
    } catch (error) {
        console.error((error as Error).message);
    }
};
export const submitBasicDetails = async(basicDetails:BasicDetails)=>{
    console.log(basicDetails);

    const {title,courseImage,coursePromotionalVideo,category,description,subtitle,difficulty,language} =  basicDetails;
    try {
    const courseDetails = await db.course.create({
    data:{
        title,courseImage,coursePromotionalVideo,category,description,subtitle,difficulty,language
    }
})
return courseDetails
}
 catch (error) {
console.error((error as Error).message);
    }
}
export const submitPricing = async(pricing:Pricing)=>{
    const {price,isCourseFree} = pricing
    try {
        const priceData= await db.course.create({
            data:{
                isCourseFree,
                price
            }
        })
        return priceData
    } catch (error) {
        console.error((error as Error).message);
    }
}
