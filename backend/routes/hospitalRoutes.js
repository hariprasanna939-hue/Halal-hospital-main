const router = require("express").Router();
const auth = require("../middleware/auth");
const upload = require("../config/multer");
const { getHospitals, getHospitalById } = require("../controllers/hospitalController");
const { updateBanner } = require("../controllers/adminController");

router.get("/", getHospitals);
router.get("/:id", getHospitalById);
router.post("/upload", auth, upload.single("banner"), updateBanner);

module.exports = router;
