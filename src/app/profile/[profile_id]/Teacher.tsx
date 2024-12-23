import { CourseCard } from "@/components/cards/CourseCard";
import { TestimonialCard } from "@/components/cards/TestimonialCard";
import Image from "next/image";
import { FaBook } from "react-icons/fa";
import { GiGraduateCap } from "react-icons/gi";
import userProfile from "@/assets/images/user.png";
import teacher from "@/assets/images/teacher.png";
export const Teacher = () => {
  return (
    <div className=" flex justify-between w-full lg:flex-row flex-col">
      <div className="lg:w-[25%] border flex flex-col justify-center items-center pt-10 rounded-3xl shadow-sm pb-3 ">
        <div className=" flex items-center justify-center flex-col gap-1 border-b border-black pb-5 px-2">
          <Image
            src={teacher}
            className="h-48 w-fit rounded-full"
            alt="Teacher Profile"
          />
          <h2 className=" text-xl px-8 border-b border-black">Jane Doe</h2>
          <p className="text-sm mt-1">Instructor | Science</p>
          <div className="flex justify-center gap-3 items-end">
            <span className=" flex flex-col justify-center items-center">
              <span className=" flex items-center gap-2">
                <GiGraduateCap size={35} />
                10000
              </span>
              <span>Students Enrolled</span>
            </span>
            <span className=" flex flex-col justify-center items-center">
              <span className=" flex items-center gap-2">
                <FaBook size={27} />3
              </span>
              <span>Students Enrolled</span>
            </span>
          </div>
        </div>
        <span className="px-5 p-4">
          <h3>About</h3>
          <p className="p-4 text-justify leading-5">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </span>
      </div>
      <div className="lg:w-[70%]  rounded-3xl w-full  lg:mt-0 mt-[15vw]">
        <div>
          <h1 className="text-2xl">Jane Doe's Courses</h1>
          <div className="mt-5 overflow-x-scroll  flex gap-5 p-1">
            <CourseCard />
            <CourseCard />
            <CourseCard />
            <CourseCard />
          </div>
        </div>
        <div className="pt-14">
          <h1 className="text-2xl">Testimonials</h1>
          <div className="mt-5 overflow-x-scroll  flex gap-5 p-1">
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
    </div>
  );
};

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
