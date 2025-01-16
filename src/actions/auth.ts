"use server";
import { db } from "@/lib/prisma";
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

export const fetchSession = async () => {
  return await auth();
};

const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const loginWithCreds = async (formData: FormData): Promise<void> => {
  const email = formData.get("email");
  const password = formData.get("password");

  if (!email || !password) {
    console.error("Missing email or password!");
    return;
  }

  const rawFormData = {
    email,
    password,
    role: "ADMIN",
    redirectTo: "/",
  };

  try {
    await signIn("credentials", { ...rawFormData, redirect: false });
    revalidatePath("/");
  } catch (error) {
    console.error("Error during login:", error);
  }
};
