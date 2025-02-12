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

export const loginWithCreds = async (
    formData: FormData
): Promise<{ error?: string }> => {
    const email = formData.get("email")
    const password = formData.get("password")
    const role = formData.get("role")

    if (!email || !password) {
        return { error: "Missing email or password!" }
    }

    try {
        const details = await signIn("credentials", {
            email,
            password,
            role,
            redirect: false,
        })

        if (details?.error) {
            return { error: details.error }
        }

        return {}
    } catch (error) {
        console.error("Credential Login error:", error)
        return { error: "An unexpected error occurred." }
    }
}
