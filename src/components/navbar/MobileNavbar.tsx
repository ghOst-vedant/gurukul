"use client";
import Image from "next/image";
import gurukul_book_logo from "../../../public/gurukul_book_logo.png";
import gurukul_logo from "../../../public/gurukul_logo.png";
import menu from "@/assets/icons/menu.png";
import close from "@/assets/icons/close.png";
import arrow from "@/assets/icons/arrow.png";
import Link from "next/link";
import { FiSearch } from "react-icons/fi";
import { useState } from "react";

export function MobileNavbar() {
  const [categoryOpen, setCategoryOpen] = useState(false);
  let [sidebarOpen, setSidebarOpen] = useState(false);

  const categories = [
    "Web Development",
    "UI/UX",
    "Cloud Computing",
    "Machine Learning",
    "Natural Language Processing",
    "Cyber Security",
    "Web Development",
    "UI/UX",
    "Cloud Computing",
    "Machine Learning",
    "Natural Language Processing",
    "Cyber Security",
    "Web Development",
    "UI/UX",
    "Cloud Computing",
    "Machine Learning",
    "Natural Language Processing",
    "Cyber Security",
    "Web Development",
    "UI/UX",
    "Cloud Computing",
    "Machine Learning",
    "Natural Language Processing",
    "Cyber Security",
    "Web Development",
    "UI/UX",
    "Cloud Computing",
    "Machine Learning",
    "Natural Language Processing",
    "Cyber Security",
  ];
  return (
    <>
      <nav className="flex justify-between py-3 px-4 bg-white shadow-md fixed w-full z-10">
        <Image
          src={gurukul_book_logo}
          className="h-10 w-fit"
          alt="Brand logo"
        />
        <div className="flex gap-4 items-center justify-center">
          <FiSearch size={30} />
          <Image
            src={menu}
            className="h-7 w-fit cursor-pointer"
            alt="Brand logo"
            onClick={() => setSidebarOpen(true)}
          />
        </div>
      </nav>

      {/*Sidebar ui */}
      <div
        className={`h-full w-[100vw] absolute bg-white left-0 top-0 p-4 ${
          sidebarOpen ? "block" : "hidden"
        } overflow-y-hidden`}
      >
        <div className="flex justify-between items-center">
          <Image src={gurukul_logo} className="h-12 w-fit" alt="Brand logo" />
          <Image
            src={close}
            className="h-4 w-fit"
            alt="close icon"
            onClick={() => setSidebarOpen(false)}
          />
        </div>
        <div className="flex flex-col mt-6 h-full">
          <Link
            href="/"
            className="text-lg font-medium text-black py-2 border-y-[1px] border-black/40"
          >
            Home
          </Link>
          <span
            className={`flex flex-col py-2 ${
              !categoryOpen && "border-b-[1px]"
            } border-black/40`}
            onClick={() => setCategoryOpen(!categoryOpen)}
          >
            <span
              className={`flex justify-between items-center ${
                categoryOpen && "mb-1"
              } cursor-pointer`}
            >
              <Link
                href="/categories"
                className="text-lg font-medium text-black"
              >
                Categories
              </Link>
              <Image
                src={arrow}
                className={`h-2 w-fit ${
                  categoryOpen ? "rotate-0" : "rotate-180"
                }`}
                alt="close icon"
              />
            </span>
            <div
              className={`flex-col ${
                categoryOpen ? "flex" : "hidden"
              } overflow-y-scroll max-h-[50vh]`}
            >
              {categories.map((category, index) => (
                <Link
                  href={"/categories/" + category}
                  key={index}
                  className="text-sm font-medium text-black py-2 pl-2"
                >
                  {category}
                </Link>
              ))}
            </div>
          </span>
          <Link
            href="/explore"
            className={`text-lg font-medium text-black py-2 ${
              categoryOpen ? "border-y-[1px]" : "border-b-[1px]"
            } border-black/40`}
          >
            Explore
          </Link>
          <button className="text-lg hover:text-white hover:bg-blue rounded-full px-5 py-[6px] border-2 border-blue font-medium text-left mt-4 w-fit">
            Login
          </button>
        </div>
      </div>
    </>
  );
}
