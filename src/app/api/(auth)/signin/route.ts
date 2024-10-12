import { comparePassword, hashPassword } from "@/lib/bcrypt";
import { db } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { generateToken } from "@/lib/token";

interface loggin {
  email: string;
  password: string;
  role: string;
}

async function getUserDetails(role: string, email: string) {
  switch (role) {
    case "TEACHER":
      return await db.teacher.findFirst({ where: { email: email } });
    case "STUDENT":
      return await db.student.findFirst({ where: { email: email } });
    default:
      throw new Error("Invalid role");
  }
}

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const user: loggin = await req.json();
    // get user on basis of role
    const loggedIn = await getUserDetails(user.role, user.email);
    if (!loggedIn) {
      return NextResponse.json({ message: "Email invalid" }, { status: 401 });
    }
    const isPassword = await comparePassword(user.password, loggedIn.password);
    const { password, ...userWithoutPassword } = loggedIn;
    if (!isPassword) {
      return NextResponse.json(
        { message: "Invalid Credentials", user: userWithoutPassword },
        { status: 401 }
      );
    }
    const token = generateToken(loggedIn.id, loggedIn.role);
    return NextResponse.json({ user: loggedIn, token: token }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
