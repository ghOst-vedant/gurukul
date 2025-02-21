"use client"

import gurukul_logo from "../../../public/gurukul_logo.png"
import { useRecoilState, useSetRecoilState } from "recoil"
import { IoClose, IoLogoGoogle } from "react-icons/io5"
import Image from "next/image"
import { fetchSession, login, loginWithCreds } from "@/actions/auth"
import { redirect } from "next/navigation"
import { useState } from "react"
import toast from "react-hot-toast"
import { userSessionAtom } from "@/recoil/Atoms/userSession"
import { popupAtom } from "@/recoil/Atoms/popupAtom"
import axios from "axios"
const Register = () => {
    const [popup, setPopup] = useRecoilState(popupAtom)
    const [role, setRole] = useState<"STUDENT" | "TEACHER">("STUDENT")
    const [loading, setLoading] = useState(false)
    const setSession = useSetRecoilState(userSessionAtom)
    const handleToggle = () => {
        setRole(role === "STUDENT" ? "TEACHER" : "STUDENT")
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setLoading(true)

        try {
            const formData = new FormData(event.currentTarget)

            const userData = {
                username: formData.get("username"),
                email: formData.get("email"),
                password: formData.get("password"),
                role,
            }
            console.log(userData)

            const res = await axios.post("/api/register", userData)

            if (res.status === 201) {
                toast.success("Registration successful! You can now log in.")
                setPopup("login") // Redirect to login popup
            }
        } catch (error: any) {
            console.error("Registration failed", error.response?.data?.error)
            toast.error(error.response?.data?.error || "Something went wrong.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div
            className={`${
                popup === "register" ? "fixed" : "hidden"
            } h-full w-full z-30 fixed`}
        >
            <div className="flex justify-center items-center h-screen bg-black/80">
                <div className="bg-white rounded-xl shadow-lg p-6 w-96 relative">
                    <IoClose
                        className="cursor-pointer right-4 absolute"
                        size={30}
                        onClick={() => setPopup(null)}
                    />
                    <div className="text-center mb-6">
                        <Image
                            src={gurukul_logo}
                            alt="Logo"
                            className="w-28 mx-auto"
                        />
                    </div>
                    <h2 className="text-2xl font-semibold text-center">
                        Sign up
                    </h2>
                    <p className="text-gray-500 text-sm text-center mb-4">
                        Enter your details
                    </p>
                    <div className="flex justify-center mb-6 select-none">
                        <label className="flex items-center cursor-pointer">
                            <span className="mr-2">Student</span>
                            <div className="relative">
                                <input
                                    type="checkbox"
                                    className="sr-only select-none"
                                    checked={role === "TEACHER"}
                                    onChange={handleToggle}
                                />
                                <div className="w-10 h-4 bg-gray-200 rounded-full shadow-inner"></div>
                                <div
                                    className={`dot absolute w-6 h-6 bg-blue-500 rounded-full shadow -left-1 -top-1 transition ${
                                        role === "TEACHER"
                                            ? "transform translate-x-full"
                                            : ""
                                    }`}
                                ></div>
                            </div>
                            <span className="ml-2">Teacher</span>
                        </label>
                    </div>
                    <div className="text-center mb-6">
                        <p>
                            Selected Role:{" "}
                            {role === "TEACHER" ? "Teacher" : "Student"}
                        </p>
                    </div>
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col justify-center items-center"
                    >
                        <input type="hidden" name="role" value={role} />
                        <div className="mb-4">
                            <input
                                type="text"
                                placeholder="What's your name"
                                id="Username"
                                name="username"
                                className="mt-1 block  border-b-2 border-dark_blue rounded-md p-2 outline-none"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <input
                                type="email"
                                placeholder="What's your email"
                                id="Email"
                                name="email"
                                className="mt-1 block  border-b-2 border-dark_blue rounded-md p-2 outline-none"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <input
                                type="password"
                                placeholder="Enter password"
                                name="password"
                                id="password"
                                className="mt-1 block  border-b-2 border-dark_blue rounded-md p-2 mb-4 outline-none"
                                required
                            />
                            <button
                                type="submit"
                                className="w-full bg-blue text-white py-2 px-6 rounded-xl hover:bg-blue-700 flex justify-center items-center"
                                disabled={loading}
                            >
                                {loading ? (
                                    <svg
                                        className="animate-spin h-5 w-5 text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        ></path>
                                    </svg>
                                ) : (
                                    "Sign up"
                                )}
                            </button>
                        </div>
                    </form>
                    <div className="px-6">
                        <div className="my-3 flex items-center">
                            <hr className="flex-grow border-gray-300" />
                            <span className="px-2 text-sm text-gray-500">
                                Or continue with
                            </span>
                            <hr className="flex-grow border-gray-300" />
                        </div>
                        <div className="flex justify-center gap-4 mb-4">
                            <IoLogoGoogle
                                size={30}
                                className="text-dark_blue cursor-pointer"
                                onClick={() => {
                                    setPopup(null)
                                    login("google")
                                    redirect("/")
                                }}
                            />
                        </div>
                        <p className="text-center text-sm">
                            Already have an account?{" "}
                            <span
                                className="text-blue font-medium cursor-pointer"
                                onClick={() => setPopup("login")}
                            >
                                Login
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register
