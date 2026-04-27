const mongoose = require("mongoose");

const hospitalSchema = new mongoose.Schema({
    name: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    state: String,
    address1: String,
    address2: String,
    bannerImage: String,
    description: String,
    specialties: [String],
    services: [String],
    contactInfo: {
        phone: String,
        email: String,
        address: String,
        pocName: String
    },
    treatmentAreas: [String],
    doctors: [
        {
            name: String,
            expertise: String
        }
    ],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    // Onboarding Status
    onboardingStatus: { type: String, enum: ["pending", "completed"], default: "pending" },

    // 1. Licensing & Accreditation
    accreditations: [String],
    physicianLicensing: { type: String, enum: ["yes", "no"] },

    // 2. Patient Privacy & Data Protection
    dpaCompliance: String,

    // 3. Medical Malpractice & Insurance
    liabilityInsurance: { type: String, enum: ["yes", "no"] },
    arbitrationClause: { type: String, enum: ["yes", "no"] },

    // 4. Informed Consent & Language Access
    consentLanguage: { type: String, enum: ["yes", "no"] },
    tourismConsent: { type: String, enum: ["yes", "no"] },
    travelRiskDisclosure: { type: String, enum: ["yes", "no"] },

    // 5. Advertising & Marketing Compliance
    outcomeGuarantees: { type: String, enum: ["yes", "no"] },
    marketingCompliance: { type: String, enum: ["yes", "no"] },
    financialRelationship: { type: String, enum: ["yes", "no"] },
    financialRelationshipDetails: String,

    // 6. Emergency & Continuity of Care
    emergencyProtocol: String,
    dischargeSummary: { type: String, enum: ["yes", "no"] },
    adverseEventProcess: String,

    // 7. Regulatory Reporting & Vigilance
    adverseEventReporting: { type: String, enum: ["yes", "no"] },
    disciplinaryActions: { type: String, enum: ["yes", "no"] },
    disciplinaryDetails: String,

    // 8. Financial & Billing Transparency
    pricingEstimates: { type: String, enum: ["yes", "no"] },
    refundPolicy: { type: String, enum: ["yes", "no"] },

    // 9. General HALAL Compliance & Certification
    halalCertification: { type: String, enum: ["yes", "no"] },
    certificateNumber: String,
    expiryDate: Date,
    certificateFile: String,
    halalFoodKitchen: { type: String, enum: ["yes", "no"] },
    crossContaminationProcess: String,
    specialDietaryMenus: { type: String, enum: ["yes", "no"] },
    prayerRooms: { type: String, enum: ["yes", "no"] },
    qiblaMarking: { type: String, enum: ["yes", "no"] },
    prayerTimetables: { type: String, enum: ["yes", "no"] },
    sameGenderCare: { type: String, enum: ["yes", "no"] },
    genderSegregatedWaiting: { type: String, enum: ["yes", "no"] },
    hijabAccommodation: String,
    shariahTissueHandling: String,
    bloodTransfusionPolicy: { type: String, enum: ["yes", "no"] },
    staffTraining: { type: String, enum: ["yes", "no"] },
    halalLiaison: { type: String, enum: ["yes", "no"] },
    rightsCharter: { type: String, enum: ["yes", "no"] },
    multilingualForms: { type: String, enum: ["yes", "no"] },
    annualAudits: { type: String, enum: ["yes", "no"] },

}, { timestamps: true });

module.exports = mongoose.model("Hospital", hospitalSchema);
