const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobileNumber: { type: String },
    password: { type: String, required: true },
    dob: { type: Date },
    gender: { type: String },
    passportNumber: { type: String },

    // Structured Health Profile
    bloodGroup: { type: String },
    maritalStatus: { type: String },

    address: { type: String },
    city: { type: String },
    state: { type: String },
    country: { type: String },
    pincode: { type: String },

    medicalInfo: {
        allergies: { type: String },
        currentMedications: { type: String },
        pastConditions: { type: String },
        chronicDiseases: { type: String },
        surgeries: { type: String }
    },

    emergencyContact: {
        name: { type: String },
        relationship: { type: String },
        phone: { type: String }
    },

    // Document links
    reports: [{ type: String }],
    prescriptions: [{ type: String }],

    profileComplete: { type: Number, default: 20 } // Percentage
}, { timestamps: true });

module.exports = mongoose.model("Patient", patientSchema);
