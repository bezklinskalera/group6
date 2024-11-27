import mongoose from "mongoose";

const faculty = new mongoose.Schema({
    name_faculty: {
    type: String,
    required: true
    }
});
 
const Faculty = mongoose.model('Faculty', faculty);

export default Faculty;