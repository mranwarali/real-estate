const express = require("express");
const { createEnquiry } = require("../controllers/enquiryControiller");
const router = express.Router();

router.post("/submit-enquiry", createEnquiry);

module.exports = router;
