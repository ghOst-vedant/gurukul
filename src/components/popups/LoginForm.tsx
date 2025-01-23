"use client";
import React from "react";
import AuthButton from "./AuthButton";
import { loginWithCreds } from "@/actions/auth";
import gurukul_logo from "../../../public/gurukul_logo.png";
import Image from "next/image";

const LoginForm = () => {
  return (
    <div className="">
        <div className="text-center mb-6">
          <Image src={gurukul_logo} className="h-12 w-fit" alt="Brand logo" />
          {/* <h1 className="text-2xl font-bold">GURUKUL</h1> */}
        </div>
        <h2 className="text-xl font-semibold text-center">Login</h2>
        <p className="text-gray-500 text-center mb-4">Enter account details</p>
      <form action={loginWithCreds} className=" flex flex-col gap-3">
        <div className=" flex flex-col gap-1">
          <input
            type="email"
            placeholder="Email"
            id="Email"
            name="email"
            className=" border-blue border-b-2  p-1 "
          />
        </div>
          <input
            type="password"
            placeholder="Password"
            name="password"
            id="password"
            className=" border-blue border-b-2  p-1 "
          />
        <AuthButton />
      </form>
    </div>
  );
};

export default LoginForm;
