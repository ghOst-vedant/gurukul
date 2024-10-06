import Image from "next/image";
import Link from "next/link";
import { LearnerDataCard } from "@/components/cards/learnerDataCard";
import { CourseCard } from "@/components/cards/CourseCard";
import { TestimonialCard } from "@/components/cards/TestimonialCard";

import { FiSearch } from "react-icons/fi";
import { FaArrowRight } from "react-icons/fa";

import hero_img from "../assets/images/hero_img.png";
import home_ad_img from "@/assets/images/home_ad_img.png";

const Home = () => {
  const learnersData = [
    {
      number: 1.2,
      domain: "Web Development",
    },
    {
      number: 2.2,
      domain: "UI/UX Designing",
    },
    {
      number: 3.2,
      domain: "Cloud Computing",
    },
    {
      number: 4.2,
      domain: "Cyber Security",
    },
    {
      number: 5.2,
      domain: "Blockchain",
    },
    {
      number: 6.2,
      domain: "Machine Learning",
    },
    {
      number: 7.2,
      domain: "Artificial Intelligence",
    },
    {
      number: 8.2,
      domain: "Frontend Development",
    },
    {
      number: 9.2,
      domain: "Backend Development",
    },
  ];

  return (
    <div className="overflow-x-hidden flex flex-col gap-16">
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
        <Image
          src={hero_img}
          alt="hero_img"
          className="w-full sm:w-[70%] lg:w-[50%]"
        />
      </div>

      {/* No. of learner section */}
      <div className="flex flex-col px-4 gap-6 lg:gap-10">
        <p className="text-center lg:text-lg">
          School kid or an Industry Professional, we have covered everything for
          you
        </p>
        <div className="overflow-x-hidden">
          <span className="flex gap-5 py-2">
            {learnersData.map((learnerData, index) => (
              <LearnerDataCard
                key={index}
                number={learnerData.number}
                domain={learnerData.domain}
              />
            ))}
          </span>
        </div>
      </div>

      {/* Course Section */}
      <div className="flex flex-col gap-5 sm:gap-8 lg:px-16 lg:gap-8 mt-4">
        <div className="flex flex-col gap-4 px-4 sm:items-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-center text-black px-2">
            Your next step to
            <span className="text-blue"> Get future ready</span>
          </h2>
          <p className="text-center sm:text-lg sm:w-[70vw]">
            From foundational skills to advanced subjects, our platform supports
            your holistic educational growth
          </p>
        </div>
        <div className="flex justify-between items-center mt-2 gap-4 pl-4 sm:pl-6">
          <button className="rounded-full p-3 bg-blue lg:hidden">
            <FiSearch color="white" className="text-xl sm:text-3xl" />
          </button>
          <input
            type="text"
            name="desktopNavSearch"
            id="desktopNavSearch"
            placeholder="Search course..."
            className="border-black/60 rounded-full border-2 font-medium text-lg px-5 py-[6px] focus:outline-none text-black/60 w-[25vw] hidden lg:block"
          />
          <div className="overflow-x-scroll lg:overflow-x-hidden">
            <span className="flex gap-3">
              {learnersData.slice(0, 4).map((data, index) => (
                <button
                  className="min-w-fit hover:border-blue rounded-full px-5 py-2 border-[2px] border-black/40 sm:text-lg lg:text-base sm:px-7 sm:py-3 lg:px-5 lg:py-2"
                  key={index}
                >
                  {data.domain}
                </button>
              ))}
              <Link
                href="/categories"
                className="flex items-center justify-center gap-2 min-w-fit border-blue font-semibold text-blue rounded-full px-5 py-2 border-[2px] sm:text-lg lg:text-base sm:px-7 sm:py-3 lg:px-5 lg:py-2 hover:text-white hover:bg-blue"
              >
                <span>View all</span> <FaArrowRight />
              </Link>
            </span>
          </div>
        </div>
        <div className="mt-5 overflow-x-scroll lg:overflow-x-hidden lg:flex lg:justify-center px-4 sm:px-6">
          <span className="flex gap-5 py-2">
            <CourseCard />
            <CourseCard />
            <CourseCard />
            <CourseCard />
          </span>
        </div>
      </div>

      {/* Ad Section */}
      <div className="bg-light_green mt-6 flex flex-col gap-6 shadow-[12px_0px_12px_0px_rgba(0,0,0,0.8)] sm:shadow-[12px_0px_12px_0px_rgba(0,0,0,0.4)] lg:flex-row lg:pt-10 lg:px-36 lg:items-center lg:justify-center lg:gap-0 lg:mt-10">
        <div className="px-4 sm:px-10 pt-10 sm:py-14 lg:pb-24 flex flex-col gap-4 sm:gap-6 sm:items-center lg:items-start lg:px-0">
          <h3 className="text-2xl sm:text-3xl lg:text-4xl sm:w-[80%] lg:w-full sm:text-center text-black font-semibold lg:leading-[48px] lg:text-start">
            Advance your personal and professional aspirations with{" "}
            <span className="text-3xl sm:text-4xl lg:text-5xl text-blue">
              Gurukul
            </span>
          </h3>
          <div className="flex mt-3 gap-2">
            <button className="text-md hover:text-white hover:bg-blue rounded-full px-5 py-2 border-2 border-blue font-medium sm:text-xl sm:px-7 sm:py-3">
              Join for Free
            </button>
            <Link
              href="/categories"
              className="text-md text-white bg-blue rounded-full px-5 py-2 border-2 border-blue hover:bg-transparent hover:text-black font-medium sm:text-xl sm:px-7 sm:py-3"
            >
              Browse Courses
            </Link>
          </div>
        </div>
        <Image
          src={home_ad_img}
          alt="ad image"
          className="w-[80%] sm:w-[60%] self-end sm:hidden lg:block lg:w-[35%]"
        />
      </div>

      {/* Top Course Section */}
      <div className="flex flex-col gap-5 sm:gap-8 lg:px-16 lg:gap-8 mt-4 lg:mt-10">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-center text-black px-4">
          <span className="text-blue">Kickstart Your Learning</span> with Top
          Courses
        </h2>
        <div className="mt-5 overflow-x-scroll lg:overflow-x-hidden lg:flex lg:justify-center px-4 sm:px-6">
          <span className="flex gap-5 py-2">
            <CourseCard />
            <CourseCard />
            <CourseCard />
            <CourseCard />
          </span>
        </div>
      </div>

      {/* Testimonial Section */}
      <div className="flex flex-col gap-5 sm:gap-8 lg:px-16 lg:gap-8 mt-4 lg:mt-10 mb-20 lg:mb-28">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-center text-black px-4">
          <span className="text-blue">Listen to experiences</span> shared by
          others
        </h2>
        <span className="flex flex-col gap-1 mt-5">
          <div className="overflow-x-scroll lg:overflow-x-hidden lg:flex lg:justify-center px-4 sm:px-6">
            <span className="flex gap-5 py-2">
              <TestimonialCard />
              <TestimonialCard />
              <TestimonialCard />
              <TestimonialCard />
            </span>
          </div>
          <div className="overflow-x-scroll lg:overflow-x-hidden lg:justify-center px-4 sm:px-6 sm:hidden">
            <span className="flex gap-5 py-2">
              <TestimonialCard />
              <TestimonialCard />
              <TestimonialCard />
              <TestimonialCard />
            </span>
          </div>
        </span>
      </div>
    </div>
  );
};

export default Home;
