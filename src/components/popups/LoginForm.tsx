"use client";
import React from "react";
import AuthButton from "./AuthButton";
import { loginWithCreds } from "@/actions/auth";

const LoginForm = () => {
  return (
    <div>
      <form action={loginWithCreds} className=" flex flex-col gap-3">
        <div className=" flex flex-col gap-1">
          <label> Email</label>
          <input
            type="email"
            placeholder="Email"
            id="Email"
            name="email"
            className=" border-blue border rounded-lg p-1 "
          />
        </div>
        <div className=" flex flex-col gap-1">
          <label> Password</label>
          <input
            type="password"
            placeholder="Password"
            name="password"
            id="password"
            className=" border-blue border rounded-lg p-1 "
          />
        </div>
        <AuthButton />
      </form>
    </div>
  );
};

export default LoginForm;
