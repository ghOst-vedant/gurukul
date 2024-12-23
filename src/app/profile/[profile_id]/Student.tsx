import Image from "next/image";
import student from "@/assets/images/teacher.png";
import { CourseCard } from "@/components/cards/CourseCard";
import { BookmarkCard } from "@/components/cards/BookmarkCard";
export const Student = () => {
  return (
    <div className="flex justify-between w-full lg:flex-row flex-col">
      <div className="lg:w-[25%] border flex flex-col justify-center items-center pt-10 rounded-3xl shadow-sm pb-3 ">
        <div className=" flex items-center justify-center flex-col gap-1 border-b-[2.5px] border-black pb-4 px-10">
          <Image
            src={student}
            className="h-48 w-fit rounded-full shadow-md"
            alt="Teacher Profile"
          />
          <h2 className=" text-xl mt-2 px-8 border-b border-black">
            Aniket Sahu
          </h2>
          <span className="mt-1 flex flex-col justify-center items-center">
            <p className="">aniket@gmail.com</p>
            <p className="text-sm">India</p>
          </span>
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
          <h1 className="text-2xl">My Courses</h1>
          <div className="mt-5 overflow-x-scroll  flex gap-5 p-1">
            <CourseCard />
            <CourseCard />
            <CourseCard />
            <CourseCard />
          </div>
        </div>
        <div className="mt-14">
          <h1 className="text-2xl font-light">Bookmarked Teachers</h1>
          <div className=" flex gap-10 p-2 lg:flex-wrap overflow-x-scroll">
            <BookmarkCard />
            <BookmarkCard />
          </div>
        </div>

        <div className="mt-14">
          <h1 className=" text-2xl font-light">Edit profile</h1>
          <div className=" mt-6 border shadow-sm rounded-3xl py-8 px-4">
            <h2 className="">Basic info</h2>
            <div className=" mt-10 flex flex-col gap-6 font-light">
              <span className=" flex justify-between border-b border-black px-2 pb-2">
                <p>Name</p>
                <p>Aniket Sahu</p>
                <p className=" text-blue">Edit</p>
              </span>
              <span className=" flex justify-between border-b border-black px-2 pb-2">
                <p>Gender</p>
                <p>Male</p>
                <p className=" text-blue">Edit</p>
              </span>
              <span className=" flex justify-between border-b border-black px-2 pb-2">
                <p>Age</p>
                <p>21</p>
                <p className=" text-blue">Edit</p>
              </span>
              <span className=" flex justify-between border-b border-black px-2 pb-2">
                <p>Mobile No</p>
                <p>9999999988</p>
                <p className=" text-blue">Edit</p>
              </span>
              <span className=" flex justify-between  px-2 pb-2">
                <p>Email</p>
                <p>vedant30@gmail.com</p>
                <p className=" text-blue">Edit</p>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
