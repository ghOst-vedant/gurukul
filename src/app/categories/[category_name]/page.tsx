//Specific category page
"use client";
import { CourseCard } from "@/components/cards/CourseCard";
import { usePathname } from "next/navigation";
import useWindowStatus from "@/app/Custom_hooks/useWindowStatus";
import CourseCarousel from "@/components/ui/CourseCarousel";

const page = () => {
  const currentPage = usePathname();
  const windowStatus = useWindowStatus();

  const getCategory = () => {
    const urlPath = currentPage.split("/");
    const category = urlPath[urlPath.length - 1]
      .split("-")
      .map((str) => str.charAt(0).toUpperCase() + str.slice(1))
      .join(" ");
    return category;
  };

  return (
    <div className="p-4 pt-28 sm:p-12 sm:pt-28 lg:p-[3vw] lg:pt-32 flex flex-col gap-10 sm:gap-8 lg:gap-12">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-black">
          <span className="text-blue">{getCategory()} </span>Courses
        </h1>
        <p className="sm:text-lg sm:w-[70vw] lg:w-[50vw]">
          Gain insights from experts with real-world experience
        </p>
      </div>
      <div className="flex flex-col sm:gap-4">
        <h2 className="text-lg sm:text-xl lg:text-2xl">
          Start strong with our featured courses on {getCategory()}
        </h2>
        <div className="mt-5 overflow-x-scroll lg:hidden flex gap-5">
          <CourseCard />
          <CourseCard />
          <CourseCard />
          <CourseCard />
        </div>
        <span className="mt-5 hidden lg:block">
          <CourseCarousel />
        </span>
      </div>
    </div>
  );
};

export default page;
