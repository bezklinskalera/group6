import mongoose from "mongoose";


const student = new mongoose.Schema({
    ID_student: {
    type: Number,
    required: false
    },
    Surname: {
    type: String,
    required: true
    },
    Name: {
    type: String,
    required: true
    },
    Patronymic: {
    type: String,
    required: true
    },
    group_code: {
    type: String,
    required: true
    },
    birth_date: {
    type: String,
    required: false
    },
    Email: {
    type: String,
    unique: true,
    required: true
    },
    student_card_number: {
    type: String,
    required: false
    },
    general_pacing: {
    type: Number,
    required: false
    },
    password: {
    type: String,
    required: true
    }
});
 
// Додавання унікального індексу
student.index({ Surname: 1, Name: 1, Patronymic: 1, group_code: 1 }, { unique: true });

const Student = mongoose.model('Student', student);

export default Student;