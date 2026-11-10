const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/authMiddleware");

const {
  getProperty,
  createProperty,
  updateProperty,
  deleteProperty,
  getProperties,
  postPropertyReview,
} = require("../controllers/propertyController");
const upload = require("../middleware/cloudinary");

router.get("/get-properties", getProperties);

router.get("/get-property/:id", getProperty);

router.post(
  "/create-property",
  verifyToken,
  upload.array("images", 4),
  createProperty,
);

router.put(
  "/update-property/:id",
  verifyToken,
  upload.array("images", 4),
  updateProperty,
);

router.delete("/delete-property/:id", verifyToken, deleteProperty);



module.exports = router;
