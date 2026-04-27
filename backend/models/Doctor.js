const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
    hospitalId: { type: mongoose.Schema.Types.ObjectId, ref: "Hospital", required: true },
    name: { type: String, required: true },
    department: String,
    days: [String],
    timeSlots: [String],
    onLeave: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model("Doctor", doctorSchema);
