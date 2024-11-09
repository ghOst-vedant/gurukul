import { addToClassroom, classroomInterface } from "@/lib/interfaces";
import { db } from "@/lib/prisma";
import { extractAndVerifyToken } from "@/lib/token";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    let decode;
    try {
      decode = extractAndVerifyToken(req);
    } catch (error) {
      return NextResponse.json(
        {
          Error: (error as Error).message,
        },
        { status: 401 }
      );
    }
    if (decode.role !== "TEACHER") {
      return NextResponse.json(
        {
          Message: "Only Teachers can create a classroom",
        },
        { status: 403 }
      );
    }

    const classroomInfo: classroomInterface = await req.json();
    const createdClassroom = await db.classroom.create({
      data: {
        teacherId: decode.id,
        ClassroomName: classroomInfo.classroomName,
      },
    });
    return NextResponse.json({ message: createdClassroom }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { Error: (error as Error).message },
      { status: 500 }
    );
  }
}
export async function PATCH(req: NextRequest) {
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
    const data: addToClassroom = await req.json();
    const addedStudents = await db.classroom.update({
      where: { id: data.classroomId },
      data: {
        students: {
          push: data.students,
        },
      },
    });
    return NextResponse.json({ data: addedStudents }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
export async function GET(req: NextRequest) {
  try {
    let decode;
    try {
      decode = extractAndVerifyToken(req);
    } catch (error) {
      return NextResponse.json(
        {
          Error: (error as Error).message,
        },
        { status: 401 }
      );
    }
    const classRooms = await db.classroom.findMany({
      where: { teacherId: decode.id },
    });
    return NextResponse.json(classRooms, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
