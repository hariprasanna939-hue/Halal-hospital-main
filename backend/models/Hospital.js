const mongoose = require("mongoose");

const hospitalSchema = new mongoose.Schema({
    name: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    bannerImage: String,
    description: String,
    specialties: [String],
    services: [String],
    contactInfo: {
        phone: String,
        email: String,
        address: String
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });

module.exports = mongoose.model("Hospital", hospitalSchema);
