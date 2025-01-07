import React, { Dispatch, SetStateAction } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";
import { BasicDetails } from "@/app/addnewcourse/page";

type CourseCreateBasicDetailsProps = {
  // setCurrentView: Dispatch<SetStateAction<string>>;
  basicDetails: BasicDetails;
  setBasicDetails: Dispatch<SetStateAction<BasicDetails>>;
};

const CourseCreateBasicDetails: React.FC<CourseCreateBasicDetailsProps> = ({
  // setCurrentView,
  basicDetails,
  setBasicDetails,
}) => {
  return (
    <div className="w-full shadow flex flex-col h-fit rounded-lg">
      <h2 className="text-2xl font-medium p-8 border-b-2">Basic Details</h2>
      <div className="p-8 flex flex-col gap-8">
        <p>
          Your course landing page is key to success. Make it compelling,
          showcase your course's value, and highlight why learners should
          enroll. A great page boosts visibility and attracts learners.
        </p>
        <div className="flex flex-col gap-6">
          <span className="flex flex-col w-full gap-2">
            <label htmlFor="title" className="font-medium text-lg">
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Eg:Full Stack Web Development Bootcamp"
              className="border-[1px] border-black/60 rounded-lg px-4 py-3 outline-none"
            />
          </span>
          <span className="flex flex-col w-full gap-2">
            <label htmlFor="subtitle" className="font-medium text-lg">
              Sub title
            </label>
            <input
              type="text"
              name="subtitle"
              id="subtitle"
              placeholder="Eg:Master Frontend and Backend Development to Build Dynamic, Scalable Websites and Applications"
              className="border-[1px] border-black/60 rounded-lg px-4 py-3 outline-none"
            />
          </span>
          <span className="flex flex-col w-full gap-2">
            <label htmlFor="description" className="font-medium text-lg">
              Description
            </label>
            <textarea
              name="description"
              id="description"
              rows={8}
              placeholder="Description..."
              className="border-[1px] border-black/60 rounded-lg px-4 py-3 outline-none"
            />
          </span>
          <div className="grid grid-cols-12 gap-10">
            <span className="flex flex-col col-span-3 gap-2">
              <label htmlFor="language" className="font-medium text-lg">
                Language
              </label>
              <select
                name="language"
                id="language"
                className="border-[1px] border-black/60 rounded-lg px-4 py-3 outline-none"
              >
                <option value="English">English</option>
                <option value="Hindi">Hindi</option>
                <option value="Marathi">Marathi</option>
              </select>
            </span>
            <span className="flex flex-col col-span-4 gap-2">
              <label htmlFor="difficulty" className="font-medium text-lg">
                Difficulty
              </label>
              <select
                name="difficulty"
                id="difficulty"
                className="border-[1px] border-black/60 rounded-lg px-4 py-3 outline-none"
              >
                <option value="Begineer-level">Beginner Level</option>
                <option value="Intermediate-level">Intermediate Level</option>
                <option value="Expert-level">Expert Level</option>
                <option value="All-levels">All Levels</option>
              </select>
            </span>
            <span className="flex flex-col col-span-5 gap-2">
              <label htmlFor="category" className="font-medium text-lg">
                Category
              </label>
              <select
                name="category"
                id="category"
                className="border-[1px] border-black/60 rounded-lg px-4 py-3 outline-none"
              >
                <option value="Marathi">Full Stack Web Development</option>
                <option value="English">Frontend Development</option>
                <option value="Hindi">Backend Development</option>
              </select>
            </span>
          </div>
          <div className="grid grid-cols-12 gap-10">
            <span className="flex flex-col col-span-6 gap-2">
              <p className="font-medium text-lg">Course Image</p>
              <label
                htmlFor="courseImage"
                className="font-medium text-lg bg-black/40 text-white/60 cursor-pointer rounded-lg h-40 flex flex-col gap-2 items-center justify-center"
              >
                <span>Course Image</span>
                <IoCloudUploadOutline className="text-5xl" />
              </label>
              <input
                type="file"
                name="courseImage"
                id="courseImage"
                className="hidden"
              />
            </span>
            <span className="flex flex-col col-span-6 gap-2">
              <p className="font-medium text-lg">Course Promotional Video</p>
              <label
                htmlFor="courseVideo"
                className="font-medium text-lg bg-black/40 text-white/60 cursor-pointer rounded-lg h-40 flex flex-col gap-2 items-center justify-center"
              >
                <span>Course Promotional Video</span>
                <IoCloudUploadOutline className="text-5xl" />
              </label>
              <input
                type="file"
                name="courseVideo"
                id="courseVideo"
                className="hidden"
              />
            </span>
          </div>
          <div className="flex justify-end mt-4">
            <button className="text-black hover:text-white hover:bg-blue border-2 border-blue rounded-full px-5 py-2 sm:px-4 sm:py-2 mx-auto">
              <p>Save Changes</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCreateBasicDetails;
