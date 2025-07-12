// controllers/userController.js

const User = require("../models/User");

exports.saveUserProfile = async (req, res) => {
  const {
    _id,
    name,
    location,
    availability,
    profileVisibility,
    skillsOffered,
    skillsWanted,
    profilePhotoUrl,
  } = req.body;

  try {
    let user;

    if (_id) {
      user = await User.findByIdAndUpdate(
        _id,
        {
          name,
          location,
          availability,
          profileVisibility,
          skillsOffered,
          skillsWanted,
          profilePhotoUrl,
        },
        { new: true }
      );
    } else {
      // Create new user
      user = await User.create({
        name,
        location,
        availability,
        profileVisibility,
        skillsOffered,
        skillsWanted,
        profilePhotoUrl,
      });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error saving user profile:", error);
    res.status(500).json({ error: "Failed to save user profile" });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) return res.status(404).json({ error: "User not found" });

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Failed to fetch user profile" });
  }
};

// GET /user/public-profiles
exports.getAllPublicProfiles = async (req, res) => {
  try {
    const profiles = await User.find({ profileVisibility: "public" }).select(
      "name location profilePhotoUrl skillsOffered skillsWanted availability averageRating"
    );
    res.json(profiles);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
