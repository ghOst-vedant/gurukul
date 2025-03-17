"use client";
import { useState } from "react";
import { CourseCard } from "../../cards/CourseCard";
import { IoIosArrowBack } from "react-icons/io";
import Link from "next/link";

type carouselProps = {
  courses: any;
};
const CourseCarousel = ({ courses }: carouselProps) => {
  const [index, setIndex] = useState(0);
  const handlePrev = () => {
    setIndex((index) => index - 1);
  };
  const handleNext = () => {
    setIndex((index) => index + 1);
  };

  return (
    <div className="flex gap-[2.5vw] courseViewport overflow-hidden items-center w-full justify-between">
      <button
        className={`border-2 border-blue p-1 rounded-full ${
          index === 0
            ? "opacity-50"
            : "opacity-100 hover:bg-blue hover:text-white"
        }`}
        onClick={handlePrev}
        disabled={index === 0}
      >
        <IoIosArrowBack className="text-2xl" />
      </button>
      <div className="w-full overflow-x-hidden">
        <div
          className={`flex gap-[1vw] transition-all py-1`}
          style={{
            transform: `translateX(-${index * 21}vw)`,
            transitionDuration: "500ms",
          }}
        >
          {courses.map((course: any, key: number) => (
            <Link
              href={`/categories/${course.category
                .split(" ")
                .join("-")
                .toLowerCase()}/${course.id}`}
              key={key}
            >
              <CourseCard course_id={course.id} />
            </Link>
          ))}
        </div>
      </div>
      <button
        className={`border-2 border-blue p-1 rounded-full ${
          index === courses.length - 4
            ? "opacity-50"
            : "opacity-100 hover:bg-blue hover:text-white"
        }`}
        onClick={handleNext}
        disabled={index === courses.length - 4}
      >
        <IoIosArrowBack className="rotate-180 text-2xl" />
      </button>
    </div>
  );
};

export default CourseCarousel;
