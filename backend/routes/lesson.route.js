import  express from "express";

import {getLessonDetailsWithStudentAssessments, getGroupsByTeacher, getTotalScoresForStudent} from "../controllers/lesson.controllers.js";
 
const router = express.Router();

// запит для отримання оцінок для кожного студента за певним предметом та датою
router.get("/details", getLessonDetailsWithStudentAssessments);
router.get("/:teacherId/groups", getGroupsByTeacher);
router.get("/:studentId/subjects-and-grades", getTotalScoresForStudent);

export default router;