import Image from "next/image";
import hero_img from "../assets/images/hero_img.png"

const Home = () => {
  return (
    <div className="overflow-x-hidden flex flex-col">
      {/* Hero section */}
      <div className="bg-light_green pt-28 flex flex-col gap-8 sm:items-center lg:flex-row lg:justify-between lg:gap-0 lg:pt-24">
        <span className="flex flex-col gap-3 sm:gap-5 px-5 sm:w-[70%] sm:text-center sm:items-center lg:text-left lg:items-start lg:w-[50%] lg:pl-16 lg:pr-0 lg:mb-6">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-black lg:pt-0">
            <span className="text-blue font-bold">AI-Powered</span> Learning,
            Tailored Just for You
          </h1>
          <p className="text-md sm:text-xl lg:w-[70%]">
            Gurukul provides the tools and support to help you succeed. Start
            your journey today and experience education like never before.
          </p>
          <div className="flex mt-3 gap-2">
            <button className="text-md hover:text-white hover:bg-blue rounded-full px-5 py-2 border-2 border-blue font-medium sm:text-xl sm:px-7 sm:py-3">
              Join for Free
            </button>
            <button className="text-md text-white bg-blue rounded-full px-5 py-2 hover:border-2 hover:border-blue hover:bg-transparent hover:text-black font-medium sm:text-xl sm:px-7 sm:py-3">
              Browse Courses
            </button>
          </div>
        </span>
        <Image src={hero_img} alt="hero_img" className="w-full sm:w-[70%] lg:w-[50%]"/>
      </div>

      {/* No. of learner section */}
      
    </div>
  );
};

export default Home;
