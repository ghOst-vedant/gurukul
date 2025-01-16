"use client";
import { login, logout } from "@/actions/auth";

export default function SignIn() {
  return (
    <div>
      <button
        type="submit"
        onClick={async () => {
          login("google");
        }}
        className=" text-white font-light bg-blue border rounded-lg p-2"
      >
        Signin with Google
      </button>
    </div>
  );
}
