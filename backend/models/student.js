import mongoose from "mongoose";

const student = new mongoose.Schema({
    ID_student: {
    type: Number,
    required: true
    },
    full_name: {
    type: String,
    required: true
    },
    ID_group: {
    type: Number,
    required: true
    },
    birth_date: {
    type: Number,
    required: false
    },
    birth_date: {
    type: Number,
    required: true
    },
    Email: {
    type: String,
    required: true
    },
    student_card_number: {
    type: String,
    required: true
    },
    general_pacing: {
    type: Number,
    required: false
    },
    password: {
    type: Number,
    required: false
    },
});
 
const Student = mongoose.model('Student', student);

export default Student;