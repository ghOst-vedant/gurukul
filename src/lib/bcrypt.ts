import bcrypt from "bcrypt";

const saltRounds = 15;
export async function hashPassword(password: string): Promise<string> {
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

export async function comparePassword(loginPass: string, userPass: string) {
  const isTru = await bcrypt.compare(loginPass, userPass);
  return isTru;
}
