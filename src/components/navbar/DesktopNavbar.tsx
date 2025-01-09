"use client";
import Image from "next/image";
import gurukul_logo from "../../../public/gurukul_logo.png";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { loginPopupAtom } from "@/recoil/Atoms/loginpopup";
import { userSessionAtom } from "@/recoil/Atoms/userSession";
import { logout } from "@/actions/auth";

const DesktopNavbar = () => {
  const pathName = usePathname();
  const setLoginPopup = useSetRecoilState(loginPopupAtom);
  const session = useRecoilValue(userSessionAtom);
  const setSession = useSetRecoilState(userSessionAtom);

  return (
    <nav className="lg:px-[3vw] flex justify-between py-3 shadow-md overflow-x-hidden bg-white fixed w-full z-10">
      <Link href="/">
        <Image src={gurukul_logo} className="h-12 w-fit" alt="Brand logo" />
      </Link>
      <div className="flex gap-8 items-center justify-center">
        <Link
          href="/"
          className={`hover:text-blue text-lg font-medium text-black ${
            pathName == "/" && "text-blue"
          }`}
        >
          Home
        </Link>
        <Link
          href="/categories"
          className={`hover:text-blue text-lg font-medium text-black ${
            pathName == "/categories" && "text-blue"
          }`}
        >
          Categories
        </Link>
        <Link
          href="/explore"
          className={`hover:text-blue text-lg font-medium text-black ${
            pathName == "/explore" && "text-blue"
          }`}
        >
          Explore
        </Link>
        <input
          type="text"
          name="desktopNavSearch"
          id="desktopNavSearch"
          placeholder="Search course..."
          className="border-black/60 rounded-full border-2 font-medium text-lg px-5 py-[6px] focus:outline-none text-black/60 w-[25vw]"
        />

        {session !== null ? (
          <button
            className="text-lg hover:text-white hover:bg-blue rounded-full px-5 py-[6px] border-2 border-blue font-medium"
            onClick={async () => {
              logout();
              setSession(null);
            }}
          >
            logout
          </button>
        ) : (
          <button
            className="text-lg hover:text-white hover:bg-blue rounded-full px-5 py-[6px] border-2 border-blue font-medium"
            onClick={() => {
              setLoginPopup(true);
            }}
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default DesktopNavbar;
