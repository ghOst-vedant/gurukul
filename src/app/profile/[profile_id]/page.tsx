"use client"
import { Student } from "./Student"
import { Teacher } from "./Teacher"
import Loader from "@/components/ui/Loader"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { getSignedInUser } from "@/actions/getActions"
import { useRecoilValue } from "recoil"
import { UserAtom } from "@/recoil/Atoms/UserAtom"

const Page = () => {
    const { profile_id } = useParams()
    const [user, setUser] = useState<any>(null)
    const loggedInUser = useRecoilValue(UserAtom)

    useEffect(() => {
        const getUser = async () => {
            const data = await getSignedInUser(profile_id as string)
            setUser(data)
        }
        getUser()
    }, [profile_id])

    if (!user) {
        return (
            <div className="p-5 pb-20 pt-28 sm:p-12 sm:pt-28 lg:p-[3vw] lg:pb-24 lg:pt-32 flex justify-center items-center">
                <Loader />
            </div>
        )
    }

    const isOwner = loggedInUser?.id === profile_id

    return (
        <div className="p-5 pb-16 pt-28 sm:p-12 sm:pt-28 lg:p-[3vw] lg:pb-24 lg:pt-32">
            {user?.role.toLowerCase() === "student" ? (
                <Student data={user} isOwner={isOwner} />
            ) : (
                <Teacher user={user} isOwner={isOwner} />
            )}
        </div>
    )
}

export default Page
