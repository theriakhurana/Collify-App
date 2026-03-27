import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from './routes/auth.js';
import classroomRoutes from './routes/classroom.js';
import cookieParser from "cookie-parser";

dotenv.config({ path: "../.env" });
connectDB();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser);

app.get("/", (req, res) => {
  res.send("API run ho rhi hai :))");
});

app.use('/auth', authRoutes);
app.use('/classroom', classroomRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});