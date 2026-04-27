const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    role: { type: String, enum: ["hospital_admin"], required: true },
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobileNumber: { type: String },
    password: { type: String, required: true }, // Hashed password
    hospitalId: { type: mongoose.Schema.Types.ObjectId, ref: "Hospital" },
    active: { type: Boolean, default: true }
}, { timestamps: true });

// Pre-save hook to hash password
userSchema.pre("save", async function () {
    if (!this.isModified("password")) return;
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Method to check password
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
