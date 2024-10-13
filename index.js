import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./DB/connection.js";
import authRouter from "./src/modules/auth/auth.router.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// parsing
app.use(express.json());

// routes
app.use("/auth", authRouter);
// page not found
app.all("*", (req, res, next) => {
  return next(new Error("Page not found", { cause: 404 }));
});

// global error handler
app.use((err, req, res, next) => {
  const statusCode = err.cause || 500;
  return res.status(statusCode).json({
    success: false,
    message: err.message,
    stack: err.stack,
  });
});

const startServer = async () => {
  await connectDB();

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};

startServer();
