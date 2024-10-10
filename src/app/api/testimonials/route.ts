import { testimonials } from "@/lib/interfaces";
import { db } from "@/lib/prisma";
import { extractAndVerifyToken } from "@/lib/token";
import { NextRequest, NextResponse } from "next/server";
type params = {
  studentId: string;
};
export async function GET(req: NextRequest, res: NextResponse) {
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
    const testimonials: testimonials[] = await db.testimonials.findMany();
    return NextResponse.json({ testimonials: testimonials }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

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
    const testimonial: testimonials = await req.json();
    const addedTestimonial = await db.testimonials.create({
      data: testimonial,
    });
    return NextResponse.json(addedTestimonial);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
