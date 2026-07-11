const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
    },
    roles: {
      type: [String],
      default: [],
    },
    email: {
      type: String,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    address: {
      type: String,
    },
    permanentAddress: {
      type: String,
    },
    github: {
      type: String,
    },
    linkedin: {
      type: String,
    },
    summary: {
      type: String,
    },
    hobbies: {
      type: [String],
      default: [],
    },
    dob: {
      type: String,
    },
    gender: {
      type: String,
    },
    languages: {
      type: [String],
      default: [],
    },
    profileImage: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Profile', profileSchema);
