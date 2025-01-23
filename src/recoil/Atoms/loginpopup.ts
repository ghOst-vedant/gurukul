import { atom } from "recoil";

export const loginPopupAtom = atom({
  key: "loginPopup",
  default: false,
});

export const registerPopup = atom({
    key:"registerPopup",
    default:false
})
