"use client"
import Image from "next/image"
import gurukul_logo from "../../../public/gurukul_logo.png"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { userSessionAtom } from "@/recoil/Atoms/userSession"
import { fetchSession, logout } from "@/actions/auth"
import { useEffect } from "react"
import toast from "react-hot-toast"
import { popupAtom } from "@/recoil/Atoms/popupAtom"
import { getSignedInUser } from "@/actions/getActions"
import { UserAtom } from "@/recoil/Atoms/UserAtom"

const DesktopNavbar = () => {
    const pathName = usePathname()
    const setPopup = useSetRecoilState(popupAtom)
    const session = useRecoilValue(userSessionAtom)
    const setSession = useSetRecoilState(userSessionAtom)
    const setUSer = useSetRecoilState(UserAtom)
    const router = useRouter()
    useEffect(() => {
        const updateSession = async () => {
            const sessionData = await fetchSession()
            const getUserData = await getSignedInUser(
                sessionData?.user?.id as string
            )
            setUSer(getUserData)
            setSession(sessionData)
        }
        updateSession()
    }, [setSession])

    const handleLogout = async () => {
        await logout()
        setSession(null)
        toast.success("Logged out successfully")
        router.push("/")
    }
    return (
        <nav className="lg:px-[3vw] flex justify-between py-3 shadow-md overflow-x-hidden bg-white fixed w-full z-10">
            <Link href="/">
                <Image
                    src={gurukul_logo}
                    className="h-12 w-fit"
                    alt="Brand logo"
                />
            </Link>
            <div className="flex gap-8 items-center justify-center">
                <Link
                    href="/"
                    className={`hover:text-blue text-lg font-medium text-black ${
                        pathName == "/" && "text-blue"
                    }`}
                >
                    Home
                </Link>
                <Link
                    href="/categories"
                    className={`hover:text-blue text-lg font-medium text-black ${
                        pathName == "/categories" && "text-blue"
                    }`}
                >
                    Categories
                </Link>
                <Link
                    href="/explore"
                    className={`hover:text-blue text-lg font-medium text-black ${
                        pathName == "/explore" && "text-blue"
                    }`}
                >
                    Explore
                </Link>
                <input
                    type="text"
                    name="desktopNavSearch"
                    id="desktopNavSearch"
                    placeholder="Search course..."
                    className="border-black/60 rounded-full border-2 font-medium text-lg px-5 py-[6px] focus:outline-none text-black/60 w-[25vw]"
                />

                {session?.user ? (
                    <div className="flex items-center gap-4">
                        <Link href={`/profile/${session.user.id}`}>
                            <Image
                                src={
                                    session.user.image || "/default-avatar.png"
                                } // Default avatar if none is provided
                                alt="User Avatar"
                                width={40}
                                height={40}
                                className="rounded-full cursor-pointer"
                            />
                        </Link>
                        <button
                            className="text-lg hover:text-white hover:bg-blue rounded-full px-5 py-[6px] border-2 border-blue font-medium"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    <button
                        className="text-lg hover:text-white hover:bg-blue rounded-full px-5 py-[6px] border-2 border-blue font-medium"
                        onClick={() => {
                            setPopup("login")
                        }}
                    >
                        Login
                    </button>
                )}
            </div>
        </nav>
    )
}

export default DesktopNavbar
