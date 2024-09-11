import { hashPassword } from "@/lib/bcrypt";
import { db } from "@/lib/prisma";
import { signUpSchema } from "@/lib/zod";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
interface UserRequestBody {
  name: string;
  email: string;
  password: string;
  role: string;
}

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const body: UserRequestBody = await req.json();
    const safeBody = signUpSchema.safeParse(body);
    if (!safeBody.success) {
      return NextResponse.json(
        { message: "Invalid data format" },
        { status: 400 }
      );
    }
    const hashedPass = await hashPassword(safeBody.data.password);
    const { password, ...userData } = safeBody.data;
    let createdUser;
    if (safeBody.data.role === "TEACHER") {
      createdUser = await db.teacher.create({
        data: {
          ...userData,
          password: hashedPass,
        },
      });
    } else {
      createdUser = await db.student.create({
        data: {
          ...userData,
          password: hashedPass,
        },
      });
    }
    const token = jwt.sign({ id: createdUser.id }, process.env.JWT_SECRET!);
    return NextResponse.json(
      { user: createdUser, token: token },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
