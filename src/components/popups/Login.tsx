"use client";

import gurukul_logo from "../../../public/gurukul_logo.png";
import { useRecoilState } from "recoil";
import { loginPopupAtom } from "@/recoil/Atoms/loginpopup";
import { IoClose, IoLogoGoogle } from "react-icons/io5";
import Image from "next/image";
import { login, loginWithCreds } from "@/actions/auth";
import { redirect } from "next/navigation";

const Login = () => {
  const [loginPopup, setLoginPopup] = useRecoilState(loginPopupAtom);

  return (
    <div
      className={`${
        loginPopup ? "fixed" : "hidden"
      } h-full w-full  z-30 fixed`}
    >
      <div className="flex justify-center items-center h-screen bg-black/80">
      <div className="bg-white rounded-xl shadow-lg p-6 w-96 relative">
        <IoClose className="cursor-pointer right-4 absolute " size={30} onClick={()=>setLoginPopup(false)}/>
        <div className="text-center mb-6">
          <Image
            src={gurukul_logo}
            alt="Logo"
            className="w-28 mx-auto"
          />
        </div>
        <h2 className="text-2xl font-semibold text-center">Login</h2>
        <p className="text-gray-500 text-sm  text-center mb-4">Enter account details</p>
        <form action={loginWithCreds} className="flex flex-col justify-center items-center">
          <div className="mb-4">
            <input
            type="email"
            placeholder="Email"
            id="Email"
            name="email"
              className="mt-1 block  border-b-2 border-dark_blue rounded-md p-2"
            />
          </div>
          <div className="mb-4">
            <input
             type="password"
             placeholder="Password"
             name="password"
             id="password"
              className="mt-1 block  border-b-2 border-dark_blue rounded-md p-2"
            />
          <div className="text-right text-sm text-blue-500 mt-2 mb-4 cursor-pointer">
            Forgot password?
          </div>
          <button
            type="submit"
            onClick={()=>
               { setLoginPopup(false)
            redirect("/")}}
            className="w-full bg-blue text-white py-2 px-6 rounded-xl hover:bg-blue-700 "
          >
            Login
          </button>
          </div>
        </form>
       <div className="px-6"> <div className="my-3 flex items-center">
          <hr className="flex-grow border-gray-300" />
          <span className="px-2 text-sm text-gray-500">Or continue with</span>
          <hr className="flex-grow border-gray-300" />
        </div>
        <div className="flex justify-center gap-4 mb-4">
          <IoLogoGoogle size={30} className="text-dark_blue cursor-pointer"
          onClick={() => {
                    setLoginPopup(false);
                    login("google");
                    redirect("/")
                  }}/>
        </div>
        <p className="text-center text-sm">
          Don’t have an account?{" "}
          <span className="text-blue-500 cursor-pointer" >Signup</span>
        </p></div>
      </div>
    </div>

    </div>
  );
};

export default Login;
