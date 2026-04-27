const router = require("express").Router();
const auth = require("../middleware/auth");
const { superAdminOnly } = require("../middleware/roles");
const {
    submitInquiry,
    getHospitalInquiries,
    updateInquiryStatus,
    getSuperAdminInquiries,
    assignHospitalToInquiry
} = require("../controllers/inquiryController");

router.post("/", submitInquiry);
router.get("/hospital/:id", auth, getHospitalInquiries);
router.patch("/:id/status", auth, updateInquiryStatus);

// Super Admin Coordination
router.get("/all", auth, superAdminOnly, getSuperAdminInquiries);
router.post("/assign/:id", auth, superAdminOnly, assignHospitalToInquiry);

module.exports = router;
