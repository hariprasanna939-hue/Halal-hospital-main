const express = require("express");
const router = express.Router();
const {
    registerPatient,
    loginPatient,
    getAllPatients,
    getPatientProfile,
    updatePatientProfile
} = require("../controllers/patientController");
const auth = require("../middleware/auth");

router.post("/register", registerPatient);
router.post("/login", loginPatient);
router.get("/", auth, getAllPatients);
router.get("/profile", auth, getPatientProfile);
router.put("/profile", auth, updatePatientProfile);

module.exports = router;
