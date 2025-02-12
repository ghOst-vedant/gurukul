import { atom } from "recoil";

export const popupAtom = atom<String | null>({
  key: "popup",
  default: null,
});
