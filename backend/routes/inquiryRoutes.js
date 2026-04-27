const router = require("express").Router();
const upload = require("../config/multer");
const { createInquiry } = require("../controllers/inquiryController");

router.post("/", upload.array("reports", 5), createInquiry);

module.exports = router;
