import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "./config/db.js";

import express from 'express';

const app = express();

app.get("/products", (req, res) => {});

if (!process.env.MONGO_URI) {
    console.log("MONGO_URI is missing in .env file");
} else {
    console.log("MONGO_URI:", process.env.MONGO_URI);
}

app.listen(8084, (err) => {
    connectDB();
    if (err) {
        return console.log(err);
    }
    console.log("Server Ok");
});