import mongoose from "mongoose";

const teacher = new mongoose.Schema({
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
    name_department: {
    type: String,
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