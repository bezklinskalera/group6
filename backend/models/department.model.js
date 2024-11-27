import mongoose from "mongoose";

const department = new mongoose.Schema({
    name_department: {
    type: String,
    required: true
    },
    faculty_name: {
    type: String, 
    required: false
    }
});
 
const Department = mongoose.model('Department', department);

export default Department;