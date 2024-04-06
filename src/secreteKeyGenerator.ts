import crypto from "crypto";

// Generate a random secret key
const generateSecretKey = () => {
  return crypto.randomBytes(32).toString("hex");
};

// Example usage
const secretKey = generateSecretKey();
console.log(secretKey);
