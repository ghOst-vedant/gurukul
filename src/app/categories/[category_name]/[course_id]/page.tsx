import CoursePurchaseCard from "@/components/cards/CoursePurchaseCard";
import { TestimonialCard } from "@/components/cards/TestimonialCard";
import { BsPeopleFill } from "react-icons/bs";
import userProfile from "@/assets/images/user.png";
import InstructorCard from "@/components/cards/InstructorCard";
import CourseTestimonialCarousel from "@/components/ui/course/CourseTestimonialCarousel";
import { CourseCard } from "@/components/cards/CourseCard";
import CourseCarousel from "@/components/ui/course/CourseCarousel";

const Page = () => {
  const testimonials = [
    {
      name: "Theresa Webb",
      image: userProfile,
      role: "Web development bootcamp",
      testimonial:
        "With Gurukul Business employees were able to marry the two together, technology and consultant soft skills... to help drive their careers forward.",
    },
    {
      name: "Md Tahir Shikalgar",
      image: userProfile,
      role: "UI/UX designing",
      testimonial:
        "With Gurukul Business employees were able to marry the two together.",
    },
    {
      name: "Theresa Webb",
      image: userProfile,
      role: "Web development bootcamp",
      testimonial:
        "With Gurukul Business employees were able to marry the two together, technology and consultant soft skills... to help drive their careers forward.",
    },
    {
      name: "Md Tahir Shikalgar",
      image: userProfile,
      role: "UI/UX designing",
      testimonial:
        "With Gurukul Business employees were able to marry the two together.",
    },
    {
      name: "Theresa Webb",
      image: userProfile,
      role: "Web development bootcamp",
      testimonial:
        "With Gurukul Business employees were able to marry the two together, technology and consultant soft skills... to help drive their careers forward.",
    },
    {
      name: "Md Tahir Shikalgar",
      image: userProfile,
      role: "UI/UX designing",
      testimonial:
        "With Gurukul Business employees were able to marry the two together.",
    },
    {
      name: "Theresa Webb",
      image: userProfile,
      role: "Web development bootcamp",
      testimonial:
        "With Gurukul Business employees were able to marry the two together, technology and consultant soft skills... to help drive their careers forward.",
    },
    {
      name: "Md Tahir Shikalgar",
      image: userProfile,
      role: "UI/UX designing",
      testimonial:
        "With Gurukul Business employees were able to marry the two together.",
    },
  ];
  return (
    <div className="flex flex-col gap-10 lg:gap-16 lg:relative pb-16 lg:pb-16">
      <div className="bg-light_green px-4 pb-12 pt-28 sm:p-12 sm:pt-28 lg:px-[3vw] lg:pb-16 lg:pt-32 flex flex-col gap-3 shadow-md">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-black">
          Complete Web Development Bootcamp
        </h1>
        <span className="flex items-center gap-2">
          <BsPeopleFill className="text-xl" />
          <p className="font-medium text-lg lg:text-xl">1,23,232 students</p>
        </span>
        <p className="text-justify lg:w-[60vw]">
          With Gurukul Business employees were able to marry the two together,
          technology and consultant soft skills... to help drive their careers
          forward. With Gurukul Business employees were able to marry the two
          together, technology and consultant soft skills... to help drive their
          careers forward. With Gurukul Business employees were able to marry
          the two together, technology and consultant soft skills... to help
          drive their careers forward.
        </p>
      </div>
      <span className="px-4 sm:px-12 lg:px-0 sm:flex sm:justify-center lg:absolute right-[3vw] top-32">
        <CoursePurchaseCard />
      </span>
      <div className="px-4 sm:px-12 lg:px-[3vw] flex flex-col gap-2 mt-6">
        <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold">
          Course content
        </h2>
        <ul
          style={{ listStyleType: "disc" }}
          className="ml-4 flex flex-wrap gap-x-8"
        >
          <li>41 sections</li>
          <li>490 lectures</li>
          <li>65h 33m course duration</li>
        </ul>
        <div className="bg-black/20 lg:w-[60%] h-96 mt-4 flex items-center justify-center rounded-xl">
          Course content here (To - do)
        </div>
      </div>
      <div className="lg:px-[3vw] flex flex-col gap-16 lg:flex-row lg:justify-between mt-6">
        <div className="w-full lg:w-[57%] flex flex-col gap-6">
          <h2 className="px-4 sm:px-12 lg:px-0 text-lg sm:text-xl lg:text-2xl font-semibold">
            Reviews on this course
          </h2>
          <div className="hidden lg:block">
            <CourseTestimonialCarousel />
          </div>
          <div className="w-full overflow-x-scroll lg:hidden">
            <div className="flex gap-4 px-4 sm:px-12">
              {testimonials.map((testimonial, index) => (
                <TestimonialCard
                  key={index}
                  name={testimonial.name}
                  image=""
                  role={testimonial.role}
                  testimonial={testimonial.testimonial}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="sm:w-[70%] lg:w-[35%] px-4 sm:px-12 lg:px-0 flex flex-col gap-6">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold">
            About the Instructor
          </h2>
          <InstructorCard />
        </div>
      </div>
      <div className="flex flex-col gap-4 sm:gap-8 px-4 sm:px-12 lg:px-[3vw] mt-6 lg:mt-10">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-black">
          <span className="text-blue">Other courses</span> you may like
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

export default Page;
