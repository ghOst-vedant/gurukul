"use client";
import { login, logout } from "@/actions/auth";
import { auth } from "../../../auth";
import { useRecoilState } from "recoil";
import { userSessionAtom } from "@/recoil/Atoms/userSession";

export default function SignIn() {
  return (
    <div>
      <button
        type="submit"
        onClick={async () => {
          login("google");
        }}
      >
        Signin with Google
      </button>
    </div>
  );
}
