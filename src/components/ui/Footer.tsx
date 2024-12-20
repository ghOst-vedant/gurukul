import { RiInstagramFill } from "react-icons/ri";
import { IoLogoLinkedin } from "react-icons/io5";
import Link from "next/link";
import Image from "next/image";
import gurukul_logo from "../../../public/gurukul_logo.png";
import gurukul_book_logo from "../../../public/gurukul_book_logo.png";

export function Footer() {
  return (
    <div>
      <div className="bg-black text-white flex flex-col sm:flex-row sm:justify-between px-4 sm:px-6 lg:px-[3vw] py-10 gap-12 lg:py-16">
        <span className="flex justify-between sm:gap-16 lg:gap-32">
          <span className="flex flex-col gap-2">
            <p className="mb-2">Important Links</p>
            <Link
              href="/explore"
              className="text-white/80 hover:ml-1 transition-all"
            >
              - Explore
            </Link>
            <Link
              href="/categories"
              className="text-white/80 hover:ml-1 transition-all"
            >
              - Categories
            </Link>
            <Link
              href="/contact-us"
              className="text-white/80 hover:ml-1 transition-all"
            >
              - Contact us
            </Link>
          </span>
          <span className="flex flex-col gap-2">
            <p className="mb-2">Legal</p>
            <Link
              href="/terms-and-conditions"
              className="text-white/80 hover:ml-1 transition-all"
            >
              - Terms & Conditions
            </Link>
            <Link
              href="/privacy-policy"
              className="text-white/80 hover:ml-1 transition-all"
            >
              - Privacy Policy
            </Link>
          </span>
        </span>
        <span className="flex gap-6 items-center sm:flex-col sm:items-start sm:gap-4">
          <p>Follow us</p>
          <span className="flex gap-4">
            <Link
              href=""
              className="p-2 flex items-center justify-center border-white border-2 rounded-full hover:text-blue hover:border-blue"
            >
              <RiInstagramFill className="text-2xl" />
            </Link>
            <Link
              href=""
              className="p-2 flex items-center justify-center border-white border-2 rounded-full hover:text-blue hover:border-blue"
            >
              <IoLogoLinkedin className="text-2xl" />
            </Link>
          </span>
        </span>
      </div>
      <div className="bg-white px-4 sm:px-6 lg:px-[3vw] flex justify-between py-3 items-center">
        <Image
          src={gurukul_book_logo}
          alt="logo"
          className="h-7 w-fit sm:hidden"
        ></Image>
        <Image
          src={gurukul_logo}
          alt="logo"
          className="h-10 w-fit hidden sm:block"
        ></Image>
        <p>© Gurukul, All rights reserved</p>
      </div>
    </div>
  );
}
