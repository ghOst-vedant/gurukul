import { atom } from 'recoil';

export const sessionAtom = atom<{ user: any; token: string } | null>({
  key: 'sessionAtom', // unique ID (with respect to other atoms/selectors)
  default: null, // default value (aka initial value)
});
