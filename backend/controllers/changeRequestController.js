const ChangeRequest = require("../models/ChangeRequest");
const Hospital = require("../models/Hospital");

exports.createChangeRequest = async (req, res) => {
    try {
        const { hospitalId, type, proposedData, currentData } = req.body;

        // Ensure hospitalId belongs to the user if they are a hospital admin
        if (req.user.role === "hospital" && req.user.hospitalId !== hospitalId) {
            return res.status(403).json({ msg: "Not authorized to create requests for this hospital" });
        }

        const request = new ChangeRequest({
            hospitalId,
            type,
            proposedData,
            currentData,
            status: "pending"
        });

        await request.save();
        res.status(201).json({ msg: "Change request submitted for review", request });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Server Error" });
    }
};

exports.getMyRequests = async (req, res) => {
    try {
        const { hospitalId } = req.user;
        const requests = await ChangeRequest.find({ hospitalId }).sort("-createdAt");
        res.json(requests);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Server Error" });
    }
};

exports.getAllRequests = async (req, res) => {
    try {
        const requests = await ChangeRequest.find().populate("hospitalId", "name").sort("-createdAt");
        res.json(requests);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Server Error" });
    }
};

exports.approveRequest = async (req, res) => {
    try {
        const { id } = req.params;
        const request = await ChangeRequest.findById(id);

        if (!request) return res.status(404).json({ msg: "Request not found" });

        // Apply changes to Hospital model
        if (request.type === "profile") {
            await Hospital.findByIdAndUpdate(request.hospitalId, request.proposedData);
        } else if (request.type === "doctor") {
            // Logic for doctor update...
            const hospital = await Hospital.findById(request.hospitalId);
            if (hospital) {
                // Example: Merge or update doctors list
                hospital.doctors = request.proposedData.doctors || hospital.doctors;
                await hospital.save();
            }
        }

        request.status = "approved";
        request.reviewedBy = req.user.id;
        request.reviewedAt = new Date();
        await request.save();

        res.json({ msg: "Request approved and data updated", request });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Server Error" });
    }
};

exports.rejectRequest = async (req, res) => {
    try {
        const { id } = req.params;
        const { comment } = req.body;

        const request = await ChangeRequest.findById(id);
        if (!request) return res.status(404).json({ msg: "Request not found" });

        request.status = "rejected";
        request.adminComment = comment;
        request.reviewedBy = req.user.id;
        request.reviewedAt = new Date();
        await request.save();

        res.json({ msg: "Request rejected", request });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Server Error" });
    }
};
