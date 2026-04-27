const router = require("express").Router();
const auth = require("../middleware/auth");
const upload = require("../config/multer");
const {
    updateHospital,
    updateBanner,
    addDepartment,
    addDoctor
} = require("../controllers/adminController");

router.put("/hospital", auth, updateHospital);
router.put("/hospital/banner", auth, upload.single("banner"), updateBanner);
router.post("/departments", auth, addDepartment);
router.post("/doctors", auth, addDoctor);

module.exports = router;
