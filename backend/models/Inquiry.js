const mongoose = require("mongoose");

const inquirySchema = new mongoose.Schema({
    patientName: { type: String, required: true },
    gender: String,
    age: String,
    country: String,
    city: String,
    phone: { type: String, required: true },
    email: String,
    condition: String,
    diagnosis: String,
    symptoms: String,
    duration: String,
    treatmentType: String,
    specialty: String,
    preferredHospital: String,
    preferredCity: String,
    medicalHistory: String,
    medications: String,
    passport: String,
    travelReady: String,
    reports: [String], // Array of Cloudinary URLs
}, { timestamps: true });

module.exports = mongoose.model("Inquiry", inquirySchema);
