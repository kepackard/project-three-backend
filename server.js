// dependencies
// get .env variables
require("dotenv").config();
//pull port from .env, give default value of 3001
//pull DATABASE_URL from .env
const { PORT = 3001, DATABASE_URL } = process.env;
//import express
const express = require("express");
//create application object
const app = express();
//import mongoose
const mongoose = require("mongoose");
//import middleware
const cors = require("cors");
const morgan = require("morgan");

//database connection
//establish connection
mongoose.connect(DATABASE_URL);
//connection events
mongoose.connection
    .on("open", () => console.log("You are connected to MongoDB"))
    .on("close", () => console.log("You are disconnected from MongoDB"))
    .on("error", (error) => console.log(error));

// models
const PlansSchema = new mongoose.Schema(
    {
        title: String,
        parks: String,
        questionObjective: String,
        gradeLevel: String,
        subject: String, 
        duration: String,
        url: String,
    }
);

const Plans = mongoose.model("Plans", PlansSchema);

// middleware
app.use(cors); // to prevent cors errors, open access to all origins
app.use(morgan("dev")); //logging
app.use(express.json()); //parse json bodies

//routes

// create a test route
app.get("/", (req, res) => {
    res.send("hello world");
});

//listener
app.listen(PORT, () => console.log("listening on PORT ${PORT}"));