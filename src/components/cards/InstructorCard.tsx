import teacher from "@/assets/images/teacher.png";
import Image from "next/image";
import { FiExternalLink } from "react-icons/fi";

const InstructorCard = () => {
  return (
    <div className="border-2 rounded-2xl p-3 flex flex-col lg:flex-row gap-5 custom-shadow cursor-pointer relative">
      <Image
        src={teacher}
        alt="teacher profile"
        className="h-44 w-fit rounded-lg hidden lg:block"
      />
      <FiExternalLink className="absolute text-lg hidden lg:block top-3 right-3" />
      <span className="flex gap-3 items-center relative lg:hidden">
        <Image
          src={teacher}
          alt="teacher profile"
          className="h-12 w-fit rounded-full"
        />
        <span className="flex flex-col">
          <h3 className="font-semibold">John Doe</h3>
          <p className="text-sm">Ex Amazon, Facebook employee</p>
        </span>
        <FiExternalLink className="absolute right-0 top-0 text-lg" />
      </span>
      <div className="flex flex-col gap-4">
        <span className="flex-col hidden lg:block">
          <h3 className="text-xl font-semibold">John Doe</h3>
          <p className="text-sm">Ex Amazon, Facebook employee</p>
        </span>
        <p className="text-sm sm:text-base lg:leading-5">
          With Gurukul Business employees were able to marry the two together,
          technology and consultant soft skills... to help drive their careers
          forward.
        </p>
      </div>
    </div>
  );
};

export default InstructorCard;
