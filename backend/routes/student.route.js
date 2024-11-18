import  express from "express";

import {getStudents, createStudent, updateStudent, deleteStudent} from "../controllers/student.controller.js";

const router = express.Router();

router.get("/", getStudents);
router.post("/", createStudent);
router.put("/:id", updateStudent);
router.delete("/:id", deleteStudent);

// if (!process.env.MONGO_URI) {
//     console.log("MONGO_URI is missing in .env file");
// } else {
//     console.log("MONGO_URI:", process.env.MONGO_URI);
// }

export default router;