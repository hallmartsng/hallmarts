import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import { connectDB } from "./config/db.config";
import swaggerUI from "swagger-ui-express";
import swaggerOpenapiSpecification from "./config/swagger.config";

// vendor imports
import vendorAuthRoutes from "./routes/vendor/auth.routes";
import vendorProfileRoutes from "./routes/vendor/profile.routes";
import vendorProductRoutes from "./routes/vendor/product.routes";
import vendorOrdersRoutes from "./routes/vendor/order.routes";
import vendorCustomerRoutes from "./routes/vendor/customer.routes";
import vendorDashboardRoutes from "./routes/vendor/dashboard.routes";

// user imports
import userAuthRoutes from "./routes/user/auth.routes";
import userProfileRoutes from "./routes/user/profile.routes";
import userOrdersRoutes from "./routes/user/order.routes";

// General imports
import generalAuthRoutes from "./routes/auth.routes";

// Store imports
import storeProductsRoutes from "./routes/store/product.routes";
import storeCheckOutRoutes from "./routes/store/checkout.routes";

// shipping imports
import shippingRoutes from "./routes/shipping/shipping.routes";

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
app.use("/api/v1/vendor/auth", vendorAuthRoutes);
app.use("/api/v1/vendor/profile", vendorProfileRoutes);
app.use("/api/v1/vendor/product", vendorProductRoutes);
app.use("/api/v1/vendor/orders", vendorOrdersRoutes);
app.use("/api/v1/vendor/customers", vendorCustomerRoutes);
app.use("/api/v1/vendor/dashboard", vendorDashboardRoutes);

// User Endpoints
app.use("/api/v1/user/auth", userAuthRoutes);
app.use("/api/v1/user/profile", userProfileRoutes);
app.use("/api/v1/user/orders", userOrdersRoutes);

// General Endpoints
app.use("/api/v1/auth", generalAuthRoutes);

// Store Endpoints
app.use("/api/v1/store/products", storeProductsRoutes);
app.use("/api/v1/store/checkout", storeCheckOutRoutes);

// Shipping Endpoints
app.use("/api/v1/shipping", shippingRoutes);

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
