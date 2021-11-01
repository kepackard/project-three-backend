//
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

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

module.exports = mongoose.model("Plans", plansSchema);