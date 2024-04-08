import crypto from "crypto";

// Generate a random secret key
export const generateSecretKey = () => {
  return crypto.randomBytes(32).toString("hex");
};
