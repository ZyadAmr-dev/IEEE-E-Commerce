import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./DB/connection.js";
import searchRouter from "./src/modules/search product/search.routers.js";
import authRouter from "./src/modules/auth/auth.router.js";
import productRouter from "./src/modules/product/product.routers.js"; 
import adminRouter from "./src/modules/admin/admin.router.js";
import cartRouter from "./src/modules/cart/cart.router.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Parsing
app.use(express.json());

// Routes
app.use('/api', searchRouter);
app.use('/api', productRouter);
app.use('/api', cartRouter);
app.use('/admin', adminRouter);
app.use('/auth', authRouter);

// Page not found
app.all("*", (req, res, next) => {
    return next(new Error("Page not found", { cause: 404 }));
});

// Global error handler
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

