const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    location: {
      type: String,
      default: "",
    },

    profilePhotoUrl: {
      type: String,
      default: "",
    },

    skillsOffered: {
      type: [String],
      default: [],
      index: true,
    },

    skillsWanted: {
      type: [String],
      default: [],
      index: true,
    },

    availability: {
      type: String,
      default: "anytime",
    },

    profileVisibility: {
      type: String,
      default: "Public",
    },

    averageRating: {
      type: Number,
      default: 0,
    },

    totalRatings: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", UserSchema);
