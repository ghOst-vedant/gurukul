import { db } from "@/lib/prisma";
import { extractAndVerifyToken } from "@/lib/token";
import { NextRequest, NextResponse } from "next/server";

type Params = {
  studentId: string;
};

export async function GET(req: NextRequest, { params }: { params: Params }) {
  try {
    let decode;
    try {
      // Token extraction and verification
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

    // Extracting studentId from context params
    const { studentId } = params;

    if (!studentId) {
      return NextResponse.json(
        { error: "Student ID not found in URL" },
        { status: 400 }
      );
    }

    // Fetch testimonials from the database for the given studentId
    const userTestimonials = await db.testimonials.findMany({
      where: {
        studentId: studentId,
      },
    });

    if (userTestimonials.length === 0) {
      return NextResponse.json(
        { message: "No testimonials found for this student." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { testimonials: userTestimonials },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
