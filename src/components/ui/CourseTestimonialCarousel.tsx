"use client";
import { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import userProfile from "@/assets/images/user.png";
import { TestimonialCard } from "../cards/TestimonialCard";

const CourseTestimonialCarousel = () => {
  const [index, setIndex] = useState(0);
  const handlePrev = () => {
    setIndex((index) => index - 1);
  };

  const handleNext = () => {
    setIndex((index) => index + 1);
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

  return (
    <div className="flex gap-[3vw] courseViewport overflow-hidden items-center w-full justify-between">
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
          className={`flex gap-[2vw] transition-all py-1`}
          style={{
            transform: `translateX(-${index * 22}vw)`,
            transitionDuration: "500ms",
          }}
        >
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
      <button
        className={`border-2 border-blue p-1 rounded-full ${
          index === testimonials.length - 2
            ? "opacity-50"
            : "opacity-100 hover:bg-blue hover:text-white"
        }`}
        onClick={handleNext}
        disabled={index === testimonials.length - 2}
      >
        <IoIosArrowBack className="rotate-180 text-2xl" />
      </button>
    </div>
  );
};

export default CourseTestimonialCarousel;
