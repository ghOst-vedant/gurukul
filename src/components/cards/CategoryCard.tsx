import Image from "next/image";
import course_img from "@/assets/images/course_img.png";
import star from "@/assets/icons/star.png";

type Category = {
  //   image: String;
  title: String;
};

export function CategoryCard(category: Category) {
  return (
    <div className="min-w-[75vw] sm:min-w-[40%] sm:max-w-[40%] lg:min-w-[20vw] lg:max-w-[20vw] p-2 border-2 rounded-2xl flex flex-col gap-4 cursor-pointer custom-shadow z-0">
      <Image
        src={course_img}
        alt="Course Image"
        className="w-full rounded-[10px]"
      />
      <button className="text-md rounded-full px-5 py-2 border-2 border-blue font-medium sm:text-xl sm:px-7 sm:py-2 ">
        {category.title}
      </button>
    </div>
  );
}