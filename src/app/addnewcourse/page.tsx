"use client";

import { Dispatch, SetStateAction, useState } from "react";
import CourseCreateBasicDetails from "@/components/ui/course/CourseCreateBasicDetails";
import CourseCreateCurriculum from "@/components/ui/course/CourseCreateCurriculum";
import CourseCreatePricing from "@/components/ui/course/CourseCreatePricing";
import CourseCreatePublishCourse from "@/components/ui/course/CourseCreatePublishCourse";

export type Pricing = {
  isCourseFree: boolean;
  price: number;
};
export type Lecture = {
  lectureTitle: string;
  content: string;
};

export type Test = {
  title: string;
  questions: {
    questionId: string;
    questionType: string;
    question?: Mcq | Descriptive;
  }[];
};

export type Mcq = {
  title: string;
  options: string[];
  correctAnswer: number;
};

export type Descriptive = {
  title: string;
  correctAnswer: string;
};

export type Assignment = {
  assignmentTitle: string;
  content: string;
};

export type CurriculumSection = {
  sectionId: string;
  sectionTitle: string;
  sectionContent: {
    type: string;
    id: string;
    data: Lecture | Test | Assignment;
  }[];
};

export type BasicDetails = {
  title: string;
  subtitle: string;
  description: string;
  language: string;
  difficulty: string;
  category: string;
  courseImage: string;
  coursePromotionalVideo: string;
};

const Page = () => {
  const sideLinks = [
    "Basic details",
    "Curriculum",
    "Pricing",
    "Publish Course",
  ];

  const [currentview, setCurrentView]: [
    string,
    Dispatch<SetStateAction<string>>
  ] = useState("Basic details");

  const [basicDetails, setBasicDetails] = useState<BasicDetails>({
    title: "",
    subtitle: "",
    description: "",
    language: "English",
    difficulty: "Beginner Level",
    category: "Full Stack Web Development",
    courseImage: "",
    coursePromotionalVideo: "",
  });

  const [curriculum, setCurriculum] = useState<CurriculumSection[]>([]);
  const [pricing, setPricing] = useState<Pricing>({
    isCourseFree: true,
    price: 0,
  });
  return (
    <div className="px-4 pb-16 pt-28 sm:p-12 sm:pt-28 lg:px-24 lg:pb-24 lg:pt-32 flex flex-col sm:flex-row gap-10 sm:gap-8 lg:gap-20">
      <div className="sm:w-[15%] flex flex-col gap-2 h-fit">
        <h3 className="text-lg font-semibold">Plan your course</h3>
        <div>
          {sideLinks.map((link, index) => (
            <span className="flex gap-3" key={index}>
              <div
                className={`w-1 ${
                  link === currentview ? "bg-blue" : "bg-white"
                }`}
              />
              <button
                className="text-start py-2 w-full"
                onClick={() => setCurrentView(link)}
              >
                {link}
              </button>
            </span>
          ))}
        </div>
      </div>
      {currentview === "Basic details" && (
        <CourseCreateBasicDetails
          basicDetails={basicDetails}
          setBasicDetails={setBasicDetails}
        />
      )}
      {currentview === "Curriculum" && (
        <CourseCreateCurriculum
          curriculum={curriculum}
          setCurriculum={setCurriculum}
        />
      )}
      {currentview === "Pricing" && (
        <CourseCreatePricing pricing={pricing} setPricing={setPricing} />
      )}
      {currentview === "Publish Course" && (
        <CourseCreatePublishCourse
          basicDetails={basicDetails}
          curriculum={curriculum}
          pricing={pricing}
        />
      )}
    </div>
  );
};

export default Page;
