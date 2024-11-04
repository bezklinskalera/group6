import { MongoClient } from 'mongodb';

const URL = 'mongodb://localhost:27017/Dashboard_1';

let dbConnection;

export const connectToDb = (cb) => {
    MongoClient
        .connect(URL)
        .then((client) => {
            console.log('Connected to MongoDB');
            dbConnection = client.db();
            return cb();
        })
        .catch((err) => {
            return cb(err);
        });
};

export const getDb = () => dbConnection;
