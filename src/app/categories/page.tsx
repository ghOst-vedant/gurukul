import { CategoryCard } from "@/components/cards/CategoryCard";

//Category page which will be open when clicked on category button. It will simply contain all the categories.
const Page = () => {
  return (
    <div className="p-4 pb-16 pt-28 sm:p-12 sm:pt-28 lg:p-[3vw] lg:pb-24 lg:pt-32 flex flex-col gap-10 sm:gap-8 lg:gap-12">
      <div className="flex flex-col gap-2 sm:text-center sm:items-center">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-black">
          <span className="text-blue">Categories </span>to Elevate Your Skills
        </h2>
        <p className="sm:text-lg sm:w-[70vw] lg:w-[50vw]">
          Discover expertly curated categories crafted for developers and tech
          enthusiasts to level up their skills and build the future.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row flex-wrap items-center sm:justify-center gap-4 sm:gap-10">
        <CategoryCard title="Frontend Development" />
        <CategoryCard title="Backend Development" />
        <CategoryCard title="Full Stack Development" />
        <CategoryCard title="Cloud Computing" />
        <CategoryCard title="Cyber Security" />
        <CategoryCard title="Machine Learning" />
        <CategoryCard title="Artificial Intelligence" />
        <CategoryCard title="AR and VR" />
      </div>
    </div>
  );
};

export default Page;
