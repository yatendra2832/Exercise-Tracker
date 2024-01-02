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

// middleware
app.use(express.json());

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