"use client"
import { CourseCard } from "@/components/cards/CourseCard"
import { BookmarkCard } from "@/components/cards/BookmarkCard"
import Loader from "@/components/ui/Loader"
import { useEffect, useState } from "react"
import { Pencil } from "lucide-react"
import { updateUser } from "@/actions/user"
import Link from "next/link"
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
type studentProps = {
    data: UserData
    isOwner?: boolean
}
export const Student = ({ data, isOwner }: studentProps) => {
    if (!data) {
        return <Loader />
    }
    const [user, setUser] = useState<UserData>({
        ...data,
        gender: data.gender || "",
        mobile: data.mobile || "",
        about: data.about || "",
        age: data.age || undefined,
    })
    const [isEditing, setIsEditing] = useState(false)

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        if (e.target.name === "age") {
            setUser({
                ...user,
                [e.target.name]: e.target.value
                    ? parseInt(e.target.value, 10)
                    : undefined,
            })
        } else {
            setUser({ ...user, [e.target.name]: e.target.value })
        }
    }

    const handleSave = async () => {
        try {
            await updateUser(
                user.id,
                user.gender!,
                user.name!,
                user.age!,
                user.mobile!,
                user.about!
            )
            setIsEditing(false) // Optionally close the edit mode
        } catch (error) {
            console.error("Error updating user:", error)
        }
        useEffect(() => {
            setUser(data)
        }, [data])
    }
    return (
        <div className="flex justify-between w-full lg:flex-row flex-col">
            <div className="lg:w-[25%] border flex flex-col  items-center pt-10 rounded-3xl shadow-sm pb-3 px-4 h-fit">
                <div className=" flex items-center justify-center flex-col gap-1 border-b-[1.5px] border-black pb-4  px-10">
                    <img
                        src={user.image}
                        className="h-48 w-fit rounded-full shadow-md object-cover"
                        alt="Teacher Profile"
                    />
                    <h2 className=" text-xl mt-2 px-8 border-b border-black">
                        {user.name}
                    </h2>
                    <span className="mt-1 flex flex-col justify-center items-center">
                        <p className="">{user?.email}</p>
                    </span>
                </div>
                <span className="pt-4 self-start px-2">
                    <h3>About</h3>
                    <p className="p-3 text-justify leading-5">{user?.about}</p>
                </span>
            </div>
            <div className="lg:w-[70%]  rounded-3xl w-full  lg:mt-0 mt-[15vw]">
                <div>
                    <h1 className="text-2xl">My Courses</h1>
                    <div className="mt-5 overflow-x-scroll  flex gap-5 p-1">
                        {user?.courses?.map((course) => (
                            <CourseCard
                                course_id={course}
                                isprofile={true}
                                key={course}
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
                                {/* Name */}
                                <span className="flex justify-between border-b border-black px-2 pb-2">
                                    <p>Name</p>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            name="name"
                                            value={user.name}
                                            onChange={handleChange}
                                            className="border px-2 py-1 rounded-md"
                                            autoFocus
                                        />
                                    ) : (
                                        <p className="text-lg font-medium">
                                            {user.name}
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
                                            value={user?.gender}
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
                                        <p>{user?.gender || "Not Set"}</p>
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
                                            value={user?.age || ""}
                                            onChange={handleChange}
                                            className="border px-2 py-1 rounded-md"
                                        />
                                    ) : (
                                        <p>
                                            {user?.age !== undefined
                                                ? user?.age
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
                                                user?.mobile === null
                                                    ? ""
                                                    : user?.mobile
                                            }
                                            onChange={handleChange}
                                            className="border px-2 py-1 rounded-md"
                                        />
                                    ) : (
                                        <p>{user?.mobile || "Not Set"}</p>
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
                                    <p>{user?.email}</p>
                                </span>

                                {/* About */}
                                <span className="flex flex-col gap-2 border-b border-black px-2 pb-2">
                                    <p>About</p>
                                    {isEditing ? (
                                        <textarea
                                            name="about"
                                            value={user?.about}
                                            onChange={handleChange}
                                            className="border px-2 py-1 rounded-md w-full"
                                            rows={3}
                                        />
                                    ) : (
                                        <p>{user?.about || "Not Set"}</p>
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
export default Student
