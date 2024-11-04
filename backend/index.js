import express from 'express';
import { connectToDb, getDb } from './db.js';

const app = express();

let db;

connectToDb((err) => {
    if (!err) {
        app.listen(8084, (err) => {
            if (err) {
                return console.log(err);
            }
            console.log("Server Ok + ");
        });
        db = getDb();
    } else {
        console.log(`DB connection error: ${err}`);
    }
});
