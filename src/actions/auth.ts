"use server"
import { auth, signIn, signOut } from "../../auth"
import { revalidatePath } from "next/cache"
import { getSignedInUser } from "./getActions"

export const login = async (provider: string) => {
    await signIn(provider, { redirectTo: "/" })
    revalidatePath("/")
}

export const logout = () => {
    signOut({ redirectTo: "/" })
    revalidatePath("/")
}

export const fetchSession = async () => {
    return await auth()
}

export const getSession = async () => {
    const session = await fetchSession()
    const data = await getSignedInUser(session?.user?.id!)
    return data
}

export const loginWithCreds = async (formData: FormData): Promise<void> => {
    const email = formData.get("email")
    const password = formData.get("password")
    const role = formData.get("role")
    if (!email || !password) {
        throw new Error("Missing email or password!")
    }

    const rawFormData = {
        email,
        password,
        role,
    }

    try {
        const details = await signIn("credentials", {
            ...rawFormData,
            redirect: false,
        })
        // if (!details || details.error) {
        //     throw new Error(details?.error || "Login failed")
        // }
        // console.log(details)
        return details
    } catch (error) {
        console.log("Creadential Login error:", error)
    }
}
