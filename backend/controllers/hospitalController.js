const Hospital = require("../models/Hospital");
const Department = require("../models/Department");
const Doctor = require("../models/Doctor");

exports.getHospitals = async (req, res) => {
    try {
        const hospitals = await Hospital.find().sort("-createdAt");
        res.json(hospitals);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Server Error" });
    }
};

exports.getHospitalById = async (req, res) => {
    try {
        const hospital = await Hospital.findById(req.params.id);
        if (!hospital) return res.status(404).json({ msg: "Hospital not found" });

        const departments = await Department.find({ hospitalId: req.params.id });
        const doctors = await Doctor.find({ hospitalId: req.params.id });

        res.json({ hospital, departments, doctors });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Server Error" });
    }
};
