import  express from "express";

import {getStudents, signupStudent, getTeachersByDepartment, signinUser, getStudentsByGroup, } from "../controllers/student.controller.js";
// deleteStudent,  updateStudent, 
const router = express.Router();

router.get("/", getStudents);
router.post("/", signupStudent);
// router.put("/:id", updateStudent);
// router.delete("/:id", deleteStudent);
router.post("/signin", signinUser);
router.get("/group/:groupCode", getStudentsByGroup);
router.get("/:nameDepartment", getTeachersByDepartment)

export default router;