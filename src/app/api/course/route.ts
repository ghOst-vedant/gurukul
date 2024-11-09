import { db } from "@/lib/prisma";
import { extractAndVerifyToken } from "@/lib/token";
import { NextRequest, NextResponse } from "next/server";
// fetch all courses route
export async function GET(req: NextRequest, res: NextResponse) {
  try {
    let decode;
    try {
      decode = extractAndVerifyToken(req);
    } catch (error) {
      return NextResponse.json(
        { error: (error as Error).message },
        { status: 401 }
      );
    }
    const courses = await db.course.findMany();
    return NextResponse.json({ courses: courses }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
