import { getSignedInUser } from "@/actions/getActions"
import teacher from "@/assets/images/teacher.png"
import Image from "next/image"
import { useEffect, useState } from "react"
import { FiExternalLink } from "react-icons/fi"

type instructorProps = { id: string }
const InstructorCard = ({ id }: instructorProps) => {
    console.log(id)
    const [teacher, setTeacher] = useState<any>()
    useEffect(() => {
        const getTeacher = async () => {
            const teacher = await getSignedInUser(id)
            setTeacher(teacher)
        }
        getTeacher()
    }, [id])
    console.log(teacher)

    return (
        <div className="border-2 rounded-2xl p-3 flex flex-col  gap-5 custom-shadow cursor-pointer relative">
            {/* Teacher Image Section */}
            <div className="flex gap-4 items-center">
                <img
                    src={teacher?.image || teacher}
                    alt="teacher profile"
                    className=" w-24 rounded-full mx-auto lg:block"
                />
                <span className="flex-col hidden lg:block">
                    <h3 className="text-xl font-semibold">John Doe</h3>
                    <p className="text-sm">Ex Amazon, Facebook employee</p>
                </span>
            </div>

            {/* Teacher Info Section */}
            <div>
                {/* On smaller screens, show name and description inline with image
                <span className="flex gap-3 items-center lg:hidden">
                    <img
                        src={teacher?.image || teacher}
                        alt="teacher profile"
                        className="h-12 w-fit rounded-full"
                    />
                    <span className="flex flex-col">
                        <h3 className="font-semibold">{teacher?.name}</h3>
                        <p className="text-sm">Ex Amazon, Facebook employee</p>
                    </span>
                    <FiExternalLink className="absolute right-0 top-0 text-lg" />
                </span> */}

                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-6">
                    {/* Theory Text */}
                    <p className="text-sm sm:text-base lg:leading-5">
                        With Gurukul Business employees were able to marry the
                        two together, technology and consultant soft skills...
                        to help drive their careers forward.
                    </p>
                </div>
            </div>

            {/* External Link Icon */}
            <FiExternalLink className="absolute text-lg hidden lg:block top-3 right-3" />
        </div>
    )
}

export default InstructorCard
