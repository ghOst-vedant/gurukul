import { hashPassword } from "@/lib/bcrypt";
import { db } from "@/lib/prisma";
import { signUpSchema } from "@/lib/zod";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { generateToken } from "@/lib/token";
import { create } from "domain";
interface UserRequestBody {
  name: string;
  email: string;
  password: string;
  role: string;
}

async function alreadyThere(email: string, role: string) {
  switch (role) {
    case "TEACHER":
      return await db.teacher.findFirst({ where: { email: email } });
    case "STUDENT":
      return await db.student.findFirst({ where: { email: email } });
    default:
      return NextResponse.json(
        { Message: "User role invalid." },
        { status: 401 }
      );
  }
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
    const thereExists = await alreadyThere(
      safeBody.data.email,
      safeBody.data.role
    );
    if (thereExists) {
      return NextResponse.json(
        { Message: "User already exists" },
        { status: 401 }
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

    const token = generateToken(createdUser.id, createdUser.role);
    return NextResponse.json(
      { user: createdUser, token: token },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
