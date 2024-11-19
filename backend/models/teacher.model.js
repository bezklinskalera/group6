import mongoose from "mongoose";

const teacher = new mongoose.Schema({
    ID_teacher: {
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
    id_department: {
    type: Number,
    required: true
    }, 
    Email: {
    type: String,
    required: true
    },
    password: {
    type: String,
    required: true
    }
});
 
const Teacher = mongoose.model('Teacher', teacher);

export default Teacher;