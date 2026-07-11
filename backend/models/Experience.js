const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      required: true,
      trim: true,
    },
    organization: {
      type: String,
      required: true,
      trim: true,
    },
    duration: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ['Internship', 'Training', 'Volunteer'],
    },
    keySkills: {
      type: [String],
      default: [],
    },
    details: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Experience', experienceSchema);
