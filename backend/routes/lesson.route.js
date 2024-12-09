import  express from "express";

import {getLessonDetailsWithStudentAssessments} from "../controllers/lesson.controllers.js";
 
const router = express.Router();

// запит для отримання оцінок для кожного студента за певним предметом та датою
router.get("/details", getLessonDetailsWithStudentAssessments);


export default router;