import mongoose from "mongoose";
const lesson = new mongoose.Schema({
    ID_student: {
    type: String,
    required: true
    },
    Date_of_lesson: {
    type: String,
    required: true
    },
    Subject_name: {
    type: String,
    required: true
    },
    Type_of_lesson: {
    type: String,
    required: true
    },
    Presence: {
    type: Boolean,
    required: true
    }, 
    Assessment: {
    type: Number,
    required: true
    }
});
 
const Lesson = mongoose.model('Lesson', lesson);
export default Lesson;