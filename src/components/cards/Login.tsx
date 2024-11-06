"use client";
import Image from "next/image";
import gurukul_logo from "../../../public/gurukul_logo.png";
import { useSetRecoilState } from "recoil";

const Login = () => {
  return <Image src={gurukul_logo} className="h-12 w-fit" alt="Brand logo" />;
};

export default Login;
