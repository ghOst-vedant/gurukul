import Loader from "@/components/ui/Loader"

const Loading = () => {
    return (
        <div className="p-5 pb-20 pt-28 sm:p-12 sm:pt-28 lg:p-[3vw] lg:pb-24 lg:pt-32 flex justify-center items-center">
            <Loader />
        </div>
    )
}

export default Loading
