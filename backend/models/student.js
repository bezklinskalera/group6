import mongoose from "mongoose";

const student = new mongoose.Schema({
    ID_student: {
    type: Number,
    required: false
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
    type: String,
    required: false
    },
    Email: {
    type: String,
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
 
const Student = mongoose.model('Student', student);

export default Student;