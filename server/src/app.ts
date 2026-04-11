import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import { connectDB } from "./config/db.config";
import swaggerUI from "swagger-ui-express";
import swaggerOpenapiSpecification from "./config/swagger.config";

// vendor imports
import vendorAuth from "./routes/vendor/auth.routes";
import vendorProfile from "./routes/vendor/profile.routes";
import vendorProductRoutes from "./routes/vendor/product.routes";

// user imports
import userAuth from "./routes/user/auth.routes";
import userProfile from "./routes/user/profile.routes";

// General imports
import generalAuth from "./routes/auth.routes";

// Store imports
import storeProducts from "./routes/store/product.routes";

// shipping imports
import shipping from "./routes/shipping/shipping.routes";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: ["https://hallmarts-omega.vercel.app", "http://localhost:3000"],
    credentials: true,
  }),
);

app.use(express.json());
app.use(morgan("dev"));

app.get("/", (_req, res) => {
  res.send("Hallmarts API running...");
});

app.use(
  "/api/v1/api-docs",
  swaggerUI.serve,
  swaggerUI.setup(swaggerOpenapiSpecification),
);

// Vendors Endpoints
app.use("/api/v1/vendor/auth", vendorAuth);
app.use("/api/v1/vendor/profile", vendorProfile);
app.use("/api/v1/vendor/product", vendorProductRoutes);

// User Endpoints
app.use("/api/v1/user/auth", userAuth);
app.use("/api/v1/user/profile", userProfile);

// General Endpoints
app.use("/api/v1/auth", generalAuth);

// Store Endpoints
app.use("/api/v1/store/product", storeProducts);

// Shipping Endpoints
app.use("/api/v1/shipping", shipping);

const PORT = process.env["PORT"]!;

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
