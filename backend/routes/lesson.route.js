import  express from "express";

import {getLessonDetailsWithStudentAssessments, getGroupsByTeacher} from "../controllers/lesson.controllers.js";
 
const router = express.Router();

// запит для отримання оцінок для кожного студента за певним предметом та датою
router.get("/details", getLessonDetailsWithStudentAssessments);
router.get("/:teacherId/groups", getGroupsByTeacher);

export default router;