import jwt from "jsonwebtoken";
import { config } from "./config";
import { decodedToken } from "./interfaces";
import { NextRequest } from "next/server";

export function generateToken(userId: string, role: string): string {
  return jwt.sign({ userId, role }, config.jwtSecret, { expiresIn: "1h" });
}

export function verifyToken(token: string): decodedToken | null {
  try {
    return jwt.verify(token, config.jwtSecret) as decodedToken;
  } catch (err) {
    return null;
  }
}

export function extractAndVerifyToken(req: NextRequest): decodedToken {
  const token = req.headers.get("Authorization")?.split(" ")[1];

  if (!token) {
    throw new Error("Missing authorization token.");
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    throw new Error("Invalid or expired token.");
  }

  return decoded;
}
