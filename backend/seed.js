require("dotenv").config();
const mongoose = require("mongoose");
const Hospital = require("./models/Hospital");
const User = require("./models/User");

const seed = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connected for seeding...");

        // 1. Create a Test Hospital
        let hospital = await Hospital.findOne({ name: "HalalMedi General Hospital" });
        if (!hospital) {
            hospital = await Hospital.create({
                name: "HalalMedi General Hospital",
                city: "Dubai",
                country: "UAE",
                bannerImage: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=2900",
                description: "A premier healthcare facility in the heart of Dubai, specializing in advanced surgical procedures and compassionate care."
            });
            console.log("Test Hospital created:", hospital._id);
        } else {
            console.log("Test Hospital already exists.");
        }

        // 2. Create a Test Admin User
        const adminMobile = "9876543210";
        let admin = await User.findOne({ mobile: adminMobile });
        if (!admin) {
            admin = await User.create({
                role: "hospital_admin",
                mobile: adminMobile,
                email: "admin@halalmedi.com",
                password: "adminpassword123", // Will be hashed by pre-save hook
                hospitalId: hospital._id
            });
            console.log("Test Admin created:", adminMobile);
        } else {
            console.log("Test Admin already exists.");
        }

        console.log("Seeding complete! You can now log in with:");
        console.log("Mobile:", adminMobile);
        console.log("Password: adminpassword123");
        process.exit(0);
    } catch (err) {
        console.error("Seeding failed:", err);
        process.exit(1);
    }
};

seed();
