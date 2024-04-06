import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Define a custom interface extending Request to include the user property
interface AuthenticatedRequest extends Request {
  user?: any;
}

// Secret key for JWT
const secretKey = "your_secret_key";

const authenticateToken = (
  request: AuthenticatedRequest,
  response: Response,
  next: NextFunction
) => {
  const token = request.headers["authorization"];

  if (!token) {
    return response.status(401).json({ message: "Unauthorized Request" });
  }

  // Remove 'Bearer ' from the beginning of the token
  const tokenValue = token.split(" ")[1];

  try {
    jwt.verify(tokenValue, secretKey, (error, decoded) => {
      // Assign the user to the request object
      request.user = decoded;

      next();
    });
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return response.status(403).json({ message: "Request is Forbidden" });
    } else {
      return response
        .status(500)
        .json({ message: "Failed to verify token", error });
    }
  }
};

export default authenticateToken;
