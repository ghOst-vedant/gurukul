import jwt from "jsonwebtoken";
import { config } from "./config";

export function generateToken(userId: string, role: string): string {
  return jwt.sign({ userId, role }, config.jwtSecret, { expiresIn: "1h" });
}

export function verifyToken(token: string): jwt.JwtPayload | string {
  try {
    return jwt.verify(token, config.jwtSecret);
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
}
