import  express from "express";

import {getStudents, signupStudent, getTeachersByDepartment, signinUser, getStudentsByGroup, getSubjectWithTeacherByName} from "../controllers/student.controller.js";
// deleteStudent,  updateStudent, 
const router = express.Router();

// router.put("/:id", updateStudent);
// router.delete("/:id", deleteStudent);
router.get("/", getStudents);
router.post("/", signupStudent);
router.post("/signin", signinUser);
router.get("/group/:groupCode", getStudentsByGroup);
router.get("/:nameDepartment", getTeachersByDepartment)
router.get("/by-name/:subjectName", getSubjectWithTeacherByName);

export default router;