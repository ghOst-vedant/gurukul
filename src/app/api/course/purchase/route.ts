import { purchaseInfo } from "@/lib/interfaces";
import { db } from "@/lib/prisma";
import { extractAndVerifyToken } from "@/lib/token";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    let decode;
    try {
      decode = extractAndVerifyToken(req) as {
        role: string;
        id: string;
      };
    } catch (error) {
      return NextResponse.json(
        { error: (error as Error).message },
        { status: 401 }
      );
    }
    const studentInfo: purchaseInfo = await req.json();
    const bought = true;
    if (!bought) {
      return NextResponse.json(
        {
          Message: "Purchase failed",
        },
        { status: 400 }
      );
    }
    await db.course.update({
      where: { id: studentInfo.courseId },
      data: {
        students: {
          push: studentInfo.studentId,
        },
      },
    });
    await db.student.update({
      where: { id: studentInfo.studentId },
      data: {
        courses: {
          push: studentInfo.courseId,
        },
      },
    });
    return NextResponse.json(
      { message: "Purchased successfully." },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
