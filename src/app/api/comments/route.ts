// import { getSession } from "@/actions/auth"
import { db } from "@/lib/prisma"

import { NextRequest, NextResponse } from "next/server"
import { auth } from "../../../../auth"

export async function POST(req: NextRequest) {
    try {
        const session = await auth()
        if (!session)
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

        const { sectionId, commentText } = await req.json()
        const comment = await db.comment.create({
            data: {
                commentText,
                sectionId,
                userId: session?.user?.id as string,
            },
        })
        return NextResponse.json(comment, { status: 201 })
    } catch (error) {
        return NextResponse.json(
            { error: "Something went wrong" },
            { status: 500 }
        )
    }
}
