const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { PORT, MONGODBURL } = require('./config.js');
const app = express();

// cors middleware
app.use(
    cors({
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type"]
    })
);

// Routes
const exerciseRouter = require('./Routes/exercises');
const userRouter = require('./Routes/users');

// middleware
app.use(express.json());

app.use('/exercise', exerciseRouter);
app.use('/users', userRouter);

// Server listening
mongoose
    .connect(MONGODBURL)
    .then(() => {
        console.log('Connected to Database Successfully');
        app.listen(PORT, () => {
            console.log(`Server listening on port ${PORT}`);
        })
    })
    .catch((err) => console.log("Error in Connecting to Database: ", err));