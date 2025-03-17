"use client"
import CoursePurchaseCard from "@/components/cards/CoursePurchaseCard"
import { TestimonialCard } from "@/components/cards/TestimonialCard"
import { BsPeopleFill } from "react-icons/bs"
import userProfile from "@/assets/images/user.png"
import InstructorCard from "@/components/cards/InstructorCard"
import CourseTestimonialCarousel from "@/components/ui/course/CourseTestimonialCarousel"
import { CourseCard } from "@/components/cards/CourseCard"
import CourseCarousel from "@/components/ui/course/CourseCarousel"
import { useEffect, useState } from "react"
import { getCategoryCourses, getCourseDetails } from "@/actions/getActions"
import Link from "next/link"
import { checkPurchased } from "@/actions/purchase"
import CourseContent from "./CourseContent"

type pageParams = {
    params: {
        category_name: string
        course_id: string
    }
}

const Page = ({ params }: pageParams) => {
    const { course_id, category_name } = params
    console.log(course_id, category_name)
    const [course, setCourse] = useState<any>()
    const [catCourses, setCatCourses] = useState<any>([])
    const [isPurchased, setIsPurchased] = useState<boolean | null>(null)

    useEffect(() => {
        const checkPurchaseStatus = async () => {
            const purchased = await checkPurchased(course.id as string)
            setIsPurchased(purchased)
        }
        if (course?.id) {
            checkPurchaseStatus()
        }
    }, [course?.id])

    const getCategory = () => {
        const category = category_name
            .split("-")
            .map((str) => str.charAt(0).toUpperCase() + str.slice(1))
            .join(" ")
        return category
    }

    const category = getCategory()
    useEffect(() => {
        const fetchCourse = async () => {
            const course = await getCourseDetails(course_id)
            const categorical = await getCategoryCourses(category)
            setCourse(course)
            setCatCourses(categorical)
        }
        fetchCourse()
    }, [category, course_id])

    return (
        <div className="flex flex-col gap-10 lg:gap-16 lg:relative pb-16 lg:pb-16">
            <div className="bg-light_green px-4 pb-12 pt-28 sm:p-12 sm:pt-28 lg:px-[3vw] lg:pb-16 lg:pt-32 flex flex-col gap-3 shadow-md">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-black">
                    {course?.title}
                </h1>
                <span className="flex items-center">
                    <BsPeopleFill className="text-xl" />
                    <p className="font-medium text-lg lg:text-xl px-2">
                        {course?.students?.length} students
                    </p>
                </span>
                <p className="text-justify lg:w-[60vw]">
                    {course?.description}
                </p>
            </div>
            <span className="px-4 sm:px-12 lg:px-0 sm:flex sm:justify-center lg:absolute right-[3vw] top-32">
                <CoursePurchaseCard course={course} />
            </span>
            <div className="px-4 sm:px-12 lg:px-[3vw] flex flex-col gap-2 mt-6">
                <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold">
                    Course content
                </h2>
                <ul
                    style={{ listStyleType: "disc" }}
                    className="ml-4 flex flex-wrap gap-x-8"
                >
                    <li>{course?.sections.length} sections</li>
                </ul>
                {isPurchased && (
                    <div className="bg-black/10 lg:w-full h-[35rem] mt-4 flex items-center justify-center rounded-xl p-6 pt-32">
                        <CourseContent
                            courseData={course}
                            brought={isPurchased}
                        />
                    </div>
                )}
            </div>
            <div className="lg:px-[3vw] flex flex-col gap-16 lg:flex-row lg:justify-between mt-6">
                <div className="w-full lg:w-[57%] flex flex-col gap-6">
                    <h2 className="px-4 sm:px-12 lg:px-0 text-lg sm:text-xl lg:text-2xl font-semibold">
                        Reviews on this course
                    </h2>
                    <div className="hidden lg:block">
                        <CourseTestimonialCarousel />
                    </div>
                    <div className="w-full overflow-x-scroll lg:hidden">
                        <div className="flex gap-4 px-4 sm:px-12">
                            {testimonials?.map((testimonial, index) => (
                                <TestimonialCard
                                    key={index}
                                    name={testimonial.name}
                                    image=""
                                    role={testimonial.role}
                                    testimonial={testimonial.testimonial}
                                />
                            ))}
                        </div>
                    </div>
                </div>
                <div className="sm:w-[70%] lg:w-[35%] px-4 sm:px-12 lg:px-0 flex flex-col gap-6">
                    <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold">
                        About the Instructor
                    </h2>
                    <InstructorCard />
                </div>
            </div>
            <div className="flex flex-col gap-4 sm:gap-8 px-4 sm:px-12 lg:px-[3vw] mt-6 lg:mt-10">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-black">
                    <span className="text-blue">Other courses</span> you may
                    like
                </h2>
                <div className="mt-5 overflow-x-scroll lg:hidden flex gap-5">
                    {catCourses?.map((course: any, key: number) => (
                        <Link
                            href={`/categories/${category_name}/${course?.id}`}
                            key={key}
                        >
                            <CourseCard course_id={course?.id} />
                        </Link>
                    ))}
                </div>
                <span className="mt-5 hidden lg:block">
                    <CourseCarousel courses={catCourses} />
                </span>
            </div>
        </div>
    )
}

export default Page
const testimonials = [
    {
        name: "Theresa Webb",
        image: userProfile,
        role: "Web development bootcamp",
        testimonial:
            "With Gurukul Business employees were able to marry the two together, technology and consultant soft skills... to help drive their careers forward.",
    },
    {
        name: "Md Tahir Shikalgar",
        image: userProfile,
        role: "UI/UX designing",
        testimonial:
            "With Gurukul Business employees were able to marry the two together.",
    },
    {
        name: "Theresa Webb",
        image: userProfile,
        role: "Web development bootcamp",
        testimonial:
            "With Gurukul Business employees were able to marry the two together, technology and consultant soft skills... to help drive their careers forward.",
    },
    {
        name: "Md Tahir Shikalgar",
        image: userProfile,
        role: "UI/UX designing",
        testimonial:
            "With Gurukul Business employees were able to marry the two together.",
    },
    {
        name: "Theresa Webb",
        image: userProfile,
        role: "Web development bootcamp",
        testimonial:
            "With Gurukul Business employees were able to marry the two together, technology and consultant soft skills... to help drive their careers forward.",
    },
    {
        name: "Md Tahir Shikalgar",
        image: userProfile,
        role: "UI/UX designing",
        testimonial:
            "With Gurukul Business employees were able to marry the two together.",
    },
    {
        name: "Theresa Webb",
        image: userProfile,
        role: "Web development bootcamp",
        testimonial:
            "With Gurukul Business employees were able to marry the two together, technology and consultant soft skills... to help drive their careers forward.",
    },
    {
        name: "Md Tahir Shikalgar",
        image: userProfile,
        role: "UI/UX designing",
        testimonial:
            "With Gurukul Business employees were able to marry the two together.",
    },
]
