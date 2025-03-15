"use client"
import { useRecoilValue } from "recoil"
import { Student } from "./Student"
import { Teacher } from "./Teacher"
import { UserAtom } from "@/recoil/Atoms/UserAtom"
import Loader from "@/components/ui/Loader"

//Profile page of user (include teacher as well as student). Use conditions to render thing. For eg: is teacher or student, is own profile or someone else to give access to edit things.
// type Params = {
//     profile_id: string
// }
const Page = () => {
    const user = useRecoilValue(UserAtom)
    if (!user) {
        return (
            <div className="p-5 pb-20 pt-28 sm:p-12 sm:pt-28 lg:p-[3vw] lg:pb-24 lg:pt-32 flex justify-center items-center">
                <Loader />
            </div>
        )
    }
    return (
        <div className="p-5 pb-16 pt-28 sm:p-12 sm:pt-28 lg:p-[3vw] lg:pb-24 lg:pt-32">
            {user?.role.toLowerCase() === "student" ? (
                <Student {...user} />
            ) : (
                <Teacher />
            )}
        </div>
    )
}

export default Page
