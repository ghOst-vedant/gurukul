import underDevelopmentImage from "@/assets/images/underDevelopment.png";
import Image from "next/image";
import PopupScreen from "./PopupScreen";

export function UnderprogressPopup() {
  return (
    <PopupScreen>
      <Image
        src={underDevelopmentImage}
        alt="under development"
        className="w-[80%] lg:w-[50%] h-fit"
      />
      <p className="text-black text-xl text-center font-bold">
        The website is under development. <br />
        <span className="text-base font-normal">
          Explore what we have done so far
        </span>
      </p>
      <button className="text-md hover:text-white hover:bg-blue rounded-full px-5 py-2 border-2 border-blue font-medium sm:text-xl sm:px-7 sm:py-3">
        Close
      </button>
    </PopupScreen>
  );
}
