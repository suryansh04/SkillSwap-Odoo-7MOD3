const express = require("express");
const router = express.Router();
const {
  saveUserProfile,
  getUserById,
} = require("../controllers/userController");

const upload = require('../config/multer');

router.post('/save', saveUserProfile);
router.post('/upload-photo', upload.single('profilePhoto'), (req, res) => {
  res.status(200).json({ imageUrl: req.file.path });
});

router.get("/:id", getUserById);

module.exports = router;
