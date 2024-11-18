import mongoose from "mongoose";

const group = new mongoose.Schema({
    ID_group: {
    type: Number,
    required: true
    },
    group_code: {
    type: String,
    required: false
    },
    total_number_of_students: {
    type: Number,
    required: false
    },
    specialty_faculty: {
    type: Number,
    required: true
    },
    course: {
    type: Number,
    required: false
    },
    headman: {
    type: String,
    required: false
    },
    curators_name: {
    type: String,
    required: false
    },
    Email: {
    type: String,
    required: false
    }
});
 
const Group = mongoose.model('Group', group);

export default Group;