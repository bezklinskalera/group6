import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "./config/db.js";

import express from 'express';
import Student from "./models/student.js";
import mongoose from "mongoose";

const app = express();

app.use(express.json());

app.get("/api/students", async (req, res) => {
    try{
        const students = await Student.find({});
        res.status(200).json({ success: true, data: students});
    } catch(error){
        console.log("error in fetching products:", error.message);
        res.status(500).json({ success: false, message: "Server Error"});
    }
});

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

app.put("/api/students/:id", async (req, res) => {
    const {id} = req.params;

    const student = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success:false, message:"Invalid Product Id"});
    }

    try{
        const updatedStudent = await Student.findByIdAndUpdate(id, student, {new:true});
        res.status(200).json({success: true, data: updatedStudent});
    } catch (error){
        res.status(500).json({success: false, message: "Server Error"})
    }
})

app.delete("/api/students/:id", async (req, res) => {
    const { id } = req.params;

    try{
        await Student.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Product deleted"});
    } catch(error){
        console.error("Error in deleting product:", error.message);
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