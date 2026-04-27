const router = require("express").Router();
const auth = require("../middleware/auth");
const upload = require("../config/multer");
const { superAdminOnly } = require("../middleware/roles");
const { loginWithPassword } = require("../controllers/authController");
const {
    updateHospital,
    updateBanner,
    addDepartment,
    addDoctor
} = require("../controllers/adminController");
const {
    getAllRequests,
    approveRequest,
    rejectRequest
} = require("../controllers/changeRequestController");

// Public Admin Login
router.post("/login", loginWithPassword);

// Super Admin only routes
router.use(auth, superAdminOnly);

router.put("/hospital", updateHospital);
router.put("/hospital/banner", upload.single("banner"), updateBanner);
router.post("/departments", addDepartment);
router.post("/doctors", addDoctor);

// Approvals
router.get("/change-requests", getAllRequests);
router.post("/approve/:id", approveRequest);
router.post("/reject/:id", rejectRequest);

module.exports = router;
