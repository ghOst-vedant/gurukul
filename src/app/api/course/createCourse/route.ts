import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/prisma";
import { courseInterface } from "@/lib/interfaces";
import { extractAndVerifyToken, verifyToken } from "@/lib/token";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    let decode;
    try {
      decode = extractAndVerifyToken(req) as { role: string; id: string };
    } catch (err) {
      return NextResponse.json({ message: err }, { status: 401 });
    }
    if (decode.role !== "TEACHER") {
      return NextResponse.json(
        { error: "Access denied. Only TEACHERs can create courses." },
        { status: 403 }
      );
    }
    const course: courseInterface = await req.json();
    if (!course.content) {
      return NextResponse.json(
        { message: "Expected course content." },
        { status: 400 }
      );
    }
    const createdCourse = await db.course.create({
      data: {
        teacherId: decode.id,
        courseContent: course.content,
        curriculum: course.curriculum,
        type: course.type,
      },
    });
    return NextResponse.json({ message: createdCourse }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
