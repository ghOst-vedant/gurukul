import Image from "next/image";
import course_img from "@/assets/images/course_img.png";
import { FaStar } from "react-icons/fa";

type Course = {
  image: String;
  title: String;
  rating: Number;
  professor: String;
  price: Number;
};

export function CourseCard() {
  return (
    <div className="min-w-[75vw] sm:min-w-[40%] sm:max-w-[40%] lg:min-w-[20vw] lg:max-w-[20vw] p-2 border-2 rounded-2xl relative overflow-hidden flex flex-col gap-2 cursor-pointer custom-shadow z-0">
      <span className="absolute right-0 top-0 bg-yellow flex items-center justify-center gap-2 px-2 py-[6px] rounded-bl-xl">
        <p>4.7</p>
        <FaStar />
      </span>
      <Image
        src={course_img}
        alt="Course Image"
        className="w-full rounded-[10px]"
      />
      <h3 className="text-[18px] font-semibold">
        Complete Web Development Bootcamp
      </h3>
      <p className="font-semibold text-black/60">by Md Tahir Shikalgar</p>
      <p className="text-2xl font-semibold">₹499</p>
    </div>
  );
}
