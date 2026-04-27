const mongoose = require("mongoose");

const changeRequestSchema = new mongoose.Schema({
    hospitalId: { type: mongoose.Schema.Types.ObjectId, ref: "Hospital", required: true },
    type: {
        type: String,
        enum: ["profile", "doctor", "compliance"],
        required: true
    },
    currentData: { type: Object },
    proposedData: { type: Object, required: true },
    status: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending"
    },
    reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    reviewedAt: { type: Date },
    adminComment: { type: String }
}, { timestamps: true });

module.exports = mongoose.model("ChangeRequest", changeRequestSchema);
