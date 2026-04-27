const Hospital = require("../models/Hospital");
const Department = require("../models/Department");
const Doctor = require("../models/Doctor");
const uploadToCloudinary = require("../utils/uploadToCloudinary");

exports.updateHospital = async (req, res) => {
    try {
        const hospitalId = req.user.hospitalId;
        console.log("Update hospital request for ID:", hospitalId);
        console.log("Request Body:", req.body);

        if (!hospitalId) {
            console.error("No hospitalId found in User token");
            return res.status(403).json({ msg: "No hospital associated with this admin" });
        }

        const hospital = await Hospital.findByIdAndUpdate(hospitalId, req.body, { new: true });

        if (!hospital) {
            console.error("Hospital not found for update:", hospitalId);
            return res.status(404).json({ msg: "Hospital record not found" });
        }

        console.log("Hospital updated successfully in DB:", hospital.name);

        // Emit real-time sync event
        if (global.io) {
            global.io.emit("hospitalUpdated", hospital);
        }

        res.json({ msg: "Hospital updated successfully", hospital });
    } catch (err) {
        console.error("Update Hospital Error:", err);
        res.status(500).json({ msg: "Server Error", error: err.message });
    }
};

exports.updateBanner = async (req, res) => {
    try {
        const hospitalId = req.user.hospitalId;
        console.log("Banner update request for hospitalId:", hospitalId);

        if (!hospitalId) {
            console.error("No hospitalId found in request user object:", req.user);
            return res.status(403).json({ msg: "No hospital associated with your account" });
        }

        console.log("Incoming file for banner update:", req.file ? {
            originalname: req.file.originalname,
            mimetype: req.file.mimetype,
            size: req.file.size
        } : "Empty");

        if (!req.file) return res.status(400).json({ msg: "No file uploaded" });

        console.log("Attempting Cloudinary upload...");
        let imageUrl;
        try {
            imageUrl = await uploadToCloudinary(req.file.buffer, "hospital");
            console.log("Cloudinary upload success:", imageUrl);
        } catch (cloudErr) {
            console.error("Cloudinary Upload Error Details:", cloudErr);
            return res.status(500).json({ msg: "Cloud storage upload failed", error: cloudErr.message });
        }

        const hospital = await Hospital.findByIdAndUpdate(
            hospitalId,
            { bannerImage: imageUrl },
            { new: true }
        );

        if (!hospital) {
            console.error("Hospital not found in DB for ID:", hospitalId);
            return res.status(404).json({ msg: "Hospital record not found" });
        }

        console.log("DB Update Success for Hospital:", hospital.name);

        // Emit real-time sync event
        if (global.io) {
            console.log("Emitting hospitalUpdated event for real-time sync");
            global.io.emit("hospitalUpdated", hospital);
        }

        res.json({
            msg: "Banner updated successfully",
            imageUrl: imageUrl,
            hospital
        });
    } catch (err) {
        console.error("FATAL Update Banner Error:", err);
        res.status(500).json({ msg: "Update failed", message: err.message });
    }
};

exports.addDepartment = async (req, res) => {
    try {
        const hospitalId = req.user.hospitalId;
        const department = await Department.create({ ...req.body, hospitalId });
        res.json({ msg: "Department added", department });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Server Error" });
    }
};

exports.addDoctor = async (req, res) => {
    try {
        const hospitalId = req.user.hospitalId;
        const doctor = await Doctor.create({ ...req.body, hospitalId });
        res.json({ msg: "Doctor availability added", doctor });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Server Error" });
    }
};
