import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const userId = "66db185ba5d68a48483b9ae4";
    const { title, subtitle, category } = await req.json();
    const createdCourse = await db.course.create({
      data: {
        teacherId: userId,
        title,
        subtitle,
        category,
      },
    });
    return NextResponse.json(createdCourse);
  } catch (error) {
    console.log("Course creation: ", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
