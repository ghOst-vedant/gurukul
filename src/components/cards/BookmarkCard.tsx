import Link from "next/link";
import teacher from "@/assets/images/teacher.png";
import Image from "next/image";
import { FaBook } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
export const BookmarkCard = () => {
  return (
    <Link href="#">
      <div className="border hover:shadow-md rounded-3xl flex justify-between items-center lg:px-6 px-5 lg:py-6 py-4 lg:gap-6 gap-4 min-w-[85vw] sm:min-w-[40%] sm:max-w-[40%] lg:min-w-[30vw] lg:max-w-[35vw] cursor-pointer">
        <Image
          alt="Teacher Profile picture"
          className="lg:h-36 lg:block hidden h-24 w-fit rounded-full"
          src={teacher}
        />
        {/* Mobile version */}
        <div className="flex flex-col gap-6 lg:hidden px-2 pt-1">
          <div className="lg:hidden flex gap-4 items-center">
            <Image
              alt="Teacher Profile picture"
              className="h-24 w-fit rounded-full"
              src={teacher}
            />
            <div className=" text-dark_blue">
              <h2 className=" text-2xl font-semibold">Jane Doe</h2>
              <p>Instructor | Science</p>
            </div>
          </div>
          <div className="flex justify-between items-center text-dark_blue text-lg">
            <span>
              <span className="flex gap-2 items-center justify-center">
                <FaStar size={27} />
                <span className="font-medium">3</span>
              </span>
              <span className="font-medium">Reviews</span>
            </span>
            <span>
              <span className="flex gap-2 items-center justify-center">
                <FaBook size={27} />
                <span className="font-medium">3</span>
              </span>
              <span className="font-medium">Course Created</span>
            </span>
          </div>
        </div>
        <div className="lg:flex hidden flex-col lg:justify-between items-start text-dark_blue ">
          <div className="">
            <h2 className=" text-2xl font-semibold">Jane Doe</h2>
            <p>Instructor | Science</p>
          </div>
          <div className=" flex justify-between items-center mt-8 gap-10">
            <span>
              <span className="flex gap-2 items-center justify-center">
                <FaStar size={27} />
                <span>3</span>
              </span>
              <span>Reviews</span>
            </span>
            <span>
              <span className="flex gap-2 items-center justify-center">
                <FaBook size={27} />
                <span>3</span>
              </span>
              <span>Course Created</span>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};
