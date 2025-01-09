"use server";
import { auth, signIn, signOut } from "../../auth";

import { revalidatePath } from "next/cache";

export const login = async (provider: string) => {
  await signIn(provider, { redirectTo: "/" });
  revalidatePath("/");
};

export const logout = () => {
  signOut({ redirectTo: "/" });
  revalidatePath("/");
};
