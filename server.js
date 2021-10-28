// dependencies
// get .env variables
require("dotenv").config();
//pull port from .env, give default value of 3001
//pull DATABASE_URL from .env
const { PORT=3001, DATABASE_URL } = process.env;
//import express
const express = require("express");
//create application object
const app = express();
//import mongoose
const mongoose = require("mongoose");
//import middleware
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");

//API DETAILS

// const BASE_URL = "https://developer.nps.gov/api/v1/lessonplans?parkCode=acad&api_key={API_KEY}"

//database connection
//establish connection
mongoose.connect(DATABASE_URL);
//connection events
const db = mongoose.connection;

db.on('connected', () => console.log('Connected to MongoDB'));
db.on('disconnected', () => console.log('Disconnected from MongoDB'));
db.on('error', () => console.log(`An Error Has Occurred with MongoDB: ${error.message}`));

// // models
const plansSchema = new mongoose.Schema(
    {
        title: String,
        parks: String,
        questionObjective: String,
        gradeLevel: String,
        subject: String, 
        duration: String,
        url: String,
    }, { timestamps: true }
);

const Plans = mongoose.model("Plans", plansSchema);

// middleware
app.use(cors()); // to prevent cors errors, open access to all origins
app.use(morgan("dev")); //logging
app.use(express.json()); //parse json bodies


//routes

// create a test route
app.get("/plans", (req, res) => {
    res.send("hello world!");
});

//seed route
// app.get("/plans/seed", (req, res) => {
//     Plans.create(
//         [
//             {
//                 "title": "Plan 2",
//                 "parks": "Park 2",
//                 "questionObjective": "Objective 2",
//                 "gradeLevel": "Elementary school",
//                 "subject": "Geography",
//                 "duration": "30 minutes",
//                 "url": "http://www.google.com"
//             },
//             {
//                 "title": "Plan 1",
//                 "parks": "Park 1",
//                 "questionObjective": "Objective 1",
//                 "gradeLevel": "High school",
//                 "subject": "Social Studies",
//                 "duration": "60 minutes",
//                 "url": "http://www.google.com"
//             },
//             {
//                 "title": "Plan 3",
//                 "parks": "Park 3",
//                 "questionObjective": "Objective 3",
//                 "gradeLevel": "Middle school",
//                 "subject": "English",
//                 "duration": "45 minutes",
//                 "url": "http://www.google.com"
//             },
//         ],
//         (error, data) => {
//             res.redirect("/plans")
//         }
//     )
// });

//index route
app.get("/plans", async (req, res) => {
    try {
        // send all plans
        res.json(await Plans.find({}));
    } catch (error) {
        // send error
        res.status(400).json(error);
    }
});

// create route
app.post("/plans", async (req, res) => {
    try {
        // send all plans
        res.json(await Plans.create(req.body));
    } catch (error) {
        //send error
        res.status(400).json(error);
    }
});

// // DELETE ROUTE
// app.delete("/plans/:id", async (req, res) => {
//   try {
//     // send all plans
//     res.json(await Plans.findByIdAndDelete(req.params.id));
//   } catch (error) {
//     //send error
//     res.status(400).json(error);
//   }
// });

// // UPDATE ROUTE
// app.put("/plans/:id", async (req, res) => {
//   try {
//     // send all plans
//     res.json(
//       await Plans.findByIdAndUpdate(req.params.id, req.body, { new: true })
//     );
//   } catch (error) {
//     //send error
//     res.status(400).json(error);
//   }
// });


//listener
app.listen(PORT, () => console.log("listening on PORT ${PORT}"));