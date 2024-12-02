import mongoose from "mongoose";

const administrator = new mongoose.Schema({
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
 
const Administrator = mongoose.model('Administrator', administrator);

export default Administrator;