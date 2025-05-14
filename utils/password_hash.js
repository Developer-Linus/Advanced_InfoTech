// Password hashing and verification with bcrypt
import bcrypt from "bcryptjs";

const SALT_ROUNDS = 10;

// Hashing function
export async function hashPassword(password) {
  return await bcrypt.hash(password, SALT_ROUNDS);
}

// Verification
export async function comparePassword(password, hash) {
  return await bcrypt.compare(password, hash);
}