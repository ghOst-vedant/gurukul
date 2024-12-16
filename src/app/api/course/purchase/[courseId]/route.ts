import { purchaseInfo } from "@/lib/interfaces";
import { db } from "@/lib/prisma";
import { extractAndVerifyToken } from "@/lib/token";
import { NextRequest, NextResponse } from "next/server";

type Params = {
  courseId: string;
};

export async function POST(req: NextRequest, { params }: { params: Params }) {
  try {
    const { courseId } = params;

    if (!courseId) {
      return NextResponse.json(
        { error: "Course ID is missing or undefined." },
        { status: 400 }
      );
    }

    let decode;
    try {
      decode = extractAndVerifyToken(req);
    } catch (error) {
      return NextResponse.json(
        { error: (error as Error).message },
        { status: 401 }
      );
    }

    const paymentSuccessful = true;
    if (!paymentSuccessful) {
      return NextResponse.json({ message: "Purchase failed" }, { status: 400 });
    }

    await db.course.update({
      where: { id: courseId },
      data: {
        students: {
          push: decode.id,
        },
      },
    });

    await db.student.update({
      where: { id: decode.id },
      data: {
        courses: {
          push: courseId,
        },
      },
    });
    return NextResponse.json(
      { message: "Purchased successfully." },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
