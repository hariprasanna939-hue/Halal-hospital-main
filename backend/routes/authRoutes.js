const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const auth = require("../middleware/auth");

router.post("/register-admin", authController.registerAdmin);
router.post("/login-password", authController.loginWithPassword);
router.get("/me", auth, authController.getMe);
router.put("/profile", auth, authController.updateProfile);

module.exports = router;
