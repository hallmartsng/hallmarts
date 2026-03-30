import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import { connectDB } from "./config/db.config";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: ["https://hallmarts-omega.vercel.app/", "http://localhost:3000"],
    credentials: true,
  }),
);

app.use(express.json());
app.use(morgan("dev"));

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Hallmarts API running...");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});

const PORT = 5000;
// Start server ONLY after DB connects
(async () => {
  try {
    await connectDB(); // 👈 wait for DB connection
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to connect to DB", err);
    process.exit(1); // Exit if DB connection fails
  }
})();

export default app;
