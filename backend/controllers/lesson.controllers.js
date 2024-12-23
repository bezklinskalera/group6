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
      return res
        .status(404)
        .json({ success: false, message: "Teacher not found." });
    }

    // Знаходимо всі предмети, які викладає цей викладач
    const subjects = await Subject.find({ Teacher: teacherId });

    if (subjects.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No subjects found for this teacher.",
      });
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
          name_department: teacher.name_department,
        },
        Groups: Array.from(groups), // Перетворюємо Set у масив для відповіді
      },
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
      message: "Both subjectName and date are required.",
    });
  }

  try {
    // Перевірка, чи дата є в рядковому форматі
    const formattedDate = date.trim();

    // Пошук уроків за предметом і датою (як рядок)
    const lessons = await Lesson.find({
      Subject_name: subjectName,
      Date_of_lesson: formattedDate,
    });

    if (lessons.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No lessons found for the given subject and date.",
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

          Assessment: lesson.Assessment,
        };
      })
    );

    res.status(200).json({
      success: true,
      data: lessonDetails,
    });
  } catch (error) {
    console.error(
      "Error in getLessonDetailsWithStudentAssessments:",
      error.message
    );
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const getTotalScoresForStudent = async (req, res) => {
  const { studentId } = req.params; // Отримуємо ID студента з параметрів URL

  try {
    // Використовуємо агрегацію для знаходження предметів і оцінок студента
    const totalScores = await Lesson.aggregate([
      // Фільтруємо за ID студента
      {
        $match: {
          ID_student: new mongoose.Types.ObjectId(studentId), // Використовуємо "new" для конвертації в ObjectId
        },
      },
      // Об'єднуємо з колекцією Subject, щоб отримати деталі про предмет
      {
        $lookup: {
          from: "subjects", // Назва колекції предметів
          localField: "Subject_name", // Поле в колекції Lesson
          foreignField: "Subject_name", // Поле в колекції Subject
          as: "subjectDetails", // Назва для масиву об'єднаних даних
        },
      },
      {
        $unwind: "$subjectDetails", // Розгортаємо масив subjectDetails
      },
      // Групуємо по предметах і підсумовуємо оцінки
      {
        $group: {
          _id: "$Subject_name", // Групуємо по назві предмета
          totalScore: { $sum: "$Assessment" }, // Підсумовуємо оцінки
          subjectDetails: { $first: "$subjectDetails" }, // Додаємо деталі предмета
        },
      },
      // Сортуємо по алфавітному порядку за назвою предмета
      {
        $sort: { _id: 1 },
      },
    ]);

    if (totalScores.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No subjects or assessments found for the student.",
      });
    }

    // Формуємо відповідь для клієнта
    res.status(200).json({
      success: true,
      data: totalScores.map((subject) => ({
        Subject: subject._id, // Назва предмета
        TotalScore: subject.totalScore, // Підсумкова оцінка
        SubjectDetails: subject.subjectDetails, // Деталі предмета
      })),
    });
  } catch (error) {
    console.error("Error in getTotalScoresForStudent:", error.message);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Запит для підрахунку кількості пар студента за конкретний предмет
export const getAttendanceCountBySubject = async (req, res) => {
  const { studentId, subjectName } = req.params; // Отримуємо ID студента та назву предмета з параметрів URL

  try {
    // Використовуємо агрегацію для підрахунку пар
    const attendanceCount = await Lesson.aggregate([
      // Фільтруємо записи за ID студента та назвою предмета
      {
        $match: {
          ID_student: new mongoose.Types.ObjectId(studentId), // Конвертуємо studentId в ObjectId
          Subject_name: subjectName, // Фільтруємо за назвою предмета
        },
      },
      // Підраховуємо кількість документів (занять)
      {
        $group: {
          _id: "$Subject_name", // Групуємо за назвою предмета
          attendanceCount: { $sum: 1 }, // Підраховуємо кількість занять
        },
      },
    ]);

    // Перевіряємо, чи є результати
    if (attendanceCount.length === 0) {
      return res.status(404).json({
        success: false,
        message:
          "No attendance records found for the student in the specified subject.",
      });
    }

    // Відправляємо відповідь
    res.status(200).json({
      success: true,
      data: {
        Subject: attendanceCount[0]._id, // Назва предмета
        AttendanceCount: attendanceCount[0].attendanceCount, // Кількість відвідувань
      },
    });
  } catch (error) {
    console.error("Error in getAttendanceCountBySubject:", error.message);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const getLessonsByDateForStudent = async (req, res) => {
  const { studentId, date } = req.params;

  try {
    // Форматуємо дату в формат YYYY-MM-DD
    const formattedDate = new Date(date).toISOString().split("T")[0];

    // Агрегація для фільтрації за датою без часу
    const lessons = await Lesson.aggregate([
      {
        $match: {
          ID_student: new mongoose.Types.ObjectId(studentId),
          Date_of_lesson: formattedDate, // Порівнюємо лише дату
        },
      },
    ]);

    // Перевіряємо, чи є результати
    if (!lessons.length) {
      return res.status(404).json({
        success: false,
        message: "No lessons:) found for the student on the specified date.",
      });
    }

    // Відправляємо знайдені заняття
    res.status(200).json({
      success: true,
      data: lessons.map((lesson) => ({
        Subject_name: lesson.Subject_name,
        Type_of_lesson: lesson.Type_of_lesson,
        Date_of_lesson: lesson.Date_of_lesson,
        Assessment: lesson.Assessment,
      })),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const getGroupAttendanceBySubject = async (req, res) => {
  const { groupCode, subjectName } = req.params; // Отримуємо код групи та назву предмета з параметрів URL

  try {
    // Отримуємо всіх студентів цієї групи
    const studentsInGroup = await Student.find({ group_code: groupCode });
    if (!studentsInGroup.length) {
      return res.status(404).json({
        success: false,
        message: "No students found in the specified group.",
      });
    }

    // Отримаємо список ID студентів цієї групи
    const studentIds = studentsInGroup.map((student) => student._id);

    // Тепер проводимо агрегацію з правим з'єднанням
    const attendanceData = await Student.aggregate([
      {
        $match: {
          group_code: groupCode, // Фільтруємо студентів по group_code
        },
      },
      {
        $lookup: {
          from: "lessons", // З'єднуємо з колекцією "Lesson"
          localField: "_id", // Зв'язуємо по ID студента
          foreignField: "ID_student", // Це поле в колекції "Lesson"
          as: "lessons", // Результат пошуку буде в масиві "lessons"
        },
      },
      {
        $addFields: {
          attendanceCount: {
            $size: {
              $filter: {
                input: "$lessons", // Масив уроків
                as: "lesson",
                cond: { $eq: ["$$lesson.Subject_name", subjectName] }, // Фільтруємо по предмету
              },
            },
          },
        },
      },
      {
        $project: {
          studentName: { $concat: ["$Name", " ", "$Surname"] }, // Формуємо ім'я студента
          attendanceCount: 1, // Виводимо кількість відвіданих занять
        },
      },
    ]);

    // Перевіряємо чи є результати
    if (!attendanceData.length) {
      return res.status(404).json({
        success: false,
        message:
          "No attendance records found for the specified group and subject.",
      });
    }

    // Відправляємо знайдені дані
    res.status(200).json({
      success: true,
      data: attendanceData,
    });
  } catch (error) {
    console.error("Error in getGroupAttendanceBySubject:", error.message);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const getStudentAttendanceBySubject = async (req, res) => {
  const { studentId, subjectName } = req.params; // Отримуємо ID студента та назву предмета з параметрів URL

  try {
    // Агрегація для отримання кількості відвіданих занять по студенту та предмету
    const attendanceData = await Lesson.aggregate([
      {
        $match: {
          ID_student: new mongoose.Types.ObjectId(studentId), // Фільтруємо за ID студента
          Subject_name: subjectName, // Фільтруємо за назвою предмета
        },
      },
      {
        $group: {
          _id: "$ID_student", // Групуємо по ID студента
          attendanceCount: { $sum: 1 }, // Підраховуємо кількість відвіданих занять
        },
      },
      {
        $lookup: {
          from: "students", // З'єднуємо з колекцією "students"
          localField: "_id", // Зв'язуємо по ID студента
          foreignField: "_id", // Це поле в колекції "Student"
          as: "student", // Результат пошуку буде в масиві "student"
        },
      },
      {
        $unwind: "$student", // Розгортаємо результат з масиву "student"
      },
      {
        $project: {
          studentName: { $concat: ["$student.Name", " ", "$student.Surname"] }, // Формуємо ім'я студента
          subjectName: subjectName, // Назва предмета
          attendanceCount: 1, // Виводимо кількість відвіданих занять
        },
      },
    ]);

    // Перевіряємо, чи є результати
    if (!attendanceData.length) {
      return res.status(404).json({
        success: false,
        message: "No attendance records found for the student and subject.",
      });
    }

    // Відправляємо знайдені дані
    res.status(200).json({
      success: true,
      data: attendanceData,
    });
  } catch (error) {
    console.error("Error in getStudentAttendanceBySubject:", error.message);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const getTotalTeachersCount = async (req, res) => {
    try {
      // Підрахунок всіх викладачів
      const totalTeachersCount = await Teacher.countDocuments();
  
      res.status(200).json({
        success: true,
        data: totalTeachersCount,
      });
    } catch (error) {
      console.error("Error in getTotalTeachersCount:", error.message);
      res.status(500).json({
        success: false,
        message: "Server Error",
      });
    }
  };
  
// Контролер для підрахунку кількості груп
export const getTotalGroupsCount = async (req, res) => {
    try {
      // Підрахунок всіх груп
      const totalGroupsCount = await Group.countDocuments();
  
      res.status(200).json({
        success: true,
        data: totalGroupsCount,  // Виводимо кількість груп
      });
    } catch (error) {
      console.error("Error in getTotalGroupsCount:", error.message);
      res.status(500).json({
        success: false,
        message: "Server Error",
      });
    }
  };