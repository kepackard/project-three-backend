require("dotenv").config();
const { PORT=3001, DATABASE_URL } = process.env;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const planSeed = require("./models/planSeed.js");
const Plan = require("./models/planSchema");

//middleware
const cors = require("cors");
const morgan = require("morgan");
app.use(express.urlencoded({ extended: false }))

//API DETAILS

// const BASE_URL = "https://developer.nps.gov/api/v1/lessonplans"

//database connection
mongoose.connect(DATABASE_URL);
const db = mongoose.connection;

db.on('connected', () => console.log('Connected to MongoDB'));
db.on('disconnected', () => console.log('Disconnected from MongoDB'));
db.on('error', () => console.log(`An Error Has Occurred with MongoDB: ${error.message}`));



// middleware
app.use(cors()); // to prevent cors errors, open access to all origins
app.use(morgan("dev")); //logging
app.use(express.json()); //parse json bodies


// call to React front end
app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" })
  });
  
//API CALL

// function getPlanData(event) {
//     event.preventDefault();
//     const lessonPlans = $input.val();
//         $input.val("");

//         $.ajax(`${BASE_URL}/?api_key={API_KEY}`).then(function(results) {
//             console.log(results);
//         )
// };

//routes

// create a test route
// app.get("/plans", (req, res) => {
//     res.send("hello world!");
// });



// seed route
app.get("/plans/seed", (req, res) => {
    Plan.deleteMany({}, (error, allPlans) => {})
    
    Plan.create(planSeed, (error, data) => {
        res.redirect("/plans")
    })
});

//index route
app.get("/plans", async (req, res) => {
    try {
        res.json(await Plan.find({}));
    } catch (error) {
        res.status(400).json(error);
    }
});

// create route
app.post("/plans", async (req, res) => {
    try {
        res.json(await Plan.create(req.body));
    } catch (error) {
        res.status(400).json(error);
    }
});

// // DELETE ROUTE
// app.delete("/plans/:id", async (req, res) => {
//   try {
//     // send all plans
//     res.json(await Plan.findByIdAndDelete(req.params.id));
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
//       await Plan.findByIdAndUpdate(req.params.id, req.body, { new: true })
//     );
//   } catch (error) {
//     //send error
//     res.status(400).json(error);
//   }
// });

app.get('/', (req, res) => res.redirect('/plans'))

//listener
app.listen(PORT, () => console.log("listening on PORT ${PORT}"));