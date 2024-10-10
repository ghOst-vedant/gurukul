"use client";
import { useState, useEffect } from "react";
import underDevelopmentImage from "@/assets/images/underDevelopment.png";
import Image from "next/image";

export function UnderprogressPopup() {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`${
        showPopup ? "fixed" : "hidden"
      } h-full w-full bg-[#000000]/80 z-30 fixed`}
    >
      <div className="flex flex-col gap-4 w-[90vw] sm:w-[60vw] lg:w-[40vw] bg-white rounded-lg items-center justify-center pb-4 lg:pb-10 mx-auto mt-12 sm:mt-40 lg:mt-32">
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
        <button
          className="text-md hover:text-white hover:bg-blue rounded-full px-5 py-2 border-2 border-blue font-medium sm:text-xl sm:px-7 sm:py-3"
          onClick={() => setShowPopup(false)}
        >
          Close
        </button>
      </div>
    </div>
  );
}
