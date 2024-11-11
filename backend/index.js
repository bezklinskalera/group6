import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "./config/db.js";

import express from 'express';
import Student from "./models/student.js";

const app = express();

app.use(express.json());

app.post("/api/students", async (req, res) => {
    const student = req.body;

    if(!student.full_name || !student.Email || !student.ID_group || !student.password){
        return res.status(400).json({ success:false, message: "Please provide all fields"});
    }

    const newStudent = new Student(student)

    try{
        await newStudent.save();
        res.status(201).json({ success: true, data: newStudent});
    } catch (error) {
        console.error("Error in Create student:", error.message);
        res.status(500).json({ success: false, message: "Server Error"});
    }
});

app.delete("/api/students/:id", async (req, res) => {
    const { id } = req.params;

    try{
        await Student.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Product deleted"});
    } catch(error){
        res.status(404).json({ success: false, message: "Product not found"});
    }
});

if (!process.env.MONGO_URI) {
    console.log("MONGO_URI is missing in .env file");
} else {
    console.log("MONGO_URI:", process.env.MONGO_URI);
}

app.listen(5500, () => {
    connectDB();
    console.log("Server started at http://localhost:5500");
});