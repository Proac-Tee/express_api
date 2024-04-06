import { Request, Response, NextFunction } from "express";
import jwt, { JsonWebTokenError } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// Secret key for JWT
const secretKey = process.env.SECRET_KEY || "";

// Define a custom interface extending Request to include the user property
interface AuthenticatedRequest extends Request {
  user?: any;
}

const authenticateToken = (
  request: AuthenticatedRequest,
  response: Response,
  next: NextFunction
) => {
  const authHeader = request.headers["authorization"];

  if (!authHeader?.startsWith("Bearer")) {
    return response.status(401).json({ message: "Unauthorized Request" });
  }

  // Extract the token from the Authorization header
  const token = authHeader.split(" ")[1];

  try {
    jwt.verify(token, secretKey, (error: Error | null, decoded: unknown) => {
      // Assign the user to the request object
      request.user = decoded;

      next();
    });
  } catch (error) {
    if (error instanceof JsonWebTokenError) {
      return response.status(403).json({ message: "Request is Forbidden" });
    } else {
      return response
        .status(500)
        .json({ message: "Failed to verify token", error });
    }
  }
};

export default authenticateToken;
