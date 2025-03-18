"use client"
import { CourseCard } from "@/components/cards/CourseCard"
import { TestimonialCard } from "@/components/cards/TestimonialCard"
import { GiGraduateCap } from "react-icons/gi"
import userProfile from "@/assets/images/user.png"
import { useEffect, useState } from "react"
import { getStudentCount } from "@/actions/getActions"
import Loader from "@/components/ui/Loader"
import { Pencil } from "lucide-react"
import { updateUser } from "@/actions/user"
type UserData = {
    id: string
    role: string
    name: string
    email: string
    password: string
    image: string
    emailVerified: string | null
    courses: string[]
    about?: string
    gender?: string
    age?: number
    mobile?: string
    createdAt: string
    updatedAt: string
}
type teacherProps = {
    user: UserData
    isOwner?: boolean
}

export const Teacher = ({ user, isOwner }: teacherProps) => {
    const [students, setStudents] = useState(0)
    const [userData, setUserData] = useState<UserData>({
        ...user,
        gender: user.gender || "",
        mobile: user.mobile || "",
        about: user.about || "",
        age: user.age || undefined,
    })

    const [isEditing, setIsEditing] = useState(false)
    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        if (e.target.name === "age") {
            setUserData({
                ...userData,
                [e.target.name]: e.target.value
                    ? parseInt(e.target.value, 10)
                    : undefined,
            })
        } else {
            setUserData({ ...userData, [e.target.name]: e.target.value })
            console.log(userData)
        }
    }
    const handleSave = async () => {
        try {
            await updateUser(
                userData.id,
                userData.gender!,
                userData.name!,
                userData.age!,
                userData.mobile!,
                userData.about!
            )
            setIsEditing(false) // Optionally close the edit mode
        } catch (error) {
            console.error("Error updating user:", error)
        }
        // useEffect(() => {
        //     setUserData(user)
        // }, [user])
    }

    useEffect(() => {
        const getStudents = async () => {
            const getC = await getStudentCount(user?.id as string)
            setStudents(getC)
        }
        getStudents()
    }, [user])

    return (
        <div className=" flex justify-between w-full lg:flex-row flex-col">
            <div className="lg:w-[25%] border flex flex-col justify-center items-center pt-10 rounded-3xl shadow-sm pb-3 h-fit">
                <div className=" flex items-center justify-center flex-col gap-1 border-b border-black pb-5 px-2">
                    <img
                        src={user?.image}
                        className="w-[80%] object-cover rounded-full"
                        alt="Teacher Profile"
                    />
                    <h2 className=" text-xl px-8 border-b border-black">
                        {user?.name}
                    </h2>
                    <div className="flex justify-center gap-3 items-end">
                        <span className=" flex flex-col justify-center items-center">
                            <span className=" flex items-center gap-2">
                                <GiGraduateCap size={35} />
                                {students === 0 ? "0" : students}
                            </span>
                            <span>Students Enrolled</span>
                        </span>
                        {/* <span className=" flex flex-col justify-center items-center">
                            <span className=" flex items-center gap-2">
                                <FaBook size={27} />3
                            </span>
                            <span>Students Enrolled</span>
                        </span> */}
                    </div>
                </div>
                <span className="px-5 p-4">
                    <h3>About</h3>
                    <p className="p-4 text-justify leading-5">{user?.about}</p>
                </span>
            </div>
            <div className="lg:w-[70%]  rounded-3xl w-full  lg:mt-0 mt-[15vw]">
                <div>
                    <h1 className="text-2xl">{user?.name}'s Courses</h1>
                    <div className="mt-5 overflow-x-scroll  flex gap-5 p-1 ">
                        {user?.courses?.map((course: any) => (
                            <CourseCard
                                course_id={course}
                                isprofile={true}
                                key={course}
                            />
                        ))}
                    </div>
                </div>
                <div className="pt-14">
                    <h1 className="text-2xl">Testimonials</h1>
                    <div className="mt-5 overflow-x-scroll  flex gap-5 p-1">
                        {testimonials.map((testimonial, index) => (
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
                {isOwner && (
                    <div className="mt-10">
                        <div className="flex gap-6 items-center">
                            <h1 className="text-2xl font-light">
                                Edit Profile
                            </h1>
                        </div>
                        <div className="mt-6 border shadow-sm rounded-3xl py-8 px-4">
                            <h2 className="font-medium text-lg">Basic Info</h2>
                            <div className="mt-10 flex flex-col gap-6 font-light">
                                <span className="flex justify-between border-b border-black px-2 pb-2">
                                    <p>Name</p>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            name="name"
                                            value={userData?.name}
                                            onChange={handleChange}
                                            className="border px-2 py-1 rounded-md"
                                            autoFocus
                                        />
                                    ) : (
                                        <p className="text-lg font-medium">
                                            {userData?.name}
                                        </p>
                                    )}
                                    <Pencil
                                        size={20}
                                        className="hover:text-blue cursor-pointer"
                                        onClick={() => setIsEditing(true)}
                                    />
                                </span>

                                {/* Gender */}
                                <span className="flex justify-between border-b border-black px-2 pb-2">
                                    <p>Gender</p>
                                    {isEditing ? (
                                        <select
                                            name="gender"
                                            value={userData?.gender}
                                            onChange={handleChange}
                                            className="border px-2 py-1 rounded-md"
                                        >
                                            <option value="">
                                                Select Gender
                                            </option>
                                            <option value="Male">Male</option>
                                            <option value="Female">
                                                Female
                                            </option>
                                            <option value="Other">Other</option>
                                        </select>
                                    ) : (
                                        <p>{userData?.gender || "Not Set"}</p>
                                    )}
                                    <Pencil
                                        size={20}
                                        className="hover:text-blue cursor-pointer"
                                        onClick={() => setIsEditing(true)}
                                    />
                                </span>

                                {/* Age */}
                                <span className="flex justify-between border-b border-black px-2 pb-2">
                                    <p>Age</p>
                                    {isEditing ? (
                                        <input
                                            type="number"
                                            name="age"
                                            value={userData?.age || ""}
                                            onChange={handleChange}
                                            className="border px-2 py-1 rounded-md"
                                        />
                                    ) : (
                                        <p>
                                            {userData?.age !== undefined
                                                ? userData?.age
                                                : "Not Set"}
                                        </p>
                                    )}
                                    <Pencil
                                        size={20}
                                        className="hover:text-blue cursor-pointer"
                                        onClick={() => setIsEditing(true)}
                                    />
                                </span>

                                {/* Mobile Number */}
                                <span className="flex justify-between border-b border-black px-2 pb-2">
                                    <p>Mobile No</p>
                                    {isEditing ? (
                                        <input
                                            type="tel"
                                            name="mobile"
                                            value={
                                                userData?.mobile === null
                                                    ? ""
                                                    : userData?.mobile
                                            }
                                            onChange={handleChange}
                                            className="border px-2 py-1 rounded-md"
                                        />
                                    ) : (
                                        <p>{userData?.mobile || "Not Set"}</p>
                                    )}
                                    <Pencil
                                        size={20}
                                        className="hover:text-blue cursor-pointer"
                                        onClick={() => setIsEditing(true)}
                                    />
                                </span>

                                {/* Email (Non-Editable) */}
                                <span className="flex justify-between px-2 pb-2">
                                    <p>Email</p>
                                    <p>{userData?.email}</p>
                                </span>

                                {/* About */}
                                <span className="flex flex-col gap-2 border-b border-black px-2 pb-2">
                                    <p>About</p>
                                    {isEditing ? (
                                        <textarea
                                            name="about"
                                            value={userData?.about}
                                            onChange={handleChange}
                                            className="border px-2 py-1 rounded-md w-full"
                                            rows={3}
                                        />
                                    ) : (
                                        <p>{userData?.about || "Not Set"}</p>
                                    )}
                                    <Pencil
                                        size={20}
                                        className="hover:text-blue cursor-pointer self-end"
                                        onClick={() => setIsEditing(true)}
                                    />
                                </span>
                            </div>
                            {isEditing && (
                                <div className="flex justify-center mt-6">
                                    <button
                                        className="bg-blue text-white px-4 py-2 rounded-lg"
                                        onClick={handleSave}
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

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
