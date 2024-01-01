const express = require('express');
const cors = require('cors');

const app = express();

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
app.listen(3000, () => {
    console.log('Server is Running at port 3000');
})