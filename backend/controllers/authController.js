const User = require("../models/User");
const Hospital = require("../models/Hospital");
const jwt = require("jsonwebtoken");

// ADMIN REGISTER
exports.registerAdmin = async (req, res) => {
    try {
        const { fullName, email, password, hospitalName, mobileNumber } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: "User with this email already exists" });
        }

        // Create a new hospital automatically for the admin
        const hospital = await Hospital.create({
            name: hospitalName || `${fullName}'s Hospital`,
            city: "General",
            country: "India",
            onboardingStatus: "pending"
        });

        const user = await User.create({
            fullName,
            email,
            mobileNumber,
            password,
            role: "hospital_admin",
            hospitalId: hospital._id
        });

        const token = jwt.sign(
            { id: user._id, role: user.role, hospitalId: user.hospitalId },
            process.env.JWT_SECRET || "supersecretkey",
            { expiresIn: "1h" }
        );

        res.status(201).json({ token, role: user.role, hospitalId: user.hospitalId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Server Error" });
    }
};

// ADMIN LOGIN
exports.loginWithPassword = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ msg: "Invalid credentials" });
        }

        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(401).json({ msg: "Invalid credentials" });
        }

        const token = jwt.sign(
            { id: user._id, role: user.role, hospitalId: user.hospitalId },
            process.env.JWT_SECRET || "supersecretkey",
            { expiresIn: "1h" }
        );

        res.json({ token, role: user.role, hospitalId: user.hospitalId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Server Error" });
    }
};

// GET CURRENT LOGGED IN USER
exports.getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password").populate("hospitalId");
        if (!user) return res.status(404).json({ msg: "User not found" });
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Server Error" });
    }
};

// UPDATE USER PROFILE
exports.updateProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ msg: "User not found" });

        user.fullName = req.body.fullName || user.fullName;
        user.email = req.body.email || user.email;
        user.mobileNumber = req.body.mobileNumber || user.mobileNumber;

        if (req.body.password) {
            user.password = req.body.password; // Pre-save hook will hash it
        }

        await user.save();
        res.json({
            msg: "Profile updated successfully",
            user: {
                fullName: user.fullName,
                email: user.email,
                mobileNumber: user.mobileNumber
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Server Error" });
    }
};

// HOSPITAL LOGIN BY MOBILE
exports.hospitalLogin = async (req, res) => {
    try {
        const { mobile } = req.body;
        if (!mobile) return res.status(400).json({ msg: "Mobile number is required" });

        const user = await User.findOne({ mobileNumber: mobile });
        if (!user) return res.status(401).json({ msg: "Mobile number not registered" });

        if (user.role !== "hospital_admin" && user.role !== "hospital") {
            return res.status(403).json({ msg: "Not a hospital admin account" });
        }

        const token = jwt.sign(
            { id: user._id, role: user.role, hospitalId: user.hospitalId },
            process.env.JWT_SECRET || "supersecretkey",
            { expiresIn: "1h" }
        );

        res.json({ token, role: user.role, hospitalId: user.hospitalId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Server Error" });
    }
};
