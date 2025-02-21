import { NextResponse } from "next/server"
import bcrypt from "bcrypt"
import { db } from "@/lib/prisma"

export async function POST(req: Request) {
    try {
        const { email, password, username, role } = await req.json()

        // Check if user already exists
        const existingUser = await db.user.findUnique({
            where: { email },
        })

        if (existingUser) {
            return NextResponse.json(
                { error: "User already exists" },
                { status: 400 }
            )
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10)

        // Create new user
        const newUser = await db.user.create({
            data: {
                email,
                name: username,
                password: hashedPassword,
                role: role,
            },
        })

        return NextResponse.json(
            { message: "User registered successfully" },
            { status: 201 }
        )
    } catch (error) {
        console.error("Registration Error:", error)
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        )
    }
}
