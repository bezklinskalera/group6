import express from 'express';
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

import studentRoutes from "./routes/student.route.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/api/students", studentRoutes);

app.listen(5500, () => {
    connectDB();
    console.log("Server started at http://localhost:5500");
});