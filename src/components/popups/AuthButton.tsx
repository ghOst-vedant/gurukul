import React from "react";
import { useFormStatus } from "react-dom";

const AuthButton = () => {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      type="submit"
      className={`${
        pending ? "bg-gray-600" : "bg-blue"
      } rounded-lg w-full px-12 py-3 text-sm font-medium text-white`}
    >
      {pending ? "Loading..." : "Sign in"}
    </button>
  );
};

export default AuthButton;
