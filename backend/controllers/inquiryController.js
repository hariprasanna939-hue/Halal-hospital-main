const Inquiry = require("../models/Inquiry");
const uploadToCloudinary = require("../utils/uploadToCloudinary");

exports.createInquiry = async (req, res) => {
    try {
        let reportUrls = [];

        if (req.files && req.files.length > 0) {
            for (let file of req.files) {
                const url = await uploadToCloudinary(file.buffer, "medical_reports");
                reportUrls.push(url);
            }
        }

        const inquiry = await Inquiry.create({
            ...req.body,
            reports: reportUrls,
        });

        res.json({ msg: "Inquiry submitted successfully", inquiry });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Submission failed" });
    }
};
