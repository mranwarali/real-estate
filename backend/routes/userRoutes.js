const express = require("express");
const {
  updateProfile,
  fetchProfile,
  deleteProfile,
  changePassword,
  fetchAgents,
} = require("../controllers/userController");
const { verifyToken } = require("../middleware/authMiddleware");
const upload = require("../middleware/cloudinary");

const router = express.Router();

router.get("/fetch-profile", verifyToken, fetchProfile);
router.get("/fetch-agent", fetchAgents);
router.put(
  "/update-profile",
  verifyToken,
  upload.single("avatar"),
  updateProfile,
);
router.delete("/delete-profile", verifyToken, deleteProfile);
router.put("/change-password", verifyToken, changePassword);

module.exports = router;
