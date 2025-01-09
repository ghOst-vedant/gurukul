"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRecoilState } from "recoil";
import { userSessionAtom } from "@/recoil/Atoms/userSession";

export default function SessionSync({
  sessionFromServer,
}: {
  sessionFromServer: any;
}) {
  const { data: clientSession } = useSession();
  const [recoilSession, setRecoilSession] = useRecoilState(userSessionAtom);

  useEffect(() => {
    // Prioritize setting session from server if Recoil state is null
    if (!recoilSession) {
      const effectiveSession = sessionFromServer || clientSession;
      setRecoilSession(effectiveSession);
    }
  }, [clientSession, sessionFromServer, recoilSession, setRecoilSession]);

  return null; // No UI needed
}
