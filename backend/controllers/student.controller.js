import mongoose from "mongoose";
import Group from "../models/group.model.js";
import Student from "../models/student.model.js";
import Teacher from "../models/teacher.model.js";

export const getStudents = async (req, res) => {
    try{
        const students = await Student.find({});
        res.status(200).json({ success: true, data: students});
    } catch(error){
        console.log("error in fetching products:", error.message);
        res.status(500).json({ success: false, message: "Server Error"});
    }
};

export const signupStudent = async (req, res) => {
    const studentData = req.body;

    // Перевірка наявності всіх обов'язкових полів
    if (!studentData.Surname || !studentData.Name || !studentData.Patronymic || !studentData.Email || !studentData.group_code || !studentData.password) {
        return res.status(400).json({ success: false, message: "Please provide all required fields." });
    }

    try {
        // Перевірка, чи існує група з таким group_code
        const group = await Group.findOne({ group_code: studentData.group_code });
        if (!group) {
            return res.status(404).json({ success: false, message: "Group with this group_code not found." });
        }

        // Перевірка на унікальність ПІБ у групі
        const existingStudent = await Student.findOne({
            Surname: studentData.Surname,
            Name: studentData.Name,
            Patronymic: studentData.Patronymic,
            group_code: studentData.group_code
        });

        if (existingStudent) {
            return res.status(400).json({
                success: false,
                message: "A student with this full name already exists in the group."
            });
        }

        // Створення нового студента
        const newStudent = new Student(studentData);
        await newStudent.save();

        res.status(201).json({ success: true, data: newStudent });
    } catch (error) {
        console.error("Error in createStudent:", error.message);
        if (error.code === 11000) {
            res.status(400).json({ success: false, message: "Email or combination of fields already exists." });
        } else {
            res.status(500).json({ success: false, message: "Server Error." });
        }
    }
};


export const signinUser = async (req, res) => {
    const { Email, password } = req.body;

    // Перевірка наявності обов'язкових полів
    if (!Email || !password) {
        return res.status(400).json({ success: false, message: "Please provide email and password." });
    }

    try {
        let userType = null;
        let user = null;

        // Перевірка, чи це студент
        user = await Student.findOne({ Email });
        if (user) {
            userType = "student";
        } else {
            // Перевірка, чи це викладач
            user = await Teacher.findOne({ Email });
            if (user) {
                userType = "teacher";
            }
        }

        // Якщо користувача не знайдено
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found." });
        }

        // Перевірка пароля
        if (user.password !== password) {
            return res.status(401).json({ success: false, message: "Invalid password." });
        }

        // Формування відповіді
        let response = {
            success: true,
            userType,
            data: user.toObject(),
        };

        // Якщо це студент, додаємо інформацію про групу
        if (userType === "student") {
            const group = await Group.findOne({ group_code: user.group_code });

            if (!group) {
                return res.status(404).json({ success: false, message: "Group not found for this student." });
            }

            response.data.groupDetails = group;
        }

        res.status(200).json(response);
    } catch (error) {
        console.error("Error in signinUser:", error.message);
        res.status(500).json({ success: false, message: "Server Error." });
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