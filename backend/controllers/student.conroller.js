import mongoose from "mongoose";
import Student from "../models/student.model.js";

export const getStudents = async (req, res) => {
    try{
        const students = await Student.find({});
        res.status(200).json({ success: true, data: students});
    } catch(error){
        console.log("error in fetching products:", error.message);
        res.status(500).json({ success: false, message: "Server Error"});
    }
};

export const createStudent = async (req, res) => {
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
}; 

export const updateStudent = async (req, res) => {
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
};

export const deleteStudent = async (req, res) => {
    const { id } = req.params;

    try{
        await Student.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Product deleted"});
    } catch(error){
        console.error("Error in deleting product:", error.message);
        res.status(404).json({ success: false, message: "Product not found"});
    }
};