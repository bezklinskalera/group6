import  express from "express";

import {getStudents, signupStudent, updateStudent, deleteStudent, signinUser, getStudentsByGroup, getTeachersByDepartment} from "../controllers/student.controller.js";

const router = express.Router();

router.get("/", getStudents);
router.post("/", signupStudent);
router.put("/:id", updateStudent);
router.delete("/:id", deleteStudent);
router.post("/signin", signinUser);
router.get("/group/:groupCode", getStudentsByGroup);
router.get("/:nameDepartment", getTeachersByDepartment)

export default router;