"use client";

import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { userSessionAtom } from "@/recoil/Atoms/userSession";
import { fetchSession } from "@/actions/auth";

export default function SessionSync() {
  const [session, setSession] = useRecoilState(userSessionAtom);

  useEffect(() => {
    // Only fetch session if it hasn't been set
    if (!session) {
      fetchSession()
        .then((fetchedSession) => {
          if (fetchedSession) {
            setSession(fetchedSession);
          }
        })
        .catch((error) => {
          console.error("Error fetching session:", error);
        });
    }
  }, [session, setSession]);

  return null; // No UI rendering needed
}
