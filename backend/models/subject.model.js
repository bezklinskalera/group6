import mongoose from "mongoose";

const subject = new mongoose.Schema({
    Subject_name: {
    type: String,
    required: true
    },
    Number_of_credits: {
    type: Number,
    required: true
    },
    Course: {
    type: Number,
    required: true
    },
    Teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
    required: true
    }
});
 
const Subject = mongoose.model('Subject', subject);

export default Subject;