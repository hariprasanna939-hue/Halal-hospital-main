const mongoose = require("mongoose");

const deptSchema = new mongoose.Schema({
    hospitalId: { type: mongoose.Schema.Types.ObjectId, ref: "Hospital", required: true },
    name: { type: String, required: true },
    operatingDays: [String],
    openingTime: String,
    closingTime: String,
}, { timestamps: true });

module.exports = mongoose.model("Department", deptSchema);
