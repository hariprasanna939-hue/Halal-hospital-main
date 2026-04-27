const mongoose = require("mongoose");

const inquirySchema = new mongoose.Schema({
    hospitalId: { type: mongoose.Schema.Types.ObjectId, ref: "Hospital" }, // Final assigned hospital
    sourceHospitalId: { type: mongoose.Schema.Types.ObjectId, ref: "Hospital" }, // Original hospital clicked
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    patientName: { type: String, required: true },
    patientEmail: { type: String, required: true },
    patientPhone: { type: String, required: true },

    message: { type: String, required: true },
    treatmentInterest: { type: String },

    status: {
        type: String,
        enum: ["new", "in-progress", "resolved"],
        default: "new"
    },

    createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model("Inquiry", inquirySchema);
