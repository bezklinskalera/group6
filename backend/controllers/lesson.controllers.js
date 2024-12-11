import mongoose from "mongoose";
import Administrator from "../models/administrator.model.js";
import Group from "../models/group.model.js";
import Student from "../models/student.model.js";
import Teacher from "../models/teacher.model.js";
import Department from "../models/department.model.js";
import Specialty from "../models/specialty.model.js";
import Lesson from "../models/lesson.model.js";
import Subject from "../models/subject.model.js";

// отримати групи у яких викладає викладач
export const getGroupsByTeacher = async (req, res) => {
    const { teacherId } = req.params; // Отримуємо ID викладача з параметрів URL

    try {
        // Знаходимо викладача за ID
        const teacher = await Teacher.findById(teacherId);
        if (!teacher) {
            return res.status(404).json({ success: false, message: "Teacher not found." });
        }

        // Знаходимо всі предмети, які викладає цей викладач
        const subjects = await Subject.find({ Teacher: teacherId });

        if (subjects.length === 0) {
            return res.status(404).json({ success: false, message: "No subjects found for this teacher." });
        }

        // Збираємо всі групи, які навчаються в цих предметах через заняття
        const groups = new Set();

        for (const subject of subjects) {
            // Для кожного предмета знаходимо заняття
            const lessons = await Lesson.find({ Subject_name: subject.Subject_name });

            // Для кожного заняття шукаємо студентів
            for (const lesson of lessons) {
                const student = await Student.findById(lesson.ID_student); // Знаходимо студента за ID
                if (student) {
                    groups.add(student.group_code); // Додаємо групу студента в Set
                }
            }
        }

        res.status(200).json({
            success: true,
            data: {
                Teacher: {
                    _id: teacher._id,
                    Surname: teacher.Surname,
                    Name: teacher.Name,
                    Patronymic: teacher.Patronymic,
                    Email: teacher.Email,
                    name_department: teacher.name_department
                },
                Groups: Array.from(groups) // Перетворюємо Set у масив для відповіді
            }
        });
    } catch (error) {
        console.error("Error in getGroupsByTeacher:", error.message);
        res.status(500).json({ success: false, message: "Server Error." });
    }
};



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


