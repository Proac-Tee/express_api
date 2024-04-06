import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from "./routes/routes";

const app = express();
const PORT = 3000;

dotenv.config();

// Secret key for JWT
const encryption_Secret_key = process.env.SECRET_KEY || "";

main().catch((error) => console.error("Error connecting to database", error));

async function main() {
  await mongoose.connect(process.env.MONGODB_URI || "");
  console.log("Connected to database");
}

app.use(express.json({ limit: "100mb" }));

app.use("/api", router);

app.listen(PORT, () => {
  console.log(`Server running at Port ${PORT}`);
});
