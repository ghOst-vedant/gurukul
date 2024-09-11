import { comparePassword, hashPassword } from "@/lib/bcrypt";
import { db } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

interface loggin {
  email: string;
  password: string;
  role: string;
}
export async function POST(req: NextRequest, res: NextResponse) {
  const user: loggin = await req.json();
  const hashPass = await hashPassword(user.password);
  if (user.role === "TEACHER") {
    const teacherUser = await db.teacher.findFirst({
      where: { email: user.email },
    });
    if (!teacherUser) {
      return NextResponse.json({ message: "Email invalid" }, { status: 401 });
    }
    const isPassword = await comparePassword(
      user.password,
      teacherUser.password
    );
    const { password, ...userWithoutPassword } = teacherUser;
    if (!isPassword) {
      return NextResponse.json(
        { message: "Invalid Credentials", user: userWithoutPassword },
        { status: 401 }
      );
    }
  }

  return NextResponse.json({ status: 200 });
}
