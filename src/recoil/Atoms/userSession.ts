import { Session } from "next-auth";
import { atom } from "recoil";

export const userSessionAtom = atom<Session | null>({
  key: "userSession",
  default: null,
});
