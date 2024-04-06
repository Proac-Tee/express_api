import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { auth, router } from "./routes/routes"; // Importing routes

const app = express();
const PORT = 3000;

dotenv.config(); // Load environment variables from .env file

main().catch((error) => console.error("Error connecting to database", error));

// Function to connect to the database
async function main() {
  await mongoose.connect(process.env.MONGODB_URI || ""); // Connect to MongoDB
  console.log("Connected to database");
}

app.use(express.json({ limit: "100mb" })); // Parse incoming JSON requests

app.use("/api", router); // Mount API routes

app.use("/auth", auth); // Mount authentication routes

app.listen(PORT, () => {
  console.log(`Server running at Port ${PORT}`);
});
