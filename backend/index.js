import express from 'express';

const app = express();

app.listen(8084, (err) => {
    if (err) {
        return console.log(err);
    }

    console.log("Server Ok");
});