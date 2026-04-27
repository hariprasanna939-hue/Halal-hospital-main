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

exports.updateOnboarding = async (req, res) => {
    try {
        const { hospitalId, doctors, treatmentAreas } = req.body;
        if (!hospitalId) return res.status(400).json({ msg: "Hospital ID is required" });

        // Validate doctor expertise matches treatment areas
        if (doctors && treatmentAreas) {
            const isValid = doctors.every(doc =>
                treatmentAreas.includes(doc.expertise)
            );
            if (!isValid) {
                return res.status(400).json({ msg: "Doctor expertise must match selected treatment areas" });
            }
        }

        const updatedHospital = await Hospital.findByIdAndUpdate(
            hospitalId,
            {
                ...req.body,
                onboardingStatus: "completed"
            },
            { new: true }
        );

        if (!updatedHospital) return res.status(404).json({ msg: "Hospital not found" });

        res.json({ msg: "Onboarding completed successfully", hospital: updatedHospital });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Server Error" });
    }
};

exports.getPublicHospitalData = async (req, res) => {
    try {
        const hospital = await Hospital.findById(req.params.id);
        if (!hospital) return res.status(404).json({ msg: "Hospital not found" });

        // Map internal schema to user-requested public structure
        const publicData = {
            hospitalName: hospital.name,
            email: hospital.contactInfo?.email,
            bannerImage: hospital.bannerImage,
            description: hospital.description,
            address: {
                line1: hospital.address1,
                line2: hospital.address2,
                city: hospital.city,
                state: hospital.state,
                country: hospital.country
            },
            treatmentAreas: hospital.treatmentAreas || [],
            doctors: hospital.doctors || [],
            accreditation: {
                types: hospital.accreditations || [],
                boardCertified: hospital.physicianLicensing === "yes"
            },
            halalCompliance: {
                hasCertification: hospital.halalCertification === "yes",
                certificateNumber: hospital.certificateNumber,
                expiryDate: hospital.expiryDate,
                certificateFile: hospital.certificateFile,

                halalFood: hospital.halalFoodKitchen === "yes",
                noCrossContamination: hospital.crossContaminationProcess ? true : false,
                specialDiets: hospital.specialDietaryMenus === "yes" ? ["Halal-only", "Organic"] : [],

                prayerRoom: hospital.prayerRooms === "yes",
                qiblaMarked: hospital.qiblaMarking === "yes",
                quranAvailable: hospital.prayerTimetables === "yes", // Mapping appropriately

                sameGenderCare: hospital.sameGenderCare === "yes",
                femaleStaffAvailable: hospital.hijabAccommodation ? true : false,

                halalAudit: hospital.annualAudits === "yes"
            }
        };

        res.json(publicData);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Server Error" });
    }
};
