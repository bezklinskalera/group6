import mongoose from "mongoose";

const specialty = new mongoose.Schema({
    code_specialty: {
    type: Number,
    required: true
    },
    name_specialty: {
    type: String,
    required: true
    },
    name_department: {
    type: String,
    required: true
    }
});
 
const Specialty = mongoose.model('Specialty', specialty);

export default Specialty;