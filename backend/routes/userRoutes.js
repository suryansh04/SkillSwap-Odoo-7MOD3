const express = require("express");
const router = express.Router();
const {
  saveUserProfile,
  getUserById,
  getAllPublicProfiles,
} = require("../controllers/userController");

const upload = require("../config/multer");

router.post("/save", saveUserProfile);
router.post("/upload-photo", upload.single("profile Photo"), (req, res) => {
  res.status(200).json({ imageUrl: req.file.path });
});

router.get("/public-profiles", getAllPublicProfiles);
router.get("/:id", getUserById);

module.exports = router;
