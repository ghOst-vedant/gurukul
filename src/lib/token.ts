import jwt from "jsonwebtoken";
import { config } from "./config";
import { decodedToken } from "./interfaces";
import { NextRequest } from "next/server";

export function generateToken(id: string, role: string): string {
  return jwt.sign({ id, role }, config.jwtSecret, { expiresIn: "1h" });
}

export function verifyToken(token: string): decodedToken | null {
  try {
    const decoded = jwt.verify(token, config.jwtSecret) as decodedToken;

    // Ensure that the id is present as a string
    if (typeof decoded.id !== "string") {
      decoded.id = String(decoded.id);
    }

    return decoded;
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
