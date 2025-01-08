"use client";
import { useRef } from "react";

export default function useDebounce(
  realFunction: (event: React.ChangeEvent<HTMLInputElement>) => void
) {
  const timer = useRef<number | null>(null);

  const fn = () => {
    if (timer.current !== null) {
      clearTimeout(timer.current);
    }
    timer.current = window.setTimeout(realFunction, 400);
  };

  return fn;
}
