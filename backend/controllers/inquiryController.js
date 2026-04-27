const Inquiry = require("../models/Inquiry");

exports.submitInquiry = async (req, res) => {
    try {
        const { hospitalId, ...rest } = req.body;
        const inquiry = new Inquiry({
            ...rest,
            sourceHospitalId: hospitalId // Track which hospital they were looking at
        });
        await inquiry.save();
        res.status(201).json({ msg: "Inquiry submitted successfully", inquiry });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Server Error" });
    }
};

exports.getSuperAdminInquiries = async (req, res) => {
    try {
        const inquiries = await Inquiry.find()
            .populate("hospitalId", "name")
            .populate("sourceHospitalId", "name")
            .sort("-createdAt");
        res.json(inquiries);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Server Error" });
    }
};

exports.assignHospitalToInquiry = async (req, res) => {
    try {
        const { id } = req.params;
        const { hospitalId } = req.body;

        const inquiry = await Inquiry.findByIdAndUpdate(
            id,
            { hospitalId, status: "in-progress" },
            { new: true }
        ).populate("hospitalId", "name");

        if (!inquiry) return res.status(404).json({ msg: "Inquiry not found" });

        res.json({ msg: "Inquiry assigned to hospital", inquiry });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Server Error" });
    }
};

exports.getHospitalInquiries = async (req, res) => {
    try {
        const { id } = req.params; // hospitalId

        // PRIVACY LOGIC: Only show inquiries SPECIFICALLY ASSIGNED to this hospital
        const inquiries = await Inquiry.find({ hospitalId: id })
            .select("-patientEmail -patientPhone") // Exclude sensitive fields
            .sort("-createdAt");

        res.json(inquiries);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Server Error" });
    }
};

exports.updateInquiryStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const inquiry = await Inquiry.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        ).select("-patientEmail -patientPhone");

        if (!inquiry) return res.status(404).json({ msg: "Inquiry not found" });

        res.json(inquiry);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Server Error" });
    }
};
