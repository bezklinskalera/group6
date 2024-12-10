import mongoose from "mongoose";
import Administrator from "../models/administrator.model.js";
import Group from "../models/group.model.js";
import Student from "../models/student.model.js";
import Teacher from "../models/teacher.model.js";
import Department from "../models/department.model.js";
import Specialty from "../models/specialty.model.js";
import Lesson from "../models/lesson.model.js";
import Subject from "../models/subject.model.js";


// запит для отримання оцінок для кожного студента за певним предметом та датою
export const getLessonDetailsWithStudentAssessments = async (req, res) => {
    const { subjectName, date } = req.query;

    if (!subjectName || !date) {
        return res.status(400).json({
            success: false,
            message: "Both subjectName and date are required."
        });
    }

    try {
        // Перевірка, чи дата є в рядковому форматі
        const formattedDate = date.trim();

        // Пошук уроків за предметом і датою (як рядок)
        const lessons = await Lesson.find({
            Subject_name: subjectName,
            Date_of_lesson: formattedDate
        });

        if (lessons.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No lessons found for the given subject and date."
            });
        }

        // Формування даних з інформацією про студентів
        const lessonDetails = await Promise.all(
            lessons.map(async (lesson) => {
                const student = await Student.findById(lesson.ID_student);

                return {
                    Date_of_lesson: lesson.Date_of_lesson,
                    Subject_name: lesson.Subject_name,
                    Type_of_lesson: lesson.Type_of_lesson,
                    
                    Surname: student?.Surname || "Unknown",
                    Name: student?.Name || "Unknown",
                    Patronymic: student?.Patronymic || "Unknown",
                    
                    Assessment: lesson.Assessment
                };
            })
        );

        res.status(200).json({
            success: true,
            data: lessonDetails
        });
    } catch (error) {
        console.error("Error in getLessonDetailsWithStudentAssessments:", error.message);
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};