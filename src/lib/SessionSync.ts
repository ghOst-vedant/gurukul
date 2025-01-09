"use client";
import { useRecoilState } from "recoil";
import { auth } from "../../auth";
import { userSessionAtom } from "@/recoil/Atoms/userSession";

export async function SessionSync() {
  const [session, setSession] = useRecoilState(userSessionAtom);
  const fetchedSession = await auth();
  if (session === null) {
    if (fetchedSession) {
      setSession(fetchedSession);
    }
  }

  return null;
}
