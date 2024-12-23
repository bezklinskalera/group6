import  express from "express";

import {getLessonDetailsWithStudentAssessments, getGroupsByTeacher, getTotalScoresForStudent, getAttendanceCountBySubject, getLessonsByDateForStudent, getGroupAttendanceBySubject, getStudentAttendanceBySubject, getTotalTeachersCount, getTotalGroupsCount} from "../controllers/lesson.controllers.js";
 
const router = express.Router();

// запит для отримання оцінок для кожного студента за певним предметом та датою
router.get("/details", getLessonDetailsWithStudentAssessments);
router.get("/:teacherId/groups", getGroupsByTeacher);
router.get("/:studentId/subjects-and-grades", getTotalScoresForStudent);
router.get('/:studentId/:subjectName', getAttendanceCountBySubject);
router.get('/date/:studentId/:date', getLessonsByDateForStudent);
router.get('/group/:groupCode/subject/:subjectName', getGroupAttendanceBySubject);
router.get('/attendance/:studentId/:subjectName', getStudentAttendanceBySubject);
router.get('/details/teachers/count', getTotalTeachersCount);
router.get('/details/groups/count', getTotalGroupsCount);

export default router;