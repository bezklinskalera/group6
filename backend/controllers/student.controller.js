import mongoose from "mongoose";
import Group from "../models/group.model.js";
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
    const studentData = req.body;

    // Перевірка наявності всіх обов'язкових полів
    if (!studentData.full_name || !studentData.Email || !studentData.ID_group || !studentData.password) {
        return res.status(400).json({ success: false, message: "Please provide all required fields." });
    }

    try {
        // Перевірка, чи існує група з таким ID_group
        const group = await Group.findOne({ ID_group: studentData.ID_group });
        if (!group) {
            return res.status(404).json({ success: false, message: "Group with this ID_group not found." });
        }

        // Створення нового студента
        const newStudent = new Student(studentData);
        await newStudent.save();

        res.status(201).json({ success: true, data: newStudent });
    } catch (error) {
        console.error("Error in createStudent:", error.message);
        if (error.code === 11000) {
            res.status(400).json({ success: false, message: "Email already exists." });
        } else {
            res.status(500).json({ success: false, message: "Server Error." });
        }
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