"use client";
import Image from "next/image";
import gurukul_logo from "../../../public/gurukul_logo.png";
import { useRecoilState, useSetRecoilState } from "recoil";
import { loginPopupAtom } from "@/recoil/Atoms/loginpopup";
import { IoClose } from "react-icons/io5";
import { signIn } from "../../../auth";
import SignIn from "./sign-in";

const Login = () => {
  const [loginPopup, setLoginPopup] = useRecoilState(loginPopupAtom);

  return (
    <div
      className={`${
        loginPopup ? "fixed" : "hidden"
      } h-full w-full bg-[#000000]/80 z-30 fixed`}
    >
      <div className="flex flex-col gap-4 w-[90vw] sm:w-[60vw] lg:w-[40vw] bg-white rounded-lg items-center justify-center pb-4 lg:pb-10 mx-auto mt-12 sm:mt-40 lg:mt-32">
        <div className=" flex justify-between w-[80%] items-center py-4">
          <Image src={gurukul_logo} className="h-12 w-fit" alt="Brand logo" />
          <IoClose
            size={30}
            className=" cursor-pointer rounded-full "
            onClick={() => {
              setLoginPopup(false);
            }}
          />
          <SignIn />
        </div>
      </div>
    </div>
  );
};

export default Login;
