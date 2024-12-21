import course_img from "@/assets/images/course_img.png";
import Image from "next/image";
import { FaStar } from "react-icons/fa";

const CoursePurchaseCard = () => {
  return (
    <div className="w-full lg:w-[24vw] bg-white shadow p-3 lg:p-4 rounded-2xl flex flex-col sm:flex-row lg:flex-col gap-3 sm:gap-5 lg:gap-3">
      <div className="flex flex-col gap-3 sm:w-[40%] lg:w-full">
        <Image src={course_img} alt="Course banner" className="rounded-lg" />
        <div className="flex justify-between items-center">
          <p className="text-2xl font-semibold text-black">
            ₹499{" "}
            <span className="text-xl text-black/60 line-through font-normal">
              ₹999
            </span>
          </p>
          <span className="bg-yellow flex items-center justify-center gap-2 px-2 py-[6px] rounded-lg">
            <p>4.7</p>
            <FaStar />
          </span>
        </div>
        <button className="rounded-full px-5 py-2 bg-blue text-white text-lg sm:px-7 sm:py-3 lg:px-5 lg:py-2 mt-3">
          Purchase Course
        </button>
      </div>
      <hr className="mt-3 border-[1px] sm:border-2 lg:border-[1px] sm:h-[95%]" />
      <div className="mt-2">
        <p className="text-lg font-semibold">This course includes</p>
        <ul style={{ listStyleType: "disc" }} className="ml-4 mt-2">
          <li>65 hours on-demand video</li>
          <li>49 downlodable resources</li>
          <li>Access on mobile and TV</li>
          <li>86 articles</li>
          <li>8 coding excercises</li>
          <li>Certificate of completion</li>
        </ul>
      </div>
    </div>
  );
};

export default CoursePurchaseCard;
