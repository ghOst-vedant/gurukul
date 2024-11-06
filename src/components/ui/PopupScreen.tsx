"use client";
import { useState, useEffect } from "react";

const PopupScreen = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
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
        {children}
      </div>
    </div>
  );
};

export default PopupScreen;
