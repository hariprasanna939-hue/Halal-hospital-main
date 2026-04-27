const Patient = require("../models/Patient");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Generate Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || "supersecretkey", {
        expiresIn: "7d",
    });
};

// REGISTER PATIENT
exports.registerPatient = async (req, res) => {
    try {
        const { fullName, email, mobileNumber, password, dob, gender } = req.body;

        const existingUser = await Patient.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Patient already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Calculate Initial Completion
        const fields = [fullName, mobileNumber, dob, gender, "", "", "", "", ""];
        const completed = fields.filter(f => f && f !== "").length;
        const profileComplete = Math.round((completed / 9) * 100);

        const patient = await Patient.create({
            fullName,
            email,
            mobileNumber,
            password: hashedPassword,
            dob,
            gender,
            profileComplete
        });

        res.status(201).json({
            _id: patient._id,
            fullName: patient.fullName,
            email: patient.email,
            role: "patient",
            token: generateToken(patient._id),
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// LOGIN PATIENT
exports.loginPatient = async (req, res) => {
    try {
        const { email, password } = req.body;

        const patient = await Patient.findOne({ email });

        if (patient && (await bcrypt.compare(password, patient.password))) {
            res.json({
                _id: patient._id,
                fullName: patient.fullName,
                email: patient.email,
                role: "patient",
                token: generateToken(patient._id),
            });
        } else {
            res.status(401).json({ message: "Invalid email or password" });
        }

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET ALL PATIENTS (Admin)
exports.getAllPatients = async (req, res) => {
    try {
        const patients = await Patient.find().select("-password").sort("-createdAt");
        res.json(patients);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET PATIENT PROFILE
exports.getPatientProfile = async (req, res) => {
    try {
        console.log("Fetching profile for patient ID:", req.user?.id || req.user?._id);
        const patient = await Patient.findById(req.user.id || req.user._id).select("-password");
        if (patient) {
            res.json(patient);
        } else {
            res.status(404).json({ message: "Patient not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// UPDATE PATIENT PROFILE
exports.updatePatientProfile = async (req, res) => {
    try {
        const patient = await Patient.findById(req.user.id);

        if (!patient) {
            return res.status(404).json({ message: "Patient not found" });
        }

        // Basic Info
        patient.fullName = req.body.fullName || patient.fullName;
        patient.mobileNumber = req.body.mobileNumber || patient.mobileNumber;
        patient.dob = req.body.dob || patient.dob;
        patient.gender = req.body.gender || patient.gender;
        patient.bloodGroup = req.body.bloodGroup || patient.bloodGroup;
        patient.maritalStatus = req.body.maritalStatus || patient.maritalStatus;
        patient.passportNumber = req.body.passportNumber || patient.passportNumber;

        // Contact Info
        patient.address = req.body.address || patient.address;
        patient.city = req.body.city || patient.city;
        patient.state = req.body.state || patient.state;
        patient.country = req.body.country || patient.country;
        patient.pincode = req.body.pincode || patient.pincode;

        // Medical Info
        if (req.body.medicalInfo) {
            patient.medicalInfo = {
                ...patient.medicalInfo,
                ...req.body.medicalInfo
            };
        }

        // Emergency Contact
        if (req.body.emergencyContact) {
            patient.emergencyContact = {
                ...patient.emergencyContact,
                ...req.body.emergencyContact
            };
        }

        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            patient.password = await bcrypt.hash(req.body.password, salt);
        }

        // Calculate Profile Completion
        const fields = [
            patient.fullName, patient.mobileNumber, patient.dob, patient.gender, patient.bloodGroup,
            patient.address, patient.city, patient.medicalInfo?.allergies,
            patient.emergencyContact?.name
        ];
        const completed = fields.filter(f => f && f !== "").length;
        patient.profileComplete = Math.round((completed / fields.length) * 100);

        const updatedPatient = await patient.save();

        res.json(updatedPatient);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
