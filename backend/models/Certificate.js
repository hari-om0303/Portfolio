const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    provider: {
      type: String,
      required: true,
    },
    skillsLearned: {
      type: [String],
      default: [],
    },
    issueDate: {
      type: String,
      default: '',
    },
    credentialUrl: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Certificate', certificateSchema);
