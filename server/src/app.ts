import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes";
import leadRoutes from "./routes/lead.routes";

import { errorMiddleware } from "./middleware/error.middleware";

export const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

app.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Smart Leads API running",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/leads", leadRoutes);

app.use(errorMiddleware);