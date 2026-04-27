const router = require("express").Router();
const auth = require("../middleware/auth");
const upload = require("../config/multer");
const { hospitalOnly } = require("../middleware/roles");
const { getHospitals, getHospitalById, updateOnboarding, getPublicHospitalData } = require("../controllers/hospitalController");
const { updateBanner } = require("../controllers/adminController");
const { hospitalLogin } = require("../controllers/authController");
const { createChangeRequest, getMyRequests } = require("../controllers/changeRequestController");

// Public routes
router.get("/", getHospitals);
router.get("/:id/public", getPublicHospitalData);
router.get("/:id", getHospitalById);
router.post("/login", hospitalLogin);

// Hospital Admin only routes
router.use(auth, hospitalOnly);
router.post("/upload", upload.single("banner"), updateBanner);
router.put("/onboarding", updateOnboarding);
router.post("/onboard", updateOnboarding);

// Change Requests
router.post("/change-request", createChangeRequest);
router.get("/change-requests", getMyRequests);

module.exports = router;
