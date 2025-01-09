//Specific category page
"use client";
import { CourseCard } from "@/components/cards/CourseCard";
import { usePathname } from "next/navigation";
import useWindowStatus from "@/app/Custom_hooks/useWindowStatus";
import CourseCarousel from "@/components/ui/course/CourseCarousel";
import { IoOptionsOutline } from "react-icons/io5";
import { FcAlphabeticalSortingAz } from "react-icons/fc";
type Params = {
  category_name: string;
};
const page = ({ params }: { params: Params }) => {
  const { category_name } = params;
  const getCategory = () => {
    const category = category_name
      .split("-")
      .map((str) => str.charAt(0).toUpperCase() + str.slice(1))
      .join(" ");
    return category;
  };

  return (
    <div className="p-4 pb-16 pt-28 sm:p-12 sm:pt-28 lg:p-[3vw] lg:pb-24 lg:pt-32 flex flex-col gap-10 lg:gap-16">
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
      <div className="flex flex-col gap-5 sm:gap-8 lg:gap-8 mt-4">
        <h2 className="text-lg sm:text-xl lg:text-2xl">
          All {getCategory()} Courses
        </h2>
        <div className="overflow-x-scroll lg:overflow-x-hidden">
          <span className="flex gap-3">
            <input
              type="text"
              name="desktopNavSearch"
              id="desktopNavSearch"
              placeholder="Search topic..."
              className="border-black/60 rounded-full border-2 font-medium text-lg px-5 py-[6px] focus:outline-none text-black/60 lg:w-[25vw]"
            />
            <button className="flex gap-2 items-center hover:border-blue rounded-full px-5 py-2 border-[2px] border-black/40 sm:text-lg lg:text-base sm:px-7 sm:py-3 lg:px-5 lg:py-2">
              <IoOptionsOutline className="text-xl" />
              <span>Filter</span>
            </button>
            <button className="flex gap-2 items-center hover:border-blue rounded-full px-5 border-[2px] border-black/40 sm:text-lg lg:text-base sm:px-7 lg:px-5">
              <FcAlphabeticalSortingAz className="text-xl" />
              <select name="sortby" id="sortby" className="py-2">
                <option value="mostpopular">Sort by | Most Popular</option>
                <option value="rating">Sort by | Highest Rating</option>
                <option value="duration">Sort by | Course Duration</option>
              </select>
            </button>
          </span>
        </div>
        <div className="mt-5 flex gap-5 lg:gap-10 flex-wrap justify-evenly">
          <CourseCard />
          <CourseCard />
          <CourseCard />
          <CourseCard />
          <CourseCard />
          <CourseCard />
          <CourseCard />
          <CourseCard />
          <CourseCard />
          <CourseCard />
          <CourseCard />
          <CourseCard />
          <CourseCard />
          <CourseCard />
        </div>
      </div>
    </div>
  );
};

export default page;
