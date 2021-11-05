require("dotenv").config();
const { PORT=3001, DATABASE_URL } = process.env;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Plan = require("./models/planSchema");

//middleware
const cors = require("cors");
const morgan = require("morgan");
app.use(express.urlencoded({ extended: false }))

//database connection
mongoose.connect(DATABASE_URL);
const db = mongoose.connection;


db.on('connected', () => console.log('Connected to MongoDB'));
db.on('disconnected', () => console.log('Disconnected from MongoDB'));
db.on('error', () => console.log(`An Error Has Occurred with MongoDB: ${error.message}`));



// middleware
app.use(cors());
app.use(morgan("dev")); 
app.use(express.json()); 


// call to React front end
app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" })
  });
  
// ROUTES

// INDEX ROUTE
app.get("/plans", async (req, res) => {
    try {
        res.json(await Plan.find({}));
    } catch (error) {
        res.status(400).json(error);
    }
});

// DELETE ROUTE
app.delete("/plans/:id", async (req, res) => {
  try {
    res.json(await Plan.findByIdAndDelete(req.params.id));
  } catch (error) {
    res.status(400).json(error);
  }
});

// UPDATE ROUTE
app.put("/plans/:id", async (req, res) => {
  try {
    res.json(
      await Plan.findByIdAndUpdate(req.params.id, req.body, { new: true })
    );
  } catch (error) {
    res.status(400).json(error);
  }
});

// CREATE ROUTE
app.post("/plans/", async (req, res) => {
    try {
        res.json(await Plan.create(req.body));
    } catch (error) {
        res.status(400).json(error);
    }
});

app.get('/', (req, res) => res.redirect('/plans'))

// LISTENER
app.listen(PORT, () => console.log("listening on PORT ${PORT}"));